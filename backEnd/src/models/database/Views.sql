CREATE VIEW `CUSTOMER_VIEW` AS
SELECT `username`, `email`
FROM `USERS`;

DROP VIEW IF EXISTS `full_movie`;
CREATE VIEW `full_movie` AS
SELECT `mv`.`id`,
	`mv`.`title`,
    `mv`.`description`,
    `mv`.`year`,
    `subtitles`,
    `rating`,
    `genre`,
    `length`,
    `country`,
    `teaser`,
    `trailer`,
    AVG(`sc`.`score`) AS `score`
FROM `MOVIES` AS `mv`
INNER JOIN `SCORES` AS `sc` ON `mv`.`id` = `sc`.`MV_id`
GROUP BY `mv`.`id`;

DROP VIEW IF EXISTS `involved`;
CREATE VIEW `INVOLVED` AS
SELECT `pp`.`name`, `phr`.`role`, `mv`.`title`
FROM `PERSON_HAS_ROLE` AS `phr`
INNER JOIN `PEOPLE` AS `pp` ON `phr`.`PP_id` = `pp`.`id`
INNER JOIN `MOVIES` AS `mv` ON `phr`.`MV_id` = `mv`.`id`;

DROP VIEW IF EXISTS `comp`;
CREATE VIEW `COMP` AS
SELECT `mv`.`title`, `cy`.`name`, `chr`.`role`
FROM `COMPANY_HAS_ROLE` AS `chr`
INNER JOIN `COMPANIES` AS `cy` ON `chr`.`CY_id` = `cy`.`id`
INNER JOIN `MOVIES` AS `mv` ON `chr`.`MV_id` = `mv`.`id`;

DROP VIEW IF EXISTS `ticket`;
CREATE VIEW `ticket` AS
SELECT HEX(`sl`.`id`) AS `id`, `sl`.`price`, `mv`.`title`, `sh`.`start`, `sh`.`end`, `us`.`username`, `us`.`email`
FROM `sales` AS `sl`
LEFT JOIN `users` AS `us` ON `sl`.`US_id` = `us`.`id`
LEFT JOIN `showings` AS `sh` ON `sl`.`SH_id` = `sh`.`id`
LEFT JOIN `movies` AS `mv` ON `sh`.`MV_id` = `mv`.`id`;