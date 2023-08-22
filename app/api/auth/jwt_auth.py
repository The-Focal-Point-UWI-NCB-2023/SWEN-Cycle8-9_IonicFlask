from flask import g, request
from app.api import api, Namespace, Resource, fields, reqparse,abort
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os

# Create a custom namespace for JWT authentication and protected routes
jwt_auth_ns = Namespace('jwt_auth', description='JWT Authentication')

# Define your secret key
encode_key = os.environ.get("SECRET_KEY")

# Define a custom decorator for authentication
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        
        if not auth:
            return {'message': 'Authorization header is expected'}, 401
        
        parts = auth.split()

        if parts[0].lower() != 'bearer':
            return {'message': 'Authorization header must start with Bearer'}, 401
        elif len(parts) == 1:
            return {'message': 'Token not found'}, 401
        elif len(parts) > 2:
            return {'message': 'Authorization header must be Bearer + \s + token'}, 401

        token = parts[1]
        try:
            payload = jwt.decode(token, encode_key, algorithms=["HS256"])

        except jwt.ExpiredSignatureError:
            return {'message': 'Token is expired'}, 401
        except jwt.DecodeError:
            return {'message': 'Token signature is invalid'}, 401

        g.current_user = user = payload
        return f(*args, **kwargs)
    
    return decorated

# Define a parser for generating tokens
token_parser = reqparse.RequestParser()
token_parser.add_argument('id', type=int, required=True, help='User ID is required')
token_parser.add_argument('email', required=True, help='Email is required')
token_parser.add_argument('role', required=True, help='Role is required')
token_parser.add_argument('password', required=True, help='Password is required')

# Define a route for generating tokens within the custom namespace
@jwt_auth_ns.route('/gen')
class GenerateToken(Resource):
    @jwt_auth_ns.expect(token_parser)
    def post(self):
        args = token_parser.parse_args()
        timestamp = datetime.utcnow()
        payload = {
            "user_id": args['id'],
            "email": args['email'],
            "role": args['role'],
            "password": args['password'],
            "iat": timestamp,
            "exp": timestamp + timedelta(minutes=10)
        }
        token = jwt.encode(payload, encode_key, algorithm='HS256')
        return {'token': token}

# Define a route for protected content within the custom namespace
@jwt_auth_ns.route('/protected')
class Protected(Resource):
    @jwt_auth_ns.doc(security='apiKey')  # Indicate that authentication is required
    @requires_auth
    def get(self):
        return {'message': 'You are authorized to view this page.'}

def generate_token(id,email,role,password):
    timestamp = datetime.utcnow()
    payload = {
        "user_id": id,
        "email": email,
        "role": role,
        "password": password,
        "iat": timestamp,
        "exp": timestamp + timedelta(minutes=1000)
    }
    token = jwt.encode(payload, encode_key, algorithm='HS256')
    return {'token': token}

# @jwt_auth_ns.route('/decode')
# def decode_token():


# Add the jwt_auth_ns namespace to your main API
api.add_namespace(jwt_auth_ns)

