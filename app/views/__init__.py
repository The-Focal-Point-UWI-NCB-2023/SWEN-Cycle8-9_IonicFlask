from flask import Blueprint, jsonify, render_template

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")


# Create initial route
@views.route("")
def index():
    return render_template("index.html")

@views.route("/admin")
def admn():
    return render_template("admin-dashboard.html")


# Register View Endpoints
# api.register_blueprint()
