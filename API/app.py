from flask import Flask, request, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import timedelta
from methods.statUpdater import statUpdate
from methods.resetter import resetter
from methods.allUsers import allusers
from methods.createUser import create_user
from methods.changePassword import sendChangeMail, changepassword
from methods.emailToken import confirmToken, generateToken, sendConfirmationmail
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
url = os.environ.get('URL')
clogin = os.environ.get('CLOGIN')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
app.config['MYSQL_PORT'] = 22186
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config['MYSQL_SSL_CA'] = '/path/to/your/ca/certificate.pem'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'keyscripter@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

jwt = JWTManager(app)
mysql = MySQL(app)
bcrypt = Bcrypt(app)
mail = Mail(app)


# Essentially to keep the server alive
@app.route('/')
def index():
    try:
        cur = mysql.connection.cursor()
        result = cur.execute('''SHOW TABLES''')
        cur.close()
        if result:
            return {'message': result}, 200
        else:
            return {'message': ':('}, 200
              
    except Exception as e:
        return {'error': 'Failed to communicate with server'}, 500

# Fetching all profiles 
adminCode = os.environ.get('ADMIN_CODE')
@app.route('/p/<unique_code>')
def allProfiles(unique_code):
    if unique_code == adminCode:
        return allusers(mysql)
    else:
        return {'error': 'invalid unique code'}, 400

            
# loggin in
@app.route('/login', methods=['POST'])
def check_cred():
    try:
        data = request.get_json()
        cur = mysql.connection.cursor()
        email = data['email']
        password = data['password']
        expireTime = timedelta(days=10)
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cur.fetchone()
        cur.close()
        if user and bcrypt.check_password_hash(user['password'], password):
            accessToken = create_access_token(identity=user['id'], expires_delta= expireTime)
            return {'accessToken' : accessToken}, 200
        else:
            return {'error' : 'Invalid email or password'}, 401
    except Exception as e:
        return {'error' : str(e)}, 500

#this is to temperorily store the user data until s/he confirms his/her email
tempData = {} 

# confirming the user
@app.route('/register/<mailToken>')
def registeration(mailToken):
    email = confirmToken(mailToken)
    if email:
        user_data = tempData.pop(email, None)
        if user_data:
            name = user_data.get('name')
            password = user_data.get('password')
            try:
                create_user(mysql, name, password, email)
                print(clogin)
                return render_template('email/confirmation.html', link = clogin)
            except Exception as e:
                return {'error': str(e)}, 500
        else:
            return 'Already confirmed mail'
    else:
        return {'error': 'Invalid or expired token'}, 400
        

@app.route('/oauth', methods=['POST'])
def oauthHandler():
    data = request.get_json()
    email = data['email']
    name = data['name']
    cur = mysql.connection.cursor()
    cur.execute('SELECT id FROM users WHERE email=%s', (email,))
    user = cur.fetchone()
    expireTime = timedelta(days=10)
    try:
        if not user:
            cur.execute('INSERT INTO users (name, password, email) VALUES (%s, %s, %s)', (name, 'oauthauser', email))
            mysql.connection.commit()
            new_user_id = cur.lastrowid
            accessToken = create_access_token(identity=new_user_id, expires_delta= expireTime)
            return {'accessToken' : accessToken}, 200
        else:
            accessToken = create_access_token(identity=user['id'], expires_delta= expireTime)
            return {'accessToken' : accessToken}, 200
    except Exception as e:
        return {'error': str(e)}



# Registering the user
@app.route('/register', methods=['POST'])
def insert():
    try:
        cur = mysql.connection.cursor()
        data = request.get_json()
        name = data['name']
        password = bcrypt.generate_password_hash(data['password'])
        email = data['email']
        cur.execute('SELECT email FROM users WHERE email=%s', (email,))
        presentMails = cur.fetchone()
        if presentMails:
            return {'error': 'Email already registered'}, 409
        token = generateToken(email)
        confirmationLink = f"{url}/register/{token}"
        sendConfirmationmail(email, confirmationLink, mail)
        tempData[email]  = {'name': name, 'password': password}
        return {'message': 'Confirmation link sent successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 400
    
#Changing the password
@app.route('/changepassword', methods=['POST'])
def requestChangepassword():
    try:
        cur = mysql.connection.cursor()
        data = request.get_json()
        email = data['email']
        cur.execute('SELECT id FROM users WHERE email=%s', (email,))
        id = cur.fetchone()
        if not id:
            return {'error': 'Email not registered'}, 401
        changeLink = f"{url}/changepassword/{id['id']}"
        sendChangeMail(changeLink, mail, email)
        return {'message': 'Password change email sent successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
@app.route('/changepassword/<id>', methods=['GET','POST'])
def resetpassword(id):
    if request.method == 'GET':
        return render_template('email/changePassword.html', url=url, id=id)
    if request.method == 'POST':
        data = request.get_json()
        password = bcrypt.generate_password_hash(data['password'])
        return changepassword(mysql, id, password)
    
# Sending stats for clientSide dashboard   
@app.route('/profile')
@jwt_required()
def sendStats():
    try:
        user_id = get_jwt_identity()
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        user_data = cur.fetchone()
        cur.close()
        if user_data:
            user_data.pop('password', None)
            return {'Info' : user_data}, 200
        else:
            return {'error' : 'user not found'}, 404

    except Exception as e:
        return {'error' : str(e)}, 500

# Updating the stats if the user is playing
@app.route('/alter', methods=['POST'])
@jwt_required()
def alterStats():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        new_wpm = float(data['wpm'])
        new_accuracy = float(data['accuracy'])
        testType = data['testType']
        statUpdate(mysql, user_id, new_wpm, new_accuracy, testType)
        return {'msg' : 'Stat update'}, 200
    except Exception as e:
        return {'err' : str(e)}, 503

# Route to automatically reset 'today' related stats for each users after a new calender day
@app.route('/resetter')
def reset_statistics():
    try:
        return resetter(mysql)
    except Exception as e:
        return {'error': str(e)}, 500


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=False)