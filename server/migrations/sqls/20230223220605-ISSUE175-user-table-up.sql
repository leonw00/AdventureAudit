ALTER TABLE `user`
DROP COLUMN home_country;

ALTER TABLE `user`
ADD COLUMN country_id bigint NOT NULL;

ALTER TABLE `user`
ADD CONSTRAINT FK_UserCountry
FOREIGN KEY (country_id) REFERENCES country(country_id) ON DELETE CASCADE;