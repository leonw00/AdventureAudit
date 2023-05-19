const {
  getInvites,
  createInvite,
  deleteInvite,
} = require('../../src/models/invite');
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
} = require('../testDbSetup');

describe('Test invite model', () => {
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

  describe('Test getInvites()', () => {
    it('Successfully gets all invites for user_id 1 from the database', async () => {
      const userID = 2;
      const result = await getInvites(userID);

      const expectedResult = [
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
      ];

      expect(result).toEqual(expectedResult);
    });

    it('Successfully gets an empty list if a user has no invites', async () => {
      const userID = 1;
      const result = await getInvites(userID);

      const expectedResult = [];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test createInvite()', () => {
    it('Successfully add a new invite to the database', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from invite;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 2;
      const inviterID = 1;
      const expectedAffectedRow = 1;
      const invite = await createInvite(tripID, userID, inviterID);
      expect(invite.affectedRows).toEqual(expectedAffectedRow);

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
  });

  describe('Test deleteInvite()', () => {
    it('Successfully deletes a invite from the database with the given trip id and user id', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from invite;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const member = await deleteInvite(tripID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 7;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [];
      statement = 'SELECT * from `group` WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });
  });
});
