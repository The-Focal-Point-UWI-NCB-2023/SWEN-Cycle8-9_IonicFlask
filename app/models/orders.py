from app.models.base_table import BaseTable
from app.models import db


class Orders(BaseTable):

    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    billing_address = db.Column(db.String(256))
    total_amount = db.Column(db.Float(10,2))
    status = db.Column(db.String(10))
    # line_items = db.relationship('Product', backref='orders', lazy=True)

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

