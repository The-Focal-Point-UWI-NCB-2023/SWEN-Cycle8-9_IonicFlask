import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

class BaseTable(db.Model):
    __abstract__ = True
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    updated_at = db.Column(db   .DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

class Products(BaseTable):

    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    description = db.Column(db.TEXT())
    price = db.Column(db.Float(10,2))
    image = db.Column(db.String(100))
    status = db.Column(db.String(10))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    line_items = db.relationship('Order', secondary='line_items', backref='products', lazy=True)

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Product %r>' % (self.id)

    def __init__(self,name,description,price,image,status,user_id):

        self.name = name
        self.description = description
        self.price = price
        self.image = image
        self.status = status
        self.user_id = user_id


#
class Users(BaseTable):

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(256))
    role = db.Column(db.String(5))
    orders = db.relationship('Orders',backref='user',lazy=True) #creates the relationships
    products = db.relationship('Product', backref='user', lazy=True)

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Users %r>' % (self.id)

    def __init__(self,full_name,email,password,role):        
        self.full_name = full_name
        self.email = email
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.role = role

#
class Orders(BaseTable):

    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    billing_address = db.Column(db.String(256))
    total_amount = db.Column(db.Float(10,2))
    status = db.Column(db.String(10))
    line_items = db.relationship('Product', secondary='lineitems', backref='orders', lazy=True)

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Orders %r>' % (self.id)

    def __init__(self,user_id,billing_address,total_amount,status):        
        self.user_id = user_id
        self.billing_address = billing_address
        self.total_amount = total_amount
        self.status = status



#
class Line_Items(db.Model):

    __tablename__ = 'lineitems'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer,db.ForeignKey('orders.id'))
    product_id = db.Column(db.Integer,db.ForeignKey('products.id'))
    qty = db.Column(db.Integer())
    

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Item(s) %r>' % (self.id)

    def __init__(self,order_id,product_id,qty):        
        self.order_id = order_id
        self.product_id = product_id
        self.qty = qty