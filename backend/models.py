from .extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Add this line
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

class FoodItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    spoilage_days = db.Column(db.Integer, nullable=False)  # Number of days until the item spoils
    icon_url = db.Column(db.String(255))  # URL to the icon image

    def __repr__(self):
        return f'<FoodItem {self.name}>'


class FridgeItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    food_item_id = db.Column(db.Integer, db.ForeignKey('food_item.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    added_on = db.Column(db.DateTime, default=db.func.current_timestamp())

    food_item = db.relationship('FoodItem', backref='fridge_items')
