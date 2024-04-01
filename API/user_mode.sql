-- Queries Used through out the development process

--Creating users table, general schema pattern
CREATE TABLE IF NOT EXISTS `users`(
        `id` INT(4) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        `password` VARCHAR(80) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        `total_tests` INT,
        `tests_today` INT,
        `overall_accuracy` INT,
        `accuracy_today` INT,
        `overall_wpm` INT,
        `wpm_today` INT,
        `highest_wpm_ever` INT,
        `highest_wpm_today` INT,
        `highest_accuracy_today` INT,
        PRIMARY KEY (`id`),
        UNIQUE (`username`),
        UNIQUE (`email`)
);

--Deleting a table, i created for testing
DROP TABLE Example