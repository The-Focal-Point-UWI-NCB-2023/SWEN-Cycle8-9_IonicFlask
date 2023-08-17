from flask import Blueprint, jsonify, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user
from app import db
import requests
from app.models import Users
from app.forms import LoginForm, RegisterForm
from flask_login import login_user, logout_user

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")


# Create initial route
@views.route("")
# @login_required
def index():
    return render_template("index.html")


## These are mock routes for now to test the authentication endpoints. You might need to change your port number in the reqest  to test this.
@views.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if current_user.is_authenticated:
        return redirect(url_for("views.index"))

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        response = requests.post(
            "http://127.0.0.1:8080/api/v1/auth/login",
            data={"email": email, "password": password},
        )

        if response.status_code == 200:
            user = db.session.execute(db.select(Users).filter_by(email=email)).scalar()
            login_user(user)
            return redirect(url_for("views.index"))
        
        elif response.status_code == 401:
            flash("Username or Password is incorrect.")

    return render_template("login.html", form=form)


## These are mock routes for now to test the authentication endpoints. You might need to change your port number in the reqest  to test this.
@views.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if current_user.is_authenticated:
        return redirect(url_for("views.index"))

    if form.validate_on_submit():
        full_name = form.full_name.data
        email = form.email.data
        password = form.password.data
        response = requests.post(
            "http://127.0.0.1:8080/api/v1/auth/register",
            data={"full_name": full_name, "email": email, "password": password},
        )  # Port # might be different for you

        if response.status_code == 201:
            flash("Account created successfully.")
            return redirect(url_for("views.login"))
        elif response.status_code == 409:
            flash("Email already exists.")

    return render_template("register.html", form=form)


@views.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("views.login"))


# Register View Endpoints
# views.register_blueprint()
@views.route("/admin")
def admin():
    return render_template(
        "admin-dashboard.html", headers=user_headers, users=test_users
    )


@views.route("/admin-products")
def adminProducts():
    return render_template(
        "admin-dashboard.html", headers=product_headers, products=test_products
    )


@views.route("/admin-orders")
def adminOrders():
    return render_template(
        "admin-dashboard.html", headers=order_headers, orders=test_orders
    )


test_orders = [
    [1, 123, "123 Main St, City", 100.50, "Pending"],
    [2, 456, "456 Elm St, Town", 75.25, "Shipped"],
    [3, 789, "789 Oak St, Village", 250.00, "Delivered"],
    [4, 123, "321 Pine St, Hamlet", 50.75, "Pending"],
    [5, 456, "654 Birch St, Countryside", 150.20, "Shipped"],
]

test_products = [
    ["Product 1", "Description 1", 50.99, "image1.jpg", "Available", 123],
    ["Product 2", "Description 2", 25.50, "image2.jpg", "Out of stock", 456],
    ["Product 3", "Description 3", 150.00, "image3.jpg", "Available", 789],
    ["Product 4", "Description 4", 75.25, "image4.jpg", "Out of stock", 123],
    ["Product 5", "Description 5", 200.75, "image5.jpg", "Available", 456],
]

test_users = [
    ["Admin User", "admin@example.com", "admin123", "admin"],
    ["Regular User 1", "user1@example.com", "user123", "regular"],
    ["Regular User 2", "user2@example.com", "user456", "regular"],
    ["Admin User 2", "admin2@example.com", "admin456", "admin"],
    ["Regular User 3", "user3@example.com", "user789", "regular"],
]

order_headers = ["Order ID", "User ID", "Billing Address", "Total Amount", "Status"]
product_headers = ["Product Name", "Description", "Price", "Image", "Status", "User ID"]
user_headers = ["Full Name", "Email", "Password", "Role"]


# Register View Endpoints
# api.register_blueprint()


@views.route('/products')
def view_products():
    """Render the the page to display list of products"""
    return  render_template('components/products.html', products=products)

products = [
    {
        'id': 0,
        'title': 'Cowrie Shield Earring',
        'image': 'earring1.jpeg',
        'description':'A Kenyan inspired handmade beaded earring. It can also be worn as a ring or bracelet.',
        'price': 2000
    },
    {
        'id': 1,
        'title': 'Double Beaded Rings',
        'image': 'earring4.jpeg',
        'description':'Handmade double hooped beaded earring.',
        'price': 1500
    },
    {
        'id': 2,
        'title': 'Drop Cowrie Earrings',
        'image': 'earring3.jpeg',
        'description':'Drop earrings made with cowrie shells and glass beads',
        'price': 2000
    },
    {
        'id': 3,
        'title': 'Gem stone Bracelets',
        'image': 'bracelet.jpeg',
        'description':'Bracelet set of 2, made from aventurine gem stones',
        'price': 2500
    },
    {
        'id': 4,
        'title': 'Embroidered Spideys',
        'image': 'embroid_tshirt.jpg',
        'description':'Machine embroidered sweatshirt, stitched is a scene from Spiderman and a viral meme',
        'price': 5000
    },
    {
        'id': 5,
        'title': 'Crocheted shroom',
        'image': 'bag.jpg',
        'description':'Crocheted mushroom shoulder bag',
        'price': 4500
    }
]

# Register View Endpoints
# api.register_blueprint()

@views.route('/products')
def views_products():
    """Render the the page to display list of products"""
    return  render_template('components/products.html', products=products)



@views.route('/products/<product_id>')
def product_info(product_id):
    print(product_id)
    return render_template('components/product-view.html', product=products[int(product_id)])

@views.route("/cart/<int:userId>")
def cart(userId):
    return render_template(
        "cart.html",  userId=userId,products=cart_prods
    )

cart_prods = [
    {
        "id": 1,
        "name": "Monitor",
        "price": 10.00,
        "image": "product1.jpg"
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 20.00,
        "image": "product2.jpg"
    }
    ]