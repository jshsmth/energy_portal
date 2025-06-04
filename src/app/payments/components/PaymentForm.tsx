import { Description } from "@headlessui/react";
import { CreditCardIcon, CalendarIcon, KeyIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Card {
  number: string;
  expiry: string;
  cvc: string;
}

interface PaymentFormProps {
  amount: string;
  card: Card;
  error: string | null;
  isLoading: boolean;
  onAmountChange: (value: string) => void;
  onCardChange: (card: Card) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getBalanceMessage: () => string;
}

export function PaymentForm({
  amount,
  card,
  error,
  isLoading,
  onAmountChange,
  onCardChange,
  onSubmit,
  getBalanceMessage,
}: PaymentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Description className="text-sm text-grey-600">
        {getBalanceMessage()}
      </Description>
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-500">
            $
          </span>
          <input
            type="number"
            placeholder="Payment Amount"
            className={twMerge(
              "w-full rounded-xl border border-blue-100 p-3 pl-7",
              "text-sm text-grey-900 placeholder:text-grey-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
              "transition-colors duration-200"
            )}
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
            <CreditCardIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Card Number"
            className={twMerge(
              "w-full rounded-xl border border-blue-100 p-3 pl-10",
              "text-sm text-grey-900 placeholder:text-grey-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
              "transition-colors duration-200"
            )}
            value={card.number}
            onChange={(e) => onCardChange({ ...card, number: e.target.value })}
            required
          />
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="MM/YY"
              className={twMerge(
                "w-full rounded-xl border border-blue-100 p-3 pl-10",
                "text-sm text-grey-900 placeholder:text-grey-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                "transition-colors duration-200"
              )}
              value={card.expiry}
              onChange={(e) => onCardChange({ ...card, expiry: e.target.value })}
              required
            />
          </div>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
              <KeyIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="CVC"
              className={twMerge(
                "w-full rounded-xl border border-blue-100 p-3 pl-10",
                "text-sm text-grey-900 placeholder:text-grey-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                "transition-colors duration-200"
              )}
              value={card.cvc}
              onChange={(e) => onCardChange({ ...card, cvc: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {error}
              </h3>
            </div>
          </div>
        </div>
      )}
      <button
        type="submit"
        className={twMerge(
          "w-full py-3.5 px-4 bg-blue-500 text-white font-semibold rounded-xl cursor-pointer",
          "hover:bg-blue-600 active:bg-blue-700 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
          "text-base",
          clsx({
            "opacity-50 cursor-not-allowed": isLoading
          })
        )}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
} 