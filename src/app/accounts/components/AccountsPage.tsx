"use client";

import { AccountCard } from "./AccountCard";
import { FilterBar } from "./FilterBar";
import { PaymentModal } from "../../payments/components/PaymentModal";
import { useAccountsPage } from "../hooks/useAccountsPage";
import { AccountSkeleton } from "./AccountSkeleton";

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            My Energy Accounts
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            My Energy Accounts
          </h1>
          <AccountSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
          My Energy Accounts
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-72 md:sticky md:top-24 flex-shrink-0">
            <FilterBar filter={filter} setFilter={setFilter} />
          </aside>
          <section className="flex-1 w-full">
            <div className="flex flex-col gap-8">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onMakePayment={handleMakePayment}
                />
              ))}
            </div>
          </section>
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
