export interface Bill {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

export interface BillState {
  bills: Bill[];
  filteredCategory: string | null;
  monthlyBudget: number;
}