from datetime import datetime, timedelta
def resetter(connector):
    try:
        cur = connector.connection.cursor()
        cur.execute('''UPDATE users SET
                                text_tests_today = 0,
                                code_tests_today = 0,
                                total_code_accuracy_today = 0,
                                total_text_accuracy_today = 0,
                                total_code_wpm_today = 0,
                                total_text_wpm_today = 0,
                                highest_text_wpm_today = 0,
                                highest_text_accuracy_today = 0,
                                highest_code_accuracy_today = 0,                                    highest_code_wpm_today = 0
                            ''')
        connector.connection.commit()
        cur.close()
        return {'msg': 'Statistics reset successfully'}, 200
    except Exception as e:
        raise e