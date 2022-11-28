CREATE DATABASE `movietheater`
CHARSET utf8mb4
COLLATE utf8mb4_general_ci;
USE `movietheater`;
SET NAMES 'utf8mb4';

-- BEGIN USERS

-- CUSTOMER
CREATE USER 'b8977KlEEZRy'@'localhost' IDENTIFIED BY ':Ci8Qh32ZKaDtGD0_8MXCbfAfXQIThHiXVQdnE~evmrB0fqZC9';
GRANT EXECUTE ON `movietheater`.* TO 'b8977KlEEZRy'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'b8977KlEEZRy'@'localhost';

-- PROVIDER
CREATE USER 'S16b5gXPG7e1'@'localhost' IDENTIFIED BY '&OwWhZW7tb8IgE9|veNFqDIlBXzQuBnW3m_PPgAd154i8qTydp';
GRANT EXECUTE ON `movietheater`.* TO 'b8977KlEEZRy'@'localhost';
FLUSH PRIVILEGES;

-- ADMIN
CREATE USER 'n3G49MRq9MIh'@'localhost' IDENTIFIED BY '94N-0kmP9L6VLVa8V 9fjOzZ9hv1osSA6pqEhMiuRpLU:z8qW2';
GRANT ALL PRIVILEGES ON `movietheater`.* TO 'n3G49MRq9MIh'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'n3G49MRq9MIh'@'localhost';

-- System Variables
SET @user_key = UNHEX(SHA2('Lg3a18Fz49ZiMo0E',512));
SET @admin_key = UNHEX(SHA2('wH4ci67fG53Xo5yBxYOAzXwgrIc4tuhQ',512));