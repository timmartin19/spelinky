__author__ = 'Tim'
from flask import Flask, request
from flask.ext.admin import Admin, expose
from flask.ext.admin.contrib.sqla import ModelView
from flask.ext.babel import Babel
from flask.ext.mail import Mail
from flask_restless import APIManager
from flask_user import SQLAlchemyAdapter, UserManager
from flask_wtf import CsrfProtect
from models import db, User, Link


app = Flask(__name__)
app.config.from_object('spelinkyapp.config')

babel = Babel(app)
csrf = CsrfProtect(app)
mail = Mail(app)
admin = Admin(app)

api_manager = APIManager(app, flask_sqlalchemy_db=db)

db.init_app(app)
with app.app_context():
    db.create_all()
    db_adapter = SQLAlchemyAdapter(db, User)
    user_manager = UserManager(db_adapter, app)
    if not User.query.filter_by(username='tim').first():
        user1 = User(username='tim', email='tim@gmail.com', active=True,
                     password=user_manager.hash_password('password'))
        db.session.add(user1)
        db.session.commit()

admin.add_view(ModelView(Link, db.session))


def get_locale():
    translations = [str(translation) for translation in babel.list_translations()]
    return request.accept_languages.best_match(translations)

from spelinkyapp import views
views.generate_apis(api_manager)