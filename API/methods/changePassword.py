from flask_mail import Message
from flask import render_template

def sendChangeMail(changeLink, mail, email):
    try:
        msg = Message(subject='Password Change KeyScripter',
                    sender='keyscripter@gmail.com',
                    recipients=[email])
        msg.html = render_template('email/passwordEmail.html', link=changeLink)
        mail.send(msg)
    except Exception as e:
        raise e


def changepassword(connector, id, password):
    try:
        cur = connector.connection.cursor()
        cur.execute('UPDATE users SET password = %s WHERE id = %s', (password, id),)
        connector.connection.commit()
        cur.close()
        return {'msg': 'Password changed successfully'}, 200
    except Exception as e:
        return {'error' : str(e)}, 500