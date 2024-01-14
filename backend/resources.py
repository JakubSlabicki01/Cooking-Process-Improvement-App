# resources.py
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.models import FoodItem, FridgeItem  # Import the FoodItem model
from .utils import calculate_days_until_expiry, process_response
from .extensions import db
import requests
import openai

OPENAI_API_KEY = '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'
openai.api_key = OPENAI_API_KEY

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

@resources_blueprint.route('/get-icon-url', methods=['POST'])
def get_icon_url():
    item_name = request.json.get('name')
    item = FoodItem.query.filter_by(name=item_name).first()
    if item:
        return jsonify({'icon_url': item.icon_url})
    return jsonify({'icon_url': None})


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

    # Perform a join between FridgeItem and FoodItem
    fridge_items = db.session.query(
        FridgeItem.id,
        FridgeItem.quantity,
        FridgeItem.added_on,  # Select the added_on field
        FoodItem.name,
        FoodItem.spoilage_days,
        FoodItem.icon_url
    ).join(FoodItem, FridgeItem.food_item_id == FoodItem.id).filter(FridgeItem.user_id == user_id).all()

    # Transform the data into a JSON-serializable format
    fridge_items_list = [{
        'fridge_item_id': item.id,
        'quantity': item.quantity,
        'name': item.name,
        'expiryDate': calculate_days_until_expiry(item.spoilage_days),
        'icon_url': item.icon_url,
        'addedDate': item.added_on.strftime('%Y-%m-%d') if item.added_on else None  # Format the added_on date
    } for item in fridge_items]

    return jsonify(fridge_items_list)


@resources_blueprint.route('/ask-gpt', methods=['POST'])
def ask_gpt():
    data = request.json
    input_label = data.get('label')  # Assuming you receive a 'label' field

    if not input_label:
        return jsonify({'error': 'No label provided'}), 400

    prompt = f"List between 10 and 25 foods that pair well with {input_label}, just the names. Separate each iteam with '\n' and don't numerate them and don't use any other characters"

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are a helpful assistant."},
                      {"role": "user", "content": prompt}]
        )
        # Process the response to extract only item names if necessary
        print("Response from GPT:", response)
        items_text = response.choices[0].message['content']
        items = process_response(items_text)

        items_with_icons = []
        for item_name in items:
            item = FoodItem.query.filter_by(name=item_name.strip()).first()
            if item:
                items_with_icons.append({'name': item_name, 'icon_url': item.icon_url})
            else:
                items_with_icons.append({'name': item_name, 'icon_url': None})

        return jsonify({'items': items_with_icons})
    except Exception as e:
        print(f"RequestException occurred: {e}")
        return jsonify({'error': str(e)}), 500
    

@resources_blueprint.route('/gpt-image', methods=['POST'])
@cross_origin()
def gpt_image():

    data = request.json
    img_url = data.get('img_url')  # Assuming you receive a 'label' field

    if not img_url:
        return jsonify({'error': 'No img url provided'}), 400


    try:
        response = openai.ChatCompletion.create(
        model="gpt-4-vision-preview",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": "List all the food items you can spot in the image. Write just the names, separate each iteam with '\n' and don't numerate them and don't use any other characters"},
                {
                "type": "image_url",
                "image_url": {
                    "url": f"{img_url}",
                    "detail": "low"
                },
                },
            ],
            }
        ],
        max_tokens=300,
        )
        image_text = response.choices[0].message['content']
        recognized_items = process_response(image_text)
        print(recognized_items)

        try:
            items_details = []
            for item_name in recognized_items:
                item = FoodItem.query.filter_by(name=item_name).first()
                if item:
                    # Item exists in the database
                    items_details.append({
                        'name': item.name,
                        'icon_url': item.icon_url,
                        'spoilage_days': item.spoilage_days,
                        'quantity': sum(f.quantity for f in FridgeItem.query.filter_by(food_item_id=item.id))
                    })
                else:
                    # Item not found in the database, set default values
                    items_details.append({
                        'name': item_name,
                        'icon_url': None,
                        'spoilage_days': None,
                        'quantity': None
                    })
            print(items_details)
            return jsonify(items_details)
        except Exception as e:
            print(f"RequestException occurred: {e}")
            return jsonify({'error': str(e)}), 500

        # Process the response to extract only item names if necessary
    except Exception as e:
        print(f"RequestException occurred: {e}")
        return jsonify({'error': str(e)}), 500

