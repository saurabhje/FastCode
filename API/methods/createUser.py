def create_user(cur, connector, name, password, email):
    try:
        cur.execute(
            '''INSERT INTO users(
            name, password, email
            ) VALUES (%s, %s, %s)''', (name, password, email)
        )
        connector.connection.commit()
    except Exception as err:
        raise err