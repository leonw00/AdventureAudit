ALTER TABLE `transaction`
DROP FOREIGN KEY FK_TransactionTrip;

ALTER TABLE `transaction`
DROP FOREIGN KEY FK_TransactionCategory;

ALTER TABLE `transaction` 
MODIFY COLUMN category_id bigint NOT NULL;