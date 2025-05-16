"use client";

import NavBar from "../../shared/NavBar";
import { PaymentsHistoryTable } from "./components/PaymentsHistoryTable";
import { usePaymentHistory } from "./hooks/usePaymentHistory";

export default function PaymentsPage() {
  const { loading, error } = usePaymentHistory();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading payment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        </div>
        <PaymentsHistoryTable />
      </main>
    </div>
  );
}
