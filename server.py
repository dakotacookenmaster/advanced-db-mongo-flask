from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS, cross_origin

# Set up the flask app
app = Flask(__name__)

# Set up cors
CORS(app)

# pprint library is use to make the output pretty
from pprint import pprint

# Set up the MongoDB connection
client = MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")

# Set up the DB to connect to the right schema
db = client["my-business"]

# Issue the serverStatus command and print the results
serverStatusResult = db.command("serverStatus")
pprint(serverStatusResult)

@app.route("/")
@cross_origin()
def find_all_customers():
    customers = list(db.customers.find())
    return json_util.dumps(customers)

@app.route("/find-by/name/<name>")
@cross_origin()
def find_by_name(name: str):
    # Find customers where name is like name, using regex
    customers = list(db.customers.find({
        "name": {
            "$regex": f"{name}",
            "$options": "i", # case insensitive
        },
    }))

    return json_util.dumps(customers)

@app.route("/find-by/address/<address>")
@cross_origin()
def find_by_address(address: str):
    # Find customers where name is like name, using regex
    customers = list(db.customers.find({
        "addresses": {
            "$regex": f"{address}",
            "$options": "i", # case insensitive
        },
    }))

    return json_util.dumps(customers)

@app.route("/find-by/email/<email>")
@cross_origin()
def find_by_email(email: str):
    # Find customers where name is like name, using regex
    customers = list(db.customers.find({
        "email": {
            "$regex": f"{email}",
            "$options": "i", # case insensitive
        },
    }))

    return json_util.dumps(customers)

