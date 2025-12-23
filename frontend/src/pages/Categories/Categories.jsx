import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { categoryAPI } from '../../apis/category.api';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const categorySchema = Yup.object({
  name: Yup.string().min(2).max(50).required('Category name is required'),
  type: Yup.string().oneOf(['expense', 'income']).required('Type is required')
});

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      if (response.data.status) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (editingCategory) {
        const response = await categoryAPI.update(editingCategory._id, values);
        if (response.data.status) {
          toast.success('Category updated successfully');
        }
      } else {
        const response = await categoryAPI.create(values);
        if (response.data.status) {
          toast.success('Category created successfully');
        }
      }
      fetchCategories();
      setShowModal(false);
      setEditingCategory(null);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await categoryAPI.delete(id);
      if (response.data.status) {
        toast.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter(cat => {
    if (filter === 'all') return true;
    return cat.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex space-x-2">
        {['all', 'expense', 'income'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              filter === type
                ? 'bg-primary-600 text-white'
                : 'bg-card text-gray-700 hover:bg-muted'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="bg-card rounded-lg shadow-sm p-4 border border-border hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    category.type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {category.type}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 hover:bg-blue-100 transition"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 hover:bg-red-100 transition"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-muted-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <Formik
                initialValues={{
                  name: editingCategory?.name || '',
                  type: editingCategory?.type || 'expense'
                }}
                validationSchema={categorySchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Field
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Category name"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <Field
                        as="select"
                        name="type"
                        disabled={!!editingCategory}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-muted"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </Field>
                      <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-background transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
