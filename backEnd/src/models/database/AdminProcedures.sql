-- Credentials Confirmer
-- The key must be created before using this function.
DROP FUNCTION IF EXISTS `auth_client_admin`;
DELIMITER //
CREATE FUNCTION `auth_client_admin`(`client_key` BINARY(16))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE temp BLOB;
	SELECT UNHEX(SHA2('wH4ci67fG53Xo5yBxYOAzXwgrIc4tuhQ',512)) INTO temp;
	RETURN AES_DECRYPT(`client_key`, temp) = BINARY('fl13O3QW98Iikn0');
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
        IF days < 8 THEN
			INSERT INTO `showings` SELECT guuid(), DATE_ADD(`start`, INTERVAL days DAY), DATE_ADD(`end`, INTERVAL days DAY), `MV_id`, `hall` FROM showings WHERE DATE(`start`) IN (SELECT DATE(min(`start`)) FROM `showings`);
            ITERATE label1;
		END IF;
        LEAVE label1;
	END LOOP label1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `sp_seater`;
DELIMITER //
CREATE PROCEDURE `sp_seater`(IN `show` BINARY(16), IN `n1` INT, IN `n2` INT)
BEGIN
	INSERT INTO `seats` VALUES(guuid(), `show`, null, `n1`, `n2`, 0);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `sp_all_shows`
DELIMITER //
CREATE PROCEDURE `sp_all_shows`()
BEGIN
	SELECT * FROM `showings`;
END //
DELIMITER ;