const request = require('supertest');
const app = require('../../../src/app');
const {
  tearDownCountryDB,
  tearDownTripDB,
  tearDownCategoryDB,
  tearDownTransactionDB,
  tearDownUserDB,
  tearDownPayerDB,
  tearDownGroupDB,
  setUpCountryDB,
  setUpTripDB,
  setUpCategoryDB,
  setUpTransactionDB,
  setUpUserDB,
  setUpPayerDB,
  setUpGroupDB,
  dbConfig,
} = require('../../testDbSetup');

describe('Test /user endpoints', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownUserDB();
    await tearDownPayerDB();
    await tearDownGroupDB();
    await setUpCountryDB();
    await setUpTripDB();
    await setUpCategoryDB();
    await setUpTransactionDB();
    await setUpUserDB();
    await setUpPayerDB();
    await setUpGroupDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownUserDB();
    await tearDownPayerDB();
    await tearDownGroupDB();
  });

  afterAll(() => pool.end());

  describe('GET /user/email/:email', () => {
    it('Successfully gets "name1" from the user table by email with status code 200', async () => {
      const userEmail = 'test1@gmail.com';
      const res = await request(app).get(`/user/email/${userEmail}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        user: [
          {
            user_id: 1,
            email_id: 'test1@gmail.com',
            name: 'name1',
            country_name: 'Republic of Korea',
            country_code: 'KR',
            currency: '￦',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it("Successfully returns an empty list when given an email that doens't exist with status code 200", async () => {
      const userEmail = 'test4@gmail.com';
      const res = await request(app).get(`/user/email/${userEmail}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        user: [],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully returns an error when given an invalid email with status code 400', async () => {
      const notAnEmail = "This isn't an email address!!!";
      const res = await request(app).get(`/user/email/${notAnEmail}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /user', () => {
    it('Successfully adds "name4" to the user table with status code 200', async () => {
      const userEmail = 'test4@gmail.com';
      const countryID = 1;
      const userName = 'name4';
      const newUser = {
        name: userName,
        country_id: countryID,
        email: userEmail,
      };

      let expectedCount = 3;
      let statement = 'SELECT COUNT(1) as count from user;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(200);

      expectedCount = 4;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      statement = 'SELECT name, country_id, email_id FROM user WHERE email_id=?;';
      [result] = await pool.promise().query(statement, [userEmail]);

      const expected = [
        {
          email_id: 'test4@gmail.com',
          country_id: 1,
          name: 'name4',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully not add a user with an invalid email to the user table with status code 400', async () => {
      const userEmail = 'Invalid email';
      const countryID = 1;
      const userName = 'name4';
      const newUser = {
        name: userName,
        country_id: countryID,
        email: userEmail,
      };

      const expectedCount = 3;
      const statement = 'SELECT COUNT(1) as count from user;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Successfully not add a user with an invalid country id to the user table with status code 400', async () => {
      const userEmail = 'user4@gmail.com';
      const countryID = -1;
      const userName = 'name4';
      const newUser = {
        name: userName,
        country_id: countryID,
        email: userEmail,
      };

      const expectedCount = 3;
      const statement = 'SELECT COUNT(1) as count from user;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(400);

      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('GET /user/:user_id', () => {
    it('Successfully gets "name1" from the user table by ID with status code 200', async () => {
      const userID = 1;
      const res = await request(app).get(`/user/${userID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        user: [
          {
            user_id: 1,
            email_id: 'test1@gmail.com',
            name: 'name1',
            country_name: 'Republic of Korea',
            country_code: 'KR',
            currency: '￦',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully returns an error when given an invalid user id with status code 400', async () => {
      const userID = -1;
      const res = await request(app).get(`/user/${userID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('PUT /user/:user_id', () => {
    it('Successfully update user 3 in the user table with status code 200', async () => {
      const userID = 3;
      const newUserEmail = 'test4@gmail.com';
      const newUserCountry = 2;
      const newUserName = 'name4';

      const updateUser = {
        name: newUserName,
        email: newUserEmail,
        country_id: newUserCountry,
      };

      let statement = 'SELECT * FROM user where user_id = ?;';
      let [result] = await pool.promise().query(statement, [userID]);
      let expected = [
        {
          user_id: 3,
          email_id: 'test3@gmail.com',
          name: 'name3',
          country_id: 3,
        },
      ];

      expect(result).toEqual(expected);

      const res = await request(app).put(`/user/${userID}`).send(updateUser);
      expect(res.statusCode).toEqual(200);

      [result] = await pool.promise().query(statement, [userID]);
      expected = [
        {
          user_id: 3,
          email_id: 'test4@gmail.com',
          name: 'name4',
          country_id: 2,
        },
      ];

      expect(result).toEqual(expected);

      const expectedCount = 3;
      statement = 'SELECT COUNT(1) as count from user;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Successfully not update a user with an invalid user_id with status code 400', async () => {
      const userID = -1;
      const newUserEmail = 'test4@gmail.com';
      const newUserCountry = 4;
      const newUserName = 'name4';

      const updateUser = {
        name: newUserName,
        email: newUserEmail,
        country_id: newUserCountry,
      };

      const res = await request(app).put(`/user/${userID}`).send(updateUser);
      expect(res.statusCode).toEqual(400);

      const expectedCount = 3;
      const statement = 'SELECT COUNT(1) as count from user;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Successfully return an error when asked to update a user that does not exist status code 400', async () => {
      const userID = 4;
      const newUserEmail = 'test4@gmail.com';
      const newUserCountry = 2;
      const newUserName = 'name4';

      const updateUser = {
        name: newUserName,
        email: newUserEmail,
        country_id: newUserCountry,
      };

      const res = await request(app).put(`/user/${userID}`).send(updateUser);
      expect(res.statusCode).toEqual(400);

      const expected = [];
      let statement = 'SELECT * FROM user where user_id=?;';
      let [result] = await pool.promise().query(statement, [userID]);
      expect(result).toEqual(expected);

      const expectedCount = 3;
      statement = 'SELECT COUNT(1) as count from user;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });

    it('Failed to update user (Missing req.body element) with status code 400', async () => {
      const userID = 1;

      const mockBody = {
        email: 'updated@gmail.com',
        country_id: 100,
      };

      const res = await request(app).put(`/user/${userID}`).send(mockBody);

      expect(res.statusCode).toEqual(400);

      const expectedResult = [
        {
          country_id: 1,
          email_id: 'test1@gmail.com',
          name: 'name1',
          user_id: 1,
        },
      ];

      let statement = 'SELECT * from user WHERE user_id = ?;';
      let [result] = await pool.promise().query(statement, [userID]);
      expect(result).toEqual(expectedResult);

      const expectedCount = 3;
      statement = 'SELECT COUNT(1) as count from user;';
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('GET user/group/:trip_id', () => {
    it('Successfully gets the group for tripID 1 from the group table with status code 200', async () => {
      const tripID = 1;
      const res = await request(app).get(`/user/group/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        members: [
          {
            user_id: 1,
            email_id: 'test1@gmail.com',
            name: 'name1',
            country_name: 'Republic of Korea',
            country_code: 'KR',
            currency: '￦',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully gets the group for tripID 6 from the group table with status code 200', async () => {
      const tripID = 6;
      const res = await request(app).get(`/user/group/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        members: [
          {
            user_id: 1,
            email_id: 'test1@gmail.com',
            name: 'name1',
            country_name: 'Republic of Korea',
            country_code: 'KR',
            currency: '￦',
          },
          {
            user_id: 3,
            email_id: 'test3@gmail.com',
            name: 'name3',
            country_name: 'Indonesia',
            country_code: 'ID',
            currency: 'Rp',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it("Successfully returns an empty list when requesting the group of a trip_id that doens't exist with status code 200", async () => {
      const tripID = 100;
      const res = await request(app).get(`/user/group/${tripID}`);
      expect(res.statusCode).toEqual(200);

      const expected = {
        members: [],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully returns an error when given an invalid trip id with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get(`/user/group/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });
});
