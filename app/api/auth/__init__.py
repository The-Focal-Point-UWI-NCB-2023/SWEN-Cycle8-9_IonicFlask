from flask import request, flash, redirect, url_for
from app.api import api, Namespace, Resource, fields, reqparse,abort
from flask_login import login_required, login_user, logout_user, current_user
from werkzeug.security import check_password_hash
from app.models import Users, db
from app.config.login_manager import login_manager
from app.api.auth.jwt_auth import *
from datetime import datetime
from functools import wraps
from app.api.auth.jwt_auth import GenerateToken  # Import the GenerateToken class
from flask_wtf.csrf import generate_csrf
from flask_cors import cross_origin

# Define the auth namespace
auth_ns = Namespace('auth', path='/v1/auth', description='Authentication operations')

# User model for registering
user_model = auth_ns.model('User', {
    'full_name': fields.String(required=True, description='Full name of the user'),
    'email': fields.String(required=True, description='Email address of the user'),
    'password': fields.String(required=True, description='Password of the user'),
})

# User login request parser
login_parser = reqparse.RequestParser()
login_parser.add_argument('email', required=True, help='Email address')
login_parser.add_argument('password', required=True, help='Password')

# Register request parser
register_parser = reqparse.RequestParser()
register_parser.add_argument('full_name', required=True, help='Full name')
register_parser.add_argument('email', required=True, help='Email address')
register_parser.add_argument('password', required=True, help='Password')

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('Authorization', location='headers', required=True, help='Authorization Token')
auth_parser.add_argument('X-CSRFToken', location='headers', required=False, help='CSRF Token')


# ... Your other imports and setup ...
encode_key = os.environ.get("SECRET_KEY")

@auth_ns.route('/')
class AuthIndex(Resource):
    def get(self):
        return {'message': 'Auth Endpoint'}

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_parser)
    def post(self):
        args = login_parser.parse_args()
        email = args['email']
        password = args['password']
        user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()

        if user is not None and check_password_hash(user.password, password):
            login_user(user)
            generate_token_resource = generate_token(user.id,user.full_name,user.email,user.role)
            token_response = generate_token_resource
            tk = token_response.get('token')
            #headers = {'X-CSRF-Token': generate_csrf()}
            response = {
                'token': tk,
                'message': 'User found'
            }
            return response, 200
        else:
            response = {
                'message': 'Username or Password is incorrect.'
            }
            return response, 401

@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.expect(register_parser)
    @auth_ns.marshal_with(user_model)
    def post(self):
        user_data = register_parser.parse_args()
        full_name = user_data['full_name']
        email = user_data['email']
        password = user_data['password']
        role = 0  # Setting the role to user for now
        existing_user = Users.query.filter_by(email=email).first()
        if existing_user:

            abort(409, message="User already exists")
        try:
            user = Users(full_name=full_name, email=email, password=password, role=role)
            db.session.add(user)
            db.session.commit()
            user1 = {
                'id': user.id,
                'full_name': full_name,
                'email': email,
                'role': role
            }
            return user1, 201
        except Exception as e:
            abort(409, message="Invalid field input")

@login_required
@auth_ns.route('/logout')
class Logout(Resource):
    def post(self):
        logout_user()
        flash('You have been logged out.', 'success')
        return redirect(url_for('views.login'))

@login_manager.user_loader
def load_user(id):
    return db.session.execute(db.select(Users).filter_by(id=id)).scalar()

def admin_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        jwt_token = request.headers.get('Authorization')  # Get the JWT token from headers
        
        if jwt_token:
            try:
                decoded_payload = jwt.decode(jwt_token.split()[1], os.environ.get("SECRET_KEY"), algorithms=['HS256'])
                print (decoded_payload)
                user_role = (int(decoded_payload.get('role')))
                
                if user_role == '1':  # Assuming role 1 is for admins
                    return func(*args, **kwargs)
                else:
                    abort(403, message='Access denied. Admin role required.')
            except jwt.ExpiredSignatureError:
                abort(401, message='Token has expired.')
            except (jwt.DecodeError, jwt.InvalidTokenError):
                abort(401, message='Invalid token.')
        else:
            abort(401, message='Token missing.')

    return wrapper
# @admin_required
@api.doc(security='apiKey')
@auth_ns.route('/admin')
@auth_ns.expect(auth_parser)
class AdminProtected(Resource):
    @admin_required
    def get(self):
        return{'message':'Works'}
        # if current_user.role == 1:
        #     return {'message':  'You are authorized to view this page.'}, 200
        # else:
        #     abort(401, message='You are not authorized to view this page')

@api.doc(security='apiKey')
@auth_ns.route('/test')
@auth_ns.expect(auth_parser)
class TestProtected(Resource):
    @requires_auth
    def get(self):
        return {'message': 'You are authorized to view this page.'}, 200

@auth_ns.route("/csrf-token")
class CSRFTokenResource(Resource):
    def get(self):
        csrf_token = generate_csrf()
        return {"csrf_token": csrf_token}
    

@auth_ns.route('/isLoggedin')
@auth_ns.expect(auth_parser)
class IsLoggedIn(Resource):
    def get(self):
        header = request.headers.get('Authorization')

        if header is None:
            response = {
                'message': 'false',
            }
            return response, 401

        parts = header.split()

        if len(parts) != 2 or parts[0].lower() != 'bearer':
            response = {
                'message': 'Invalid token format',
            }
            return response, 401

        token = parts[1]
        try:
            decoded_token = jwt.decode(token, encode_key, algorithms=['HS256'])
            response = {
                'message': 'true',
            }
            return response, 200
        except jwt.ExpiredSignatureError:
            response = {
                'message': 'Token is expired',
            }
            return response, 401
        except jwt.DecodeError:
            response = {
                'message': 'false',
            }
            return response, 401
        
@auth_ns.route('/isAdmin')
@auth_ns.expect(auth_parser)
class IsLoggedIn(Resource):
    @requires_auth
    def get(self):
        token = request.headers.get('Authorization')  
        parts = token.split()
        token = parts[1]
        try:
            decoded_token = jwt.decode(token, encode_key, algorithms=['HS256'])
            #print(decoded_token)
            if decoded_token['role'] == 1:
                response = {
                    'message': 'true',
                    
                }
                return response, 200
            else:
                response = {
                    'message': 'false',
                    
                }
                return response, 200
        except jwt.ExpiredSignatureError:
                response = {
                    'message': 'Token is expired',
                    'token': token
                }
                return response , 401        
    
        
@auth_ns.route('/CurrentUser')
@auth_ns.expect(auth_parser)
class CurrUser(Resource):
    @requires_auth
    def get(self):
        token = request.headers.get('Authorization')  
        parts = token.split()
        token = parts[1]
        try:
            decoded_token = jwt.decode(token, encode_key, algorithms=['HS256'])
            user = {
                'id': decoded_token['user_id'],
                'name': decoded_token['name'],
                'email': decoded_token['email'],
                'role': decoded_token['role'],
            }
            response = {
                'user': user,
            }
            return response, 200
        except jwt.ExpiredSignatureError:
                response = {
                    'message': 'Token is expired',
                    'token': token
                }
                return response , 401            

# Add namespaces to the API
api.add_namespace(auth_ns)
