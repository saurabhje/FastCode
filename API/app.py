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
import os
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')

jwt = JWTManager(app)
mysql = MySQL(app)
bcrypt = Bcrypt(app)


@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM users''')
    results = cur.fetchall() 
    cur.close()        
    return {'data': results}, 200

@app.route('/login', methods=['POST'])
def check_cred():
    try:
        data = request.get_json()
        cur = mysql.connection.cursor()
        email = data['email']
        password = data['password']
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cur.fetchone()
        cur.close()
        if user and bcrypt.check_password_hash(user['password'], password):
            access_token = create_access_token(identity=user['id'])
            return {'token' : access_token}
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

