__author__ = 'Tim Martin'
from flask import render_template
from models import Link
from spelinkyapp import app


@app.route('/ad_panel')
def ad_control():
    pass


@app.route('/logout')
def logout():
    pass


@app.route('/')
def index():
    return render_template('main/home.html')


@app.route('/profile')
def profile():
    pass


def generate_apis(api_manager):
    """
    Generates the rest endpoints necessary for CRUD

    :param api_manager: The flask restless api manager
    :type api_manager: flask_restless.APIManager
    """
    api_manager.create_api(Link,
                           methods=['GET'],
                           include_columns=['id', 'url', 'title', 'img_url', 'description'])
