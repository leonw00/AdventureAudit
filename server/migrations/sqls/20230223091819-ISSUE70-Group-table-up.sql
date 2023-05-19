CREATE TABLE IF NOT EXISTS `group` (
  `group_record_id` BIGINT NOT NULL AUTO_INCREMENT,
  `group_id` BIGINT NOT NULL,
  `member_id` BIGINT NOT NULL,
  `leader` TINYINT(1),
  PRIMARY KEY (group_record_id)
);