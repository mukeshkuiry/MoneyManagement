import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BillList from './components/BillList';
import BillChart from './components/BillChart';
import BillForm from './components/BillForm';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredCategory } from './store/billSlice';
import { RootState } from './store/store';
import { Plus, Filter } from 'lucide-react';

function Dashboard() {
  const dispatch = useDispatch();
  const { bills, filteredCategory } = useSelector((state: RootState) => state.bills);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = Array.from(new Set(bills.map(bill => bill.category)));
  const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Bill Manager</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus size={20} className="mr-1" />
              Add Bill
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Total Monthly Bills: ₹{totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Monthly Billing Cycle</h2>
              </div>
              <BillChart />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bills</h2>
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-gray-500" />
                  <select
                    value={filteredCategory || ''}
                    onChange={(e) => dispatch(setFilteredCategory(e.target.value || null))}
                    className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <BillList />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Bills</p>
                  <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <div className="mt-2 space-y-2">
                    {categories.map(category => {
                      const categoryTotal = bills
                        .filter(bill => bill.category === category)
                        .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <span className="font-medium">₹{categoryTotal.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && <BillForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}