from app.api.rest import Blueprint,jsonify,request,Products,db

products = Blueprint("products", __name__, url_prefix="/products")

