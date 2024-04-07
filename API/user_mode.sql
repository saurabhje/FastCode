-- Queries Used through out the development process

--Creating users table, general schema pattern
CREATE TABLE IF NOT EXISTS `users`(
        `id` INT(4) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        `password` VARCHAR(80) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `text_total_tests` INT,
        `text_tests_today` INT,
        `code_total_tests` INT,
        `code_tests_today` INT,
        `avg_code_accuracy_today` INT,
        `avg_text_accuracy_today` INT,
        `avg_code_accuracy` INT,
        `avg_text_accuracy` INT,
        `avg_code_wpm` INT,
        `avg_text_wpm` INT,
        `avg_code_wpm_today` INT,
        `avg_text_wpm_today` INT,
        `highest_text_wpm_ever` INT,
        `highest_text_wpm_today` INT,
        `highest_text_accuracy_today` INT,
        `highest_code_wpm_ever` INT,
        `highest_code_wpm_today` INT,
        `highest_code_accuracy_today` INT,
        PRIMARY KEY (`id`),
        UNIQUE (`email`)
);

--Deleting a table, i created for testing
DROP TABLE Example