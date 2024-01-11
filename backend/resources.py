# resources.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.models import FoodItem, FridgeItem  # Import the FoodItem model
from .extensions import db

resources_blueprint = Blueprint('resources', __name__)

@resources_blueprint.route('/food-items', methods=['GET'])
@jwt_required()
def get_food_items():
    # Fetch all food items from the database
    food_items = FoodItem.query.all()
    
    # Transform the data into a JSON-serializable format
    food_items_list = [{
        'id': item.id,
        'name': item.name,
        'spoilage_days': item.spoilage_days,
        'icon_url': item.icon_url
    } for item in food_items]
    
    # Return the list of food items as JSON
    return jsonify(food_items_list)

@resources_blueprint.route('/my-fridge', methods=['POST'])
@jwt_required()
def add_to_fridge():
    user_id = get_jwt_identity()
    data = request.json
    food_item_id = data.get('food_item_id')
    quantity = data.get('quantity', 1)

    # Check if the food item exists
    if not FoodItem.query.get(food_item_id):
        return jsonify({'message': 'Food item not found'}), 404

    fridge_item = FridgeItem(user_id=user_id, food_item_id=food_item_id, quantity=quantity)
    db.session.add(fridge_item)
    db.session.commit()

    return jsonify({'message': 'Item added to fridge'}), 201

@resources_blueprint.route('/my-fridge/<int:fridge_item_id>', methods=['DELETE'])
@jwt_required()
def delete_from_fridge(fridge_item_id):
    user_id = get_jwt_identity()
    fridge_item = FridgeItem.query.filter_by(id=fridge_item_id, user_id=user_id).first()

    if fridge_item is None:
        return jsonify({'message': 'Fridge item not found'}), 404

    db.session.delete(fridge_item)
    db.session.commit()

    return jsonify({'message': 'Item deleted from fridge'}), 200


@resources_blueprint.route('/my-fridge', methods=['GET'])
@jwt_required()
def get_my_fridge_items():
    user_id = get_jwt_identity()

    # Fetch all fridge items for the current user
    fridge_items = FridgeItem.query.filter_by(user_id=user_id).all()

    # Transform the data into a JSON-serializable format
    fridge_items_list = [{
        'fridge_item_id': item.id,
        'food_item_id': item.food_item_id,
        'quantity': item.quantity,
        # Add additional fields if necessary, such as item details from FoodItem
    } for item in fridge_items]

    # Return the list of fridge items as JSON
    return jsonify(fridge_items_list)
