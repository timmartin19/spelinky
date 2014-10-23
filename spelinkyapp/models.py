__author__ = 'Tim Martin'
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.user import UserMixin

db = SQLAlchemy()


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