from dotenv import load_dotenv
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message
from flask import render_template
import os
load_dotenv()

secretKey = os.environ.get('JWT_SECRET_KEY')
saltPassword = os.environ.get('SECURITY_PASSWORD_SALT')


def generateToken(email):
    serializer = URLSafeTimedSerializer(secret_key=secretKey)
    return serializer.dumps(email, salt=saltPassword)

def confirmToken(token, expiration=3600):
    serializer = URLSafeTimedSerializer(secret_key=secretKey)
    try:
        email = serializer.loads(
            token, salt=saltPassword, max_age=expiration
       )
        return email
    except Exception:
        return False

def sendConfirmationmail(email, link, mail):
    try:
        msg = Message(subject='KeyScripter Registration',
                      sender='keyscripter@gmail.com',
                      recipients=[email])
        msg.html = render_template('email/action.html', link=link)
        mail.send(msg)
    except Exception as e:
        return {'err' : 'Error sending email'}

