from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = 'your_secure_random_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


login_manager = LoginManager(app)
login_manager.login_view = 'login'


migrate = Migrate(app, db)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Add this line
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)



@app.route('/register', methods=['POST'])
def register():
    data = request.json
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


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if 'email' not in data or 'password' not in data:
        return {'message': 'Email and password are required'}, 400

    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token, 'message': 'Login successful'}, 200
    else:
        return {'message': 'Login failed'}, 401
    

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    # You can now use current_user_id to access user details
    return {'message': 'Access to protected endpoint'}, 200

    
    

if __name__ == '__main__':
    app.run(debug=True)
