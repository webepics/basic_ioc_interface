from bottle import (post, run, request, response)
from caproto.sync.client import write

@post('/put')
def put():
    response.headers['Access-Control-Allow-Origin'] = '*'
    write(request.query.pv, request.query.value)
    return response

run(host='0.0.0.0', port=8081, debug=True)