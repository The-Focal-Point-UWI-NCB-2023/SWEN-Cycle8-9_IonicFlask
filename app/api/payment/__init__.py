from app.api import Namespace, Resource, fields, reqparse,abort,os,Resource
from flask import Flask, request, redirect
import stripe
payment_ns = Namespace("payment",path="/v1/rest/payment", description="Payment processing API")

# Set your Stripe API key here
stripe.api_key = 'sk_test_51NhaJGGp0CCzULjrFTAuzvji0OXwn0acJmIf22MHEFDD3OBzsy1fZOI2cJykxx1zI2qNI0DPP2DP0G6oXsaLbINf00Hu4foHN8'

#YOUR_DOMAIN = "https://yourdomain.com"  # Replace with your actual domain


payment_model = payment_ns.model('CreateCheckoutSession', {
        'success_url': fields.String(required=True, description="Success URL for redirect after payment"),
        'cancel_url': fields.String(required=True, description="Cancel URL for redirect if payment is canceled"),
        'name':fields.String(required=True, description="Name of the product"),
        'description': fields.String(required=True, description="Description of the product"),
        'images': fields.List(fields.String(description="URLs of product images")),
        'unit_amount_decimal': fields.String(required=True, description="Unit amount in decimal format"),
        'quantity': fields.Integer(required=True, description="Quantity of the item"),
        'X-CSRFToken': fields.String(required=True, location='headers', help='CSRF Token',description="CSRF token for validation")
    })

payment_parser = reqparse.RequestParser()


payment_parser.add_argument('success_url', type=str, required=True, help='Success url is required')
payment_parser.add_argument('cancel_url', type=str, required=True, help='Cancel url is required')
payment_parser.add_argument('name', type=str, required=True, help='Name of the product is required')
payment_parser.add_argument('description', type=str, required=True, help='Description of the product is required')
payment_parser.add_argument('images', type=str, required=True, action='append', help='At least one image URL is required')
payment_parser.add_argument('unit_amount_decimal', type=str, required=True, help='Unit amount in decimal format is required')
payment_parser.add_argument('quantity', type=int, required=True, help='Quantity of the item is required')
payment_parser.add_argument('X-CSRFToken', type=str, location='headers', required=True, help='CSRF Token is required')



@payment_ns.route('/create-checkout-session', methods=['POST'])
class CreateCheckoutSession(Resource):
    #@payment_ns.marshal_list_with(payment_model)
    @payment_ns.expect(payment_parser)
    @payment_ns.response(303, "Redirect to Checkout")
    def post(self):   
        try:
            args = payment_parser.parse_args()
            #csrf_token = args.pop('X-CSRFToken', None)
            
            checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price_data":{
                        "currency": "usd",
                        "product_data":{
                            "name":args["name"],
                            "description":args["description"],
                            "images":args["images"]
                        },
                        "unit_amount_decimal":args["unit_amount_decimal"]
                    },
                    "quantity":args["quantity"],
                },
            ],
                mode='payment',
                success_url='https://www.google.com/',
                cancel_url='https://www.google.com/',
            )
        except Exception as e:
            return str(e), 500

        return redirect(checkout_session.url, code=303)
