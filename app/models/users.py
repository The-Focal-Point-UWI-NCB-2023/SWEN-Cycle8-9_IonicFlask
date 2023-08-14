from app.models.base_table import BaseTable
from app.models import db
from werkzeug.security import generate_password_hash


class Users(BaseTable):

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(256))
    role = db.Column(db.Integer)
    orders = db.relationship('Orders',backref='user',lazy=True) #creates the relationships
    products = db.relationship('Products', backref='user', lazy=True)

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
