CREATE TABLE IF NOT EXISTS `invite` (
  `trip_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  CONSTRAINT PK_Invite PRIMARY KEY (trip_id, user_id),
  FOREIGN KEY (trip_id) REFERENCES trip(trip_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);