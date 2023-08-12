from flask import Blueprint, jsonify

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/')
def auth_index():
    return { 'message': 'Auth Endpoint' }