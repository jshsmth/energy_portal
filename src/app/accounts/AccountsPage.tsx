"use client";

import { NavBar } from "@/shared/NavBar";
import { useAccountsPage } from "./hooks/useAccountsPage";
import { FilterBar } from "./components/FilterBar";
import { AccountCard } from "./components/AccountCard";
import { PaymentModal } from "../payments/components/PaymentModal";

export function AccountsPage() {
  const {
    accounts,
    filter,
    setFilter,
    modalOpen,
    selectedAccount,
    loading,
    error,
    handleMakePayment,
    handlePay,
    closeModal,
  } = useAccountsPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading accounts...</div>
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
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="flex flex-col gap-4 items-center mt-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onMakePayment={handleMakePayment}
            />
          ))}
        </div>
        <PaymentModal
          open={modalOpen}
          onClose={closeModal}
          account={selectedAccount}
          onPay={handlePay}
        />
      </main>
    </div>
  );
}