// TODO: I would refactor this to use the compound component pattern.
// This would make the modal more reusable and flexible. Example structure:
//
// Example usage:
// <Modal>
//   <Modal.Backdrop />
//   <Modal.Panel>
//     <Modal.Title>Make a Payment</Modal.Title>
//     <Modal.Description>Payment details...</Modal.Description>
//     <Modal.Content>
//       {/* Form content */}
//     </Modal.Content>
//     <Modal.Footer>
//       <Modal.Button>Pay</Modal.Button>
//     </Modal.Footer>
//   </Modal.Panel>
// </Modal>

"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  DialogBackdrop,
} from "@headlessui/react";
import { usePaymentModal } from "../hooks/usePaymentModal";
import { XMarkIcon, CreditCardIcon, CalendarIcon, KeyIcon } from "@heroicons/react/24/outline";
import type { Account } from "../../accounts/types/accounts";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  account: Account | null;
}

export function PaymentModal({
  open,
  onClose,
  account,
}: PaymentModalProps) {
  const {
    card,
    amount,
    isLoading,
    success,
    error,
    handlePay,
    handleClose,
    setCard,
    setAmount,
    getBalanceMessage,
  } = usePaymentModal({
    onClose,
    account,
  });

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      className="relative z-50"
    >
      <DialogBackdrop 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={twMerge(
            "w-full max-w-md transform transition-all duration-300 ease-out",
            "bg-white rounded-2xl shadow-xl border border-blue-100",
            "p-6 sm:p-8 space-y-6"
          )}
        >
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-grey-900">
              {success ? "Payment Successful" : "Make a Payment"}
            </DialogTitle>
            <button
              className={twMerge(
                "p-1.5 rounded-full hover:bg-grey-100 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              )}
              onClick={handleClose}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6 text-grey-500" />
            </button>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="rounded-xl bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-green-100 p-2">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Payment Processed Successfully
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>We&apos;ve sent you an email with all the details of your payment.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={twMerge(
                  "w-full py-3.5 px-4 bg-blue-500 text-white font-semibold rounded-xl",
                  "hover:bg-blue-600 active:bg-blue-700 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "text-base"
                )}
                onClick={handleClose}
              >
                Got it, thanks!
              </button>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-6">
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
                    onChange={(e) => setAmount(e.target.value)}
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
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
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
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
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
                      onChange={(e) => setCard({ ...card, cvc: e.target.value })}
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
                  "w-full py-3.5 px-4 bg-blue-500 text-white font-semibold rounded-xl",
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
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
