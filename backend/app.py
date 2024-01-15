from backend import create_app, db
from backend.models import FoodItem, Recipe, RecipeIngredient
from backend.models import User  # Import other models as needed

app = create_app()

#with app.app_context():
    # Delete data from each table
    #User.query.delete()
    # Add similar lines for other tables
    #db.session.commit()

"""food_items = [
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




missing_food_items = [
    ("Romaine Lettuce", 7, "http://localhost:5000/static/icons/romaine-lettuce.png"),
    ("Croutons", 60, "http://localhost:5000/static/icons/croutons.png"),
    ("Caesar Dressing", 30, "http://localhost:5000/static/icons/caesar-dressing.png"),
    ("Risotto Rice", 180, "http://localhost:5000/static/icons/rice.png"),
    ("Green Curry Paste", 180, "http://localhost:5000/static/icons/green-curry-paste.png"),
    ("Coconut Milk", 10, "http://localhost:5000/static/icons/coconut-milk.png"),
    ("Mixed Vegetables", 7, "http://localhost:5000/static/icons/mixed-vegetables.png"),
    ("Mixed Herbs", 90, "http://localhost:5000/static/icons/mixed-herbs.png"),
    ("Ricotta Cheese", 14, "http://localhost:5000/static/icons/ricotta-cheese.png"),
    ("Tomato Sauce", 30, "http://localhost:5000/static/icons/tomato-sauce.png"),
    ("Cherry Tomatoes", 7, "http://localhost:5000/static/icons/cherry-tomatoes.png"),
    ("Lemon", 14, "http://localhost:5000/static/icons/lemon.png"),
    ("Quinoa", 365, "http://localhost:5000/static/icons/quinoa.png"),
    ("Sour Cream", 14, "http://localhost:5000/static/icons/sour-cream.png"),
    ("Corn Tortillas", 30, "http://localhost:5000/static/icons/corn-tortillas.png"),
    ("Cabbage", 14, "http://localhost:5000/static/icons/cabbage.png"),
    ("Mango Chutney", 180, "http://localhost:5000/static/icons/mango-chutney.png"),
    ("Lime", 14, "http://localhost:5000/static/icons/lime.png")
]

"""
"""def add_recipe(recipe_data):
    recipe = Recipe(
        name=recipe_data["name"],
        difficulty=recipe_data["difficulty"],
        preparation_time=recipe_data["preparation_time"],
        servings=recipe_data["servings"],
        instructions=recipe_data["instructions"],
        image_url=recipe_data["image_url"]
    )
    db.session.add(recipe)

    for ingredient_name, quantity in recipe_data["ingredients"]:
        ingredient = FoodItem.query.filter_by(name=ingredient_name).first()
        if ingredient:
            recipe_ingredient = RecipeIngredient(
                recipe=recipe,
                food_item=ingredient,
                quantity=quantity
            )
            db.session.add(recipe_ingredient)

recipes = [
    {
        "name": "Spaghetti Aglio e Olio",
        "difficulty": "Easy",
        "preparation_time": 20,
        "servings": 2,
        "instructions": "Boil spaghetti. Sauté garlic in olive oil, mix with pasta.",
        "image_url": "http://localhost:5000/static/recipes/spaghetti-aglio-e-olio.png",
        "ingredients": [("Spaghetti", "200g"), ("Garlic", "2 cloves"), ("Olive Oil", "2 tbsp")]
    },
    {
        "name": "Classic Caesar Salad",
        "difficulty": "Medium",
        "preparation_time": 15,
        "servings": 4,
        "instructions": "Mix lettuce, croutons, and Caesar dressing. Top with Parmesan.",
        "image_url": "http://localhost:5000/static/recipes/classic-caesar-salad.png",
        "ingredients": [("Romaine Lettuce", "1 head"), ("Croutons", "1 cup"), ("Caesar Dressing", "100ml"), ("Parmesan Cheese", "50g")]
    },
    {
        "name": "Mushroom Risotto",
        "difficulty": "Hard",
        "preparation_time": 45,
        "servings": 3,
        "instructions": "Cook risotto rice with mushrooms, broth, and Parmesan.",
        "image_url": "http://localhost:5000/static/recipes/mushroom-risotto.png",
        "ingredients": [("Risotto Rice", "200g"), ("Mushrooms", "150g"), ("Chicken Broth", "500ml"), ("Parmesan Cheese", "50g")]
    },
    {
        "name": "Thai Green Curry",
        "difficulty": "Medium",
        "preparation_time": 30,
        "servings": 4,
        "instructions": "Simmer green curry paste with coconut milk, vegetables, and chicken.",
        "image_url": "http://localhost:5000/static/recipes/thai-green-curry.png",
        "ingredients": [("Green Curry Paste", "50g"), ("Coconut Milk", "400ml"), ("Chicken Breast", "300g"), ("Mixed Vegetables", "200g")]
    },
    {
        "name": "Lemon Herb Chicken",
        "difficulty": "Easy",
        "preparation_time": 25,
        "servings": 4,
        "instructions": "Marinate chicken in lemon juice and herbs. Grill until cooked.",
        "image_url": "http://localhost:5000/static/recipes/lemon-herb-chicken.png",
        "ingredients": [("Chicken Breast", "4 pieces"), ("Lemon", "50ml"), ("Mixed Herbs", "1 tbsp")]
    },
    {
        "name": "Vegetarian Lasagna",
        "difficulty": "Medium",
        "preparation_time": 60,
        "servings": 6,
        "instructions": "Layer lasagna sheets with vegetables and cheese, bake until golden.",
        "image_url": "http://localhost:5000/static/recipes/vegetearian-lasagna.png",
        "ingredients": [("Lasagna Sheets", "12 sheets"), ("Ricotta Cheese", "250g"), ("Spinach", "200g"), ("Tomato Sauce", "300ml")]
    },
    {
        "name": "Quinoa Salad Bowl",
        "difficulty": "Easy",
        "preparation_time": 20,
        "servings": 3,
        "instructions": "Mix cooked quinoa with veggies and a lemon vinaigrette.",
        "image_url": "http://localhost:5000/static/recipes/quinoa-salad-bowl.png",
        "ingredients": [("Quinoa", "150g"), ("Cherry Tomatoes", "100g"), ("Cucumber", "1"), ("Lemon", "1"), ("Olive Oil", "2 tbsp")]
    },
    {
        "name": "Beef Stroganoff",
        "difficulty": "Hard",
        "preparation_time": 45,
        "servings": 4,
        "instructions": "Sauté beef and mushrooms, add cream sauce. Serve over pasta.",
        "image_url": "http://localhost:5000/static/recipes/beef-stroganoff.png",
        "ingredients": [("Beef", "500g"), ("Mushrooms", "150g"), ("Sour Cream", "200ml"), ("Onion", "1"), ("Pasta", "300g")]
    },
    {
        "name": "Fish Tacos",
        "difficulty": "Medium",
        "preparation_time": 30,
        "servings": 2,
        "instructions": "Grill fish, place in tortillas with cabbage and avocado.",
        "image_url": "http://localhost:5000/static/recipes/fish-tacos.png",
        "ingredients": [("Fish", "300g"), ("Corn Tortillas", "6"), ("Cabbage", "100g"), ("Avocado", "1"), ("Lime", "1")]
    },
    {
        "name": "Mango Chutney Chicken",
        "difficulty": "Easy",
        "preparation_time": 35,
        "servings": 4,
        "instructions": "Bake chicken with mango chutney glaze. Serve with rice.",
        "image_url": "http://localhost:5000/static/recipes/mango-chutney-chicken.png",
        "ingredients": [("Chicken Thighs", "4 pieces"), ("Mango Chutney", "150g"), ("Rice", "200g"), ("Broccoli", "200g")]
    },
]



with app.app_context():
    for recipe_data in recipes:
        add_recipe(recipe_data)

    db.session.commit()"""

"""
new_food_items = [
    ("Chicken Breast", 3, "http://localhost:5000/static/icons/chicken-breast.png"),
    ("Chicken Broth", 4, "http://localhost:5000/static/icons/chicken-broth.png"),
    ("Chicken Thighs", 3, "http://localhost:5000/static/icons/chicken-thighs.png"),
    ("Lasagna Sheets", 730, "http://localhost:5000/static/icons/lasagna-sheets.png"),
    ("Olive Oil", 540, "http://localhost:5000/static/icons/olive-oil.png"),
    ("Parmesan Cheese", 60, "http://localhost:5000/static/icons/parmesan-cheese.png"),
    ("Spaghetti", 730, "http://localhost:5000/static/icons/spaghetti.png")
]

with app.app_context():
    for item in new_food_items:
        food = FoodItem(name=item[0], spoilage_days=item[1], icon_url=item[2])
        db.session.add(food)

    db.session.commit()


with app.app_context():
    RecipeIngredient.query.delete()
    Recipe.query.delete()
    db.session.commit()

 """   
if __name__ == '__main__':
    app.run(debug=True)
