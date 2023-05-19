const express = require('express');
const {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
} = require('../controllers/category');

const router = express.Router();

router.get('/trip/:trip_id', getCategoriesController);
router.post('/', createCategoryController);
router.delete('/:category_id', deleteCategoryController);

module.exports = router;
