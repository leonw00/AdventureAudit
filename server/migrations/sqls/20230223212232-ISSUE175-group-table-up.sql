ALTER TABLE `group`
DROP COLUMN group_id;

ALTER TABLE `group`
ADD COLUMN trip_id bigint NOT NULL;

ALTER TABLE `group`
DROP COLUMN member_id;

ALTER TABLE `group`
ADD COLUMN user_id bigint NOT NULL;

ALTER TABLE `group`
MODIFY COLUMN group_record_id bigint NOT NULL;

ALTER TABLE `group`
DROP COLUMN group_record_id;

ALTER TABLE `group`
ADD CONSTRAINT PK_Group PRIMARY KEY (trip_id, user_id);

ALTER TABLE `group`
ADD CONSTRAINT FK_GroupUser
FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE;

ALTER TABLE `group`
ADD CONSTRAINT FK_GroupTrip
FOREIGN KEY (trip_id) REFERENCES trip(trip_id) ON DELETE CASCADE;