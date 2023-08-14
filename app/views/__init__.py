from flask import Blueprint, jsonify, render_template

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")


# Create initial route
@views.route("")
def index():
    return render_template("index.html")

@views.route("/admin")
def admin():
    return render_template("admin-dashboard.html", headers=user_headers,users=test_users)
@views.route("/admin-products")
def adminProducts():
    return render_template("admin-dashboard.html",headers=product_headers,products=test_products)

@views.route("/admin-orders")
def adminOrders():
    return render_template("admin-dashboard.html",headers=order_headers,orders=test_orders)


# Register View Endpoints
# api.register_blueprint()





























































test_orders = [
    [1, 123, "123 Main St, City", 100.50, "Pending"],
    [2, 456, "456 Elm St, Town", 75.25, "Shipped"],
    [3, 789, "789 Oak St, Village", 250.00, "Delivered"],
    [4, 123, "321 Pine St, Hamlet", 50.75, "Pending"],
    [5, 456, "654 Birch St, Countryside", 150.20, "Shipped"]
]

test_products = [
    ["Product 1", "Description 1", 50.99, "image1.jpg", "Available", 123],
    ["Product 2", "Description 2", 25.50, "image2.jpg", "Out of stock", 456],
    ["Product 3", "Description 3", 150.00, "image3.jpg", "Available", 789],
    ["Product 4", "Description 4", 75.25, "image4.jpg", "Out of stock", 123],
    ["Product 5", "Description 5", 200.75, "image5.jpg", "Available", 456]
]

test_users = [
    ["Admin User", "admin@example.com", "admin123", "admin"],
    ["Regular User 1", "user1@example.com", "user123", "regular"],
    ["Regular User 2", "user2@example.com", "user456", "regular"],
    ["Admin User 2", "admin2@example.com", "admin456", "admin"],
    ["Regular User 3", "user3@example.com", "user789", "regular"]
]

order_headers = ["Order ID", "User ID", "Billing Address", "Total Amount", "Status"]
product_headers = ["Product Name", "Description", "Price", "Image", "Status", "User ID"]
user_headers = ["Full Name", "Email", "Password", "Role"]
