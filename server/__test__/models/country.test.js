const { getCountries } = require('../../src/models/country');
const {
  dbConfig,
  tearDownCountryDB,
  setUpCountryDB,
} = require('../testDbSetup');

describe('Test country model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await setUpCountryDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
  });

  afterAll(() => pool.end());

  describe('Test getCountries()', () => {
    it('Successfully returns 0 countries from the country table', async () => {
      await tearDownCountryDB();
      const result = await getCountries();
      const expected = [];

      expect(result).toEqual(expected);
    });

    it('Successfully returns countries from the country table', async () => {
      const result = await getCountries();

      const expected = [
        {
          country_code: 'KR',
          country_id: 1,
          currency: '￦',
          name: 'Republic of Korea',
        },
        {
          country_code: 'CA',
          country_id: 2,
          currency: '$',
          name: 'Canada',
        },
        {
          country_code: 'ID',
          country_id: 3,
          currency: 'Rp',
          name: 'Indonesia',
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
