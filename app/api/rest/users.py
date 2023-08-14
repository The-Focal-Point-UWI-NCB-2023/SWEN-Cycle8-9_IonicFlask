from app.api import Namespace, Resource, fields, reqparse
from app.models import Users, db

users_ns = Namespace("users", description="User operations")

user_model = users_ns.model(
    "User",
    {
        "id": fields.Integer,
        "full_name": fields.String,
        "email": fields.String,
        "role": fields.Integer,
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
user_parser.add_argument("role", type=str, required=True, help="Role is required")


@users_ns.route("/")
class UsersResource(Resource):
    @users_ns.marshal_list_with(user_model)
    def get(self):
        users = Users.query.all()
        return users

    @users_ns.expect(user_parser)
    @users_ns.marshal_with(user_model)
    def post(self):
        args = user_parser.parse_args()
        new_user = Users(**args)
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201


@users_ns.route("/<int:user_id>")
@users_ns.response(404, "User not found")
@users_ns.param("user_id", "User ID")
class UserResource(Resource):
    @users_ns.marshal_with(user_model)
    def get(self, user_id):
        user = Users.query.get(user_id)
        if user:
            return user
        return {"message": "User not found"}, 404

    @users_ns.expect(user_parser)
    @users_ns.marshal_with(user_model)
    def put(self, user_id):
        user = Users.query.get(user_id)
        if user:
            args = user_parser.parse_args()
            for key, value in args.items():
                setattr(user, key, value)
            db.session.commit()
            return user
        return {"message": "User not found"}, 404

    @users_ns.response(204, "User deleted")
    def delete(self, user_id):
        user = Users.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "", 204
        return {"message": "User not found"}, 404
