jest.mock('../../../src/controllers/payer');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /payer endpoints', () => {
  describe('POST /payer', () => {
    it('Successfully add a new payer to the database with status code 200', async () => {
      const mockBody = {
        transaction_id: 6,
        user_id: 2,
      };
      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Payer created',
        statusCode: 200,
        payers: {},
      });
    });

    it('Failed to add a new payer (Invalid transactionID) with status code 400', async () => {
      const mockBody = {
        transaction_id: -1,
        user_id: 2,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new payer (Invalid userID) with status code 400', async () => {
      const mockBody = {
        transaction_id: 6,
        user_id: -1,
      };

      const res = await request(app).post('/payer').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /payer/transaction/:transaction_id/user/:user_id', () => {
    it('Successfully deletes a payer from the database with the given transaction id and user id with status code 200', async () => {
      const transactionID = 6;
      const userID = 3;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Payer deleted',
        statusCode: 200,
        payers: {
          affectedRows: 1,
        },
      });
    });

    it('Failed to delete a payer (invalid transactionID) with status code 400', async () => {
      const transactionID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to delete a payer (invalid userID) with status code 400', async () => {
      const transactionID = 6;
      const userID = -1;
      const res = await request(app).delete(
        `/payer/transaction/${transactionID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);
    });
  });
});
