from flask import Blueprint, jsonify, render_template

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")


# Create initial route
@views.route("")
def index():
    return render_template("index.html")


# Register View Endpoints
# api.register_blueprint()
