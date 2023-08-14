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
