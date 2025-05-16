import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { Account } from "../types/accounts";

interface AccountCardProps {
  account: Account;
  onMakePayment?: (account: Account) => void;
}

export default function AccountCard({
  account,
  onMakePayment,
}: AccountCardProps) {
  const balanceClass = twMerge(
    clsx(
      "font-bold text-lg",
      account.balance > 0 && "text-green-500",
      account.balance < 0 && "text-red-500",
      account.balance === 0 && "text-gray-500"
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-900">{account.address}</h2>
      <p className="text-gray-600 mt-1">Energy Type: {account.energyType}</p>
      <p className={balanceClass + " mt-2"}>Balance: ${account.balance}</p>
      <button
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={() => onMakePayment?.(account)}
      >
        Make a Payment
      </button>
    </div>
  );
}
