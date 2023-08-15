from flask import Blueprint, request, jsonify, g
#from app.api.auth import users
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os
#from app import app

jwt_auth = Blueprint("jwt_auth", __name__, url_prefix="/v1/jwt_auth")

encode_key = os.environ.get("SECRET_KEY") # This is the secret key that will be used to encode the JWT token. You can use any string you want here.

# To test this you can use postman and try login with a user you created, in the JSON response you will recieve a JWT token.
# You will then need to copy the token and paste it in the Authorization tab in postman. 
# In the Authorization tab select Bearer Token and paste the token in the token field.
# Then make a request to the protected route and you should be able to access it.

## Requires Auth Decorator (@requires_auth)
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None) # or request.cookies.get('token', None)

    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

    token = parts[1]
    try:
        payload = jwt.decode(token, encode_key, algorithms=["HS256"])

    except jwt.ExpiredSignatureError:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated

#route to generate tokens using the user's info as the payload
@jwt_auth.route("/gen", methods=["POST"])
def generate_token(id,email,role,password):
    timestamp = datetime.utcnow()
    payload = {
        "user_id": id,
        "email": email,
        "role": role,
        "password": password,
        "iat": timestamp,
        "exp": timestamp + timedelta(minutes=10)
    }
    token = jwt.encode(payload, encode_key, algorithm='HS256')
    return jsonify(token=token)

#route to test the protected decorator
@jwt_auth.route("/protected")
@requires_auth
def test_protected():
    return jsonify(message="You are authorized to view this page.")