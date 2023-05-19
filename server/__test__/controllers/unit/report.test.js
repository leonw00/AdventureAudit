jest.mock('../../../src/controllers/report');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /report endpoints', () => {
  describe('GET /report/sum', () => {
    it('Successfully gets the total expenses of trip 2 with status code 200', async () => {
      const tripID = 2;
      const res = await request(app).get('/report/sum').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(200);

      const expected = {
        report: [
          {
            trip_total_expense: '1050.0000',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully returns an error when an invalid trip id is given with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get('/report/sum').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /report/transaction', () => {
    it('Successfully gets the top 5 transaction of trip 6 with status code 200', async () => {
      const tripID = 6;
      const res = await request(app).get('/report/transaction').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(200);

      const expected = {
        result: [
          {
            amount: '10000.0000',
            colour: '#EECB96',
            icon: 'icon2',
            name: 'c2',
            transaction_id: 6,
            transaction_name: 't6',
          },
          {
            amount: '100.0000',
            colour: '#D6C1E7',
            icon: 'icon1',
            name: 'c1',
            transaction_id: 5,
            transaction_name: 't5',
          },
          {
            amount: '100.0000',
            colour: '#D6C1E7',
            icon: 'icon1',
            name: 'c1',
            transaction_id: 9,
            transaction_name: 't9',
          },
          {
            amount: '60.0000',
            colour: '#D6C1E7',
            icon: 'icon1',
            name: 'c1',
            transaction_id: 10,
            transaction_name: 't10',
          },
          {
            amount: '50.0000',
            colour: '#EECB96',
            icon: 'icon2',
            name: 'c2',
            transaction_id: 7,
            transaction_name: 't7',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Failed to get the top 5 transaction of trip -1 (Invalid ID) with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get('/report/transaction').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /report/category', () => {
    it('Successfully gets how much trip 6 spent for each category with status code 200', async () => {
      const tripID = 6;
      const res = await request(app).get('/report/category').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(200);

      const expected = {
        result: [
          {
            amount: '260.0000',
            colour: '#D6C1E7',
            icon: 'icon1',
            name: 'c1',
          },
          {
            amount: '10051.0000',
            colour: '#EECB96',
            icon: 'icon2',
            name: 'c2',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Failed gets how much trip -1 (Invalid ID) spent for each category with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get('/report/category').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET report/debt', () => {
    it('Successfully get how much money user owe to others and who owes user money of user 1 and trip 6 with status code 200', async () => {
      const userID = 1;
      const tripID = 6;
      const res = await request(app).get('/report/debt/').query({
        trip_id: tripID,
        user_id: userID,
      });
      expect(res.statusCode).toEqual(200);

      const expected = {
        result: [
          {
            amount: '33.33333333',
            name: 'name2',
            user_id: 2,
          },
          {
            amount: '5033.33333333',
            name: 'name3',
            user_id: 3,
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Failed gets how much money user (missing user_id) owe to others and who owes user money with status code 400', async () => {
      const tripID = 6;
      const res = await request(app).get('/report/debt').query({
        trip_id: tripID,
      });
      expect(res.statusCode).toEqual(400);
    });
  });
});
