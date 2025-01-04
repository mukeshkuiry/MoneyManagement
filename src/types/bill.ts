export interface Bill {
  id: number;
  description: string;
  category: string;
  amount: string;
  date: string;
}

export interface BillState {
  bills: Bill[];
  filteredCategory: string | null;
  monthlyBudget: number;
}