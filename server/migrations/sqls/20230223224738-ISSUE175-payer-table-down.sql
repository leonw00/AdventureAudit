ALTER TABLE `payer`
DROP FOREIGN KEY FK_PayerTransaction;

ALTER TABLE `payer`
DROP FOREIGN KEY FK_PayerUser;

ALTER TABLE `payer`
DROP PRIMARY KEY;

ALTER TABLE `payer`
ADD COLUMN payer_id BIGINT NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (payer_id);