import sys
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from .config.config import Config
from .config.login_manager import login_manager
from .models import db
from .api import api_blueprint
from .views import views
from .seeder import seed_database
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect

"""
App Factory
- Instantiate App based on different parameters
"""


def create_app():
    app = Flask(__name__, static_folder="./static")
    app.config.from_object(Config)
    # Register API & Templates
    app.register_blueprint(api_blueprint)
    app.register_blueprint(views)
    CORS(app, resources={r"/api/*": {"origins": "*", "supports_credentials": True}})    
    return app


# Initialize App and DB
app = create_app()
db.init_app(app)
migrate = Migrate(app, db)

csrf = CSRFProtect()
csrf.init_app(app)

# Initialize Flask-Login Manager
login_manager.init_app(app)
login_manager.login_view = (
    "views.login"  # Specify what page to load for NON-AUTHED users
)

# @app.after_request
# def add_header(response):
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8100'
#     response.headers['Access-Control-Allow-Headers'] = "X-Csrftoken,Content-type,Authorization"
#     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
#     response.headers['Access-Control-Allow-Credentials'] = 'true'
#     return response
    


"""
# Run Database Seeder
- Set SEEDER=ON .env variable
- Set ENVIRONMENT=development .env variable
- Rerun app to seed database with fake data. Remember to set SEEDER=OFF to stop the seeder from running
"""
if "pytest" not in sys.modules:
    seed_database(app)