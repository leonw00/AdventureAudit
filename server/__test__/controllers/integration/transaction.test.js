const request = require('supertest');
const app = require('../../../src/app');
const {
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
  dbConfig,
} = require('../../testDbSetup');

describe('Test /transaction endpoints', () => {
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

  describe('GET /transaction/trip/:id', () => {
    it('Successfully returns the transactions for trip 2 from the transaction table by trip id with status code 200', async () => {
      const transactionID = 2;
      const res = await request(app).get(`/transaction/trip/${transactionID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        transaction: [
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
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it("Successfully returns an empty list when given a trip id that doesn't have any transactions with status code 200", async () => {
      const tripID = 5;
      const res = await request(app).get(`/transaction/trip/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        transaction: [],
      };

      expect(res.body).toEqual(expected);
    });

    it("Successfully returns an empty list when given a trip id that doesn't exist with status code 200", async () => {
      const tripID = 10;
      const res = await request(app).get(`/transaction/trip/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        transaction: [],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully returns the transactions of trip 6, which is a group trip, from the transaction table with status code 200', async () => {
      const tripID = 6;
      const res = await request(app).get(`/transaction/trip/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        transaction: [
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
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully get an error when requesting transactions for trip -1 from the transaction table by id with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get(`/transaction/trip/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /transaction', () => {
    it('Successfully add a transaction to the transaction table with status code 200', async () => {
      const tripID = 4;
      const mockBody = {
        trip_id: 4,
        name: 't5',
        amount: 12.34,
        category_id: 2,
        transaction_date: '1234-01-23T00:00',
        description: 'Awesome!',
        user_id: 1,
      };

      let expectedCount = 10;
      let statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(200);

      expectedCount = 11;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      statement = `
        SELECT trip_id, name, amount, category_id, DATE_FORMAT(transaction.transaction_date, '%b/%d/%Y') as transaction_date, description FROM transaction WHERE trip_id=?;`;
      [result] = await pool.promise().query(statement, [tripID]);

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

      expect(result).toEqual(expected);
    });

    it('Failed to add a transaction with an invalid trip id to the transaction table with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        name: 't5',
        amount: 12.34,
        category_id: 2,
        transaction_date: '1234-01-23T00:00',
        description: 'Awesome!',
        user_id: 1,
      };

      const expectedCount = 10;
      const statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a transaction (Missing body element) with status code 400', async () => {
      const mockBody = {
        trip_id: 1,
        name: 't5',
        amount: 12.34,
        category_id: 2,
        description: 'Awesome!',
        user_id: 1,
      };

      const expectedCount = 10;
      const statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('DELETE /transaction/:transaction_id', () => {
    it('Successfully delete transaction 1 to the transaction table with status code 200', async () => {
      const transactionID = 1;

      let expectedCount = 10;
      let statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).delete(`/transaction/${transactionID}`);
      expect(res.statusCode).toEqual(200);

      const expected = [];
      statement = 'SELECT * FROM transaction WHERE transaction_id=?;';
      [result] = await pool.promise().query(statement, [transactionID]);
      expect(result).toEqual(expected);

      expectedCount = 9;
      statement = 'SELECT COUNT(1) as count from transaction;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete a transaction (invalid transaction id) with status code 400', async () => {
      const transactionID = -1;

      const expectedCount = 10;
      const statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).delete(`/transaction/${transactionID}`);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete transaction that does not exist with status code 400', async () => {
      const transactionID = 100;

      const expectedCount = 10;
      const statement = 'SELECT COUNT(1) as count from transaction;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).delete(`/transaction/${transactionID}`);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });
});
