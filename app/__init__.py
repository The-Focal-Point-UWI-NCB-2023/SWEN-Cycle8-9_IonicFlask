from flask import Flask, jsonify
from flask_migrate import Migrate
from .config import Config
from .models import db
from .api import api
from .views import views
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect

"""
App Factory
- Instantiate App based on different parameters
"""


def create_app():
    app = Flask(__name__, static_folder="./static")
    app.config.from_object(Config)
    # Register API & Templates
    app.register_blueprint(api)
    app.register_blueprint(views)
        

    return app


# Initialize App and DB
app = create_app()
db.init_app(app)
migrate = Migrate(app, db)

# Initialize Flask-Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Specify what page to load for NON-AUTHED users


