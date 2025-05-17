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

/* */

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
    loading,
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
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 border bg-white p-8 rounded-2xl shadow-xl relative">
          <button
            className={twMerge(
              "absolute top-4 right-4 text-grey-400 hover:text-grey-600 transition cursor-pointer"
            )}
            onClick={handleClose}
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          {success ? (
            <>
              <DialogTitle className="text-lg font-medium text-grey-900">
                Payment Successful
              </DialogTitle>
              <Description className="text-sm text-grey-600">
                Your payment has been successfully submitted. We&apos;ve sent
                you an email with all of the details of your order.
              </Description>
              <button
                className={twMerge(
                  "rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 cursor-pointer"
                )}
                onClick={handleClose}
              >
                Got it, thanks!
              </button>
            </>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              <DialogTitle className="text-lg font-medium text-grey-900">
                Make a Payment
              </DialogTitle>
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
                    className="w-full rounded-lg border p-2 pl-7 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                    className="w-full rounded-lg border p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
                      <CalendarIcon className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-lg border p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400">
                      <KeyIcon className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full rounded-lg border p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      value={card.cvc}
                      onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={twMerge(
                    "w-full rounded-lg bg-blue-500 px-4 py-2 text-base font-semibold text-white shadow hover:bg-blue-600 transition-colors cursor-pointer",
                    clsx({
                      "opacity-50": loading
                    })
                  )}
                  disabled={loading}
                >
                  {loading ? "Paying..." : "Pay"}
                </button>
              </div>
              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XMarkIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
