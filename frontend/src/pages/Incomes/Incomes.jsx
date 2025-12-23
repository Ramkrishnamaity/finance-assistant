import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { incomeAPI } from '../../apis/income.api';
import { categoryAPI } from '../../apis/category.api';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';

const incomeSchema = Yup.object({
  amount: Yup.number().min(0).required('Amount is required'),
  description: Yup.string().min(2).max(200).required('Description is required'),
  date: Yup.date().max(new Date()).required('Date is required'),
  categoryId: Yup.string().required('Category is required'),
  notes: Yup.string().max(500)
});

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [incomesRes, categoriesRes] = await Promise.all([
        incomeAPI.getAll(),
        categoryAPI.getAll('income')
      ]);

      if (incomesRes.data.status) setIncomes(incomesRes.data.data);
      if (categoriesRes.data.status) setCategories(categoriesRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (editingIncome) {
        const response = await incomeAPI.update(editingIncome._id, values);
        if (response.data.status) toast.success('Income updated successfully');
      } else {
        const response = await incomeAPI.create(values);
        if (response.data.status) toast.success('Income added successfully');
      }
      fetchData();
      setShowModal(false);
      setEditingIncome(null);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this income?')) return;

    try {
      const response = await incomeAPI.delete(id);
      if (response.data.status) {
        toast.success('Income deleted successfully');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete income');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Incomes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
        >
          <Plus size={20} />
          <span>Add Income</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border">
          {incomes.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No incomes yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {incomes.map((income) => (
                    <tr key={income._id} className="hover:bg-background transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {format(new Date(income.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">{income.description}</p>
                        {income.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{income.notes}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{income.categoryId?.icon}</span>
                          <span className="text-sm text-gray-700">{income.categoryId?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(income.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingIncome(income);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(income._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {editingIncome ? 'Edit Income' : 'Add Income'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingIncome(null);
                }}
                className="text-gray-400 hover:text-muted-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <Formik
                initialValues={{
                  amount: editingIncome?.amount || '',
                  description: editingIncome?.description || '',
                  date: editingIncome?.date
                    ? format(new Date(editingIncome.date), 'yyyy-MM-dd')
                    : format(new Date(), 'yyyy-MM-dd'),
                  categoryId: editingIncome?.categoryId?._id || '',
                  notes: editingIncome?.notes || ''
                }}
                validationSchema={incomeSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <Field
                        type="number"
                        name="amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                      <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Field
                        name="description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="What did you earn from?"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <Field
                        type="date"
                        name="date"
                        max={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Field
                        as="select"
                        name="categoryId"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (optional)
                      </label>
                      <Field
                        as="textarea"
                        name="notes"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Additional notes..."
                      />
                      <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setEditingIncome(null);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-background transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : editingIncome ? 'Update' : 'Add'}
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

export default Incomes;
