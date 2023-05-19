ALTER TABLE `transaction` 
MODIFY COLUMN category_id bigint NULL;

ALTER TABLE `transaction`
ADD CONSTRAINT FK_TransactionTrip
FOREIGN KEY (trip_id) REFERENCES trip(trip_id) ON DELETE CASCADE;

ALTER TABLE `transaction`
ADD CONSTRAINT FK_TransactionCategory
FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL;