import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Bill } from "../types/bill";
import { addBill, editBill } from "../store/billSlice";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";

interface BillFormProps {
  initialBill?: Bill;
  onClose: () => void;
}

export default function BillForm({ initialBill, onClose }: BillFormProps) {
  const dispatch = useDispatch();

  // Initialize form data with fallback values for inputs
  const [formData, setFormData] = useState<{
    id?: number;
    description: string;
    category: string;
    amount: number;
    date: string;
  }>({
    id: initialBill?.id,
    description: initialBill?.description || "",
    category: initialBill?.category || "",
    amount: initialBill?.amount || 0,
    date: initialBill?.date ? format(initialBill.date, "yyyy-MM-dd") : "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create bill object with current form data
    const billToSubmit: Bill = {
      id: initialBill?.id || Date.now(), // Use existing id or generate new
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount.toString()), // Ensure amount is a number
      date: new Date(formData.date),
    };

    // Close the form after submitting
    onClose();

    // Dispatch action based on whether it's editing or adding a new bill
    if (initialBill) {
      dispatch(editBill(billToSubmit));
    } else {
      dispatch(addBill(billToSubmit));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialBill ? "Edit Bill" : "Add New Bill"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus size={20} className="mr-1" />
              {initialBill ? "Save Changes" : "Add Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
