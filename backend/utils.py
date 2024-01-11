import re
from datetime import datetime, timedelta


def calculate_days_until_expiry(spoilage_days):
    expiry_date = datetime.now() + timedelta(days=spoilage_days)
    days_until_expiry = (expiry_date - datetime.now()).days
    return days_until_expiry

def validate_email(email):
    if not email or not re.match(r'^\S+@\S+\.\S+$', email):
        return False, 'Invalid email format.'
    return True, ''

def validate_password(password):
    if len(password) < 8 or not any(char.isdigit() for char in password) or not any(char.isupper() for char in password):
        return False, 'Password must be at least 8 characters long, include a number and an uppercase letter.'
    return True, ''

def validate_username(username):
    if len(username) < 3 or len(username) > 20 or not username.isalnum():
        return False, 'Username must be between 3 and 20 characters long and contain only letters and numbers.'
    return True, ''

def is_field_empty(field, field_name):
    if not field or len(field.strip()) == 0:
        return False, f'{field_name} cannot be empty.'
    return True, ''

def validate_field(field, validation_function):
    return validation_function(field)