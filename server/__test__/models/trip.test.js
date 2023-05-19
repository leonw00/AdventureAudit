const {
  getUserTripsByStartDate,
  getUserTripsByEndDate,
  getUserTripsByStartEndDate,
  deleteTrip,
  getTrip,
  createTrip,
  updateTrip,
} = require('../../src/models/trip');
const {
  dbConfig,
  tearDownCountryDB,
  tearDownTripDB,
  setUpCountryDB,
  setUpTripDB,
  setUpGroupDB,
  tearDownGroupDB,
  tearDownUserDB,
  setUpUserDB,
} = require('../testDbSetup');

describe('Test trip model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownUserDB();
    await tearDownGroupDB();
    await setUpCountryDB();
    await setUpTripDB();
    await setUpUserDB();
    await setUpGroupDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownUserDB();
    await tearDownGroupDB();
  });

  afterAll(() => pool.end());

  describe('Test getUserTripsByStartDate()', () => {
    it('Successfully returns trips after the start date from the trip table', async () => {
      const userID = 1;
      const startDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const trips = await getUserTripsByStartDate(userID, startDate);

      const expected = [
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
      ];

      expect(trips).toEqual(expected);
    });

    it('Successfully returns 0 trips after the start date from the trip table', async () => {
      const userID = 2;
      const startDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const trips = await getUserTripsByStartDate(userID, startDate);

      const expected = [];

      expect(trips).toEqual(expected);
    });
  });

  describe('Test getUserTripsByEndDate()', () => {
    it('Successfully returns trips before the end date from the trip table', async () => {
      const userID = 1;
      const endDate = new Date('2023-02-13');
      const trips = await getUserTripsByEndDate(userID, endDate);

      const expected = [
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
      ];

      expect(trips).toEqual(expected);
    });

    it('Successfully returns trips where the user is not the leader before the end date from the trip table', async () => {
      const userID = 3;
      const endDate = new Date('2023-02-13');
      const trips = await getUserTripsByEndDate(userID, endDate);

      const expected = [
        {
          trip_id: 6,
          name: 'trip_6',
          budget: '100000.0000',
          country_id: 2,
          start_date: 'Apr/28/2022',
          end_date: 'Apr/30/2022',
        },
      ];

      expect(trips).toEqual(expected);
    });

    it('Successfully returns 0 trips before the end date from the trip table', async () => {
      const userID = 2;
      const endDate = new Date('2023-02-13');
      const trips = await getUserTripsByEndDate(userID, endDate);

      const expected = [];

      expect(trips).toEqual(expected);
    });
  });

  describe('Test getUserTripsByStartEndDate()', () => {
    it('Successfully returns trips between start date and end date from the trip table', async () => {
      const userID = 1;
      const startDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const endDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const trips = await getUserTripsByStartEndDate(
        userID,
        startDate,
        endDate,
      );

      const expected = [
        {
          trip_id: 1,
          name: 'trip_1',
          budget: '10.0000',
          country_id: 3,
          start_date: 'Jan/01/2023',
          end_date: 'Apr/03/2023',
        },
      ];

      expect(trips).toEqual(expected);
    });

    it('Successfully returns 0 trips between start date to end date from the trip table', async () => {
      const userID = 2;
      const startDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const endDate = new Date('2023-02-13').toJSON().slice(0, 10);
      const trips = await getUserTripsByStartEndDate(
        userID,
        startDate,
        endDate,
      );

      const expected = [];

      expect(trips).toEqual(expected);
    });
  });

  describe('Test deleteTrip()', () => {
    it('Successfully delete trip with given tripID', async () => {
      const tripID = 1;
      const expectedRow = 6;
      const expectedAffectedRow = 1;
      const trips = await deleteTrip(tripID);
      expect(trips.affectedRows).toEqual(expectedAffectedRow);

      let statement = 'SELECT COUNT(1) as count from trip;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);

      const expectedResult = [];

      statement = 'SELECT * FROM trip WHERE trip_id = ?;';
      [result] = await pool.promise().query(statement, [tripID]);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test getTrip()', () => {
    it('Successfully get trip with given tripID', async () => {
      const tripID = 1;

      const result = await getTrip(tripID);
      const expected = [
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
      ];
      expect(result).toEqual(expected);
    });

    it('Successfully get a group trip with given tripID', async () => {
      const tripID = 6;

      const result = await getTrip(tripID);
      const expected = [
        {
          trip_id: 6,
          name: 'trip_6',
          budget: '100000.0000',
          country_id: 2,
          country_name: 'Canada',
          country_code: 'CA',
          currency: '$',
          start_date: 'Apr/28/2022',
          end_date: 'Apr/30/2022',
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  describe('Test createTrip()', () => {
    it('Successfully insert trip', async () => {
      const expectedAffectedRow = 1;
      const expectedRow = 8;

      const name = 'updated_trip';
      const budget = 1;
      const startDate = new Date('2023-02-16').toJSON().slice(0, 10);
      const endDate = new Date('2023-02-16').toJSON().slice(0, 10);
      const countryID = 2;
      const userID = 1;

      const trip = await createTrip(
        name,
        budget,
        countryID,
        startDate,
        endDate,
        userID,
      );
      expect(trip.affectedRows).toEqual(expectedAffectedRow);

      const statement = 'SELECT COUNT(1) as count from trip;';
      const [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);
    });
  });

  describe('Test updateTrip()', () => {
    it('Successfully update trip', async () => {
      const expectedAffectedRow = 1;

      const name = 'update_trip';
      const budget = 1;
      const startDate = new Date('2023-02-16').toJSON().slice(0, 10);
      const endDate = new Date('2023-02-16').toJSON().slice(0, 10);
      const countryID = 2;
      const tripID = 1;

      let expectedResult = [
        {
          budget: '10.0000',
          country_id: 3,
          endDate: 'Apr/03/2023',
          name: 'trip_1',
          startDate: 'Jan/01/2023',
          trip_id: 1,
        },
      ];

      const statement = `
        SELECT
          trip_id, name, budget, country_id, DATE_FORMAT(start_date_time,'%b/%d/%Y') as startDate, DATE_FORMAT(end_date_time,'%b/%d/%Y') as endDate
        FROM
          trip
        WHERE
          trip_id = ?;`;
      let [result] = await pool.promise().query(statement, [tripID]);
      expect(result).toEqual(expectedResult);

      const trip = await updateTrip(
        name,
        budget,
        countryID,
        startDate,
        endDate,
        tripID,
      );
      expect(trip.affectedRows).toEqual(expectedAffectedRow);

      expectedResult = [
        {
          budget: '1.0000',
          country_id: 2,
          endDate: 'Feb/16/2023',
          name: 'update_trip',
          startDate: 'Feb/16/2023',
          trip_id: 1,
        },
      ];
      [result] = await pool.promise().query(statement, [tripID]);
      expect(result).toEqual(expectedResult);
    });
  });
});
