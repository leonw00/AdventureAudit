jest.mock('../../../src/controllers/trip');
const request = require('supertest');
const app = require('../../../src/app');

describe('Test /trip endpoints', () => {
  describe('GET /trip/user/:user_id', () => {
    it('Successfully get user trips after the start date with status code 200', async () => {
      const userID = 1;
      const res = await request(app).get(`/trip/user/${userID}`).query({
        start_date_time: '2023-02-13',
      });

      expect(res.statusCode).toEqual(200);

      const expected = {
        userTrips: [
          {
            trip_id: 3,
            name: 'trip_3',
            budget: '200.0000',
            country_id: 3,
            start_date: 'Jun/01/2023',
            end_date: 'Jun/15/2023',
          },
          {
            trip_id: 2,
            name: 'trip_2',
            budget: '150.0000',
            country_id: 2,
            start_date: 'Apr/05/2023',
            end_date: 'Apr/07/2023',
          },
        ],
      };

      expect(res.body).toEqual(expected);
    });

    it('Successfully get user trips before end date with status code 200', async () => {
      const userID = 1;
      const res = await request(app).get(`/trip/user/${userID}`).query({
        end_date_time: '2023-02-13',
      });

      expect(res.statusCode).toEqual(200);

      const expected = {
        userTrips: [
          {
            trip_id: 4,
            name: 'trip_4',
            budget: '150.0000',
            country_id: 1,
            start_date: 'Dec/12/2022',
            end_date: 'Dec/31/2022',
          },
          {
            trip_id: 5,
            name: 'trip_5',
            budget: '100000.0000',
            country_id: 1,
            start_date: 'Jul/12/2022',
            end_date: 'Jul/15/2022',
          },
          {
            trip_id: 6,
            name: 'trip_6',
            budget: '100000.0000',
            country_id: 2,
            start_date: 'Apr/28/2022',
            end_date: 'Apr/30/2022',
          },
          {
            trip_id: 7,
            name: 'trip_7',
            budget: '100000.0000',
            country_id: 2,
            start_date: 'Jan/09/2022',
            end_date: 'Jan/20/2022',
          },
        ],
      };
      expect(res.body).toEqual(expected);
    });

    it('Successfully get user trips from the start date to end date with status code 200', async () => {
      const userID = 1;
      const res = await request(app).get(`/trip/user/${userID}`).query({
        start_date_time: '2023-02-13',
        end_date_time: '2023-02-13',
      });

      expect(res.statusCode).toEqual(200);

      const expected = {
        userTrips: [
          {
            trip_id: 1,
            name: 'trip_1',
            budget: '10.0000',
            country_id: 3,
            start_date: 'Jan/01/2023',
            end_date: 'Apr/03/2023',
          },
        ],
      };
      expect(res.body).toEqual(expected);
    });

    it('Failed to get trip (invalid user_id) with status code 400', async () => {
      const userID = -1;
      const res = await request(app).get(`/trip/user/${userID}`).query({
        start_date_time: '2023-02-13',
        end_date_time: '2023-02-13',
      });
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to get trip (invalid start_date_time) with status code 400', async () => {
      const userID = 1;
      const res = await request(app).get(`/trip/user/${userID}`).query({
        start_date_time: '2023-02-133',
        end_date_time: '2023-02-13',
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /trip/:trip_id', () => {
    it('Successfully delete trip with status code 200', async () => {
      const tripID = 1;
      const res = await request(app).delete(`/trip/${tripID}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Trip deleted',
        statusCode: 200,
        trip: {
          affectedRows: 1,
        },
      });
    });

    it('Failed to delete trip (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).delete(`/trip/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /trip/:trip_id', () => {
    it('Successfully get trip with given tripID with status code 200', async () => {
      const tripID = 1;
      const res = await request(app).get(`/trip/${tripID}`);
      const expected = {
        userTrip: [
          {
            trip_id: 1,
            name: 'trip_1',
            budget: '10.0000',
            country_name: 'Indonesia',
            country_code: 'ID',
            country_id: 3,
            currency: 'Rp',
            start_date: 'Jan/01/2023',
            end_date: 'Apr/03/2023',
          },
        ],
      };
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expected);
    });

    it('Failed to get trip (invalid trip_id) with status code 400', async () => {
      const tripID = -1;
      const res = await request(app).get(`/trip/${tripID}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /trip', () => {
    it('Successfully add trip with status code 200', async () => {
      const mockBody = {
        name: 'trip1',
        budget: 1000,
        country_id: '1',
        startDateTime: '2022-01-02',
        endDateTime: '2022-01-02',
        user_id: 1,
      };

      const res = await request(app).post('/trip').send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Trip created',
        statusCode: 200,
        trip: {},
      });
    });

    it('Failed to add a new trip (Invalid name) with status code 400', async () => {
      const mockBody = {
        name: 'long_long_long_long_long_long_long_long_long_long_long_name',
        budget: 1000,
        country_id: '1',
        startDateTime: '2022-01-02',
        endDateTime: '2022-01-02',
        user_id: 1,
      };

      const res = await request(app).post('/trip').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new trip (Missing body request element) with status code 400', async () => {
      const mockBody = {
        budget: 1000,
        country_id: '1',
        startDateTime: '2022-01-02',
        endDateTime: '2022-01-02',
        user_id: 1,
      };

      const res = await request(app).post('/trip').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to add a new trip (Invalid date type) with status code 400', async () => {
      const mockBody = {
        budget: 1000,
        country_id: '1',
        startDateTime: '2022/01/02',
        endDateTime: '2022-01-02',
        user_id: 1,
      };

      const res = await request(app).post('/trip').send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('PUT /trip/:trip_id', () => {
    it('Successfully update trip with status code 200', async () => {
      const tripID = 1;
      const mockBody = {
        name: 'updated_trip_1',
        budget: 1000,
        country_id: 1,
        startDateTime: '2022-01-02',
        endDateTime: '2022-01-02',
      };

      const res = await request(app).put(`/trip/${tripID}`).send(mockBody);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Trip updated',
        statusCode: 200,
        trip: {
          affectedRows: 1,
        },
      });
    });

    it('Failed to update trip (Missing req.body element) with status code 400', async () => {
      const tripID = 1;
      const mockBody = {
        name: 'updated_trip_1',
        budget: 1000,
        country_id: 1,
        startDateTime: '2022-01-02',
      };

      const res = await request(app).put(`/trip/${tripID}`).send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to update trip (Invalid date format) with status code 400', async () => {
      const tripID = 5;
      const mockBody = {
        name: 'updated_trip_1',
        budget: 1000,
        country_id: 1,
        startDateTime: '2022-01-02',
        endDateTime: '2022/01/02',
      };

      const res = await request(app).put(`/trip/${tripID}`).send(mockBody);
      expect(res.statusCode).toEqual(400);
    });

    it('Failed to update trip (Invalid tripID) with status code 400', async () => {
      const tripID = -1;
      const mockBody = {
        name: 'updated_trip_1',
        budget: 1000,
        country_id: 1,
        startDateTime: '2022-01-02',
        endDateTime: '2022-01-02',
      };

      const res = await request(app).put(`/trip/${tripID}`).send(mockBody);
      expect(res.statusCode).toEqual(400);
    });
  });
});
