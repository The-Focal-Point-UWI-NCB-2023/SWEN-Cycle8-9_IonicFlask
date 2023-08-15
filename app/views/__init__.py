from flask import Blueprint, jsonify, render_template

# Initialize API
views = Blueprint("views", __name__, url_prefix="/")


# Create initial route
@views.route("")
def index():
    return render_template("index.html")


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

@views.route('/products/<product_id>')
def product_info(product_id):
    print(product_id)
    return render_template('components/product-view.html', product=products[int(product_id)])