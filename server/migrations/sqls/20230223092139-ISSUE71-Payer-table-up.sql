CREATE TABLE IF NOT EXISTS `payer` (
  `payer_id` BIGINT NOT NULL AUTO_INCREMENT,
  `transaction_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `payedForTransaction` TINYINT(1),
  PRIMARY KEY (payer_id)
);