from flask import Blueprint, jsonify
from .auth import auth
from .payment import payment
from .rest import rest
from ..models import db

# Initialize API
api = Blueprint('api', __name__, url_prefix='/api')

# Create initial route
@api.route('/')
def api_index():
    return { 'message': db.engine.driver}

# Register API Endpoints
api.register_blueprint(auth)
api.register_blueprint(payment)
api.register_blueprint(rest)
