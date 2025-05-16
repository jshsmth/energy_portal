import { useState, useEffect } from 'react';

type Payment = {
  id: number;
  accountId: number;
  amount: number;
  date: string;
  status: string;
};

export const usePaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      if (!response.ok) throw new Error('Failed to fetch payments');
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError('Failed to load payment history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    payments,
    loading,
    error,
    refreshPayments: fetchPayments
  };
}; 