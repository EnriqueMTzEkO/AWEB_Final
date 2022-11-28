-- The key must be created before using this function.
DROP FUNCTION IF EXISTS `auth_client`;
DELIMITER //
CREATE DEFINER='b8977KlEEZRy'@'localhost' FUNCTION `auth_client`(`key` BINARY(16))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	RETURN AES_DECRYPT(`key`, @user_key) = BINARY('Lo452VkDEfmqMRS');
END //
DELIMITER ;

-- Good UUID
DROP FUNCTION IF EXISTS `guuid`;
DELIMITER //
CREATE FUNCTION `guuid`()
RETURNS BINARY(16)
NOT DETERMINISTIC
BEGIN
	RETURN UNHEX(REPLACE(uuid(),'-',''));
END //
DELIMITER ;

-- Get Movies
DROP PROCEDURE IF EXISTS `sp_movie_full`;
DELIMITER //
CREATE PROCEDURE `sp_movie_full`(IN `key` BINARY(16),IN `inid` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT * FROM `full_movie` WHERE `id` = `inid`;
    END IF;
END //
DELIMITER ;

-- Get actors
DROP PROCEDURE IF EXISTS `sp_get_actors`;
DELIMITER //
CREATE PROCEDURE `sp_get_actors`(IN `key` BINARY(16),IN `inid` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT `Nombre`, `Rol` FROM `involved`
        WHERE `Película` = (
			SELECT `Título` FROM `full_movie` WHERE `id` = `inid`
        );
    END IF;
END //
DELIMITER ;

-- Get Companies
DROP PROCEDURE IF EXISTS `sp_get_company`;
DELIMITER //
CREATE PROCEDURE `sp_get_company`(IN `key` BINARY(16),IN `inid` BINARY(16))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		SELECT `Compañía`, `Rol` FROM `comp`
        WHERE `Película` = (
			SELECT `Título` FROM `full_movie` WHERE `id` = `inid`
        );
    END IF;
END //
DELIMITER ;

-- Create new user
DROP PROCEDURE IF EXISTS `sp_create_user`;
DELIMITER //
CREATE PROCEDURE `sp_create_user`(IN `key` BINARY(16), IN `un` VARCHAR(16), IN `pw` CHAR(72), IN `em` VARCHAR(64))
BEGIN
	IF `auth_client`(`key`) = 1 THEN
		INSERT INTO `USERS`(`id`,`username`,`password`,`email`,`role`,`active`) VALUES(guuid(), `un`, `pw`, `em`, 1, 1);
        SELECT TRUE;
    END IF;
END //
DELIMITER ;