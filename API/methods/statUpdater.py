def statUpdate(connector, id, wpm, accuracy, testType):
    cur = connector.connection.cursor()
    try:
        if testType == 'code' or testType == 'text':
            type_prefix = 'code' if testType == 'code' else 'text'
            
            cur.execute(f'''SELECT {type_prefix}_total_tests,
                        {type_prefix}_tests_today,
                        total_{type_prefix}_accuracy_today,
                        total_{type_prefix}_accuracy,
                        total_{type_prefix}_wpm,
                        total_{type_prefix}_wpm_today,
                        highest_{type_prefix}_wpm_ever,
                        highest_{type_prefix}_wpm_today,
                        highest_{type_prefix}_accuracy_today
                        FROM users WHERE id = %s''', (id,))
            data = cur.fetchone()
            if data:
                total_tests = data[f'{type_prefix}_total_tests'] + 1 if data[f'{type_prefix}_total_tests'] else 1
                tests_today = data[f'{type_prefix}_tests_today'] + 1 if data[f'{type_prefix}_tests_today'] else 1
                total_accuracy_today = data[f'total_{type_prefix}_accuracy_today'] + accuracy
                total_accuracy = data[f'total_{type_prefix}_accuracy'] + accuracy if data[f'total_{type_prefix}_accuracy'] else accuracy
                total_wpm = data[f'total_{type_prefix}_wpm'] + wpm if data[f'total_{type_prefix}_wpm'] else wpm
                total_wpm_today = data[f'total_{type_prefix}_wpm_today'] + wpm
                highest_wpm_today = data[f'highest_{type_prefix}_wpm_today']
                highest_wpm_ever = data[f'highest_{type_prefix}_wpm_ever'] if data[f'highest_{type_prefix}_wpm_ever'] else 0
                highest_accuracy_today = data[f'highest_{type_prefix}_accuracy_today']

                if wpm > highest_wpm_today:
                    highest_wpm_today = wpm
                    if wpm > highest_wpm_ever:
                        highest_wpm_ever = wpm
                if accuracy > highest_accuracy_today:
                    highest_accuracy_today = accuracy

            cur.execute(f'''UPDATE users SET {type_prefix}_total_tests = %s,
                        {type_prefix}_tests_today = %s,
                        total_{type_prefix}_accuracy_today = %s,
                        total_{type_prefix}_accuracy = %s,
                        total_{type_prefix}_wpm = %s,
                        total_{type_prefix}_wpm_today = %s,
                        highest_{type_prefix}_wpm_ever = %s,
                        highest_{type_prefix}_wpm_today = %s,
                        highest_{type_prefix}_accuracy_today = %s
                        WHERE id = %s''',
                        (total_tests, tests_today, total_accuracy_today,
                         total_accuracy, total_wpm, total_wpm_today,
                         highest_wpm_ever, highest_wpm_today,
                         highest_accuracy_today, id))
        connector.connection.commit()
        cur.close()
        return {'msg': 'stat updted'}, 200
    except Exception as e:
        return {'err': str(e)}, 503
