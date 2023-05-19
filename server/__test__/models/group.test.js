const {
  createGroupMember,
  deleteGroupMember,
} = require('../../src/models/group');
const {
  dbConfig,
  tearDownCountryDB,
  tearDownTripDB,
  setUpCountryDB,
  setUpTripDB,
  tearDownGroupDB,
  setUpGroupDB,
  tearDownUserDB,
  setUpUserDB,
} = require('../testDbSetup');

describe('Test group model', () => {
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

  describe('Test createGroupMember()', () => {
    it('Successfully inserts a new group member into the database', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 2;
      const expectedAffectedRow = 1;
      const member = await createGroupMember(tripID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

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
  });

  describe('Test deleteGroupMember()', () => {
    it('Successfully deletes a group member from the database with the given trip id and user id', async () => {
      let expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 6;
      const userID = 3;
      const expectedAffectedRow = 1;
      const member = await deleteGroupMember(tripID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 7;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedResult = [];
      statement = 'SELECT * from `group` WHERE trip_id = ? AND user_id = ?;';
      [result] = await pool.promise().query(statement, [tripID, userID]);
      expect(result).toEqual(expectedResult);
    });

    it('Successfully does not delete a group leader from the database with the given trip id and user id', async () => {
      const expectedCount = 8;
      let statement = 'SELECT COUNT(1) as count from `group`;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const tripID = 7;
      const userID = 1;
      const expectedAffectedRow = 0;
      const member = await deleteGroupMember(tripID, userID);
      expect(member.affectedRows).toEqual(expectedAffectedRow);

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
  });
});
