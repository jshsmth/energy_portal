"use client";

import Link from "next/link";

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Smithy Energy</h1>
            </div>
            <div className="flex items-center">
              <Link
                href="/payments"
                className="text-gray-600 hover:text-gray-900"
              >
                Payment History
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <FilterBar to go here */}
        <div className="flex flex-col gap-4 items-center mt-4">
          {/* {filteredAccounts.map(account => (
            Account card to go here
          ))} */}
        </div>
        {/* <PaymentModal to go here
        /> */}
      </main>
    </div>
  );
}
