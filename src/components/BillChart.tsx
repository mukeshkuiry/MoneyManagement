import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function BillChart() {
  // Access bills from the Redux store
  const { bills } = useSelector((state: RootState) => state.bills);

  // Prepare chart data: sort by date and format for display
  const formattedData = bills
    .slice() // Use slice to avoid mutating the original array
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((bill) => ({
      date: format(bill.date, "MMM dd"),
      amount: bill.amount,
    }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
