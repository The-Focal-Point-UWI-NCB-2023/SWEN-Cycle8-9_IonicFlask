from flask import Blueprint, jsonify
from flask_restx import Api, Resource, Namespace, fields, reqparse, abort
from .payment import payment
from ..models import db

# Initialize API
api_blueprint = Blueprint("api", __name__, url_prefix="/api")

api = Api(
    api_blueprint,
    version="1.0",
    title="FOCAL FRAMES API",
    description="The Offical Api of the Focal Frames E-commerce Store",
)

from .rest import * 
from .auth import *
