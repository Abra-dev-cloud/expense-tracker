'use client';

import { useState, useEffect } from 'react';

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  created_at: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
  });

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add expense
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          amount: parseFloat(formData.amount),
          category: formData.category,
        }),
      });

      if (res.ok) {
        setFormData({ title: '', amount: '', category: 'Food' });
        fetchExpenses();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Delete expense
const handleDelete = async (id: string) => {
  console.log('Deleting expense with ID:', id); // Debug log
  
  try {
    const res = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    });

    console.log('Delete response status:', res.status); // Debug log
    
    const data = await res.json();
    console.log('Delete response data:', data); // Debug log

    if (res.ok) {
      console.log('Delete successful, refreshing list'); // Debug log
      fetchExpenses();
    } else {
      console.error('Delete failed:', data);
      alert(`Failed to delete: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    alert('Network error - check console');
  }
};
  // Calculate total
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600">Track your daily expenses efficiently</p>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-2">
              Total Expenses
            </p>
            <p className="text-4xl font-bold text-indigo-600">
              KES{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Expense Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Add New Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      type="text"
      value={formData.title}
      onChange={(e) =>
        setFormData({ ...formData, title: e.target.value })
      }
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
      placeholder="e.g., Groceries"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Amount
    </label>
    <input
      type="number"
      step="0.01"
      value={formData.amount}
      onChange={(e) =>
        setFormData({ ...formData, amount: e.target.value })
      }
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
      placeholder="0.00"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Category
    </label>
    <select
      value={formData.category}
      onChange={(e) =>
        setFormData({ ...formData, category: e.target.value })
      }
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
    >
      <option value="Food">Food</option>
      <option value="Transportation">Transportation</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Shopping">Shopping</option>
      <option value="Bills">Bills</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
  >
    Add Expense
  </button>
</form>
          </div>

          {/* Expenses List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Recent Expenses
            </h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No expenses yet. Add your first expense!
                </p>
              ) : (
                expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {expense.title}
                      </h3>
                      <p className="text-sm text-gray-600">{expense.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-indigo-600">
                        KES{Number(expense.amount).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Built with Next.js, PostgreSQL (Neon), and Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}