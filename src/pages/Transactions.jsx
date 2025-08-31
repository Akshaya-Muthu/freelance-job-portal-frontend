import { useState, useEffect } from "react";
import axios from "../api/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await axios.get("/payments/history");
      setTransactions(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Job</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Milestone</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id} className="border-b">
              <td className="p-2">{tx.job.title}</td>
              <td className="p-2">${tx.amount / 100}</td>
              <td className="p-2">{tx.milestone}</td>
              <td className="p-2">{tx.status}</td>
              <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
