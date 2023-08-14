from flask import Blueprint, jsonify
from flask_restx import Api, Resource, Namespace, fields, reqparse
from .auth import auth
from .payment import payment
from ..models import db

# Initialize API
api_blueprint = Blueprint("api", __name__, url_prefix="/v1/api")

api = Api(
    api_blueprint,
    version="1.0",
    title="Mini REST API",
    description="A mini REST API",
)

from .rest import *
