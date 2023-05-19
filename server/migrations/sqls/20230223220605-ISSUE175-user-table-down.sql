ALTER TABLE `user`
DROP FOREIGN KEY FK_UserCountry;

ALTER TABLE `user`
DROP COLUMN country_id;

ALTER TABLE `user`
ADD COLUMN home_country int NOT NULL;