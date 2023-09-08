# -*- coding: utf-8 -*-
"""
Created on Fri Sep  8 11:25:49 2023

@author: Shabista
"""

from db import getDataClassrom, showDataRegistration,get_additional_info_for_matching_applicants


def does_applicant_match_classroom(applicant, classroom):
    # Check if there's an intersection between the applicant's locations and the classroom's location
    applicant_locations = [','.join(applicant.get("Location", [])).lower()]    #print(applicant_locations)
    applicant_locations = [location.replace(',', '') for location in applicant_locations]

    # Convert classroom's location to lowercase if it exists
    classroom_locations = [location.lower() for location in (classroom.get("location") or "").split(",")]
    #print(applicant_locations,classroom_locations)

    # Check if there's an intersection between the lowercase lists
    if (not classroom_locations or any(location in classroom_locations for location in applicant_locations)):
        # Check if the applicant speaks any of the required languages or if there is no language requirement
        if not classroom["languageRequirement"] or any(language in applicant["Languages"] for language in classroom["languageRequirement"]):
            return True

    return False


# Result from db

classrooms = getDataClassrom()
applicants = showDataRegistration()


# Check if any applicant matches any classroom
# Process and print the retrieved data

matching_applicants = []  # Initialize an empty list to collect matching applicant names
non_matching_applicants = []  # Initialize an empty list to collect non-matching applicant names


# for applicant in applicants:
#     matched = False  # Initialize a flag to check if the applicant matches any classroom
#     for classroom in classrooms:
#         if does_applicant_match_classroom(applicant, classroom):
#             matching_applicants.append({
#                 'Name': applicant['Name'],
#                 'Classroom': classroom['classroomID']
#             })
#             matched = True  # Set the flag to True if the applicant matches a classroom
#             break

#     if not matched:
#         non_matching_applicants.append(applicant['Name'])  # Append the name of the non-matching applicant

# result= get_additional_info_for_matching_applicants(matching_applicants)

def process_applicants_and_get_additional_info():
    matching_applicants = []  # Initialize a list to collect matching applicants with all info

    for applicant in applicants:
        matched = False  # Initialize a flag to check if the applicant matches any classroom
        for classroom in classrooms:
            if does_applicant_match_classroom(applicant, classroom):
                applicant_with_info = {
                    'Name': applicant['Name'],
                    'Classroom': classroom['classroomID'],
                    'AdditionalInfo': get_additional_info_for_matching_applicants([applicant])
                }
                matching_applicants.append(applicant_with_info)
                matched = True  # Set the flag to True if the applicant matches a classroom
                break

    return matching_applicants

# Usage:
matching_applicants = process_applicants_and_get_additional_info()


#print("Matching applicants:", matching_applicants)  # Print the list of matching applicant names and classrooms
#print("Non-matching applicants:", non_matching_applicants)  # Print the list of non-matching applicant names






