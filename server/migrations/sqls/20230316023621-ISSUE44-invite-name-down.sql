ALTER TABLE `invite`
DROP FOREIGN KEY FK_Inviter;

ALTER TABLE `invite`
DROP COLUMN `inviter_id`;