jest.mock('../../../src/controllers/invite');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /invite endpoints', () => {
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
        ],
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
      const tripID = 6;
      const userID = 2;
      const inviterID = 1;
      const mockBody = {
        trip_id: tripID,
        user_id: userID,
        inviter_id: inviterID,
      };
      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Invite created',
        statusCode: 200,
        invite: {},
      });
    });

    it('Failed to add a new invite (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const userID = 2;
      const inviterID = 1;
      const mockBody = {
        trip_id: tripID,
        user_id: userID,
        inviter_id: inviterID,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new invite (invalid user_id) with status code 400', async () => {
      const tripID = 6;
      const userID = -1;
      const inviterID = 1;
      const mockBody = {
        trip_id: tripID,
        user_id: userID,
        inviter_id: inviterID,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new invite (invalid inviter_id) with status code 400', async () => {
      const tripID = 5;
      const userID = 1;
      const inviterID = -1;
      const mockBody = {
        trip_id: tripID,
        user_id: userID,
        inviter_id: inviterID,
      };

      const res = await request(app).post('/invite').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /invite/trip/:trip_id/user/:user_id', () => {
    it('Successfully deletes an invite from the database with the given trip id and user id with status code 200', async () => {
      const tripID = 6;
      const userID = 3;
      const res = await request(app).delete(
        `/invite/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Invite deleted',
        statusCode: 200,
        invite: { affectedRows: 1 },
      });
    });

    it('Failed to delete an invite (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/invite/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);
    });
  });
});
