import Category from '../models/category.model.js';
import StatusError from '../utils/helpers/statusError.helper.js';

const categoryService = {
  /**
   * Get all categories for a user
   */
  async getAllCategories(userId, type = null) {
    const query = { userId, freezed: 0 };

    if (type) {
      query.type = type;
    }

    const categories = await Category.find(query)
      .sort({ createdAt: -1 });

    return categories;
  },

  /**
   * Get category by ID
   */
  async getCategoryById(categoryId, userId) {
    const category = await Category.findOne({
      _id: categoryId,
      userId,
      freezed: 0
    });

    if (!category) {
      throw new StatusError('Category not found', 404);
    }

    return category;
  },

  /**
   * Create new category
   */
  async createCategory(data, userId) {
    const categoryData = {
      ...data,
      userId
    };

    const category = await Category.create(categoryData);
    return category;
  },

  /**
   * Update category
   */
  async updateCategory(categoryId, data, userId) {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId, userId, freezed: 0 },
      data,
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new StatusError('Category not found', 404);
    }

    return category;
  },

  /**
   * Delete category (soft delete)
   */
  async deleteCategory(categoryId, userId) {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId, userId, freezed: 0 },
      { freezed: 1 },
      { new: true }
    );

    if (!category) {
      throw new StatusError('Category not found', 404);
    }

    return category;
  }
};

export default categoryService;
