import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeBill } from '../store/billSlice';
import { Bill } from '../types/bill';
import BillForm from './BillForm';
import { Edit, Trash2 } from 'lucide-react';

export default function BillList() {
  const dispatch = useDispatch();
  const { bills, filteredCategory, monthlyBudget } = useSelector((state: RootState) => state.bills);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const filteredBills = filteredCategory
    ? bills.filter(bill => bill.category === filteredCategory)
    : bills;

  // Level 2: Find optimal bills to pay within budget
  const findOptimalBills = () => {
    const sortedBills = [...bills].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    const optimalBills: Bill[] = [];
    let totalAmount = 0;

    for (const bill of sortedBills) {
      const amount = parseFloat(bill.amount);
      if (totalAmount + amount <= monthlyBudget) {
        optimalBills.push(bill);
        totalAmount += amount;
      }
    }

    return optimalBills.map(bill => bill.id);
  };

  const optimalBillIds = findOptimalBills();

  return (
    <div className="space-y-4">
      {filteredBills.map(bill => (
        <div
          key={bill.id}
          className={`p-4 rounded-lg shadow-md ${
            optimalBillIds.includes(bill.id) ? 'bg-green-50 border-green-200' : 'bg-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{bill.description}</h3>
              <p className="text-sm text-gray-600">{bill.category}</p>
              <p className="text-sm text-gray-600">{bill.date}</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold">₹{parseFloat(bill.amount).toLocaleString()}</p>
              <button
                onClick={() => setEditingBill(bill)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => dispatch(removeBill(bill.id))}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingBill && (
        <BillForm
          initialBill={editingBill}
          onClose={() => setEditingBill(null)}
        />
      )}
    </div>
  );
}