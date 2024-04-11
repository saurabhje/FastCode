from datetime import datetime, timedelta
def resetter(connector):
    try:
        today_date = datetime.now().date()
        cur = connector.connection.cursor()
        cur.execute('SELECT id, last_updated FROM users')
        users = cur.fetchall()
        for user in users:
            user_id = user['id']
            last_updated_date = user['last_updated'] if user['last_updated'] else None
            if last_updated_date != today_date:
                cur.execute('''UPDATE users SET
                            text_tests_today = 0,
                            code_tests_today = 0,
                            total_code_accuracy_today = 0,
                            total_text_accuracy_today = 0,
                            total_code_wpm_today = 0,
                            total_text_wpm_today = 0,
                            highest_text_wpm_today = 0,
                            highest_text_accuracy_today = 0,
                            highest_code_accuracy_today = 0,
                            highest_code_wpm_today = 0,
                            last_updated = %s
                            WHERE id = %s
                            ''', (today_date, user_id))
                connector.connection.commit()
                cur.close()
                return {'msg': 'Statistics reset successfully'}, 200
            else:
                return {'msg': 'All users are already updated'}, 200
    except Exception as e:
        raise e