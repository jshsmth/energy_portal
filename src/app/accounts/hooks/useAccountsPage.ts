import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Account, Filter, CardDetails } from "../types/accounts";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants/accounts";

export const useAccountsPage = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = React.useState<Filter>({
    energyType: "",
    search: "",
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const { data: accounts = [], isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ACCOUNTS);
      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_ACCOUNTS);
      return response.json();
    },
  });

  const paymentMutation = useMutation({
    mutationFn: async ({ card, amount }: { card: CardDetails; amount: number }) => {
      if (!selectedAccount) throw new Error('No account selected');
      
      const response = await fetch(API_ENDPOINTS.PAYMENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: selectedAccount.id,
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
      setPaymentSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const filteredAccounts = filterAccounts(accounts, filter);

  const handleMakePayment = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
    setPaymentSuccess(false);
  };

  const handlePay = (card: CardDetails, amount: number) => {
    paymentMutation.mutate({ card, amount });
  };

  const closeModal = () => {
    setModalOpen(false);
    setPaymentSuccess(false);
  };

  return {
    accounts: filteredAccounts,
    filter,
    setFilter,
    modalOpen,
    selectedAccount,
    paymentSuccess,
    loading: isLoading,
    error: error ? ERROR_MESSAGES.FETCH_ACCOUNTS : null,
    handleMakePayment,
    handlePay,
    closeModal,
  };
};

const filterAccounts = (accounts: Account[], filter: Filter): Account[] => {
  return accounts.filter((account) => {
    let matchesEnergyType = true;
    let matchesSearch = true;

    if (filter.energyType) {
      matchesEnergyType = account.energyType === filter.energyType;
    }

    if (filter.search) {
      matchesSearch = account.address
        .toLowerCase()
        .includes(filter.search.toLowerCase());
    }

    return matchesEnergyType && matchesSearch;
  });
};
