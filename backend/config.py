from flask_uploads import IMAGES, UploadSet


class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    JWT_SECRET_KEY = 'your_secure_random_secret_key'
    UPLOADED_IMAGES_DEST = 'static/uploads'


images = UploadSet('images', IMAGES)
