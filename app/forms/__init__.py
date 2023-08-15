from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField
from wtforms.validators import InputRequired


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])


class RegisterForm(FlaskForm):
    full_name = StringField("Full Name", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    # role = StringField('Role', validators=[InputRequired()])
