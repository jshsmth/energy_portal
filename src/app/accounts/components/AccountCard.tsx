import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import type { Account } from "../types/accounts";
import { MapPinIcon, FireIcon, LightBulbIcon, PlusIcon } from "@heroicons/react/24/outline";

interface AccountCardProps {
  account: Account;
  onMakePayment?: (account: Account) => void;
}

export function AccountCard({ account, onMakePayment }: AccountCardProps) {
  const isElectricity = account.energyType === "ELECTRICITY";
  const energyBadge = isElectricity ? (
    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-blue-100">
      <LightBulbIcon className="h-4 w-4 text-blue-400" /> Electricity
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-orange-100">
      <FireIcon className="h-4 w-4 text-orange-400" /> Gas
    </span>
  );

  const balanceColor = clsx({
    "text-red-500": account.balance > 0,
    "text-green-600": account.balance < 0,
    "text-grey-700": account.balance === 0
  });

  const balanceValue = Math.abs(account.balance);
  const balancePrefix = clsx({
    "- $": account.balance < 0,
    "$": account.balance >= 0
  });

  return (
    <div
      className={twMerge(
        "bg-white rounded-3xl shadow-lg border border-blue-100 p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 transition-all duration-200",
        "hover:shadow-2xl hover:border-blue-200 hover:scale-[1.01]"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-50 p-1 rounded">
            <MapPinIcon className="h-5 w-5 text-blue-400" />
          </span>
          <h2 className="text-xl font-bold text-grey-900 truncate">{account.address}</h2>
        </div>
        <div className="flex items-center gap-2 mb-4">{energyBadge}</div>
        <div className="flex flex-wrap gap-2 text-xs text-grey-600 mb-4">
          {account.meterNumber && (
            <div className="bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100">
              <span>Meter:</span> {account.meterNumber}
            </div>
          )}
          {typeof account.volume === 'number' && (
            <div className="bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100">
              <span>{isElectricity ? 'Usage:' : 'Volume:'}</span> {account.volume} {isElectricity ? 'kWh' : 'MJ'}
            </div>
          )}
          {account.dueCharges && account.dueCharges.length > 0 && (
            <div className="bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100">
              <span>Next Due:</span>
              <span>{new Date(account.dueCharges[0].date).toLocaleDateString()}</span>
              <span className="ml-1">(${account.dueCharges[0].amount})</span>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block w-px bg-blue-100 h-24 mx-6" />
      <div className="flex flex-col items-end min-w-[120px] mt-4 md:mt-0">
        <span className="text-xs text-grey-500 font-medium mb-1">Balance:</span>
        <span className={clsx("font-bold text-lg md:text-xl", balanceColor)}>
          {balancePrefix}{balanceValue}
        </span>
        <button
          type="button"
          className="mt-5 flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow transition-all text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          onClick={() => onMakePayment?.(account)}
        >
          <span className="bg-white rounded-full p-1">
            <PlusIcon className="h-4 w-4 text-blue-500" />
          </span>
          Make a Payment
        </button>
      </div>
    </div>
  );
}
