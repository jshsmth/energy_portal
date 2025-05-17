import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import type { Account } from "../types/accounts";
import { MapPinIcon, FireIcon, LightBulbIcon, PlusIcon } from "@heroicons/react/24/outline";

interface AccountCardProps {
  account: Account;
  onMakePayment?: (account: Account) => void;
}

interface EnergyBadgeConfig {
  icon: typeof LightBulbIcon;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
}

const getEnergyBadgeConfig = (energyType: Account['energyType']): EnergyBadgeConfig => {
  switch (energyType) {
    case 'ELECTRICITY':
      return {
        icon: LightBulbIcon,
        label: 'Electricity',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-400'
      };
    case 'GAS':
      return {
        icon: FireIcon,
        label: 'Gas',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-100',
        iconColor: 'text-orange-400'
      };
    default:
      throw new Error(`Unsupported energy type: ${energyType}`);
  }
};

export function AccountCard({ account, onMakePayment }: AccountCardProps) {
  const badgeConfig = getEnergyBadgeConfig(account.energyType);
  const Icon = badgeConfig.icon;
  
  const energyBadge = (
    <span className={twMerge(
      "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border",
      badgeConfig.bgColor,
      badgeConfig.textColor,
      badgeConfig.borderColor
    )}>
      <Icon className={twMerge("h-4 w-4", badgeConfig.iconColor)} /> {badgeConfig.label}
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

  const isElectricity = account.energyType === "ELECTRICITY";

  return (
    <div
      className={twMerge(
        "bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-blue-100 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8 transition-all duration-200",
        "hover:shadow-xl hover:border-blue-200 hover:scale-[1.005]"
      )}
    >
      <div className={twMerge("flex-1 min-w-0")}>
        <div className={twMerge("flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4")}>
          <span className={twMerge("bg-blue-50 p-1 rounded")}>
            <MapPinIcon className={twMerge("h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-400")} />
          </span>
          <h2 className={twMerge("text-base sm:text-lg md:text-xl font-bold text-grey-900 truncate")}>{account.address}</h2>
        </div>
        <div className={twMerge("flex items-center gap-2 mb-2 sm:mb-3 md:mb-4")}>{energyBadge}</div>
        <div className={twMerge("flex flex-wrap gap-1.5 sm:gap-2 text-xs text-grey-600 mb-2 sm:mb-3 md:mb-4")}>
          {account.meterNumber && (
            <div className={twMerge("bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100")}>
              <span>Meter:</span> {account.meterNumber}
            </div>
          )}
          {typeof account.volume === 'number' && (
            <div className={twMerge("bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100")}>
              <span>{isElectricity ? 'Usage:' : 'Volume:'}</span> {account.volume} {isElectricity ? 'kWh' : 'MJ'}
            </div>
          )}
          {account.dueCharges && account.dueCharges.length > 0 && (
            <div className={twMerge("bg-grey-50 px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-grey-100")}>
              <span>Next Due:</span>
              <span>{new Date(account.dueCharges[0].date).toLocaleDateString()}</span>
              <span className={twMerge("ml-1")}>(${account.dueCharges[0].amount})</span>
            </div>
          )}
        </div>
      </div>
      <div className={twMerge("hidden lg:block w-px bg-blue-100 h-20 mx-4")} />
      <div className={twMerge("flex flex-col items-start lg:items-end min-w-[100px] sm:min-w-[120px] mt-2 lg:mt-0")}>
        <span className={twMerge("text-xs text-grey-500 font-medium mb-1")}>Balance:</span>
        <span className={twMerge("font-bold text-sm sm:text-base md:text-lg lg:text-xl", balanceColor)}>
          {balancePrefix}{balanceValue}
        </span>
        <button
          type="button"
          className={twMerge(
            "mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow transition-all text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          )}
          onClick={() => onMakePayment?.(account)}
        >
          <span className={twMerge("bg-white rounded-full p-0.5 sm:p-1")}>
            <PlusIcon className={twMerge("h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-blue-500")} />
          </span>
          Make a Payment
        </button>
      </div>
    </div>
  );
}
