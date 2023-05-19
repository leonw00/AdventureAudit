ALTER TABLE `trip`
DROP COLUMN currency;

ALTER TABLE `trip`
DROP COLUMN description;

ALTER TABLE `trip`
DROP COLUMN user_id;

ALTER TABLE `trip`
ADD CONSTRAINT FK_TripCountry
FOREIGN KEY (country_id) REFERENCES country(country_id) ON DELETE CASCADE;;