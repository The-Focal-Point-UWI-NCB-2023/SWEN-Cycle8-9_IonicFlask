import os
from flask import request
from flask_login import current_user
import jwt
from app.api import Namespace, Resource, fields, reqparse,abort
from app.models import Orders, db, Line_Items
from app.api.auth import admin_required  # Import the GenerateToken class


orders_ns = Namespace('orders',path="/v1/rest/orders", 
    description="API operations related to managing order information, including creating, retrieving, updating, and deleting orders. This namespace provides endpoints to interact with order data, enabling administrators to manage order details, user associations, billing addresses, total amounts, and status updates. Orders can be searched by ID, and their user ID, billing address, total amount, and status information are accessible for administration purposes.")
order_model = orders_ns.model(
    "Order",
    {
        "id": fields.Integer(description='The unique identifier for an order'),
        "user_id": fields.Integer(description='The ID of the user who placed the order'),
        "billing_address": fields.String(description='The billing address for the order'),
        "total_amount": fields.String(description='The total amount of the order'),
        "status": fields.String(description='The status of the order'),
        "line_items": fields.String(description='The items of the order')
    },
)

orders_parser = reqparse.RequestParser()
orders_parser.add_argument('user_id', type=int, required=True, help='User ID is required')
orders_parser.add_argument('billing_address', required=True, help='Billing address is required')
orders_parser.add_argument('total_amount', type=float, required=True, help='Total amount is required')
orders_parser.add_argument('status', required=True, help='Status is required')
orders_parser.add_argument('X-CSRFToken', location='headers', required=False, help='CSRF Token')

@orders_ns.response(404, "Order not found")
@orders_ns.response(409, "Invalid field syntax")
@orders_ns.route('/')
class OrderListResource(Resource):

    @admin_required
    @orders_ns.marshal_list_with(order_model)
    def get(self):
        orders = Orders.query.all()
        if orders == []:
            abort(404,message='No orders found')
        return orders
    @orders_ns.marshal_list_with(order_model)
    @orders_ns.expect(orders_parser)
    def post(self):
        try:
            args = orders_parser.parse_args()
            csrf_token = args.pop('X-CSRFToken', None)
            new_order = Orders(**args)
            db.session.add(new_order)
            db.session.commit()
            return new_order, 201
        except Exception as e:
            abort(409, message="Invalid field input")

@orders_ns.response(404, "Order not found")
@orders_ns.response(409, "Invalid field syntax")
@orders_ns.param("order_id", "A unique identifier associated with an order")
@orders_ns.route('/<int:order_id>')
class OrderResource(Resource):
    @admin_required
    @orders_ns.marshal_list_with(order_model)
    def get(self, order_id):
        order = Orders.query.get(order_id)
        if order and current_user.role == 1:
            order_items = Line_Items.query.filter_by(order_id=order_id).all()
            line_items = [{'product_id': item.id,'product_name': item.product.name,'qty': item.qty} for item in order_items]
            specific_order = {
            'id': order.id,
            'user_id': order.user_id,
            'billing_address': order.billing_address,
            'total_amount': order.total_amount,
            'status': order.status,
            'line_items': line_items
            }
            return specific_order
        elif not order:
            abort(404, message="Order not found")


    @admin_required
    @orders_ns.expect(orders_parser)
    def put(self, order_id):
        order = Orders.query.get(order_id)
        if order:
            try:
                args = orders_parser.parse_args()
                for key, value in args.items():
                    setattr(order, key, value)
                db.session.commit()
            except Exception as e:
                abort(409, message="Invalid field input")
        elif order is None:
            abort(404, message="Order not found")

    @admin_required
    def delete(self, order_id):
        order = Orders.query.get(order_id)
        if order:
            db.session.delete(order)
            db.session.commit()
            return "", 204
        elif order is None:
            abort(404,message='Order with this ID does not exist')

            