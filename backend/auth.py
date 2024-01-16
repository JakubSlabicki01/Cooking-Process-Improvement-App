from flask import Blueprint, request
from flask_cors import cross_origin
from .utils import *
from .models import FridgeItem, LikedRecipe, User, db
from .extensions import bcrypt
from .utils import validate_email, validate_password, validate_username
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json

    is_valid, message = validate_field(data.get('email'), validate_email)
    if not is_valid:
        return {'message': message}, 400
    
    is_valid, message = validate_field(data.get('username'), validate_username)
    if not is_valid:
        return {'message': message}, 400
    
    is_valid, message = validate_field(data.get('password'), validate_password)
    if not is_valid:
        return {'message': message}, 400
    
    # Check if the email already exists
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'Email already in use'}, 400

    # Check if the username already exists
    if User.query.filter_by(username=data['username']).first():
        return {'message': 'Username already in use'}, 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return {'message': 'User created successfully'}, 201

@auth_blueprint.route('/update-user/<int:user_id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return {'message': 'Unauthorized access'}, 401

    data = request.json
    user = User.query.get(user_id)
    if not user:
        return {'message': 'User not found'}, 404

    is_valid, message = validate_field(data.get('email'), validate_email)
    if not is_valid:
        return {'message': message}, 400
    
    is_valid, message = validate_field(data.get('username'), validate_username)
    if not is_valid:
        return {'message': message}, 400
    
    is_valid, message = validate_field(data.get('password'), validate_password)
    if not is_valid:
        return {'message': message}, 400
    
    # Check if the email already exists
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'Email already in use'}, 400

    # Check if the username already exists
    if User.query.filter_by(username=data['username']).first():
        return {'message': 'Username already in use'}, 400
    
    user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    return {'message': 'User updated successfully'}, 200

@auth_blueprint.route('/delete-user/<int:user_id>', methods=['DELETE'])
@cross_origin()
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return {'message': 'Unauthorized access'}, 401
    
    user = User.query.get(user_id)
    if not user:
        return {'message': 'User not found'}, 404

    # Delete related fridge items and liked recipes
    FridgeItem.query.filter_by(user_id=user_id).delete()
    LikedRecipe.query.filter_by(user_id=user_id).delete()

    # Delete user
    db.session.delete(user)
    db.session.commit()
    return {'message': 'User deleted successfully'}, 200



@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    is_valid, message = is_field_empty(data.get('email'), 'E-mail')
    if not is_valid:
        return {'message': message}, 400
    
    is_valid, message = is_field_empty(data.get('password'), 'Password')
    if not is_valid:
        return {'message': message}, 400

    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token, 'username': user.username, 'user_id': user.id, 'message': 'Login successful'}, 200
    else:
        return {'message': 'Incorret e-mail or password'}, 401
