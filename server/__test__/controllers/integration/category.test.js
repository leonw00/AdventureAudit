const request = require('supertest');
const app = require('../../../src/app');
const {
  tearDownCountryDB,
  tearDownTripDB,
  tearDownCategoryDB,
  setUpCountryDB,
  setUpTripDB,
  setUpCategoryDB,
  dbConfig,
} = require('../../testDbSetup');

describe('Test /category endpoints', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await setUpCountryDB();
    await setUpTripDB();
    await setUpCategoryDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
  });

  afterAll(() => pool.end());

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
      const expectedRow = 5;
      const expectedResult = [];

      const categoryID = 1;
      const res = await request(app).delete(`/category/${categoryID}`);
      expect(res.statusCode).toEqual(200);

      let statement = 'SELECT COUNT(1) as count from category;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);

      statement = 'SELECT * from category WHERE category_id = ?;';
      [result] = await pool.promise().query(statement, [categoryID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed delete a category (invalid category_id) with status code 400', async () => {
      const categoryID = -1;
      const res = await request(app).delete(`/category/${categoryID}`);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to delete a category (non-existent category_id) with status code 400', async () => {
      const categoryID = 100;
      const res = await request(app).delete(`/category/${categoryID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /category', () => {
    it('Successfully add a new category to the database with status code 200', async () => {
      const expectedAffectedRow = 1;
      const expectedRow = 7;
      const mockBody = {
        trip_id: 1,
        name: 'c7',
        colour: '#D6C1E7',
        icon: 'icon1',
      };

      const res = await request(app).post('/category').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body.category.affectedRows).toEqual(expectedAffectedRow);

      const { insertId } = res.body.category;
      const expectedResult = [
        {
          category_id: insertId,
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c7',
          trip_id: 1,
        },
      ];

      let statement = 'SELECT COUNT(1) as count from category;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);

      statement = 'SELECT * from category WHERE category_id = ?;';
      [result] = await pool.promise().query(statement, [insertId]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to add a new category (Invalid tripID) with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        name: 'c8',
        colour: '#D6C1E7',
        icon: 'icon1',
      };

      const res = await request(app).post('/category').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedRow = 6;
      const statement = 'SELECT COUNT(1) as count from category;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);
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

      const expectedRow = 6;
      const statement = 'SELECT COUNT(1) as count from category;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);
    });
  });
});
