from flask import Blueprint, jsonify

payment = Blueprint("payment", __name__, url_prefix="/payment")


@payment.route("/")
def payment_index():
    return {"message": "Payment Endpoint"}
