from app.api.rest.users import users_ns
from app.api.rest.products import products_ns
from app.api import api, Namespace, Resource, fields, reqparse

# Create the rest namespace
rest_ns = Namespace("rest", description="REST namespace")

# Add the individual namespaces to api namespace
api.add_namespace(users_ns)
api.add_namespace(products_ns)


@rest_ns.route("/")
class RestIndex(Resource):
    def get(self):
        return {"message": "Restful Endpoint"}
