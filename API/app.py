from flask import Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from methods.statUpdater import statUpdate
from methods.resetter import resetter
from methods.createUser import create_user
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
app.config['MYSQL_PORT'] = 19228
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config['MYSQL_SSL_CA'] = '/path/to/your/ca/certificate.pem'

jwt = JWTManager(app)
mysql = MySQL(app)
bcrypt = Bcrypt(app)


# Essentially to keep the server alive
@app.route('/')
def index():
    try:
        cur = mysql.connection.cursor()
        result = cur.execute('SHOW TABLES')    
        cur.close()  
        if result:
            return {'Tables' : result}
        else:
            return {'Err' : "No tables"}
                   
    except Exception as e:
        return {'error': 'failed to communicate with server'}, 500

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

# Registering the user
@app.route('/register', methods=['POST'])
def insert():
    try:
        data = request.get_json()
        cur = mysql.connection.cursor()
        name = data['name']
        password = bcrypt.generate_password_hash(data['password'])
        email = data['email']
        create_user(cur, mysql, name, password, email)
        cur.close()
        return {'message': 'user created successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 400

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


    