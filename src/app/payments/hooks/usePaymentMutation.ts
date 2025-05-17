import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/app/constants";
import type { Account } from "../../accounts/types/accounts";

interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
}

interface PaymentMutationVariables {
  card: CardDetails;
  amount: number;
  account: Account;
}

export const usePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ card, amount, account }: PaymentMutationVariables) => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: account.id,
          amount: amount,
          cardDetails: card,
        }),
      });

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.PAYMENT_FAILED);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}; 