import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill, BillState } from '../types/bill';

const initialState: BillState = {
  bills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: "430",
      date: "01-02-2020"
    },
    // ... (rest of the sample bills)
  ],
  filteredCategory: null,
  monthlyBudget: 50000
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
    },
    setFilteredCategory: (state, action: PayloadAction<string | null>) => {
      state.filteredCategory = action.payload;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    }
  }
});

export const { addBill, editBill, removeBill, setFilteredCategory, setMonthlyBudget } = billSlice.actions;
export default billSlice.reducer;