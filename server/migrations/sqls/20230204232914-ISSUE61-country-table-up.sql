CREATE TABLE IF NOT EXISTS `country` (
  `country_id` BIGINT NOT NULL AUTO_INCREMENT,
  `country_code` VARCHAR(10),
  `name` VARCHAR(255),
  `currency` VARCHAR(3),
  `currency_symbol` VARCHAR(3),
  PRIMARY KEY (country_id)
);