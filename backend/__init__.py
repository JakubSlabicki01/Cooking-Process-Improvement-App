from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from .extensions import db, bcrypt, jwt, migrate
from .config import Config, images
from .auth import auth_blueprint
from backend.resources import resources_blueprint
from flask_uploads import UploadSet, configure_uploads, IMAGES

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(resources_blueprint, url_prefix='/api')
    
    configure_uploads(app, images)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    jwt.init_app(app)
    CORS(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})


    app.register_blueprint(auth_blueprint)

    return app
