from app.models.base_table import BaseTable
from app.models import db


class Products(BaseTable):

    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    description = db.Column(db.TEXT())
    price = db.Column(db.Numeric(10,2))
    image = db.Column(db.String(100))
    status = db.Column(db.String(10))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    line_items = db.relationship('Line_Items', backref='product')

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

