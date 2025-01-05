import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeBill } from "../store/billSlice";
import { Bill } from "../types/bill";
import BillForm from "./BillForm";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function BillList() {
  const dispatch = useDispatch();
  const { bills, filteredCategory, monthlyBudget } = useSelector(
    (state: RootState) => state.bills
  );
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const filteredBills = useMemo(() => {
    return filteredCategory
      ? bills.filter((bill) => bill.category === filteredCategory)
      : bills;
  }, [bills, filteredCategory]);

  // Sort bills by amount in descending order
  const sortedBills = useMemo(() => {
    return [...filteredBills].sort((a, b) => b.amount - a.amount);
  }, [filteredBills]);

  // Find the minimum number of bills to pay without exceeding the budget
  const billsToPay = useMemo(() => {
    let totalAmount = 0;
    const selectedBills: Bill[] = [];

    for (const bill of sortedBills) {
      if (totalAmount + bill.amount <= monthlyBudget) {
        selectedBills.push(bill);
        totalAmount += bill.amount;
      } else {
        break; // Stop if adding another bill exceeds the budget
      }
    }

    return selectedBills;
  }, [sortedBills, monthlyBudget]);

  const optimalBillIds = useMemo(() => {
    return billsToPay.map((bill) => bill.id);
  }, [billsToPay]);

  if (filteredBills.length === 0) {
    return <p className="text-gray-600 text-center">No bills to display.</p>;
  }

  return (
    <div className="space-y-4">
      {filteredBills.map((bill) => (
        <div
          key={bill.id}
          className={`p-4 rounded-lg shadow-md ${
            optimalBillIds.includes(bill.id)
              ? "bg-green-50 border-green-200" // Highlight bills to pay
              : "bg-white"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{bill.description}</h3>
              <p className="text-sm text-gray-600">{bill.category}</p>
              <p className="text-sm text-gray-600">
                {format(new Date(bill.date), "MMM dd, yyyy")}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold">
                ₹{bill.amount.toLocaleString()}
              </p>
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
