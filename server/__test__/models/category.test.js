const {
  getTripCategories,
  deleteCategory,
  createCategory,
} = require('../../src/models/category');
const {
  dbConfig,
  tearDownCategoryDB,
  tearDownCountryDB,
  tearDownTripDB,
  setUpCategoryDB,
  setUpCountryDB,
  setUpTripDB,
} = require('../testDbSetup');

describe('Test category model', () => {
  let pool;

  beforeEach(async () => {
    pool = await dbConfig();
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
    await setUpCountryDB();
    await setUpTripDB();
    await setUpCategoryDB();
  });

  afterEach(async () => {
    await tearDownCountryDB();
    await tearDownTripDB();
    await tearDownCategoryDB();
  });

  afterAll(async () => pool.end());

  describe('Test getTripCategories()', () => {
    it('Successfully returns the categories of trip 1 from the category table', async () => {
      const tripID = 1;
      const result = await getTripCategories(tripID);

      const expected = [
        {
          category_id: 1,
          name: 'c1',
          colour: '#D6C1E7',
          icon: 'icon1',
        },
        {
          category_id: 2,
          name: 'c2',
          colour: '#EECB96',
          icon: 'icon2',
        },
        {
          category_id: 3,
          name: 'c3',
          colour: '#D6C1E7',
          icon: 'icon3',
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  describe('Test createCategory()', () => {
    it('Successfully inserts a new category into the database', async () => {
      const expectedAffectedRow = 1;
      const expectedRow = 7;

      const tripID = 1;
      const name = 'c7';
      const colour = '#D6C1E7';
      const icon = 'icon7';

      const newCategory = await createCategory(tripID, name, colour, icon);
      expect(newCategory.affectedRows).toEqual(expectedAffectedRow);
      const expectedResult = [
        {
          category_id: newCategory.insertId,
          colour: '#D6C1E7',
          icon: 'icon7',
          name: 'c7',
          trip_id: 1,
        },
      ];

      let statement = 'SELECT COUNT(1) as count from category;';
      let [result] = await pool.promise().query(statement);
      expect(result[0].count).toEqual(expectedRow);

      statement = 'SELECT * from category WHERE category_id = ?;';
      [result] = await pool.promise().query(statement, [newCategory.insertId]);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test deleteCategory()', () => {
    it('Successfully deletes a category from the database with the given category id', async () => {
      const expectedAffectedRow = 1;
      const expectedRow = 5;
      const expectedResult = [];

      const categoryID = 1;

      const deletedCategory = await deleteCategory(categoryID);

      let statement = 'SELECT COUNT(1) as count from category;';
      let [result] = await pool.promise().query(statement);

      expect(deletedCategory.affectedRows).toEqual(expectedAffectedRow);
      expect(result[0].count).toEqual(expectedRow);

      statement = 'SELECT * from category WHERE category_id = ?;';
      [result] = await pool.promise().query(statement, [categoryID]);
      expect(result).toEqual(expectedResult);
    });
  });
});
