from app.api import Namespace, Resource, fields, reqparse
from app.models import Line_Items, db


line_items_ns = Namespace('line_items', description='Operations related to line items')

line_items_model = line_items_ns.model(
    "Line Item",
    {
        "id": fields.Integer,
        "order_id": fields.Integer,
        "product_id": fields.Integer,
        "qty": fields.Integer,
    },
)

line_item_parser = reqparse.RequestParser()
line_item_parser.add_argument('order_id', type=int, required=True, help='Order ID is required')
line_item_parser.add_argument('product_id', type=int, required=True, help='Product ID is required')
line_item_parser.add_argument('qty', type=int, required=True, help='Quantity is required')

@line_items_ns.route('/')
class LineItemsResource(Resource):
    @line_items_ns.marshal_list_with(line_items_model)
    @line_items_ns.expect(line_item_parser)

    def post(self):
        try:
            args = line_item_parser.parse_args()
            new_line_item = Line_Items(**args)
            db.session.add(new_line_item)
            db.session.commit()

            return new_line_item, 201

        except Exception as e:
            return {'error': str(e)}, 500

@line_items_ns.route('/<int:line_item_id>')
class LineItemDetailResource(Resource):
    def get(self, line_item_id):
        try:
            line_item = Line_Items.query.get(line_item_id)

            if line_item is None:
                return {'error': 'Line item was not found'}, 404

            specific_line_item = {
                'id': line_item.id,
                'order_id': line_item.order_id,
                'product_id': line_item.product_id,
                'qty': line_item.qty,
            }

            return specific_line_item, 200

        except Exception as e:
            return {'error': str(e)}, 500

    @line_items_ns.expect(line_item_parser)
    def put(self, line_item_id):
        try:
            line_item = Line_Items.query.get(line_item_id)

            if not line_item:
                return {'error': 'Line item was not found'}, 404

            args = line_item_parser.parse_args()
            if 'order_id' in args:
                line_item.order_id = args['order_id']
            if 'product_id' in args:
                line_item.product_id = args['product_id']
            if 'qty' in args:
                line_item.qty = args['qty']

            db.session.commit()

            return {'message': 'Line item updated successfully'}, 200

        except Exception as e:
            return {'error': str(e)}, 500

    def delete(self, line_item_id):
        try:
            line_item = Line_Items.query.get(line_item_id)

            if not line_item:
                return {'error': 'Line item was not found'}, 404

            db.session.delete(line_item)
            db.session.commit()

            return {'message': 'Line item deleted successfully'}, 200

        except Exception as e:
            return {'error': str(e)}, 500


