CREATE TABLE IF NOT EXISTS `transaction`(
	`transaction_id` BIGINT NOT NULL AUTO_INCREMENT,
	`trip_id` BIGINT NOT NULL,
	`name` VARCHAR(30),
	`amount` DECIMAL(13,4),
	`category_id` BIGINT NOT NULL,
	`transaction_date` DATETIME NOT NULL,
	`description` VARCHAR(255),
	PRIMARY KEY(transaction_id)
)
