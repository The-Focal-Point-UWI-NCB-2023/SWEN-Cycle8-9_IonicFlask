from app.api import Namespace, Resource, fields, reqparse,abort
from app.models import Line_Items, db


line_items_ns = Namespace('line_items', path="/v1/rest/line_items",
    description="API operations related to managing line items within orders. This namespace provides endpoints to interact with line item data, allowing administrators to manage individual items within an order. Line items are associated with specific orders and products, and their quantities are tracked for accurate order fulfillment.")
line_items_model = line_items_ns.model(
    "Line Item",
    {
        "id": fields.Integer(description='The unique identifier for the line item'),
        "order_id": fields.Integer(description='The ID of the order associated with the line item'),
        "product_id": fields.Integer(description='The ID of the product associated with the line item'),
        "qty": fields.Integer(description='The quantity of the product in the line item'),
    },
)

line_item_parser = reqparse.RequestParser()
line_item_parser.add_argument('order_id', type=int, required=True, help='Order ID is required')
line_item_parser.add_argument('product_id', type=int, required=True, help='Product ID is required')
line_item_parser.add_argument('qty', type=int, required=True, help='Quantity is required')

@line_items_ns.route('/')
@line_items_ns.response(404, "Line Item not found")
@line_items_ns.response(409, "Invalid field syntax")
class LineItemsResource(Resource):

    @line_items_ns.marshal_list_with(line_items_model)
    def get(self):
        line_items = Line_Items.query.all()
        if line_items == []:
            abort(404,message='No line items found')
        return line_items
    
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
            abort(409, message="Invalid field input")

@line_items_ns.response(404, "Line Item not found")
@line_items_ns.response(409, "Invalid field syntax")
@line_items_ns.route('/<int:line_item_id>')
class LineItemDetailResource(Resource):
    def get(self, line_item_id):
        line_item = Line_Items.query.get(line_item_id)
        if line_item:
            return line_item
        elif not line_item:
            abort(404, message="Line Item not found")


    @line_items_ns.expect(line_item_parser)
    def put(self, line_item_id):
        line_item = Line_Items.query.get(line_item_id)
        if line_item:
            try:
                args = line_item_parser.parse_args()
                for key, value in args.items():
                    setattr(line_item, key, value)
                db.session.commit()
            except Exception as e:
                abort(409, message="Invalid field input")
        elif line_item is None:
            abort(404, message="Line item not found")

    def delete(self, line_item_id):
        line_item = Line_Items.query.get(line_item_id)
        if line_item:
            db.session.delete(line_item)
            db.session.commit()
            return "", 204
        elif line_item is None:
            abort(404,message='Line Item with this ID does not exist')