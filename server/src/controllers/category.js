const AppError = require('../errors');
const {
  getTripCategories,
  deleteCategory,
  createCategory,
} = require('../models/category');
const {
  validateCategoryBody,
  validateTripIdPath,
  validateCategoryIdPath,
} = require('../utils/validators');

const errMsg = 'An error occurred with the category API';

// Retrieve categories based on the given trip_id
async function getCategoriesController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const { trip_id: tripID } = req.params;
    const categories = await getTripCategories(tripID);
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

    const { category_id: categoryID } = req.params;
    const category = await deleteCategory(categoryID);
    if (category.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
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
    if (error) throw error;

    const {
      trip_id: tripID, name, colour, icon,
    } = req.body;
    const category = await createCategory(tripID, name, colour, icon);
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
