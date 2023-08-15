from app.api.rest import Blueprint,jsonify,request,Products,db

products = Blueprint("products", __name__, url_prefix="/v1/products")

@products.route('/', methods=['GET'])
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

@products.route('/', methods=['POST'])
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

@products.route('/<int:product_id>', methods=['GET'])
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
    

@products.route('/<int:product_id>', methods=['DELETE'])
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
    

@products.route('/<int:product_id>', methods=['PUT'])
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