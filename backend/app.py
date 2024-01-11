from backend import create_app, db
from backend.models import FoodItem
from backend.models import User  # Import other models as needed

app = create_app()

#with app.app_context():
    # Delete data from each table
    #User.query.delete()
    # Add similar lines for other tables
    #db.session.commit()
"""
food_items = [
    ("Apple", 30, "http://localhost:5000/static/icons/apple.png"),
    ("Avocado", 7, "http://localhost:5000/static/icons/avocado.png"),
    ("Banana", 7, "http://localhost:5000/static/icons/banana.png"),
    ("Beef", 3, "http://localhost:5000/static/icons/beef.png"),
    ("Bell Pepper", 14, "http://localhost:5000/static/icons/bell-pepper.png"),
    ("Blueberry", 10, "http://localhost:5000/static/icons/blueberry.png"),
    ("Broccoli", 15, "http://localhost:5000/static/icons/broccoli.png"),
    ("Butter", 30, "http://localhost:5000/static/icons/butter.png"),
    ("Canned Beans", 365, "http://localhost:5000/static/icons/canned-beans.png"),
    ("Cauliflower", 10, "http://localhost:5000/static/icons/cauliflower.png"),
    ("Chicken", 2, "http://localhost:5000/static/icons/chicken.png"),
    ("Cucumber", 7, "http://localhost:5000/static/icons/cucumber.png"),
    ("Egg", 21, "http://localhost:5000/static/icons/egg.png"),
    ("Fish", 2, "http://localhost:5000/static/icons/fish.png"),
    ("Garlic", 150, "http://localhost:5000/static/icons/garlic.png"),
    ("Ginger", 60, "http://localhost:5000/static/icons/ginger.png"),
    ("Grapes", 7, "http://localhost:5000/static/icons/grapes.png"),
    ("Kale", 14, "http://localhost:5000/static/icons/kale.png"),
    ("Lettuce", 7, "http://localhost:5000/static/icons/lettuce.png"),
    ("Milk", 7, "http://localhost:5000/static/icons/milk.png"),
    ("Mushrooms", 7, "http://localhost:5000/static/icons/mushrooms.png"),
    ("Onion", 60, "http://localhost:5000/static/icons/onion.png"),
    ("Orange", 21, "http://localhost:5000/static/icons/orange.png"),
    ("Pasta", 365, "http://localhost:5000/static/icons/pasta.png"),
    ("Peach", 5, "http://localhost:5000/static/icons/peach.png"),
    ("Pear", 7, "http://localhost:5000/static/icons/pear.png"),
    ("Plum", 5, "http://localhost:5000/static/icons/plum.png"),
    ("Pumpkin", 30, "http://localhost:5000/static/icons/pumpkin.png"),
    ("Rice", 365, "http://localhost:5000/static/icons/rice.png"),
    ("Spinach", 7, "http://localhost:5000/static/icons/spinach.png"),
    ("Squash", 30, "http://localhost:5000/static/icons/squash.png"),
    ("Strawberry", 7, "http://localhost:5000/static/icons/strawberry.png"),
    ("Sweet Potato", 30, "http://localhost:5000/static/icons/sweet-potato.png"),
    ("White Bread", 7, "http://localhost:5000/static/icons/white.png"),
    ("Yogurt", 14, "http://localhost:5000/static/icons/yogurt.png"),
    ("Zucchini", 5, "http://localhost:5000/static/icons/zucchini.png"),
]

with app.app_context():
    for item in food_items:
        food = FoodItem(name=item[0], spoilage_days=item[1], icon_url=item[2])
        db.session.add(food)

    db.session.commit()

"""

if __name__ == '__main__':
    app.run(debug=True)
