import sys
from flask import Flask, jsonify, render_template, send_file, request, Markup, abort, make_response, Response
from os.path import isfile, join
import json
import random

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index_page():
    rand = None
    if app.debug != False:
        rand = random.random()

    template_name = 'index.html'
    
    return render_template(template_name, debug=app.debug, random=rand)


@app.route('/js/<path:path>')
def get_javascripts(path):
    fn = 'assets/js/' + path
    if not isfile(fn):
        return render_template('404.html'), 404

    return send_file(fn)

@app.route('/img/<path:path>')
def get_image(path):
    fn = 'img/' + path
    if not isfile(fn):
        return render_template('404.html'), 404

    return send_file(fn)

@app.route('/css/<path:path>')
def css_get(path):
    fn = 'assets/css/' + path
    if not isfile(fn):
        return render_template('404.html'), 404
    return send_file(fn)


if __name__ == "__main__":
    print("Starting Asteroids server")

    debug = False
    if len(sys.argv) > 1 and sys.argv[1] == 'debug':
        debug = True

    app.debug = debug

    app.run(host='0.0.0.0', debug=debug)