-- The key must be created before using this function.
DROP FUNCTION IF EXISTS `auth_client`;
DELIMITER //
CREATE FUNCTION `auth_client`(`client_key` BINARY(16))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE temp BLOB;
	SELECT UNHEX(SHA2('Lg3a18Fz49ZiMo0E',512)) INTO temp;
	RETURN AES_DECRYPT(`client_key`, temp) = BINARY('Lo452VkDEfmqMRS');
END //
DELIMITER ;

-- Good UUID
DROP FUNCTION IF EXISTS `guuid`;
DELIMITER //
CREATE FUNCTION `guuid`()
RETURNS BINARY(16)
NO SQL
BEGIN
	RETURN UNHEX(REPLACE(uuid(),'-',''));
END //
DELIMITER ;

-- Get Movies
DROP PROCEDURE IF EXISTS `sp_movie_full`;
DELIMITER //
CREATE PROCEDURE `sp_movie_full`(IN `key` BINARY(16), IN `inid` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT * FROM `full_movie` WHERE `id` = `inid`;
    END IF;
END //
DELIMITER ;

-- Get actors
DROP PROCEDURE IF EXISTS `sp_get_actors`;
DELIMITER //
CREATE PROCEDURE `sp_get_actors`(IN `key` BINARY(16), IN `intt` VARCHAR(48))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT `name`, `role` FROM `involved`
        WHERE `title` = `intt`;
    END IF;
END //
DELIMITER ;

-- Get Companies
DROP PROCEDURE IF EXISTS `sp_get_company`;
DELIMITER //
CREATE PROCEDURE `sp_get_company`(IN `key` BINARY(16), IN `intt` VARCHAR(48))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT `name`, `role` FROM `comp`
        WHERE `title` = `intt`;
    END IF;
END //
DELIMITER ;

-- Create new user
DROP PROCEDURE IF EXISTS `sp_create_user`;
DELIMITER //
CREATE PROCEDURE `sp_create_user`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `pw` VARCHAR(127), IN `em` VARCHAR(64))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		INSERT INTO `USERS`(`id`,`username`,`password`,`email`,`role`,`active`) VALUES(guuid(), `un`, `pw`, `em`, 1, 1);
        SELECT TRUE;
    END IF;
END //
DELIMITER ;

-- Get credentials
DROP PROCEDURE IF EXISTS `sp_get_credentials`;
DELIMITER //
CREATE PROCEDURE `sp_get_credentials`(IN `key` BINARY(16), IN `un` VARCHAR(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT COUNT(`id`) AS id, `username`, `password`, `role`, `active`
        FROM `users`
        WHERE `username` = `un`;
	END IF;
END //
DELIMITER ;

-- Check for dupes
DROP PROCEDURE IF EXISTS `sp_dupe_check`;
DELIMITER //
CREATE PROCEDURE `sp_dupe_check`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `em` VARCHAR(64))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT COUNT(`id`) AS id FROM `users` WHERE `username` = `un` OR `email` = `em`;
    END IF;
END //
DELIMITER ;

-- Create cookie
DROP PROCEDURE IF EXISTS `sp_create_cookie`
DELIMITER //
CREATE PROCEDURE `sp_create_cookie`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `tk` TEXT)
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		UPDATE `users` SET `token` = `tk` WHERE `username` = `un`;
    END IF;
END //
DELIMITER ;

-- Get cookie
DROP PROCEDURE IF EXISTS `sp_get_cookie`
DELIMITER //
CREATE PROCEDURE `sp_get_cookie`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `tk` TEXT)
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT `username` FROM `users` WHERE `username` = `un` AND `token` = `tk`;
    END IF;
END //
DELIMITER ;

-- Delete cookie
DROP PROCEDURE IF EXISTS `sp_delete_cookie`
DELIMITER //
CREATE PROCEDURE `sp_delete_cookie`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `tk` TEXT)
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		UPDATE `users` SET `token` = '' WHERE `username` = `un` AND `token` = `tk`;
        SELECT `token` FROM `users` WHERE `username` = `un`;
    END IF;
END //
DELIMITER ;

-- Get one show
DROP PROCEDURE IF EXISTS `sp_seats`;
DELIMITER //
CREATE PROCEDURE `sp_seats`(IN `key` BINARY(16), IN `i` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT HEX(`id`) AS `id`, `row`, `slot`, `status` FROM `seats` WHERE `SH_id` = `i`;
    END IF ;
END //
DELIMITER ;

-- Get Showings
DROP PROCEDURE IF EXISTS `sp_show`;
DELIMITER //
CREATE PROCEDURE `sp_show`(IN `key` BINARY(16), IN `hx` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT HEX(`id`) AS `id`, unix_timestamp(`start`) AS `start`, unix_timestamp(`end`) AS `end`, `hall`
        FROM `showings`
        WHERE `MV_id` = `hx` AND `start` > DATE_ADD(NOW(), INTERVAL 20 MINUTE);
    END IF ;
END //
DELIMITER ;

-- Movie ids
DROP PROCEDURE IF EXISTS `sp_movie_init`;
DELIMITER //
CREATE PROCEDURE `sp_movie_init`(IN `key` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT HEX(`id`) AS `id`, `title` FROM `full_movie`;
    END IF ;
END //
DELIMITER ;

-- Mess
DROP PROCEDURE IF EXISTS `sp_show_show`;
DELIMITER //
CREATE PROCEDURE `sp_show_show`(IN `key` BINARY(16), IN `hx` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT HEX(`id`) AS `id`, unix_timestamp(`start`) AS `start`, unix_timestamp(`end`) AS `end`, `hall`
        FROM `showings`
        WHERE `start` > DATE_ADD(NOW(), INTERVAL 20 MINUTE) AND `MV_id` = (
        SELECT `MV_id` FROM `showings` WHERE `id` = `hx`);
    END IF ;
END //
DELIMITER ;

CALL sp_show_show(UNHEX('c7487f380e204d0a47972b0d2f244cf7'), UNHEX('EFFB9919753411ED8B3500155DF03F05'));

SELECT HEX(`id`) AS `id`, unix_timestamp(`start`) AS `start`, unix_timestamp(`end`) AS `end`, `hall`
        FROM `showings`
        WHERE `start` > DATE_ADD(NOW(), INTERVAL 20 MINUTE) AND `MV_id` = (
        SELECT `MV_id` FROM `showings` WHERE `id` = UNHEX('EFFB9919753411ED8B3500155DF03F05'));