// category stub
const {
  validateCategoryBody,
  validateTripIdPath,
  validateCategoryIdPath,
} = require('../../utils/validators');

// Retrieve categories based on the given trip_id
async function getCategoriesController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const categories = [
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

    return res.status(200).json({ categories });
  } catch (err) {
    return next(err);
  }
}

// Delete a category based on given category_id
async function deleteCategoryController(req, res, next) {
  try {
    const { error } = validateCategoryIdPath(req.params);
    if (error) throw error;

    const category = {};
    return res.status(200).json({
      statusCode: 200,
      message: 'Category deleted',
      category,
    });
  } catch (err) {
    return next(err);
  }
}

// Create a new category
async function createCategoryController(req, res, next) {
  try {
    const { error } = validateCategoryBody(req.body);
    const category = {};

    if (error) throw error;
    return res.status(200).json({
      statusCode: 200,
      message: 'Category created',
      category,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCategoriesController,
  deleteCategoryController,
  createCategoryController,
};
