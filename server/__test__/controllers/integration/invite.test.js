const request = require('supertest');
const app = require('../../../src/app');
const {
  dbConfig,
  tearDownCountryDB,
  tearDownUserDB,
  tearDownTripDB,
  tearDownInviteDB,
  setUpCountryDB,
  setUpUserDB,
  setUpTripDB,
  setUpInviteDB,
} = require('../../testDbSetup');

describe('Test /invite endpoints', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownInviteDB();
    await setUpCountryDB();
    await setUpUserDB();
    await setUpTripDB();
    await setUpInviteDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownInviteDB();
  });

  afterAll(() => pool.end());

  describe('GET /invite/user/:user_id', () => {
    it('Successfully gets all invites for user_id 1 from the database with status code 200', async () => {
      const userID = 2;
      const res = await request(app).get(`/invite/user/${userID}`);

      const expectedResult = {
        invite: [
          {
            user_id: 2,
            trip_id: 1,
            name: 'trip_1',
            start_date: 'Jan/01/2023',
            end_date: 'Apr/03/2023',
            inviter_id: 1,
            inviter_name: 'name1',
          },
          {
            user_id: 2,
            trip_id: 2,
            name: 'trip_2',
            start_date: 'Apr/05/2023',
            end_date: 'Apr/07/2023',
            inviter_id: 1,
            inviter_name: 'name1',
          },
          {
            user_id: 2,
            trip_id: 3,
            name: 'trip_3',
            start_date: 'Jun/01/2023',
            end_date: 'Jun/15/2023',
            inviter_id: 1,
            inviter_name: 'name1',
          },
          {
            user_id: 2,
            trip_id: 4,
            name: 'trip_4',
            start_date: 'Dec/12/2022',
            end_date: 'Dec/31/2022',
            inviter_id: 1,
            inviter_name: 'name1',
          },
          {
            user_id: 2,
            trip_id: 5,
            name: 'trip_5',
            start_date: 'Jul/12/2022',
            end_date: 'Jul/15/2022',
            inviter_id: 1,
            inviter_name: 'name1',
          },
        ],
      };

      expect(res.body).toEqual(expectedResult);
    });

    it('Successfully gets an empty list if a user has no invites with status code 200', async () => {
      const userID = 1;
      const res = await request(app).get(`/invite/user/${userID}`);

      const expectedResult = {
        invite: [],
      };
      expect(res.body).toEqual(expectedResult);
    });

    it('Successfully gets an empty list if requesting a user that does not exist with status code 200', async () => {
      const userID = 4;
      const res = await request(app).get(`/invite/user/${userID}`);

      const expectedResult = {
        invite: [],
      };
      expect(res.body).toEqual(expectedResult);
    });

    it('Successfully returns an error when given an invalid user_id with status code 400', async () => {
      const userID = -1;
      const res = await request(app).get(`/invite/user/${userID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /invite', () => {
    it('Successfully add a new invite to the database with status code 200', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from invite;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 2;
      const expectedAffectedRow = 1;
      const mockBody = {
        trip_id: 6,
        user_id: 2,
        inviter_id: 1,
      };
      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body.invite.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 9;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [
        {
          trip_id: 6,
          user_id: 2,
          inviter_id: 1,
        },
      ];
      statement = 'SELECT * from invite WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to add a new invite (invalid trip_id) with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        user_id: 2,
        inviter_id: 1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (invalid user_id) with status code 400', async () => {
      const mockBody = {
        trip_id: 6,
        user_id: -1,
        inviter_id: 1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (user already has a pending invite) with status code 400', async () => {
      const mockBody = {
        trip_id: 7,
        user_id: 3,
        inviter_id: 1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (trip does not exist) with status code 400', async () => {
      const mockBody = {
        trip_id: 100,
        user_id: 1,
        inviter_id: 1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (user does not exist) with status code 400', async () => {
      const mockBody = {
        trip_id: 5,
        user_id: 100,
        inviter_id: 1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (inviter does not exist) with status code 400', async () => {
      const mockBody = {
        trip_id: 5,
        user_id: 1,
        inviter_id: 100,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to add a new invite (invalid inviter_id) with status code 400', async () => {
      const mockBody = {
        trip_id: 5,
        user_id: 1,
        inviter_id: -1,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('DELETE /invite/trip/:trip_id/user/:user_id', () => {
    it('Successfully deletes an invite from the database with the given trip id and user id with status code 200', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from invite;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const res = await request(app).delete(
        `/invite/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.invite.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 7;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [];
      statement = 'SELECT * from invite WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Failed to delete an invite (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/invite/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to delete an invite (non-existent trip_id) with status code 400', async () => {
      const tripID = 100;
      const userID = 1;
      const res = await request(app).delete(
        `/invite/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);

      const expectedCount = 8;
      const statement = 'SELECT COUNT(1) as count from invite;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });
});
