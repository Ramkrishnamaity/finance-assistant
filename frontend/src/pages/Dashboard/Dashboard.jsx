import { useState, useEffect } from 'react';
import { statisticsAPI } from '../../apis/statistics.api';
import { toast } from 'react-toastify';
import { TrendingUp, TrendingDown, Wallet, Activity } from 'lucide-react';
import { format } from 'date-fns';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, transactionsRes] = await Promise.all([
        statisticsAPI.getSummary(),
        statisticsAPI.getRecentTransactions(10)
      ]);

      if (summaryRes.data.status) {
        setSummary(summaryRes.data.data);
      }

      if (transactionsRes.data.status) {
        setRecentTransactions(transactionsRes.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Income</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(summary?.totalIncome || 0)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {summary?.incomeCount || 0} transactions
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(summary?.totalExpenses || 0)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {summary?.expenseCount || 0} transactions
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center">
              <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Balance</p>
              <h3 className={(summary?.balance || 0) >= 0 ? 'text-2xl font-bold text-blue-600 dark:text-blue-400' : 'text-2xl font-bold text-orange-600 dark:text-orange-400'}>
                {formatCurrency(summary?.balance || 0)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Current balance</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
              <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transactions</p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {(summary?.incomeCount || 0) + (summary?.expenseCount || 0)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Total count</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
              <Activity className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
        </div>
        <div className="p-6">
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No transactions yet</p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className={transaction.type === 'income' ? 'w-10 h-10 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-950' : 'w-10 h-10 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-950'}>
                      <span className="text-xl">{transaction.categoryId?.icon || '💰'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.categoryId?.name || 'Uncategorized'} •{' '}
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={transaction.type === 'income' ? 'font-semibold text-green-600 dark:text-green-400' : 'font-semibold text-red-600 dark:text-red-400'}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
