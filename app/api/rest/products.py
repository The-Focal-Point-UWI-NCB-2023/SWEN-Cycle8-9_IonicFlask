from app.api import Namespace, Resource, fields, reqparse,abort,os
from app.api.auth import admin_required
from app.models import Products, db
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

products_ns = Namespace("products", path="/v1/rest/products", 
    description="API operations related to managing product information, including adding, retrieving, updating, and deleting products. This namespace provides endpoints to interact with product data, allowing administrators to manage product listings, pricing, availability, and details. Products can be searched by ID, and their name, description, price, image, status, and user ID information are accessible for administration purposes.")
product_model = products_ns.model(
    "Product",
    {
        "id": fields.Integer(description="The unique identifier for a product"),
        "name": fields.String(description="Name of the product"),
        "description": fields.String(description="Description of the product"),
        "price": fields.Float(description="Price of the product"),
        "image": fields.String(description="Image URL of the product"),
        "status": fields.String(description="Status of the product"),
        "user_id": fields.Integer(description="User ID associated with the product"),
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
product_parser.add_argument('image', location='files',
                           type=FileStorage, required=False)
product_parser.add_argument(
    "status", type=str, required=True, help="Status is required"
)
product_parser.add_argument(
    "user_id", type=int, required=True, help="User ID is required"
)

@products_ns.response(404, "Product not found")
@products_ns.response(409, "Invalid field syntax")
@products_ns.route("/")
class ProductsResource(Resource):
    @products_ns.marshal_list_with(product_model)
    def get(self):
        products = Products.query.all()
        if products == []:
            abort(404,message='No products found')
        return products
        

    @products_ns.expect(product_parser)
    @products_ns.marshal_with(product_model)
    @admin_required
    def post(self):
        args = product_parser.parse_args()
        if args['image'] == None:
            abort(400, message='Image Required')
        image_file = args['image']  # Get the uploaded image file

        if image_file:
            filename = secure_filename(image_file.filename)
            image_path = os.path.join('./uploads', filename)
            image_file.save(image_path)

            args['image'] = image_path  # Update the 'image' field to the image path

        new_product = Products(**args)
        try:
            db.session.add(new_product)
            db.session.commit()
            return new_product, 201
        except Exception as e:
            abort(409, message=e)

@products_ns.route("/<int:product_id>")
@products_ns.response(404, "Product not found")
@products_ns.response(409, "Invalid field syntax")
@products_ns.param("product_id", "A unique identifier associated with a product")
class ProductResource(Resource):
    @products_ns.marshal_with(product_model)
    def get(self, product_id):
        product = Products.query.get(product_id)
        if not product:
            abort(404, message="Product not found")
        return product


    @admin_required
    @products_ns.expect(product_parser)
    @products_ns.marshal_with(product_model)
    def put(self, product_id):
        product = Products.query.get(product_id)
        if product:
            try:
                args = product_parser.parse_args()
                if args['image'] == None:
                    image = args.pop('image', None)
                    for key, value in args.items():
                        setattr(product, key, value)
                        db.session.commit() 
                image_file = args['image']  # Get the uploaded image file
                upload_folder = os.environ.get("UPLOAD_FOLDER")
                if image_file:
                    filename = secure_filename(image_file.filename)
                    image_path = os.path.join(upload_folder, filename)
                    image_file.save(image_path)

                args['image'] = image_path  # Update the 'image' field to the image path

                for key, value in args.items():
                    setattr(product, key, value)
                db.session.commit()
            except Exception as e:
                abort(409, message=e)
        elif product is None:
            abort(404, message="Product not found")
        

    @admin_required
    @products_ns.response(204, "Product deleted")
    def delete(self, product_id):
        product = Products.query.get(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return "", 204
        elif product is None:
            abort(404,message='Product with this ID does not exist')