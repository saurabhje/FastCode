-- Queries Used through out the development process {These are not supposed to }

--Creating users table, general schema pattern
CREATE TABLE IF NOT EXISTS `users`(
        `id` INT(4) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        `password` VARCHAR(80) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `last_updated` DATE,
        `text_total_tests` INT,
        `text_tests_today` INT,
        `code_total_tests` INT,
        `code_tests_today` INT,
        `total_code_accuracy_today` FLOAT,
        `total_text_accuracy_today` FLOAT,
        `total_code_accuracy` FLOAT,
        `total_text_accuracy` FLOAT,
        `total_code_wpm` FLOAT,
        `total_text_wpm` FLOAT,
        `total_code_wpm_today` FLOAT,
        `total_text_wpm_today` FLOAT,
        `highest_text_wpm_ever` FLOAT,
        `highest_text_wpm_today` FLOAT,
        `highest_text_accuracy_today` FLOAT,
        `highest_code_wpm_ever` FLOAT,
        `highest_code_wpm_today` FLOAT,
        `highest_code_accuracy_today` FLOAT,
        PRIMARY KEY (`id`),
        UNIQUE (`email`)
);

--Deleting a table, i created for testing
DROP TABLE Example

-- Adding last updated column
ALTER TABLE users
ADD last_updated DATE