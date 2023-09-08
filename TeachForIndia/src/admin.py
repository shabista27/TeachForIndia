# -*- coding: utf-8 -*-
"""
Created on Thu Sep  7 18:34:25 2023

@author: Shabista
"""


import pymongo
from pymongo import MongoClient

# Connect to the MongoDB server running on localhost at port 27017
client = MongoClient('localhost', 27017)
# Access a specific database, for example, "TeachForIndia"
db = client['TeachForIndia']
# Access a collection, for example, "registration"
collection = db['admin']

# Find all documents in the collection
cursor = collection.find()

document = {'user':'admin','password':'12345'}
collection.insert_one(document)
