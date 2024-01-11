from flask import Blueprint, request
from .utils import *
from .models import User, db
from .extensions import bcrypt
from .utils import validate_email, validate_password, validate_username
from flask_jwt_extended import create_access_token


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
        return {'access_token': access_token, 'username': user.username, 'message': 'Login successful'}, 200
    else:
        return {'message': 'Incorret e-mail or password'}, 401
