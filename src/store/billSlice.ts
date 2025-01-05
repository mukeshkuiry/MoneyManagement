import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill, BillState } from "../types/bill";

const initialState: BillState = {
  bills: [
    {
      id: 3,
      description: "Pizza Margherita",
      category: "FoodNDining",
      amount: 650,
      date: new Date("2023-12-10"),
    },
    {
      id: 4,
      description: "Burger Combo",
      category: "FoodNDining",
      amount: 450,
      date: new Date("2023-12-15"),
    },
    {
      id: 5,
      description: "Pasta Carbonara",
      category: "FoodNDining",
      amount: 700,
      date: new Date("2023-12-20"),
    },
    {
      id: 6,
      description: "Coffee and Cake",
      category: "FoodNDining",
      amount: 250,
      date: new Date("2023-12-25"),
    },
  ],
  filteredCategory: null,
  monthlyBudget: 50000,
};

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        // Update bill only if it exists
        state.bills[index] = action.payload;
      } else {
        console.warn(`Bill with id ${action.payload.id} not found.`);
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      const newBills = state.bills.filter((bill) => bill.id !== action.payload);
      if (newBills.length === state.bills.length) {
        console.warn(`No bill found with id ${action.payload}.`);
      }
      state.bills = newBills; // Assign filtered array
    },
    setFilteredCategory: (state, action: PayloadAction<string | null>) => {
      state.filteredCategory = action.payload;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const {
  addBill,
  editBill,
  removeBill,
  setFilteredCategory,
  setMonthlyBudget,
} = billSlice.actions;

export default billSlice.reducer;
