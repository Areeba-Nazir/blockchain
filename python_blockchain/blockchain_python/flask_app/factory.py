import os
from flask import Flask
from flask_cors import CORS
from .config import CONFIG
# from .models import db, user_datastore
def create_app():
    app = Flask(__name__)
    app.threaded = True
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_object(CONFIG[config_name])    
    CORS(app, headers=['Content-Type'])
    return app