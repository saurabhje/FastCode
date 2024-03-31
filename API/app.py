from flask import Flask
from flask_mysqldb import MySQL


app = Flask(__name__)

app.config['MYSQL_USER'] = 'sql6695518'
app.config['MYSQL_PASSWORD'] = 'AirLJ7ew6x'
app.config['MYSQL_HOST'] = 'sql6.freemysqlhosting.net' 
app.config['MYSQL_DB'] = 'sql6695518'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/')
def index():
    cur = mysql.connection.cursor()
    # cur.execute('''CREATE TABLE Example (id INT, name VARCHAR(40))''')
    # cur.execute('''INSERT INTO Example VALUES (1, 'Anthony')''')
    # cur.execute('''INSERT INTO Example VALUES(2, 'Billy')''')
    # mysql.connection.commit()
    cur.execute('''SELECT * FROM Example''')
    results = cur.fetchall()
    return results[0]['name']
