import sys
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from .config.config import Config
from .config.login_manager import login_manager
from .models import db
from .api import api
from .views import views
from .seeder import seed_database

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
#db.init_app(app)
#migrate = Migrate(app, db)


# Initialize Flask-Login Manager
login_manager.init_app(app)
login_manager.login_view = (
    "views.login"  # Specify what page to load for NON-AUTHED users
)


"""
# Run Database Seeder
- Set SEEDER=ON .env variable
- Set ENVIRONMENT=development .env variable
- Rerun app to seed database with fake data. Remember to set SEEDER=OFF to stop the seeder from running
"""
if "pytest" not in sys.modules:
    seed_database(app)
