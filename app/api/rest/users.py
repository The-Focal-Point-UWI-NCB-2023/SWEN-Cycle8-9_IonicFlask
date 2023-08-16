<<<<<<< HEAD
from app.api import Namespace, Resource, fields, reqparse, abort
from app.models import Users, db
=======
from app.api.rest import Blueprint, jsonify, request, Users, db
>>>>>>> f689c0636d59411cb9ffd3aa65283696c40aace2

users_ns = Namespace("users", path="/v1/rest/users",
                      description="API operations related to managing user accounts, including creating, retrieving, updating, and deleting user information. This namespace provides endpoints to interact with user data, allowing administrators to manage user profiles and authentication details. Users can be searched by ID, and their full name, email, and role information are accessible for administration purposes.",)

<<<<<<< HEAD
user_model = users_ns.model(
    "User",
    {
        "id": fields.Integer(description="The unique identifier for a user"),
        "full_name": fields.String(description="Full name of the user"),
        "email": fields.String(description="Email address of the user"),
        "role": fields.Integer(description="Role of the user (1 or 0)"),
    },
)

user_parser = reqparse.RequestParser()
user_parser.add_argument(
    "full_name", type=str, required=True, help="Full name is required"
)
user_parser.add_argument("email", type=str, required=True, help="Email is required")
user_parser.add_argument(
    "password", type=str, required=True, help="Password is required"
)
user_parser.add_argument("role", type=int, required=True, help="Role is required")


@users_ns.response(409, "Invalid field syntax")
@users_ns.response(404, "User not found")
@users_ns.route("/")
class UsersResource(Resource):
    @users_ns.marshal_list_with(user_model)
    def get(self):
        users = Users.query.all()
        if users == []:
            abort(404,message="No users found")
        return users

    @users_ns.expect(user_parser)
    @users_ns.marshal_with(user_model)
    def post(self):
        args = user_parser.parse_args()
        new_user = Users(**args)
        try:
            db.session.add(new_user)
            db.session.commit()
            return new_user, 201
        except Exception as e:
            abort(409, message="Invalid field input")


@users_ns.route("/<int:user_id>")
@users_ns.response(409, "Invalid field syntax")
@users_ns.response(404, "User not found")
@users_ns.param("user_id", "A unique identifier associated with a user")
class UserResource(Resource):
    @users_ns.marshal_with(user_model)
    def get(self, user_id):
=======

@users.route("/", methods=["GET"])
def get_users():
    try:
        users = Users.query.all()
        user_list = [
            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            }
            for user in users
        ]
        return jsonify(users=user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users.route("/<int:user_id>", methods=["GET"])
def get_role(user_id):
    user = Users.query(user_id)
    return jsonify({"user_id": user.id, "role": user.role})


@users.route("/", methods=["POST"])
def create_user():
    try:
        full_name = request.form.get("full_name")
        email = request.form.get("email")
        password = request.form.get("password")
        role = request.form.get("role")

        if not all([full_name, email, password, role]):
            return jsonify({"error": "Missing required data"}), 400

        new_user = Users(full_name=full_name, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    try:
>>>>>>> f689c0636d59411cb9ffd3aa65283696c40aace2
        user = Users.query.get(user_id)
        if user:
            return user
        elif user is None:
            abort(404,message='User with this ID does not exist')

<<<<<<< HEAD
    @users_ns.expect(user_parser)
    @users_ns.marshal_with(user_model)
    def put(self, user_id):
=======
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.form
        if "full_name" in data:
            user.full_name = data["full_name"]
        if "email" in data:
            user.email = data["email"]
        if "password" in data:
            # hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
            user.password = data["password"]
        if "role" in data:
            user.role = data["role"]

        db.session.commit()

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users.route("/<int:user_id>", methods=["DELETE"])
def delete_users(user_id):
    try:
>>>>>>> f689c0636d59411cb9ffd3aa65283696c40aace2
        user = Users.query.get(user_id)
        if user:
            try:
                args = user_parser.parse_args()
                for key, value in args.items():
                    setattr(user, key, value)
                db.session.commit()
                return user
            except Exception as e:
                abort(409, message="Invalid field input")
        elif user is None:
            abort(404,message='User with this ID does not exist')

<<<<<<< HEAD

    @users_ns.response(204, "User deleted")
    @users_ns.marshal_with(user_model)
    def delete(self, user_id):
        user = Users.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "", 204
        elif user is None:
            abort(404,message='User with this ID does not exist')
=======
        if not user:
            return jsonify({"error": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
>>>>>>> f689c0636d59411cb9ffd3aa65283696c40aace2
