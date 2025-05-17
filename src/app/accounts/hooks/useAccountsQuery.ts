import { useQuery } from "@tanstack/react-query";
import type { Account } from "../types/accounts";
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/app/constants";

export const useAccountsQuery = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ACCOUNTS);
      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_ACCOUNTS);
      return response.json();
    },
  });
}; 