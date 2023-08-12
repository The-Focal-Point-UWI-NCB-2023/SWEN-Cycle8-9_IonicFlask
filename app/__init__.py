from flask import Flask, jsonify
from flask_migrate import Migrate
from .config import Config
from .models import db
from .api import api

"""
App Factory
- Instantiate App based on different parameters
"""


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    app.register_blueprint(api)

    return app


# Initialize App and DB
app = create_app()
db.init_app(app)
migrate = Migrate(app, db)
