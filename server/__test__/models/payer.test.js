const { createPayer, deletePayer } = require('../../src/models/payer');
const {
  dbConfig,
  tearDownCountryDB,
  tearDownUserDB,
  tearDownTripDB,
  tearDownCategoryDB,
  tearDownTransactionDB,
  tearDownPayerDB,
  setUpCountryDB,
  setUpUserDB,
  setUpTripDB,
  setUpCategoryDB,
  setUpTransactionDB,
  setUpPayerDB,
} = require('../testDbSetup');

describe('Test payer model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownPayerDB();
    await setUpCountryDB();
    await setUpUserDB();
    await setUpTripDB();
    await setUpCategoryDB();
    await setUpTransactionDB();
    await setUpPayerDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownPayerDB();
  });

  afterAll(() => pool.end());

  describe('Test createPayer()', () => {
    it('Successfully inserts a new payer into the database', async () => {
      let expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 7;
      const userID = 2;
      const expectedAffectedRow = 1;
      const member = await createPayer(transactionID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 18;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          transaction_id: 7,
          user_id: 2,
          payedForTransaction: 0,
        },
      ];
      statement = 'SELECT * from payer WHERE transaction_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID, userID]);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test deletePayer()', () => {
    it('Successfully deletes a payer from the database with the given transaction id and user id', async () => {
      let expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const member = await deletePayer(transactionID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 16;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [];
      statement = 'SELECT * from payer WHERE transaction_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Successfully does not delete the user who payed for the transaction from the database with the given transaction id and user id', async () => {
      const expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 7;
      const userID = 1;
      const expectedAffectedRow = 0;
      const member = await deletePayer(transactionID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          transaction_id: 7,
          user_id: 1,
          payedForTransaction: 1,
        },
      ];
      statement = 'SELECT * from payer WHERE transaction_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID, userID]);
      expect(result).toEqual(expectedResult);
    });
  });
});
