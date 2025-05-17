"use client";

import { AccountCard } from "./components/AccountCard";
import { FilterBar } from "./components/FilterBar";
import { PaymentModal } from "../payments/components/PaymentModal";
import { useAccountsPage } from "./hooks/useAccountsPage";
import { AccountSkeleton } from "./components/AccountSkeleton";
import { AccountHeader } from "./components/AccountHeader";
import { twMerge } from "tailwind-merge";
import { MobileFilterButton } from "./components/MobileFilterButton";
import { MobileFilterModal } from "./components/MobileFilterModal";
import { useState } from "react";

export function EnergyAccountsContainer() {
  const {
    accounts,
    filter,
    setFilter,
    modalOpen,
    selectedAccount,
    loading,
    error,
    handleMakePayment,
    closeModal,
  } = useAccountsPage();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeFilterCount = Object.values(filter).filter(Boolean).length;

  if (error) {
    return (
      <div className={twMerge("min-h-screen bg-gradient-to-br from-grey-50 via-white to-blue-50 font-sans")}>
        <main className={twMerge("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12")}>
          <AccountHeader />
          <div className={twMerge("bg-red-50 border border-red-200 rounded-lg p-4 text-red-600")}>
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={twMerge("min-h-screen bg-gradient-to-br from-grey-50 via-white to-blue-50 font-sans")}>
        <main className={twMerge("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12")}>
          <AccountHeader />
          <AccountSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className={twMerge("min-h-screen main-bg-gradient font-sans")}>
      <main className={twMerge("max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 mt-14 sm:mt-16 md:mt-20")}>
        <div className={twMerge("flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start")}>
          <aside className={twMerge("hidden 2xl:block w-72 sticky top-24 flex-shrink-0")}>
            <FilterBar filter={filter} setFilter={setFilter} />
          </aside>
          <section className={twMerge("flex-1 w-full")}>
            <div className={twMerge("mb-4 sm:mb-5 md:mb-6 lg:mb-8")}>
              <AccountHeader />
            </div>
            <div className={twMerge("flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6")}>
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
        />
        <MobileFilterButton 
          onClick={() => setIsFilterModalOpen(true)}
          filterCount={activeFilterCount}
        />
        <MobileFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filter={filter}
          setFilter={setFilter}
        />
      </main>
    </div>
  );
}
