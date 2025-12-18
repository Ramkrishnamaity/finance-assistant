const { controller } = require('../common/helpers/controller');
const categoryService = require('../services/category.service');

const categoryController = {
  /**
   * Get all categories
   */
  getAllCategories: controller(async (req, res) => {
    const { type } = req.query;
    const categories = await categoryService.getAllCategories(req.user.userId, type);

    res.json({
      status: true,
      message: 'Categories fetched successfully',
      data: categories
    });
  }),

  /**
   * Get category by ID
   */
  getCategoryById: controller(async (req, res) => {
    const category = await categoryService.getCategoryById(
      req.params.id,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Category fetched successfully',
      data: category
    });
  }),

  /**
   * Create new category
   */
  createCategory: controller(async (req, res) => {
    const category = await categoryService.createCategory(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      status: true,
      message: 'Category created successfully',
      data: category
    });
  }),

  /**
   * Update category
   */
  updateCategory: controller(async (req, res) => {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json({
      status: true,
      message: 'Category updated successfully',
      data: category
    });
  }),

  /**
   * Delete category
   */
  deleteCategory: controller(async (req, res) => {
    await categoryService.deleteCategory(req.params.id, req.user.userId);

    res.json({
      status: true,
      message: 'Category deleted successfully',
      data: null
    });
  })
};

module.exports = categoryController;
