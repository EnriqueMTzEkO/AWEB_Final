-- Credentials Confirmer
-- The key must be created before using this function.
DROP FUNCTION IF EXISTS `auth_client_admin`;
DELIMITER //
CREATE FUNCTION `auth_client_admin`(`client_key` BINARY(16))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	SELECT UNHEX(SHA2(`key`,512)) INTO @temp FROM `keychain` WHERE `name` = 'user_key';
	RETURN AES_DECRYPT(`client_key`, @temp) = BINARY('Lo452VkDEfmqMRS');
END //
DELIMITER ;

-- Get all users
DELIMITER //
CREATE PROCEDURE `sp_getAllUsers`()
BEGIN
	SELECT * FROM `USERS`;
END //
DELIMITER ;


-- Populate Shows
DROP PROCEDURE IF EXISTS `sp_populate`;
DELIMITER //
CREATE PROCEDURE `sp_populate`()
BEGIN
	DECLARE days INT;
    SET days = 0;
    label1: LOOP
		SET days = days + 1;
        IF days < 14 THEN
			INSERT INTO `showings` SELECT guuid(), DATE_ADD(`start`, INTERVAL days DAY), DATE_ADD(`end`, INTERVAL days DAY), `MV_id`, `hall` FROM showings WHERE DATE(`start`) IN (SELECT DATE(min(start)) FROM showings);
            ITERATE label1;
		END IF;
        LEAVE label1;
	END LOOP label1;
END //
DELIMITER ;