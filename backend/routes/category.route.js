import express from 'express';
const router = express.Router();
import categoryController from '../controllers/category.controller.js';
import categoryValidation from '../utils/schemas/category.validate.js';
import { JWTUser } from '../middlewares/auth.middleware.js';

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

export default router;
