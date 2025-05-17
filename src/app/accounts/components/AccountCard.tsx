import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { Account } from "../types/accounts";
import { MapPinIcon, BoltIcon, FireIcon, LightBulbIcon } from "@heroicons/react/24/outline";

interface AccountCardProps {
  account: Account;
  onMakePayment?: (account: Account) => void;
}

export function AccountCard({ account, onMakePayment }: AccountCardProps) {
  const energyBadge = account.energyType === "ELECTRICITY" ? (
    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
      <LightBulbIcon className="h-4 w-4 text-blue-400" /> Electricity
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      <FireIcon className="h-4 w-4 text-orange-400" /> Gas
    </span>
  );

  return (
    <div
      className={twMerge(
        "bg-white rounded-xl shadow-sm p-6 w-full transition-transform duration-150 hover:shadow-lg hover:-translate-y-1",
        "border-l-4",
        clsx({
          "border-green-400": account.balance > 0,
          "border-red-400": account.balance < 0,
          "border-grey-300": account.balance === 0,
        })
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <MapPinIcon className="h-5 w-5 text-grey-400" />
        <h2 className="text-lg font-semibold text-grey-900 line-clamp-2">{account.address}</h2>
      </div>
      <div className="flex items-center gap-2 mb-1">{energyBadge}</div>
      <div className="flex flex-wrap gap-4 text-xs text-grey-600 mt-2 mb-2">
        {account.meterNumber && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Meter:</span> {account.meterNumber}
          </div>
        )}
        {typeof account.volume === 'number' && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{account.energyType === 'ELECTRICITY' ? 'Usage:' : 'Volume:'}</span> {account.volume} {account.energyType === 'ELECTRICITY' ? 'kWh' : 'MJ'}
          </div>
        )}
        {account.dueCharges && account.dueCharges.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Next Due:</span>
            <span>{new Date(account.dueCharges[0].date).toLocaleDateString()}</span>
            <span className="ml-1">(${account.dueCharges[0].amount})</span>
          </div>
        )}
      </div>
      <hr className="my-2 border-grey-200" />
      <p
        className={twMerge(
          "font-bold text-lg mt-2",
          clsx({
            "text-green-500": account.balance > 0,
            "text-red-500": account.balance < 0,
            "text-grey-500": account.balance === 0,
          })
        )}
      >
        Balance: ${account.balance}
      </p>
      <button
        type="button"
        className={twMerge(
          "mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
        )}
        onClick={() => onMakePayment?.(account)}
      >
        <BoltIcon className="h-4 w-4 text-white" /> Make a Payment
      </button>
    </div>
  );
}
