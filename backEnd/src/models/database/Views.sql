CREATE VIEW `CUSTOMER_VIEW` AS
SELECT `username`, `email`
FROM `USERS`;

CREATE VIEW `FULL_MOVIE` AS
SELECT `mv`.`id` AS `id`,
	`mv`.`title` AS `Título`,
    `mv`.`description` AS `Rezeña`,
    `mv`.`year` AS `Año`,
    `subtitles` AS `Subtitulada`,
    `rating` AS `Clasificación`,
    `genre` AS `Género`,
    `length` AS `Duración`,
    `country` AS `País`,
    AVG(`sc`.`score`)
FROM `MOVIES` AS `mv`
INNER JOIN `SCORES` AS `sc` ON `mv`.`id` = `sc`.`MV_id`
GROUP BY `mv`.`id`;

CREATE VIEW `INVOLVED` AS
SELECT `pp`.`name` AS `Nombre`, `phr`.`role` AS `Rol`, `mv`.`title` AS `Película`
FROM `PERSON_HAS_ROLE` AS `phr`
INNER JOIN `PEOPLE` AS `pp` ON `phr`.`PP_id` = `pp`.`id`
INNER JOIN `MOVIES` AS `mv` ON `phr`.`MV_id` = `mv`.`id`;

CREATE VIEW `COMP` AS
SELECT `mv`.`title` AS `Película`, `cy`.`name` AS `Compañía`, `chr`.`role` AS `Rol`
FROM `COMPANY_HAS_ROLE` AS `chr`
INNER JOIN `COMPANIES` AS `cy` ON `chr`.`CY_id` = `cy`.`id`
INNER JOIN `MOVIES` AS `mv` ON `chr`.`MV_id` = `mv`.`id`;