from flask import Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from database_operation import create_user


app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] = 'sql6695518'
app.config['MYSQL_PASSWORD'] = 'AirLJ7ew6x'
app.config['MYSQL_HOST'] = 'sql6.freemysqlhosting.net' 
app.config['MYSQL_DB'] = 'sql6695518'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def insert():
    try:
        data = request.get_json()
        cur = mysql.connection.cursor()
        name = data['name']
        password = data['password']
        email = data['email']
        create_user(cur, mysql, name, password, email)
        cur.close()
        return {'message': 'user created successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 400
