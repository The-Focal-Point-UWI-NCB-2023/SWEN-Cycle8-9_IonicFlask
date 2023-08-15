from flask import Blueprint, jsonify, request
from app.models import *
from app.api.rest.users import users
from app.api.rest.products import products
from app.api.rest.orders import orders
from app.api.rest.line_items import line_items

rest = Blueprint("rest", __name__, url_prefix="/rest")

rest.register_blueprint(users)
rest.register_blueprint(products)
rest.register_blueprint(orders)
rest.register_blueprint(line_items)


@rest.route("/")
def rest_index():
    return {"message": "Restful Endpoint"}
