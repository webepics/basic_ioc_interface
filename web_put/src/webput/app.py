# -*- coding: utf-8 -*-
from caproto.sync import client
from flask import Flask, make_response, request


app = Flask(__name__)


@app.route("/put", methods=["POST"])
def put():
    response = make_response("")
    response.headers["Access-Control-Allow-Origin"] = "*"
    client.write(request.args.get("pv"), request.args.get("value"))
    return response
