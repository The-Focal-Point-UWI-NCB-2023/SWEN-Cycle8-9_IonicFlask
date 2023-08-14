from app.api.rest import Blueprint,jsonify,request,Orders,db

orders = Blueprint("orders", __user_id__, url_prefix="/orders")

"""route to create/make an order"""
@orders.route('/', methods=['POST'])
def create_order():
    try:
        #user_id = get_current_user_id()
        user_id = request.form['user_id']
        billing_address = request.form['billing_address']
        total_amount = request.form['total_amount']
        status = request.form['status']
        
        if not all([user_id, billing_address, total_amount, status]):
            return jsonify({'error': 'Missing required data'}), 400

        new_order = Orders(
            user_id=user_id,
            billing_address=billing_address,
            total_amount=total_amount,
            status=status,
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify({'message': 'Order successfully made'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@orders.route('/<int:order_id>', methods=['GET'])
def view_order(order_id):
    #will have to check for role of user here and add line items aspect
    try:
        order = Orders.query.get(order_id)
        
        if order is None:
            return jsonify({'error': 'Order was not found'}), 404
        
        specific_order = {
            'id': order.id,
            'user_id': order.user_id,
            'billing_address': order.billing_address,
            'total_amount': order.total_amount,
            'status': order.status,
        }
        
        return jsonify(specific_order), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@orders.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        order = Orders.query.get(order_id)

        if not order:
            return jsonify({'error': 'Order was not found'}), 404

        data = request.form

        if 'billing_address' in data:
            order.billing_address = data['billing_address']
        if 'total_amount' in data:
            order.total_amount = data['total_amount']
        if 'status' in data:
            order.status = data['status']

        db.session.commit()

        return jsonify({'message': 'Order updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@orders.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        order = Orders.query.get(order_id)

        if not order:
            return jsonify({'error': 'Order was not found'}), 404

        db.session.delete(order)
        db.session.commit()

        return jsonify({'message': 'Order deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500