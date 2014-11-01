__author__ = 'Tim Martin'
from bs4 import BeautifulSoup
from flask import current_app, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.user import UserMixin
import io
import re
import requests
import os
import urllib, cStringIO
from PIL import Image
db = SQLAlchemy()
from datetime import datetime


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    confirmed_at = db.Column(db.DateTime())
    reset_password_token = db.Column(db.String(100), nullable=False, default='')
    roles = db.relationship('Role', secondary='user_roles',
                            backref=db.backref('users', lazy='dynamic'))


class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)


class UserRoles(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id', ondelete='CASCADE'))


class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(5000), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    img_url = db.Column(db.String(5000))
    description = db.Column(db.String(1000))
    date_uploaded = db.Column(db.DateTime)

    def __init__(self, url=None, description=None, title=None, img_url=None):
        super(Link, self).__init__()
        self.url = url
        self.description = description
        self.title = title
        self.img_url = img_url
        self.date_uploaded = datetime.utcnow()

    @classmethod
    def create_from_url(cls, url):
        response = requests.get(url)
        page = BeautifulSoup(response.content)
        title = page.title.string
        description = page.find('meta', property='og:description').attrs.get('content')
        image_link = page.find('meta', property='og:image').attrs.get('content')
        '''image_extension = re.search(r'.[A-za-z]+$', image_link).group(0)
        image_name = '{0}{1}'.format('image', image_extension)
        img_path = os.path.join(current_app.config.get('BASE_DIR'), 'static', 'media', image_name)
        file = cStringIO.StringIO(urllib.urlopen(image_link).read())
        image = Image.open(file)
        image_link = url_for('static', filename='media/{0}'.format(image_name))
        image.save(img_path)'''
        return cls(url=url, title=title, description=description, img_url=image_link)