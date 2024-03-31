-- Queries Used through out the development process

--Creating users table, general schema pattern
CREATE TABLE IF NOT EXISTS `users`(
        `id` INT(4) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        `password` VARCHAR(20) NOT NULL,
        `email` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE (`id`),
        UNIQUE (`email`)
)

--Deleting a table, i created for testing
DROP TABLE Example