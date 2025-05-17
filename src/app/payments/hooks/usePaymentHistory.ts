import { usePaymentsQuery } from "./usePaymentsQuery";

export type Payment = {
  id: number;
  accountId: number;
  amount: number;
  date: string;
  status: string;
};

export const usePaymentHistory = () => {
  const { data: payments = [], isLoading, error, refetch } = usePaymentsQuery();

  return {
    payments,
    isLoading,
    error: error ? "Failed to load payment history. Please try again later." : null,
    refreshPayments: refetch,
  };
};
