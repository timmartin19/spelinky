__author__ = 'Tim Martin'
from spelinkyapp import app
from flask import render_template


@app.route('/ad_panel')
def ad_control():
    pass


@app.route('/logout')
def logout():
    pass


@app.route('/')
def index():
    return render_template('common/base.html')


@app.route('/profile')
def profile():
    pass


def generate_apis(api_manager):
    """
    Generates the rest endpoints necessary for CRUD

    :param api_manager: The flask restless api manager
    :type api_manager: flask_restless.APIManager
    """
    api_manager.create_api()
