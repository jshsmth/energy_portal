"use client";

import AccountCard from "./AccountCard";
import FilterBar from "./FilterBar";
import NavBar from "./NavBar";
import { useState } from "react";

// Mock data for energy accounts
const mockAccounts = [
  { id: 1, address: "123 Main St", balance: 100, energyType: "solar" },
  { id: 2, address: "456 Oak Ave", balance: -50, energyType: "wind" },
  { id: 3, address: "789 Pine Rd", balance: 0, energyType: "hydro" },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [filter, setFilter] = useState({ energyType: "", search: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<
    (typeof mockAccounts)[0] | null
  >(null);

  const filteredAccounts = accounts.filter((account) => {
    const matchesEnergyType = filter.energyType
      ? account.energyType === filter.energyType
      : true;
    const matchesSearch = filter.search
      ? account.address.toLowerCase().includes(filter.search.toLowerCase())
      : true;
    return matchesEnergyType && matchesSearch;
  });

  const handleMakePayment = (account: (typeof mockAccounts)[0]) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const handlePay = async (card: {
    number: string;
    expiry: string;
    cvc: string;
  }) => {
    // Simulate payment delay
    await new Promise((res) => setTimeout(res, 1000));
   // TODO: PAYMENT LOGIC
   
    // Close the modal
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="flex flex-col gap-4 items-center mt-4">
          <AccountCard
            account={filteredAccounts[0]}
            onMakePayment={handleMakePayment}
          />
        </div>
        {/* <PaymentModal to go here
        /> */}
      </main>
    </div>
  );
}
