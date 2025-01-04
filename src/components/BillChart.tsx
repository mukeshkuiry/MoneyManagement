import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parse } from 'date-fns';

export default function BillChart() {
  const { bills } = useSelector((state: RootState) => state.bills);

  const chartData = bills
    .sort((a, b) => {
      const dateA = parse(a.date, 'dd-MM-yyyy', new Date());
      const dateB = parse(b.date, 'dd-MM-yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    })
    .map(bill => ({
      date: format(parse(bill.date, 'dd-MM-yyyy', new Date()), 'MMM dd'),
      amount: parseFloat(bill.amount)
    }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}