import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bill } from '../types/bill';
import { addBill, editBill } from '../store/billSlice';
import { Plus, X } from 'lucide-react';

interface BillFormProps {
  initialBill?: Bill;
  onClose: () => void;
}

export default function BillForm({ initialBill, onClose }: BillFormProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Bill>>(
    initialBill || {
      description: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialBill) {
      dispatch(editBill({ ...initialBill, ...formData } as Bill));
    } else {
      dispatch(addBill({
        ...formData,
        id: Date.now(),
      } as Bill));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialBill ? 'Edit Bill' : 'Add New Bill'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              style={{ height: '40px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              style={{ height: '40px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              style={{ height: '40px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              style={{ height: '40px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2  border border-gray-400 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus size={20} className="mr-1" />
              {initialBill ? 'Save Changes' : 'Add Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}