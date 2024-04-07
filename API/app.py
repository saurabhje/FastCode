from flask import Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from database_operation import create_user
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
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

jwt = JWTManager(app)
mysql = MySQL(app)
bcrypt = Bcrypt(app)


@app.route('/')
def index():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SHOW TABLES')
        results = cur.fetchone() 
        cur.close()  
        if results:
            return {'message': results}, 200
        else:
            return {'error':'failed to initialize database'}, 503
                   
    except Exception as e:
        return {'error': 'failed to communicate with server'}, 500

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
    
@app.route('/createdb')
def createdb():
    try:
        cur = mysql.connection.cursor()
        cur.execute()
        cur.close()
        return {'true': 'done'}
    
    except Exception as e:
        return {'failed': str(e)}
    
