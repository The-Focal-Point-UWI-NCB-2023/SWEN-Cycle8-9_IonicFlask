from flask import Blueprint, jsonify

rest = Blueprint('rest', __name__, url_prefix='/rest')

@rest.route('/')
def rest_index():
    return { 'message': 'Restful Endpoint' }