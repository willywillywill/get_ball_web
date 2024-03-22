import flask
from flask import Flask, request
from flask import render_template

app = flask.Flask(__name__)

@app.route('/', methods=["GET"])
def main():
    info = request.values.get("val")
    print(f"get->{info}")
    return "OK"

@app.route('/config', methods=["GET"])
def config():
    info = request.values.to_dict()
    print(info)
    return "ok"


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)