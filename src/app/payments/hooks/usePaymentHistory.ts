import { useQuery } from "@tanstack/react-query";

export type Payment = {
  id: number;
  accountId: number;
  amount: number;
  date: string;
  status: string;
};

export const usePaymentHistory = () => {
  const { data: payments = [], isLoading, error, refetch } = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch("/api/payments");
      if (!response.ok) throw new Error("Failed to fetch payments");
      return response.json();
    },
  });

  return {
    payments,
    loading: isLoading,
    error: error ? "Failed to load payment history. Please try again later." : null,
    refreshPayments: refetch,
  };
};
