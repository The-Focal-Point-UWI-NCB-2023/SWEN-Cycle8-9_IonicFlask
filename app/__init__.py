from flask import Flask, jsonify
from flask_migrate import Migrate
from .config import Config
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
db.init_app(app)
migrate = Migrate(app, db)


"""
# Run Database Seeder
- Set SEEDER=ON .env variable
- Set ENVIRONMENT=development .env variable
- Rerun app to seed database with fake data. Remember to set SEEDER=OFF to stop the seeder from running
"""
seed_database(app)
