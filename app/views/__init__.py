from flask import Blueprint, jsonify, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user
from app import db 
import requests
from app.models import Users
from app.forms import LoginForm, RegisterForm
from flask_login import login_user, logout_user

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")

# Create initial route
@views.route("")
#@login_required
def index():
    return render_template("index.html")

## These are mock routes for now to test the authentication endpoints. You might need to change your port number in the reqest  to test this.
@views.route("/login", methods=["GET", "POST"]) 
def login():
    form = LoginForm()
    if current_user.is_authenticated:
        return redirect(url_for('views.index'))
    
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        response = requests.post("http://127.0.0.1:8080/api/auth/login", data={"email": email, "password": password})

        if response.status_code == 200:
            user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()
            login_user(user)

            return redirect(url_for('views.index'))
        elif response.status_code == 401:
            flash('Username or Password is incorrect.')

    return render_template('login.html', form=form)

## These are mock routes for now to test the authentication endpoints. You might need to change your port number in the reqest  to test this.
@views.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if current_user.is_authenticated:
        return redirect(url_for('views.index'))
    
    if form.validate_on_submit():
        full_name = form.full_name.data
        email = form.email.data
        password = form.password.data
        response = requests.post("http://127.0.0.1:8080/api/auth/register", data={"full_name": full_name, "email": email, "password": password}) # Port # might be different for you

        if response.status_code == 201:
            flash('Account created successfully.')
            return redirect(url_for('views.login'))
        elif response.status_code == 409:
            flash('Email already exists.')

    return render_template('register.html', form=form)


@views.route("/logout", methods=["GET", "POST"])
@login_required 
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('views.login'))


#Register View Endpoints
#views.register_blueprint()
