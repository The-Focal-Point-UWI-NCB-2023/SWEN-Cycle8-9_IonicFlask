@rest.route('/users', methods=['GET'])
def get_users():
    try:
        users = Users.query.all()
        user_list = [{"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role} for user in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


#View and Edit User Details
@rest.route('/users/<int:user_id>', methods=['PUT'])
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

@rest.route('/users/<int:user_id>', methods=['DELETE'])
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


""""route to get all the products"""
@rest.route('/products', methods=['GET'])
def get_products():
    try:
        products = Products.query.all()
        product_list = [{
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'image': product.image,
            'status': product.status,
            'user_id': product.user_id
        } for product in products]
        
        return jsonify(products=product_list), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
    
@rest.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = Products.query.get(product_id)
        
        if product is None:
            return jsonify({'error': 'Product not found'}), 404
        
        specific_product = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'image': product.image,
            'status': product.status,
            'user_id': product.user_id
        }
        
        return jsonify(specific_product), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@rest.route('/products', methods=['POST'])
def create_product():
    try:
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        image = request.form['image']
        status = request.form['status']
        user_id = request.form['user_id']

        if not all([name, description, price, image, status, user_id]):
            return jsonify({'error': 'Missing required data'}), 400

        new_product = Products(
            name=name,
            description=description,
            price=price,
            image=image,
            status=status,
            user_id=user_id
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify({'message': 'Product successfully added'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@rest.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        product = Products.query.get(product_id)

        if not product:
            return jsonify({'error': 'Product not found'}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({'message': 'Product deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@rest.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        product = Products.query.get(product_id)

        if not product:
            return jsonify({'error': 'Product not found'}), 404

        data = request.form
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = float(data['price'])
        if 'image' in data:
            product.image = data['image']
        if 'status' in data:
            product.status = data['status']

        db.session.commit()

        return jsonify({'message': 'Product updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@rest.route('/users', methods=['POST'])
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
    
@rest.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = Orders.query.all()
        orders_list = []

        for order in orders:
            order_data = {
                'id': order.id,
                'user_id': order.user_id,
                'billing_address': order.billing_address,
                'total_amount': order.total_amount,
                'status': order.status,
                'line_items': []
            }

            line_items = Line_Items.query.filter_by(order_id=order.id).all()
            for item in line_items:
                line_item_data = {
                    'product_id': item.product_id,
                    'quantity': item.qty
                }
                order_data['line_items'].append(line_item_data)

            orders_list.append(order_data)

        return jsonify(orders=orders_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
