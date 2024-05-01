def create_user(connector, name, password, email):
    try:
        cur = connector.connection.cursor()
        cur.execute(
            '''INSERT INTO users(
            name, password, email
            ) VALUES (%s, %s, %s)''', (name, password, email)
        )
        connector.connection.commit()
        cur.close()
    except Exception as err:
        raise err