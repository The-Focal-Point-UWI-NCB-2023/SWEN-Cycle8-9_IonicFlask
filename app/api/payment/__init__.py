from flask import Blueprint, jsonify

payment = Blueprint("payment", __name__, url_prefix="/payment")


@payment.route("/")
def payment_index():
    return {"message": "Payment Endpoint"}
#! /usr/bin/env python3.6

"""
server.py
Stripe Sample.
Python 3.6 or newer required.
"""
import os
from flask import Flask, redirect, request

import stripe
# This is your test secret API key.
stripe.api_key = 'sk_test_51NhaJGGp0CCzULjrFTAuzvji0OXwn0acJmIf22MHEFDD3OBzsy1fZOI2cJykxx1zI2qNI0DPP2DP0G6oXsaLbINf00Hu4foHN8'

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

YOUR_DOMAIN = 'http://localhost:8080'

@payment.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': '{{PRICE_ID}}',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)

if __name__ == '__main__':
    app.run(port=4242)