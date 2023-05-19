const request = require('supertest');
const app = require('../../../src/app');
const {
  tearDownCountryDB,
  tearDownTripDB,
  setUpCountryDB,
  setUpTripDB,
  tearDownGroupDB,
  setUpGroupDB,
  tearDownUserDB,
  setUpUserDB,
  dbConfig,
} = require('../../testDbSetup');

describe('Test /group endpoints', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownGroupDB();
    await setUpCountryDB();
    await setUpUserDB();
    await setUpTripDB();
    await setUpGroupDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownGroupDB();
  });

  afterAll(() => pool.end());

  describe('POST /group', () => {
    it('Successfully add a new group member to the database with status code 200', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
      const tripID = 6;
      const userID = 2;

      const expectedAffectedRow = 1;
      const mockBody = {
        trip_id: tripID,
        user_id: userID,
      };
      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body.member.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 9;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          trip_id: 6,
          user_id: 2,
          leader: 0,
        },
      ];
      statement = 'SELECT * from `group` WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to add a new member (Invalid tripID) with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        user_id: 2,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new member (Invalid userID) with status code 400', async () => {
      const mockBody = {
        trip_id: 6,
        user_id: -1,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new member (user is already in group) with status code 400', async () => {
      const mockBody = {
        trip_id: 7,
        user_id: 1,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new member (trip does not exist) with status code 400', async () => {
      const mockBody = {
        trip_id: 100,
        user_id: 1,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new member (user does not exist) with status code 400', async () => {
      const mockBody = {
        trip_id: 5,
        user_id: 100,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('DELETE /group/trip/:trip_id/user/:user_id', () => {
    it('Successfully deletes a group member from the database with the given trip id and user id with status code 200', async () => {
      const expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.member.affectedRows).toEqual(expectedAffectedRow);

      const expectedCount2 = 7;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount2);

      const expectedResult = [];
      statement = 'SELECT * from `group` WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Successfully does not delete a group leader from the database with the given trip id and user id with status code 400', async () => {
      const expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 7;
      const userID = 1;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          trip_id: 7,
          user_id: 1,
          leader: 1,
        },
      ];
      statement = 'SELECT * from `group` WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to delete a group member (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete a group member (non-existent trip_id) with status code 400', async () => {
      const tripID = 100;
      const userID = 1;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from `group`;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });
});
