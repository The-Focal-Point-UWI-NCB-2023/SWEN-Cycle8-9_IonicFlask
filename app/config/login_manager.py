from flask_login import LoginManager

##import app

login_manager = LoginManager()
# login_manager.init_app(app)
login_manager.login_view = "api.auth.login"
