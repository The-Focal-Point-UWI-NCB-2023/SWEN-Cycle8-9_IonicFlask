from app.api import Namespace, Resource, fields, reqparse,abort,os,Resource

payment_ns = Namespace("payment", path="/v1/rest/payment", description="Payment processing API")

line_items_model = payment_ns.model(
"LineItems",
{
    "price_data": fields.Nested(
        payment_ns.model(
            "PriceData",
            {
                "currency": fields.String(description="Currency of the price"),
                "product_data": fields.Nested(
                    payment_ns.model(
                        "ProductData",
                        {
                            "name": fields.String(description="Name of the product"),
                            "description": fields.String(description="Description of the product"),
                            "images": fields.List(fields.String(description="URLs of product images")),
                        },
                    ),
                ),
                "unit_amount_decimal": fields.String(description="Unit amount in decimal format"),
            },
        )
    ),
    "quantity": fields.Integer(description="Quantity of the item"),
},
)

line_items_parser = reqparse.RequestParser()
line_items_parser.add_argument(
    "price_data.currency",
    type=str,
    required=True,
    help="Currency of the price",
    location="json",
)
line_items_parser.add_argument(
    "price_data.product_data.name",
    type=str,
    required=True,
    help="Name of the product",
    location="json",
)
line_items_parser.add_argument(
    "price_data.product_data.description",
    type=str,
    required=True,
    help="Description of the product",
    location="json",
)
line_items_parser.add_argument(
    "price_data.product_data.images",
    type=list,
    required=True,
    help="URLs of product images",
    location="json",
)
line_items_parser.add_argument(
    "price_data.unit_amount_decimal",
    type=str,
    required=True,
    help="Unit amount in decimal format",
    location="json",
)
line_items_parser.add_argument(
    "quantity",
    type=int,
    required=True,
    help="Quantity of the item",
    location="json",
)

@payment_ns.response(404, "Payment Gateway not found")
@payment_ns.route("/")
class PaymentResource(Resource):
    @payment_ns.marshal_list_with(line_items_model)
    @payment_ns.expect(line_items_model, validate=True)
    @payment_ns.response(404, "Payment Gateway not found")
    def post(self):
        """
        Process a payment with the provided line items.
        """
        args = payment_ns.payload
        
        # Process the payment logic here using args
        return {"message": "Payment processed successfully"}, 200

# Add the namespace to the API
