__author__ = 'Tim Martin'
from bs4 import BeautifulSoup
from flask import render_template, abort, request, url_for, redirect
from models import Link, db
from spelinkyapp import app
import requests


@app.route('/ad_panel')
def ad_control():
    pass


@app.route('/logout')
def logout():
    pass


@app.route('/')
def index():
    return render_template('main/ember-base.html')


@app.route('/profile')
def profile():
    pass


@app.route('/postlink', methods=['POST'])
def post_link():
    link = request.form.get('link_url', None)
    if link is None:
        abort(400)
    l = Link.create_from_url(link)
    db.session.add(l)
    db.session.commit()
    return redirect(url_for('index'))


def generate_apis(api_manager):
    """
    Generates the rest endpoints necessary for CRUD

    :param api_manager: The flask restless api manager
    :type api_manager: flask_restless.APIManager
    """
    api_manager.create_api(Link,
                           methods=['GET'],
                           include_columns=['id', 'url', 'title', 'img_url', 'description', 'date_uploaded'])
