jest.mock('../../../src/controllers/country');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /country endpoints', () => {
  describe('GET /country', () => {
    it('Successfully get all countries with status code 200', async () => {
      const res = await request(app).get('/country');

      const expected = {
        countries: [
          {
            country_code: 'KR',
            country_id: 1,
            currency: '￦',
            name: 'Republic of Korea',
          },
          {
            country_code: 'CA',
            country_id: 2,
            currency: '$',
            name: 'Canada',
          },
          {
            country_code: 'ID',
            country_id: 3,
            currency: 'Rp',
            name: 'Indonesia',
          },
        ],
      };
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expected);
    });
  });
});
