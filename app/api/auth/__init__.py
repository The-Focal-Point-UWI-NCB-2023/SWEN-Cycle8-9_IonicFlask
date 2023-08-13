from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import LoginForm
from app.models import Users
from app import db, login_manager
from werkzeug.security import check_password_hash


auth = Blueprint("auth", __name__, url_prefix="/auth")


@auth.route("/")
def auth_index():
    return {"message": "Auth Endpoint"}

@auth.route('/login', methods=['GET', 'POST'])
def login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('views.index'))
    
    form = LoginForm()
    #print(form.email.data, form.password.data)
    # Login and validate the user.

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        #print(email, password, "Yes")
        user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()
        #if user is not None and check_password_hash(user.password, password):

        if user is not None and user.password == password:

            login_user(user)

            flash('Logged in successfully.', 'success')

            next_page = request.args.get('next')
            return redirect(next_page or url_for('views.index'))
        else:
            flash('Username or Password is incorrect.', 'danger')

    return render_template('login.html', form=form)

@login_manager.user_loader
def load_user(id):
    return db.session.execute(db.select(Users).filter_by(id=id)).scalar()


