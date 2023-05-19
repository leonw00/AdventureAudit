const {
  getTotalTripExpense,
  getTopFiveTransactions,
  getTransactionSummaryByCategory,
  getDebtRelation,
} = require('../../src/models/report');

const {
  dbConfig,
  tearDownCategoryDB,
  tearDownTransactionDB,
  tearDownPayerDB,
  tearDownTripDB,
  tearDownCountryDB,
  setUpCategoryDB,
  setUpTransactionDB,
  setUpPayerDB,
  setUpTripDB,
  setUpCountryDB,
  tearDownUserDB,
  setUpUserDB,
} = require('../testDbSetup');

describe('Test report model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownUserDB();
    await tearDownPayerDB();
    await setUpCountryDB();
    await setUpUserDB();
    await setUpTripDB();
    await setUpCategoryDB();
    await setUpTransactionDB();
    await setUpPayerDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownUserDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await tearDownTransactionDB();
    await tearDownPayerDB();
  });

  afterAll(() => pool.end());

  describe('Testing getTotalTripExpense()', () => {
    it('Successfully returns an empty report', async () => {
      await tearDownTransactionDB();
      const tripID = 1;
      const result = await getTotalTripExpense(tripID);
      const expected = [
        {
          trip_total_expense: 0,
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully gets the total expenses of trip 1', async () => {
      const tripID = 1;
      const result = await getTotalTripExpense(tripID);

      const expected = [
        {
          trip_total_expense: '100.0000',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully gets the total expenses of trip 2', async () => {
      const tripID = 2;
      const result = await getTotalTripExpense(tripID);

      const expected = [
        {
          trip_total_expense: '1050.0000',
        },
      ];

      expect(result).toEqual(expected);
    });

    it("Successfully returns 0 when given a trip id that doesn't exist", async () => {
      const tripID = 100;
      const result = await getTotalTripExpense(tripID);

      const expected = [
        {
          trip_total_expense: 0,
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('Test getTopFiveTransactions()', () => {
    it('Successfully returns top 5 transactions of trip 6', async () => {
      const tripID = 6;
      const result = await getTopFiveTransactions(tripID);

      const expected = [
        {
          amount: '10000.0000',
          colour: '#EECB96',
          icon: 'icon2',
          name: 'c2',
          transaction_id: 6,
          transaction_name: 't6',
        },
        {
          amount: '100.0000',
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c1',
          transaction_id: 5,
          transaction_name: 't5',
        },
        {
          amount: '100.0000',
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c1',
          transaction_id: 9,
          transaction_name: 't9',
        },
        {
          amount: '60.0000',
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c1',
          transaction_id: 10,
          transaction_name: 't10',
        },
        {
          amount: '50.0000',
          colour: '#EECB96',
          icon: 'icon2',
          name: 'c2',
          transaction_id: 7,
          transaction_name: 't7',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns top 5 transactions of trip 1 ', async () => {
      const tripID = 1;
      const result = await getTopFiveTransactions(tripID);

      const expected = [
        {
          amount: '100.0000',
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c1',
          transaction_id: 1,
          transaction_name: 't1',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns top 5 transactions of trip 4 ', async () => {
      const tripID = 4;
      const result = await getTopFiveTransactions(tripID);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('Test getTransactionSummaryByCategory()', () => {
    it('Successfully returns how much trip spend for each category of trip 6 ', async () => {
      const tripID = 6;
      const result = await getTransactionSummaryByCategory(tripID);

      const expected = [
        {
          amount: '260.0000',
          colour: '#D6C1E7',
          icon: 'icon1',
          name: 'c1',
        },
        {
          amount: '10051.0000',
          colour: '#EECB96',
          icon: 'icon2',
          name: 'c2',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns how much trip spend for each category of trip 4 ', async () => {
      const tripID = 4;
      const result = await getTransactionSummaryByCategory(tripID);

      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('Test getDebtRelation()', () => {
    it('Successfully returns how much money user owe to others and who owes user money of user 1 and trip 6', async () => {
      const userID = 1;
      const tripID = 6;
      const result = await getDebtRelation(tripID, userID);

      const expected = [
        {
          amount: '33.33333333',
          name: 'name2',
          user_id: 2,
        },
        {
          amount: '5033.33333333',
          name: 'name3',
          user_id: 3,
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns how much money user owe to others and who owes user money of user 2 and trip 6', async () => {
      const userID = 2;
      const tripID = 6;
      const result = await getDebtRelation(tripID, userID);

      const expected = [
        {
          amount: '-33.33333333',
          name: 'name1',
          user_id: 1,
        },
      ];

      expect(result).toEqual(expected);
    });

    it('Successfully returns how much money user owe to others and who owes user money of user 2 and trip 2', async () => {
      const userID = 2;
      const tripID = 2;
      const result = await getDebtRelation(tripID, userID);

      const expected = [
        {
          amount: '-316.66666666',
          name: 'name1',
          user_id: 1,
        },
        {
          amount: '16.66666667',
          name: 'name3',
          user_id: 3,
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
