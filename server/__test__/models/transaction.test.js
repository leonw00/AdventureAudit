const {
  getTripTransaction,
  createTransaction,
  deleteTransaction,
} = require('../../src/models/transaction');

const {
  dbConfig,
  tearDownCountryDB,
  tearDownTripDB,
  tearDownCategoryDB,
  tearDownTransactionDB,
  tearDownUserDB,
  tearDownPayerDB,
  setUpCountryDB,
  setUpTripDB,
  setUpCategoryDB,
  setUpTransactionDB,
  setUpUserDB,
  setUpPayerDB,
} = require('../testDbSetup');

describe('Test transaction model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownUserDB();
    await tearDownPayerDB();
    await setUpCountryDB();
    await setUpTripDB();
    await setUpCategoryDB();
    await setUpTransactionDB();
    await setUpUserDB();
    await setUpPayerDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownUserDB();
    await tearDownPayerDB();
  });

  afterAll(() => pool.end());

  describe('Testing getTripTransaction()', () => {
    it('Successfully returns 0 transactions from the transaction table', async () => {
      await tearDownTransactionDB();
      const tripID = 1;
      const result = await getTripTransaction(tripID);
      const expected = [];

      expect(result).toEqual(expected);
    });

    it('Successfully returns the transactions of trip 2 from the transaction table', async () => {
      const tripID = 2;
      const result = await getTripTransaction(tripID);

      const expected = [
        {
          transaction_id: 4,
          trip_id: 2,
          name: 't4',
          amount: '50.0000',
          category_name: 'c3',
          category_colour: '#D6C1E7',
          category_icon: 'icon3',
          transaction_date: 'May/10/2021',
          transaction_time: '15:13:30',
          description: 'description4',
          payers: [
            {
              user_id: 2,
              name: 'name2',
              payedForTransaction: 1,
            },
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 0,
            },
            {
              user_id: 3,
              name: 'name3',
              payedForTransaction: 0,
            },
          ],
        },
        {
          transaction_id: 2,
          trip_id: 2,
          name: 't2',
          amount: '1000.0000',
          category_name: 'c2',
          category_colour: '#EECB96',
          category_icon: 'icon2',
          transaction_date: 'May/06/2021',
          transaction_time: '13:11:00',
          description: 'description2',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
            {
              user_id: 2,
              name: 'name2',
              payedForTransaction: 0,
            },
            {
              user_id: 3,
              name: 'name3',
              payedForTransaction: 0,
            },
          ],
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns the transactions of trip 3 from the transaction table', async () => {
      const tripID = 3;
      const result = await getTripTransaction(tripID);

      const expected = [
        {
          transaction_id: 3,
          trip_id: 3,
          name: 't3',
          amount: '1.0000',
          category_name: 'c1',
          category_colour: '#D6C1E7',
          category_icon: 'icon1',
          transaction_date: 'Jan/03/2022',
          transaction_time: '14:12:00',
          description: 'description3',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
          ],
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns the transactions of trip 6, which is a group trip, from the transaction table', async () => {
      const tripID = 6;
      const result = await getTripTransaction(tripID);

      const expected = [
        {
          transaction_id: 10,
          trip_id: 6,
          name: 't10',
          amount: '60.0000',
          category_name: 'c1',
          category_colour: '#D6C1E7',
          category_icon: 'icon1',
          transaction_date: 'Dec/06/2022',
          transaction_time: '21:59:59',
          description: 'description10',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
          ],
        },
        {
          transaction_id: 9,
          trip_id: 6,
          name: 't9',
          amount: '100.0000',
          category_name: 'c1',
          category_colour: '#D6C1E7',
          category_icon: 'icon1',
          transaction_date: 'May/03/2022',
          transaction_time: '20:38:00',
          description: 'description9',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
          ],
        },
        {
          transaction_id: 8,
          trip_id: 6,
          name: 't8',
          amount: '1.0000',
          category_name: 'c2',
          category_colour: '#EECB96',
          category_icon: 'icon2',
          transaction_date: 'May/02/2022',
          transaction_time: '19:47:00',
          description: 'description8',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
          ],
        },
        {
          transaction_id: 7,
          trip_id: 6,
          name: 't7',
          amount: '50.0000',
          category_name: 'c2',
          category_colour: '#EECB96',
          category_icon: 'icon2',
          transaction_date: 'May/01/2022',
          transaction_time: '18:06:00',
          description: 'description7',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
          ],
        },
        {
          transaction_id: 6,
          trip_id: 6,
          name: 't6',
          amount: '10000.0000',
          category_name: 'c2',
          category_colour: '#EECB96',
          category_icon: 'icon2',
          transaction_date: 'Apr/30/2022',
          transaction_time: '17:25:10',
          description: 'description6',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
            {
              user_id: 3,
              name: 'name3',
              payedForTransaction: 0,
            },
          ],
        },
        {
          transaction_id: 5,
          trip_id: 6,
          name: 't5',
          amount: '100.0000',
          category_name: 'c1',
          category_colour: '#D6C1E7',
          category_icon: 'icon1',
          transaction_date: 'Apr/29/2022',
          transaction_time: '16:24:00',
          description: 'description5',
          payers: [
            {
              user_id: 1,
              name: 'name1',
              payedForTransaction: 1,
            },
            {
              user_id: 2,
              name: 'name2',
              payedForTransaction: 0,
            },
            {
              user_id: 3,
              name: 'name3',
              payedForTransaction: 0,
            },
          ],
        },
      ];

      expect(result).toEqual(expected);
    });

    it("Successfully returns an empty list when given a trip id that doesn't have any transactions", async () => {
      const tripID = 5;
      const result = await getTripTransaction(tripID);

      const expected = [];

      expect(result).toEqual(expected);
    });

    it('Successfully returns an empty list when given a trip id that is not in the trip table', async () => {
      const tripID = 100;
      const result = await getTripTransaction(tripID);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('Testing createTransaction()', () => {
    it('Successfully add a transaction to the transaction table', async () => {
      const newTransactionTripId = 4;
      const newTransactionName = 't5';
      const newTransactionAmount = 12.34;
      const newTransactionCategory = 2;
      const newTransactionDate = '1234-01-23';
      const newTransactionNote = 'Awesome!';
      const newTransactionUserID = 1;

      let expectedCount = 10;
      let statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      await createTransaction(
        newTransactionTripId,
        newTransactionName,
        newTransactionAmount,
        newTransactionCategory,
        newTransactionDate,
        newTransactionNote,
        newTransactionUserID,
      );
      const expected = [
        {
          trip_id: 4,
          name: 't5',
          amount: '12.3400',
          category_id: 2,
          transaction_date: 'Jan/23/1234',
          description: 'Awesome!',
        },
      ];
      statement = "SELECT trip_id, name, amount, category_id, DATE_FORMAT(transaction.transaction_date, '%b/%d/%Y') as transaction_date, description FROM transaction WHERE trip_id = ?;";
      [result] = await pool.promise().query(statement, [newTransactionTripId]);

      expect(result).toEqual(expected);

      expectedCount = 11;
      statement = 'SELECT COUNT(1) as count from transaction;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('Testing deleteTransaction()', () => {
    it('Successfully delete a transaction 1 to the transaction table', async () => {
      const transactionID = 1;
      const expectedAffectedRow = 1;

      let expectedCount = 10;
      let statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const deletedTransaction = await deleteTransaction(transactionID);
      expect(deletedTransaction.affectedRows).toEqual(expectedAffectedRow);

      const expected = [];
      statement = 'SELECT * FROM transaction WHERE transaction_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID]);

      expect(result).toEqual(expected);

      expectedCount = 9;
      statement = 'SELECT COUNT(1) as count from transaction;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });
});
