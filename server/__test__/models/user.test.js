const {
  getUserByEmailAddress,
  createUser,
  getUser,
  updateUser,
  getGroup,
} = require('../../src/models/user');

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
} = require('../testDbSetup');

describe('Test user model', () => {
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

  describe('Test getUserByEmailAddress()', () => {
    it('Successfully returns 0 users from the user table', async () => {
      await tearDownUserDB();
      const userEmail = 'test1@gmail.com';
      const result = await getUserByEmailAddress(userEmail);
      const expected = [];

      expect(result).toEqual(expected);
    });

    it('Successfully returns user 1 from the user table', async () => {
      const userEmail = 'test1@gmail.com';
      const result = await getUserByEmailAddress(userEmail);

      const expected = [
        {
          user_id: 1,
          email_id: 'test1@gmail.com',
          name: 'name1',
          country_name: 'Republic of Korea',
          country_code: 'KR',
          currency: '￦',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns user 3 from the user table', async () => {
      const userEmail = 'test3@gmail.com';
      const result = await getUserByEmailAddress(userEmail);

      const expected = [
        {
          user_id: 3,
          email_id: 'test3@gmail.com',
          name: 'name3',
          country_name: 'Indonesia',
          country_code: 'ID',
          currency: 'Rp',
        },
      ];

      expect(result).toEqual(expected);
    });

    it("Successfully returns an empty list when given an email that doesn't exist in the user table", async () => {
      const userEmail = 'test4@gmail.com';
      const result = await getUserByEmailAddress(userEmail);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('Test createUser()', () => {
    it('Successfully added user 4 to the user table', async () => {
      const userEmail = 'test4@gmail.com';
      const userCountry = 1;
      const userName = 'name4';

      let expectedCount = 3;
      const statement = 'SELECT COUNT(1) as count from user;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);

      const expectedAffectedRow = 1;
      const newUser = await createUser(userName, userCountry, userEmail);
      expect(newUser.affectedRows).toEqual(expectedAffectedRow);

      expectedCount = 4;
      [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedCount);
    });
  });

  describe('Test getUser()', () => {
    it('Successfully returns 0 users from the user table', async () => {
      await tearDownUserDB();
      const userID = 1;
      const result = await getUser(userID);
      const expected = [];

      expect(result).toEqual(expected);
    });

    it('Successfully returns user 1 from the user table', async () => {
      const userID = 1;
      const result = await getUser(userID);

      const expected = [
        {
          user_id: 1,
          email_id: 'test1@gmail.com',
          name: 'name1',
          country_name: 'Republic of Korea',
          country_code: 'KR',
          currency: '￦',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns user 3 from the user table', async () => {
      const userID = 3;
      const result = await getUser(userID);

      const expected = [
        {
          user_id: 3,
          email_id: 'test3@gmail.com',
          name: 'name3',
          country_name: 'Indonesia',
          country_code: 'ID',
          currency: 'Rp',
        },
      ];

      expect(result).toEqual(expected);
    });

    it("Successfully returns an empty list when given an id that doesn't exist in the user table", async () => {
      const userID = 100;
      const result = await getUser(userID);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('Test updateUser()', () => {
    it('Successfully update user 3 to have different properties', async () => {
      const userID = 3;
      const newUserEmail = 'test4@gmail.com';
      const newUserCountry = 2;
      const newUserName = 'name4';

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

      const expectedAffectedRow = 1;
      const updatedUser = await updateUser(
        userID,
        newUserName,
        newUserCountry,
        newUserEmail,
      );
      expect(updatedUser.affectedRows).toEqual(expectedAffectedRow);

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
  });

  describe('Testing getGroup()', () => {
    it('Successfully gets the group for tripID 1 from the group table', async () => {
      const tripID = 1;
      const result = await getGroup(tripID);

      const expected = [
        {
          user_id: 1,
          email_id: 'test1@gmail.com',
          name: 'name1',
          country_name: 'Republic of Korea',
          country_code: 'KR',
          currency: '￦',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully gets the group for tripID 6 from the group table', async () => {
      const tripID = 6;
      const result = await getGroup(tripID);

      const expected = [
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
      ];

      expect(result).toEqual(expected);
    });

    it("Successfully returns an empty list when requesting the group of a trip_id that doesn't exist", async () => {
      const tripID = 100;
      const result = await getGroup(tripID);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });
});
