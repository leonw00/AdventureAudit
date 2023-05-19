ALTER TABLE `payer`
DROP COLUMN payer_id;

ALTER TABLE `payer`
ADD CONSTRAINT PK_Payer PRIMARY KEY (transaction_id, user_id);

ALTER TABLE `payer`
ADD CONSTRAINT FK_PayerTransaction
FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id) ON DELETE CASCADE;

ALTER TABLE `payer`
ADD CONSTRAINT FK_PayerUser
FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE;