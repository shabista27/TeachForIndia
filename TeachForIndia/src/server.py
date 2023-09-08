# -*- coding: utf-8 -*-

"""
Created on Wed Sep  6 13:28:16 2023

@author: Shabista
"""

import flask
from flask import Response,request,jsonify
from flask_cors import CORS
from flask_api import status
from db import insert,adminLogIn,showDataRegistration
from matching import process_applicants_and_get_additional_info

app = flask.Flask(__name__)
CORS(app)

@app.route('/registration', methods=['POST'])
def registration():
    try:
        data = request.json
        name = data.get('Name')
        phone = data.get('PhoneNumber')
        email = data.get('Email')
        location = data.get('Location')
        language = data.get('Lang')
        days = data.get('Days')

        if None in (name, phone, email, location, language, days):
            resp=flask.Response( "Some fields are missing or invalid", status=status.HTTP_400_BAD_REQUEST)
            return resp
        msg = insert(name, phone, email, location, language, days)

        if msg:
            resp=flask.Response( "Registration successful!", status=status.HTTP_200_OK)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
        
        else:
            resp=flask.Response( "Registration failed. Please try again.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
        
    except Exception as e:
        print(f"An error occurred during registration: {str(e)}")
        resp=flask.Response("An error occurred. Please try again later.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    


@app.route('/adminlogIn', methods=['POST'])
def adminlogIn():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            #print(username,password)
            resp = flask.Response("Username and password are required",status=status.HTTP_400_BAD_REQUEST)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
        try:
            #print(username,password)
            msg = adminLogIn(username, password)

            if msg == True:
                resp = flask.Response("Done", status=status.HTTP_200_OK)
                resp.headers.add('Access-Control-Allow-Origin', '*')
                return resp
            else:
                resp = flask.Response("Login failed. Please check your credentials", status.HTTP_401_UNAUTHORIZED)
                resp.headers.add('Access-Control-Allow-Origin', '*')
                return resp
                #return jsonify({'error': 'Login failed. Please check your credentials'}), status.HTTP_401_UNAUTHORIZED
        
        except Exception as e:
            #print(f"Error while accessing the database: {str(e)}")
            resp = flask.Response("An error occurred while accessing the database", status.HTTP_500_INTERNAL_SERVER_ERROR)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
            #return jsonify({'error': 'An error occurred while accessing the database'}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except Exception as e:
        #print(f"Error in the adminlogIn route: {str(e)}")
        resp = flask.Response("An error occurred in the adminlogIn route", status.HTTP_500_INTERNAL_SERVER_ERROR)
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
        #return jsonify({'error': 'An error occurred in the adminlogIn route'}), status.HTTP_500_INTERNAL_SERVER_ERROR

@app.route("/getData", methods=["GET"])
def getData():
    try:
        # Create a list of data (example)
        data_list=showDataRegistration()
        #print(data_list)
        # Convert the list to JSON and send it as the response
        return jsonify(data_list), 200
    except Exception as e:
        return str(e), 400

@app.route("/getApplicantData", methods=["GET"])
def getApplicantData():
    try:
        #print("hello")
        data_list=process_applicants_and_get_additional_info()
        # Remove the '_id' field from each document
        for item in data_list:
            item.pop('_id', None)
        #print(data_list)
        
        return jsonify(data_list),200
    except Exception as e:
        return str(e), 400
    
if __name__ == "__main__":
 
#app.debug=True
    app.run()