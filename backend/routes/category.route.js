const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryValidation = require('../common/schemas/category.validate');
const { JWTUser } = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(JWTUser);

// Get all categories (with optional type filter)
router.get('/', categoryController.getAllCategories);

// Get category by ID
router.get('/:id', categoryValidation.categoryIdParam, categoryController.getCategoryById);

// Create new category
router.post('/', categoryValidation.createCategory, categoryController.createCategory);

// Update category
router.put('/:id', categoryValidation.categoryIdParam, categoryValidation.updateCategory, categoryController.updateCategory);

// Delete category
router.delete('/:id', categoryValidation.categoryIdParam, categoryController.deleteCategory);

module.exports = router;
