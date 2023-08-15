from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, g
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import LoginForm, RegisterForm
from app.models import Users
from app import db
from app.config.login_manager import login_manager
from werkzeug.security import check_password_hash
from datetime import datetime
from flask_wtf.csrf import generate_csrf
import jwt
from datetime import datetime, timedelta
from functools import wraps

auth = Blueprint("auth", __name__, url_prefix="/auth")

## Use is_authenticated to check if user is logged in
## use is_active to check if user is active
## @login_required to scope a route to only logged in users

@auth.route("/")
def auth_index():
    return {"message": "Auth Endpoint"}

@auth.route("/login", methods=[ "POST"])
def login():
    form=LoginForm()
    #if request.method=='POST' and form.validate_on_submit():
    if request.method=='POST':
        email = form.email.data
        password = form.password.data
        user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()
        if user is not None and check_password_hash(user.password, password):

            login_user(user)
            
            response = {
                "message": "User found"
            }
            #headers = {'X-CSRF-Token': generate_csrf()}
            return jsonify(response), 200
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
        role = 1 ## Setting the role to admin for now

        try:
            user = Users(full_name=full_name, email=email, password=password, role=role)
            db.session.add(user)
            db.session.commit()
            response = {
                "message": "User created"
            }
            
            return jsonify(response), 201
        except:
            response = {
                "message": "User not created"
            }
            return jsonify(response), 409
    return jsonify(response=Regform.errors), 400


@auth.route("/logout", methods=["GET", "POST"])
@login_required 
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('views.login'))

@login_manager.user_loader
def load_user(id):
    return db.session.execute(db.select(Users).filter_by(id=id)).scalar()


# def admin_required(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if current_user.role != 1:
#             return jsonify(message="You are not authorized to access this page"), 401
#         return f(*args, **kwargs)
#     return decorated_function



     