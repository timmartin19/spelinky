__author__ = 'Tim'
from flask import Flask
from flask.ext.babel import Babel
from flask.ext.mail import Mail
from flask_wtf import CsrfProtect


app = Flask(__name__)
app.config.from_object('spelinkyapp.config')

babel = Babel(app)
csrf = CsrfProtect(app)
mail = Mail(app)
