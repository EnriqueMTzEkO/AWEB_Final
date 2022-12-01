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
DROP PROCEDURE IF EXISTS `sp_show`
DELIMITER //
CREATE PROCEDURE `sp_show`(IN `key` BINARY(16), IN `id` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT * FROM `seats` WHERE `SH_id` = `id`;
    END IF ;
END //
DELIMITER ;