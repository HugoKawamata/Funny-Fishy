from flask import Response, jsonify

def _data(status_code, data):
    """
    Helper method to create non-error responses adhearing to the Google JSON
    style-guide.
    """
    response = jsonify({"data": data} if data else {})
    response.status_code = status_code
    return response


def ok(data):
    """
    The request has succeeded.
    """
    return _data(200, data)

def send_json_response(data):
    resp = Response(response=str(data),
                    status=200,
                    mimetype="application/json")

    return resp