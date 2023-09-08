# -*- coding: utf-8 -*-
"""
Created on Thu Sep  7 17:10:09 2023

@author: Shabista
"""
from pymongo import MongoClient

# Connect to the MongoDB server running on localhost at port 27017
client = MongoClient('localhost', 27017)
# Access a specific database, for example, "TeachForIndia"
db = client['TeachForIndia']
# Access a collection, for example, "registration"



def insert(name,phone,email,location,language,days):
    collection = db['registration']
    #location=location.split(',')
    language=language.split(',')
    document = {"Name": name, "Phone Number":phone, "Email":email,"Location":location,"Languages":language,"Available Days":days}
    collection.insert_one(document)
    client.close()

    return True

def adminLogIn(username,password):
   collection = db['admin']
   user = collection.find_one({'user': username, 'password': password})
   client.close()

   if user:
       return True
   else:
       return False

def showDataRegistration():
    try:    # Retrieve data from MongoDB (example)
     collection = db['registration']
     cursor = collection.find()
     # Create a list to store JSON-serializable data
     data_list = []
     for document in cursor:
         # Convert ObjectId to string
         document['_id'] = str(document['_id'])
         # Append the modified document to the list
         data_list.append(document)
     return data_list  # Return JSON-serializable data
    except Exception as e:
         return str(e), 400

def getDataClassrom():
    collection=db['classrooms']
    cursor=collection.find()
    data_list=[]
    
    for document in cursor:
    # Convert ObjectId to string (if _id field is present)
        if '_id' in document:
            document['_id'] = str(document['_id'])
            data_list.append(document)
    client.close()
    #print(data_list)
    return data_list


# Function to get additional information for matching applicants
def get_additional_info_for_matching_applicants(matching_applicants):
    additional_info = []  # Initialize a list to store additional info for matching applicants

    try:
        collection = db["registration"]
        for applicant in matching_applicants:
            # Query MongoDB for additional information based on the applicant's name
            applicant_name = applicant["Name"]
            applicant_info = collection.find_one({"Name": applicant_name})
            if applicant_info:
                if "_id" in applicant_info:
                    del applicant_info["_id"]
                # Append the additional information to the list
                additional_info.append(applicant_info)
                
            else:
                print(f"No data found for applicant: {applicant_name}")

    except Exception as e:
        print(f"Error while querying MongoDB: {str(e)}")

    return additional_info

#result=showDataRegistration()
print("this is database here")




