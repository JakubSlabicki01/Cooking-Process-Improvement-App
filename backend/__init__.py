from flask import Flask
from flask_cors import CORS
from .extensions import db, bcrypt, jwt, migrate
from .config import Config
from .auth import auth_blueprint
from backend.resources import resources_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(resources_blueprint, url_prefix='/api')

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    app.register_blueprint(auth_blueprint)

    return app
