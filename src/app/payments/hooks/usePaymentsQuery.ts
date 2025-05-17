import { useQuery } from "@tanstack/react-query";
import type { Payment } from "./usePaymentHistory";
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/app/constants";

export const usePaymentsQuery = () => {
  return useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS);
      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_PAYMENTS);
      return response.json();
    },
  });
}; 