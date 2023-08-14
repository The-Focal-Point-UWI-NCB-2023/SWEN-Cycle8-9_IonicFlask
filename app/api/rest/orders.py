from app.api.rest import Blueprint,jsonify,request,Orders,db

orders = Blueprint("orders", __name__, url_prefix="/orders")

