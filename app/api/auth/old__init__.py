from flask import (
    Blueprint,
    render_template,
    redirect,
    url_for,
    request,
    flash,
    jsonify,
    g,
)
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import LoginForm, RegisterForm
from app.models import Users
from app import db
from app.config.login_manager import login_manager
from werkzeug.security import check_password_hash
from datetime import datetime
from flask_wtf.csrf import generate_csrf
import jwt
from functools import wraps
from app.api.auth.jwt_auth import jwt_auth, generate_token, requires_auth

# Use @login_required to scope a route to a logged in user.
# Use @admin_required to scope a route to an admin user.
# Use @requires_auth to scope a route to a user with a valid JWT token.


auth = Blueprint("auth", __name__, url_prefix="/auth")

auth.register_blueprint(jwt_auth)

@auth.route("/")
def auth_index():
    return {"message": "Auth Endpoint"}


@auth.route("/login", methods=["POST"])
def login():
    form = LoginForm()
    # if request.method=='POST' and form.validate_on_submit():
    if request.method == "POST":
        email = form.email.data
        password = form.password.data
        user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()

        if user is not None and check_password_hash(user.password, password):
            login_user(user)
            jwt_token = generate_token(user.id, user.email, user.role, user.password) #Generating the payload of the token based on the user's info
            tk = jwt_token.get_json()['token'] #Getting the token from the response
            response = [{
                "token": tk, #Sending the token back to the user // In this case this would just be sending back to testing views endpoint to see if it works 
                "message": "User found"
            }]
            #headers = {'X-CSRF-Token': generate_csrf()}
            return jsonify(response = response), 200
        
        else:
            response = {
                "message": "Username or Password is incorrect."
            }
            return jsonify(response), 401

    return jsonify(response=form.errors), 400


@auth.route("/register", methods=["POST"])
def register():
    Regform = RegisterForm()
    #if request.method=='POST' and form.validate_on_submit():
    if request.method == "POST":
        full_name = Regform.full_name.data
        email = Regform.email.data
        password = Regform.password.data
        role = 0  ## Default role is 0 for customer and 1 for admin

        try:
            user = Users(full_name=full_name, email=email, password=password, role=role)
            db.session.add(user)
            db.session.commit()
            response = {"message": "User created"}

            return jsonify(response), 201
        except:
            response = {"message": "User not created"}
            return jsonify(response), 409
    return jsonify(response=Regform.errors), 400


@auth.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("views.login"))


@login_manager.user_loader
def load_user(id):
    return db.session.execute(db.select(Users).filter_by(id=id)).scalar()


## Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.role != 1:
            return jsonify(message="You are not authorized to access this page"), 401
        return f(*args, **kwargs)
    return decorated_function


## Testing Requires auth and admin required decorator
@auth.route("/admin_protected", methods=["GET", "POST"])
@requires_auth
@admin_required
def admin_protected():
    return jsonify(message="You are authorized to view this page."), 200

## Testing Requires auth decorator (This is based on if a JWT token is supplied or not)
@auth.route("/test_protected", methods=["GET", "POST"])
@requires_auth
def test():
    return jsonify(message="You are authorized to view this page."), 200





     
