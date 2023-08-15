from app.models import db

class Line_Items(db.Model):

    __tablename__ = 'lineitems'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer,db.ForeignKey('orders.id'))
    product_id = db.Column(db.Integer,db.ForeignKey('products.id'))
    qty = db.Column(db.Integer())

    # order = db.relationship('Orders', backref='lineitems')
    # product = db.relationship('Products', back_populates='lineitems')
    

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