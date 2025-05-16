import * as React from "react";
import type { Account, Filter, CardDetails, PaymentResponse } from "../types/accounts";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants/accounts";

export const useAccountsPage = () => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [filter, setFilter] = React.useState<Filter>({ energyType: "", search: "" });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ACCOUNTS);
      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_ACCOUNTS);
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      setError(ERROR_MESSAGES.FETCH_ACCOUNTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    let matchesEnergyType = true;
    let matchesSearch = true;

    if (filter.energyType) {
      matchesEnergyType = account.energyType === filter.energyType;
    }

    if (filter.search) {
      matchesSearch = account.address.toLowerCase().includes(filter.search.toLowerCase());
    }

    return matchesEnergyType && matchesSearch;
  });

  const handleMakePayment = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
    setPaymentSuccess(false);
  };

  const handlePay = async (card: CardDetails, amount: number) => {
    try {
      if (!selectedAccount) return;

      const response = await fetch(API_ENDPOINTS.PAYMENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      const data: PaymentResponse = await response.json();
      setPaymentSuccess(true);
      
      setAccounts(accounts.map(account => 
        account.id === selectedAccount.id 
          ? { ...account, balance: account.balance + amount }
          : account
      ));
    } catch (error) {
      setError(ERROR_MESSAGES.PAYMENT_FAILED);
    }
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
    loading,
    error,
    handleMakePayment,
    handlePay,
    closeModal,
  };
}; 