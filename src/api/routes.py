import os
from flask import Flask, request, jsonify, url_for, Blueprint
from models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user:
        return jsonify(logged_in_as=current_user), 200
    else:
        return jsonify({"msg": "Error with the token."})


@api.route("/signup", methods=["POST"])
def sign_up():
    data = request.get_json()
    user = User(email=data["email"], password=data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "user created"}), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if "email" not in data or data["email"] == "":
        return jsonify({"msg": "Bad email."}), 400
    if "password" not in data or data["password"] == "":
        return jsonify({"msg": "Bad password"}), 400
    else:
        access_token = create_access_token(identity=data["email"])
        return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    message = {
        "message": "hello world"
    }
    return jsonify(message)
