from app.api import Namespace, Resource, fields, reqparse
from app.models import Orders, db

orders_ns = Namespace('orders',path="/v1/rest/orders", description='Operations related to orders')

order_model = orders_ns.model(
    "Order",
    {
        "id": fields.Integer,
        "user_id": fields.Integer,
        "billing_address": fields.String,
        "total_amount": fields.String,
        "status": fields.String,
    },
)

orders_parser = reqparse.RequestParser()
orders_parser.add_argument('user_id', type=int, required=True, help='User ID is required')
orders_parser.add_argument('billing_address', required=True, help='Billing address is required')
orders_parser.add_argument('total_amount', type=float, required=True, help='Total amount is required')
orders_parser.add_argument('status', required=True, help='Status is required')

@orders_ns.route('/')
class OrderListResource(Resource):
    @orders_ns.marshal_list_with(order_model)
    @orders_ns.expect(orders_parser)

    def post(self):
        try:
            args = orders_parser.parse_args()
            new_order = Orders(**args)
            db.session.add(new_order)
            db.session.commit()

            return new_order, 201

        except Exception as e:
            return {'error': str(e)}, 500

@orders_ns.route('/<int:order_id>')
class OrderResource(Resource):
    def get(self, order_id):
        try:
            order = Orders.query.get(order_id)

            if order is None:
                return {'error': 'Order was not found'}, 404

            specific_order = {
                'id': order.id,
                'user_id': order.user_id,
                'billing_address': order.billing_address,
                'total_amount': str(order.total_amount),
                'status': order.status,
            }

            return specific_order, 200

        except Exception as e:
            return {'error': str(e)}, 500

    @orders_ns.expect(orders_parser)
    def put(self, order_id):
        try:
            order = Orders.query.get(order_id)

            if not order:
                return {'error': 'Order was not found'}, 404

            args = orders_parser.parse_args()
            if 'billing_address' in args:
                order.billing_address = args['billing_address']
            if 'total_amount' in args:
                order.total_amount = args['total_amount']
            if 'status' in args:
                order.status = args['status']

            db.session.commit()

            return {'message': 'Order updated successfully'}, 200

        except Exception as e:
            return {'error': str(e)}, 500

    def delete(self, order_id):
        try:
            order = Orders.query.get(order_id)

            if not order:
                return {'error': 'Order was not found'}, 404

            db.session.delete(order)
            db.session.commit()

            return {'message': 'Order deleted successfully'}, 200

        except Exception as e:
            return {'error': str(e)}, 500
        