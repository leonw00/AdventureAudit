const request = require('supertest');
const app = require('../../../src/app');
const {
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
  dbConfig,
} = require('../../testDbSetup');

describe('Test /payer endpoints', () => {
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

  describe('POST /payer', () => {
    it('Successfully add a new payer to the database with status code 200', async () => {
      let expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 6;
      const userID = 2;
      const expectedAffectedRow = 1;
      const mockBody = {
        transaction_id: 6,
        user_id: 2,
      };
      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body.payers.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 18;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          transaction_id: 6,
          user_id: 2,
          payedForTransaction: 0,
        },
      ];
      statement = 'SELECT * from payer WHERE transaction_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to add a new payer (Invalid transactionID) with status code 400', async () => {
      const mockBody = {
        transaction_id: -1,
        user_id: 2,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new payer (Invalid userID) with status code 400', async () => {
      const mockBody = {
        transaction_id: 6,
        user_id: -1,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new payer (user is already paying) with status code 400', async () => {
      const mockBody = {
        transaction_id: 7,
        user_id: 1,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new payer (trip does not exist) with status code 400', async () => {
      const mockBody = {
        transaction_id: 100,
        user_id: 1,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new payer (user does not exist) with status code 400', async () => {
      const mockBody = {
        transaction_id: 5,
        user_id: 100,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('DELETE /payer/transaction/:transaction_id/user/:user_id', () => {
    it('Successfully deletes a payer from the database with the given transaction id and user id with status code 200', async () => {
      let expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.payers.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 16;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [];
      statement = 'SELECT * from payer WHERE transaction_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [transactionID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Successfully does not delete a payer who has payed for the transaction from the database with the given transaction id and user id with status code 400', async () => {
      const expectedCount = 17;
      let statement = 'SELECT COUNT(1) as count from payer;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const transactionID = 7;
      const userID = 1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

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

    it('Failed to delete a payer (invalid transactionID) with status code 400', async () => {
      const transactionID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete a payer (invalid userID) with status code 400', async () => {
      const transactionID = 6;
      const userID = -1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete a payer (non-existent transactionID) with status code 400', async () => {
      const transactionID = 100;
      const userID = 1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete a payer (non-existent userID) with status code 400', async () => {
      const transactionID = 5;
      const userID = 100;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 17;
      const statement = 'SELECT COUNT(1) as count from payer;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });
});
