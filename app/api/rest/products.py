from app.api import Namespace, Resource, fields, reqparse
from app.models import Products, db

products_ns = Namespace("products", description="Products namespace")

product_model = products_ns.model(
    "Product",
    {
        "id": fields.Integer,
        "name": fields.String,
        "description": fields.String,
        "price": fields.Float,
        "image": fields.String,
        "status": fields.String,
        "user_id": fields.Integer,
    },
)

product_parser = reqparse.RequestParser()
product_parser.add_argument("name", type=str, required=True, help="Name is required")
product_parser.add_argument(
    "description", type=str, required=True, help="Description is required"
)
product_parser.add_argument(
    "price", type=float, required=True, help="Price is required"
)
product_parser.add_argument("image", type=str, required=True, help="Image is required")
product_parser.add_argument(
    "status", type=str, required=True, help="Status is required"
)
product_parser.add_argument(
    "user_id", type=int, required=True, help="User ID is required"
)


@products_ns.route("/")
class ProductsResource(Resource):
    @products_ns.marshal_list_with(product_model)
    def get(self):
        products = Products.query.all()
        return products

    @products_ns.expect(product_parser)
    @products_ns.marshal_with(product_model)
    def post(self):
        args = product_parser.parse_args()
        new_product = Products(**args)
        db.session.add(new_product)
        db.session.commit()
        return new_product, 201


@products_ns.route("/<int:product_id>")
@products_ns.response(404, "Product not found")
@products_ns.param("product_id", "Product ID")
class ProductResource(Resource):
    @products_ns.marshal_with(product_model)
    def get(self, product_id):
        product = Products.query.get(product_id)
        if not product:
            products_ns.abort(404, message="Product not found")
        return product

    @products_ns.response(204, "Product deleted")
    def delete(self, product_id):
        product = Products.query.get(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return "", 204

    @products_ns.expect(product_parser)
    @products_ns.marshal_with(product_model)
    def put(self, product_id):
        product = Products.query.get(product_id)
        if not product:
            products_ns.abort(404, message="Product not found")
        args = product_parser.parse_args()
        for key, value in args.items():
            setattr(product, key, value)
        db.session.commit()
        return product
