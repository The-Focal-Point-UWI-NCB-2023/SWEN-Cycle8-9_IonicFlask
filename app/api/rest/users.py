from app.api.rest import Blueprint,jsonify,request,Users,db

users = Blueprint("users", __name__, url_prefix="/users")

@users.route('/', methods=['GET'])
def get_users():
    try:
        users = Users.query.all()
        user_list = [{"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role} for user in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@users.route('/', methods=['POST'])
def create_user():
    try:
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')

        if not all([full_name, email, password, role]):
            return jsonify({'error': 'Missing required data'}), 400

        new_user = Users(full_name=full_name, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500