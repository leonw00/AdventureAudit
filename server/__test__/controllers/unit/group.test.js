jest.mock('../../../src/controllers/group');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /group endpoints', () => {
  describe('POST /group', () => {
    it('Successfully add a new group member to the database with status code 200', async () => {
      const mockBody = {
        trip_id: 6,
        user_id: 2,
      };
      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Group member created',
        statusCode: 200,
        member: {},
      });
    });

    it('Failed to add a new member (Invalid tripID) with status code 400', async () => {
      const mockBody = {
        trip_id: -1,
        user_id: 2,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new member (Invalid userID) with status code 400', async () => {
      const mockBody = {
        trip_id: 6,
        user_id: -1,
      };

      const res = await request(app).post('/group').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /group/trip/:trip_id/user/:user_id', () => {
    it('Successfully deletes a group member from the database with the given trip id and user id with status code 200', async () => {
      const tripID = 6;
      const userID = 3;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Group member deleted',
        statusCode: 200,
        member: {},
      });
    });

    it('Failed to delete a group member (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const userID = 1;
      const res = await request(app).delete(
        `/group/trip/${tripID}/user/${userID}`,
      );
      expect(res.statusCode).toEqual(400);
    });
  });
});
