jest.mock('../../../src/controllers/category');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /category endpoints', () => {
  describe('GET /category/trip/:trip_id', () => {
    it("Successfully returns all of trip 1's categories", async () => {
      const tripID = 1;
      const res = await request(app).get(`/category/trip/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        categories: [
          {
            category_id: 1,
            name: 'c1',
            colour: '#D6C1E7',
            icon: 'icon1',
          },
          {
            category_id: 2,
            name: 'c2',
            colour: '#EECB96',
            icon: 'icon2',
          },
          {
            category_id: 3,
            name: 'c3',
            colour: '#D6C1E7',
            icon: 'icon3',
          },
        ],
      };
      expect(res.body).toEqual(expected);
    });

    it('Failed to get all trip (invalid tripID) categories', async () => {
      const tripID = -1;
      const res = await request(app).get(`/category/trip/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /category/:category_id', () => {
    it('Successfully deletes a category from the database with the given category id with status code 200', async () => {
      const categoryID = 1;
      const res = await request(app).delete(`/category/${categoryID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Category deleted',
        statusCode: 200,
        category: {},
      });
    });

    it('Failed delete a category (invalid category_id) with status code 400', async () => {
      const categoryID = -1;
      const res = await request(app).delete(`/category/${categoryID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /category', () => {
    it('Successfully add a new category to the database with status code 200', async () => {
      const mockBody = {
        trip_id: 1,
        name: 'c7',
        colour: '#D6C1E7',
        icon: 'icon1',
      };

      const res = await request(app).post('/category').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Category created',
        statusCode: 200,
        category: {},
      });
    });

    it('Failed to add a new category (Invalid trip_id) with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        name: 'c8',
        colour: '#D6C1E7',
        icon: 'icon1',
      };

      const res = await request(app).post('/category').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new category (Invalid name) with status code 400', async () => {
      const mockBody = {
        trip_id: 1,
        name: 'long_long_long_long_long_long_long_long_long_long_long_name',
        colour: '#D6C1E7',
        icon: 'icon1',
      };

      const res = await request(app).post('/category').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });
});
