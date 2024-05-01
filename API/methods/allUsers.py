def allusers(connector):
    try:
        cur = connector.connection.cursor()
        cur.execute('SELECT * FROM users')   
        result = cur.fetchall() 
        cur.close()  
        if result:
            return {'Tables' : result}
        else:
            return {'Err' : "No tables"}
                   
    except Exception as e:
        return {'error': 'failed to communicate with server'}, 500