jest.mock('../../../src/controllers/user');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /user endpoints', () => {
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

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'User created',
        statusCode: 200,
        user: {},
      });
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

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(400);
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

      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(400);
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

      const res = await request(app).put(`/user/${userID}`).send(updateUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'User updated',
        statusCode: 200,
        user: { affectedRows: 1 },
      });
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
    });

    it('Failed to update user (Missing req.body element) with status code 400', async () => {
      const userID = 1;

      const mockBody = {
        email: 'updated@gmail.com',
        country_id: 100,
      };

      const res = await request(app).put(`/user/${userID}`).send(mockBody);

      expect(res.statusCode).toEqual(400);
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

    it('Successfully returns an error when given an invalid trip id with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get(`/user/group/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });
});
