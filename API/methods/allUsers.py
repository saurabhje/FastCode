def allusers(connector):
    try:
        cur = connector.connection.cursor()
        cur.execute('SELECT * FROM users')
        users = cur.fetchall()
        
        cur.close()
        response = {
            'users': users
        }    
        return response, 200                   
    except Exception as e:
        return {'error': f'failed to communicate with server - {str(e)}'}, 500
