-- BEGIN STORED PROCEDURES

DROP PROCEDURE IF EXISTS `SP_CONFIRM_CLIENT_KEY`;
DELIMITER //
CREATE DEFINER='b8977KlEEZRy'@'localhost' PROCEDURE `SP_CONFIRM_CLIENT_KEY`(IN `cs` BINARY(16), OUT `VALID` BOOLEAN)
BEGIN
	SELECT @CLIENT_KEY:=AES_DECRYPT(`cs`,UNHEX(SHA2('Lg3a18Fz49ZiMo0E',512)));
    IF CLIENT_KEY = BINARY('Lo452VkDEfmqMRS') THEN
        SET `VALID` = TRUE;
	ELSE 
		SET `VALID` = FALSE;
	END IF;
END //
DELIMITER ;

-- Create USER
DROP PROCEDURE IF EXISTS `SP_NEW_USER`;
DELIMITER //
CREATE DEFINER='b8977KlEEZRy'@'localhost' PROCEDURE `SP_NEW_USER`(
	IN `un` VARCHAR(16),-- Username
    IN `pw` VARCHAR(72),-- Password
    IN `em` VARCHAR(64),-- Email
    IN `cs` BINARY(16)-- Checksum
)
BEGIN
	DECLARE `KEY` BOOLEAN;
    CALL `SP_CONFIRM_CLIENT_KEY`(`cs`, `KEY`);
	IF `KEY` THEN
		INSERT INTO `USERS`(`id`,`username`,`password`,`email`,`role`,`active`)
        VALUES(UUID(), `un`, `pw`, `em`, 1, true);
        RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END //
DELIMITER ;

-- Score Movie
DELIMITER //
CREATE DEFINER='b8977KlEEZRy'@'localhost' PROCEDURE `SP_RATE_MOVIE`(IN `user` BINARY(16), IN `movie` BINARY(16), IN `rating` DECIMAL(2,1))
BEGIN
	DECLARE `KEY` BOOLEAN;
	DECLARE `RATED` BOOLEAN;
	CALL `SP_CONFIRM_CLIENT_KEY`(`cs`, `KEY`);
	IF `KEY` THEN
		SELECT @`RATED`:=COUNT(*) FROM `SCORE` WHERE `MV_id` = `movie` AND `US_id` = `user`;
        IF `RATED` = 0 THEN
			INSERT INTO `SCORE`(`id`,`MV_id`,`score`, `US_id`) VALUES(uuid(), `movie`, `rating`, `user`);
        END IF;
    ELSE
		RETURN FALSE;
    END IF;
END //
DELIMITER ;

-- Get One USER
DELIMITER //
CREATE DEFINER='b8977KlEEZRy'@'localhost' PROCEDURE `sp_getuser`(IN `un` VARCHAR(16))
BEGIN
	DECLARE `KEY` BOOLEAN;
    CALL `SP_CONFIRM_CLIENT_KEY`(`cs`, `KEY`);
    IF `KEY` THEN
		SELECT `id`,`username`, `email`, `role`, `active`
        FROM `USERS`
        WHERE `username` = `un`;
    ELSE
		SELECT FALSE;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_providerInsertMovie`(
	IN `sentKey` VARCHAR(48)
)
BEGIN
	SELECT AES_DECRYPT(sentKey, '0xdW0jxE95MUCC98rD', )
	IF match THEN
		BLOCK
	ELSE 
		BLOCK
	END IF
END //
DELIMITER ;
-- END STORED PROCEDURES


DROP PROCEDURE IF EXISTS `SP_IMovies`;
DELIMITER //
CREATE PROCEDURE `SP_IMovies`(
    IN `desc` VARCHAR(256),
    IN `tt` VARCHAR(48),
    IN `y` YEAR,
    IN `sub` BOOLEAN,
    IN `rt` INT,
    IN `lg` INT,
    IN `ct` CHAR(3)
)
BEGIN
	DECLARE id BINARY(16);
    SELECT UNHEX(REPLACE(uuid(),'-','')) INTO id;
    INSERT INTO `MOVIES` VALUES(id, `desc`, `tt`, `y`, `sub`, `rt`, `lg`, `ct`);
END //
DELIMITER ;