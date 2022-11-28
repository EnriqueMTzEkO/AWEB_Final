-- Credentials Confirmer
DROP PROCEDURE IF EXISTS `SP_CONFIRM_ADMIN_KEY`;
DELIMITER //
CREATE DEFINER='n3G49MRq9MIh'@'localhost' PROCEDURE `SP_CONFIRM_ADMIN_KEY`(IN `cs` BINARY(16), OUT `VALID` BOOLEAN)
BEGIN
	SELECT @ADMIN_KEY:=AES_DECRYPT(`cs`, @admin_key);
    IF ADMIN_KEY = BINARY('fl13O3QW98Iikn0') THEN
        SET `VALID` = TRUE;
	ELSE 
		SET `VALID` = FALSE;
	END IF;
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