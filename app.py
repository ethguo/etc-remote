from flask import Flask
from flask import render_template
from flask import request

import os
import requests

app = Flask(__name__)

DEVICE_ID = os.environ["DEVICE_ID"]
ACCESS_TOKEN = os.environ["ACCESS_TOKEN"]

@app.route("/")
def getIndex():
	return render_template("index.html")

@app.route("/post", methods=["POST"])
def post():
	command = request.form["command"]

	url = "https://api.particle.io/v1/devices/%s/dtmf?access_token=%s" % (DEVICE_ID, ACCESS_TOKEN)
	data = {"args": "**" + command + "#"}
	r = requests.post(url, data=data)

	return r.text

if __name__ == '__main__':
	app.run(debug=True)
