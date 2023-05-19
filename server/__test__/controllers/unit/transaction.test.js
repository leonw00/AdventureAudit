jest.mock('../../../src/controllers/transaction');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /transaction endpoints', () => {
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

    it('Successfully get an error when requesting transactions for trip -1 from the transaction table by id with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get(`/transaction/trip/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /transaction', () => {
    it('Successfully add a transaction to the transaction table with status code 200', async () => {
      const mockBody = {
        trip_id: 4,
        name: 't5',
        amount: 12.34,
        category_id: 2,
        transaction_date: '1234-01-23T00:00',
        description: 'Awesome!',
        user_id: 1,
      };

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Transaction created',
        statusCode: 200,
        transaction: {},
      });
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

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(400);
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

      const res = await request(app).post('/transaction').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /transaction/:transaction_id', () => {
    it('Successfully delete transaction 1 to the transaction table with status code 200', async () => {
      const transactionID = 1;

      const res = await request(app).delete(`/transaction/${transactionID}`);
      expect(res.statusCode).toEqual(200);
    });

    it('Failed to delete a transaction (invalid transaction id) with status code 400', async () => {
      const transactionID = -1;

      const res = await request(app).delete(`/transaction/${transactionID}`);
      expect(res.statusCode).toEqual(400);
    });
  });
});
