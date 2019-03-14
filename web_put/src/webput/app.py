# -*- coding: utf-8 -*-
from caproto.sync import client
from flask import Flask, make_response, request
import time
import json


app = Flask(__name__)


@app.route("/put", methods=["POST"])
def put():
    response = make_response("")
    response.headers["Access-Control-Allow-Origin"] = "*"
    client.write(request.args.get("pv"), request.args.get("value"))
    return response

@app.route("/get", methods=["GET"])
def get_channels_status():
    ''' process a list of pv names to get their metadata
    ''' 
    pvs = []
    chanNames = request.args.get('channels')
    if chanNames is not None:
        myNames = chanNames.split(',')
    else:
        return make_response("Error: no names")

    for name in myNames:
        pvInfo = {}
        #get timestamp, severity
        val = client.read(name, data_type='time')
        pvInfo['value'] = val.data.tolist()
        pvInfo['timestamp'] = val.metadata.timestamp
        pvInfo['timestring'] = time.asctime(time.gmtime(pvInfo['timestamp']))
        pvInfo['status'] = val.metadata.status
        pvInfo['severity'] = val.metadata.severity
        pvs.append(pvInfo)
    allValues = {'values': pvs}
    return make_response(json.dumps(allValues))