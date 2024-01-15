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

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='food_item')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "spoilage_days": self.spoilage_days,
            "icon_url": self.icon_url
        }


class FridgeItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    food_item_id = db.Column(db.Integer, db.ForeignKey('food_item.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    added_on = db.Column(db.DateTime, default=db.func.current_timestamp())

    food_item = db.relationship('FoodItem', backref='fridge_items')

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    preparation_time = db.Column(db.Integer, nullable=False)  # in minutes
    servings = db.Column(db.Integer, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))  # URL to the recipe image

    # Relationship with ingredients (FoodItem)
    ingredients = db.relationship('FoodItem', secondary='recipe_ingredient', overlaps="recipe_ingredients")
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe')
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "difficulty": self.difficulty,
            "preparation_time": self.preparation_time,
            "servings": self.servings,
            "instructions": self.instructions,
            "image_url": self.image_url,
            "ingredients": [ingredient.serialize() for ingredient in self.ingredients],
            "recipe_ingredients": [
                {
                    "food_item_id": ri.food_item_id, 
                    "quantity": ri.quantity
                } for ri in self.recipe_ingredients
            ]
        }

# The RecipeIngredient model remains the same


class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredient'
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
    food_item_id = db.Column(db.Integer, db.ForeignKey('food_item.id'), primary_key=True)
    quantity = db.Column(db.String(100), nullable=False)  # Quantity like '1 cup', '200g', etc.

    recipe = db.relationship('Recipe', back_populates='recipe_ingredients', overlaps="ingredients")
    food_item = db.relationship('FoodItem', back_populates='recipe_ingredients', overlaps="ingredients")



class LikedRecipe(db.Model):
    __tablename__ = 'liked_recipe'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), primary_key=True)

    user = db.relationship('User', backref=db.backref('liked_recipes', lazy=True))
    recipe = db.relationship('Recipe', backref=db.backref('liked_by_users', lazy=True))

    def serialize(self):
        return {
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }


