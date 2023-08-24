import json
from app.api import Namespace, Resource, fields, reqparse,abort,os,Resource
from flask import Flask, request, redirect
from decimal import Decimal
import stripe
payment_ns = Namespace("payment",path="/v1/rest/payment", description="Payment processing API")

# Set your Stripe API key here
stripe.api_key = 'sk_test_51NhaJGGp0CCzULjrFTAuzvji0OXwn0acJmIf22MHEFDD3OBzsy1fZOI2cJykxx1zI2qNI0DPP2DP0G6oXsaLbINf00Hu4foHN8'

#YOUR_DOMAIN = "https://yourdomain.com"  # Replace with your actual domain

payment_model = payment_ns.model('CreateCheckoutSession', {
    'success_url': fields.String(required=True, description="Success URL for redirect after payment"),
    'cancel_url': fields.String(required=True, description="Cancel URL for redirect if payment is canceled"),
    'name': fields.List(fields.String(required=True, description="Name of the product")),
    'description': fields.List(fields.String(required=True, description="Description of the product")),
    'images': fields.List(fields.String(description="URLs of product images")),
    'unit_amount_decimal': fields.List(fields.String(required=True, description="Unit amount in decimal format")),
    'quantity': fields.List(fields.Integer(required=True, description="Quantity of the item")),
    'X-CSRFToken': fields.String(required=True, location='headers', help='CSRF Token', description="CSRF token for validation"),
})

payment_parser = reqparse.RequestParser()

payment_parser.add_argument('success_url', type=str, required=False, help='Success url is required')
payment_parser.add_argument('cancel_url', type=str, required=True,  help='Cancel url is required')
payment_parser.add_argument('name', type=str, required=True, action='append', help='Name of the product is required')
payment_parser.add_argument('description', type=str, required=True, action='append',  help='Description of the product is required')
payment_parser.add_argument('images', type=str, required=True, action='append', help='At least one image URL is required')
payment_parser.add_argument('unit_amount_decimal', type=str, required=True, action='append', help='Unit amount in decimal format is required')
payment_parser.add_argument('quantity', type=int, required=True, action='append', help='Quantity of the item is required')
payment_parser.add_argument('X-CSRFToken', type=str, location='headers', required=True, help='CSRF Token is required')


@payment_ns.route('/create-checkout-session', methods=['POST'])
class CreateCheckoutSession(Resource):
    
    #@payment_ns.marshal_list_with(payment_model)
    @payment_ns.expect(payment_parser)
    @payment_ns.response(303, "Redirect to Checkout")
    def post(self):   
        try:
        # args = payment_parser.parse_args()
            payload_str = request.data.decode('utf-8')
            payload_json = json.loads(payload_str)       
            args=payload_json
            line_itemsLst = []
            for line_item in args["line_items"]:
                line_item_data = {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            ##"id": line_item['product_id'],
                            "name": line_item['product_name'],
                            ##"description": line_item['product_description'],
                            "images": [line_item['product_image']]
                        },
                        "unit_amount_decimal": (Decimal(line_item['product_price'])) * 100
                    },
                    "quantity": line_item['qty']
                }
                line_itemsLst.append(line_item_data)

            # print(line_itemsLst)

            print("These are the line items:", line_itemsLst)
            checkout_session = stripe.checkout.Session.create(
            line_items= line_itemsLst,
                            mode='payment',
                            success_url='https://www.google.com/',
                            cancel_url='https://www.google.com/',
                    )
            return(checkout_session.url)
        except Exception as e:
            return str(e), 500


                    
