from app.api.rest import Blueprint,jsonify,request,Users,db

users = Blueprint("users", __name__, url_prefix="/v1/users")

@users.route('/', methods=['GET'])
def get_users():
    try:
        users = Users.query.all()
        user_list = [{"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role} for user in users]
        return jsonify(users=user_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@users.route('/<int:user_id>', methods=['GET'])
def get_role(user_id):
    user = Users.query(user_id)
    return jsonify({'user_id': user.id, 'role': user.role})
    
    
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
    
@users.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user = Users.query.get(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.form
        if 'full_name' in data:
            user.full_name = data['full_name']
        if 'email' in data:
            user.email = data['email']
        if 'password' in data:
            # hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
            user.password = data['password']
        if 'role' in data:
            user.role = data['role']

        db.session.commit()

        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users.route('/<int:user_id>', methods=['DELETE'])
def delete_users(user_id):
    try:
        user = Users.query.get(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'User deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500