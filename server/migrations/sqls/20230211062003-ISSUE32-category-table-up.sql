CREATE TABLE IF NOT EXISTS `category` (
	`category_id` BIGINT NOT NULL AUTO_INCREMENT,
	`trip_id` BIGINT NOT NULL,
	`name` VARCHAR(30),
	`colour` VARCHAR(30),
	PRIMARY KEY(category_id)
)
