from app.api.rest import Blueprint,jsonify,request,Line_Items,db

line_items = Blueprint("line_items", __name__, url_prefix="/v1/line_items")

@line_items.route('/', methods=['POST'])
def create_line_item():
    try:
        order_id = request.form['order_id']
        product_id = request.form['product_id']
        qty = request.form['qty']
        
        if not all([product_id, order_id, qty]):
            return jsonify({'error': 'Missing required data'}), 400

        new_item = Line_Items(
            order_id=order_id,
            product_id=product_id,
            qty=qty,
        )

        db.session.add(new_item)
        db.session.commit()

        return jsonify({'message': 'Line Item successfully added'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@line_items.route('/<int:line_item_id>', methods=['GET'])
def view_line_item(line_item_id):
    #will have to check for role of user here and add line items aspect
    try:
        line_item = Line_Items.query.get(line_item_id)
        
        if line_item is None:
            return jsonify({'error': 'Line item was not found'}), 404
        
        specific_line_item = {
            'id': line_item.id,
            'order_id': line_item.order_id,
            'product_id': line_item.product_id,
            'qty': line_item.qty,
        }
        
        return jsonify(specific_line_item), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@line_items.route('/<int:line_item_id>', methods=['PUT'])
def update_line_item(line_item_id):
    try:
        line_item = Line_Items.query.get(line_item_id)

        if not line_item:
            return jsonify({'error': 'line_item was not found'}), 404

        data = request.form

        if 'order_id' in data:
            line_item.order_id = data['order_id']
        if 'product_id' in data:
            line_item.product_id = data['product_id']
        if 'qty' in data:
            line_item.qty = data['qty']

        db.session.commit()

        return jsonify({'message': 'Line item updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@line_items.route('/<int:line_item_id>', methods=['DELETE'])
def delete_line_item(line_item_id):
    try:
        line_item = Line_Items.query.get(line_item_id)

        if not line_item:
            return jsonify({'error': 'line_item was not found'}), 404

        db.session.delete(line_item)
        db.session.commit()

        return jsonify({'message': 'Line item deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500