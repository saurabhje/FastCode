-- Queries Used through out the development process {These are not supposed to }

--Creating users table, general schema pattern
CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(4) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `last_updated` DATE,
    `text_total_tests` INT DEFAULT 0,
    `text_tests_today` INT DEFAULT 0,
    `code_total_tests` INT DEFAULT 0,
    `code_tests_today` INT DEFAULT 0,
    `total_code_accuracy_today` FLOAT DEFAULT 0,
    `total_text_accuracy_today` FLOAT DEFAULT 0,
    `total_code_accuracy` FLOAT DEFAULT 0,
    `total_text_accuracy` FLOAT DEFAULT 0,
    `total_code_wpm` FLOAT DEFAULT 0,
    `total_text_wpm` FLOAT DEFAULT 0,
    `total_code_wpm_today` FLOAT DEFAULT 0,
    `total_text_wpm_today` FLOAT DEFAULT 0,
    `highest_text_wpm_ever` FLOAT DEFAULT 0,
    `highest_text_wpm_today` FLOAT DEFAULT 0,
    `highest_text_accuracy_today` FLOAT DEFAULT 0,
    `highest_code_wpm_ever` FLOAT DEFAULT 0,
    `highest_code_wpm_today` FLOAT DEFAULT 0,
    `highest_code_accuracy_today` FLOAT DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE (`email`)
);


--Deleting a table, i created for testing
DROP TABLE Example

-- Adding last updated column
ALTER TABLE users
ADD last_updated DATE