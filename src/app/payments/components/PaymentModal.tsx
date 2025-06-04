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
  DialogBackdrop,
} from "@headlessui/react";
import { usePaymentModal } from "../hooks/usePaymentModal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Account } from "../../accounts/types/accounts";
import { twMerge } from "tailwind-merge";
import { PaymentSuccess } from "./PaymentSuccess";
import { PaymentForm } from "./PaymentForm";

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
                "p-1.5 rounded-full hover:bg-grey-100 transition-colors cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              )}
              onClick={handleClose}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6 text-grey-500" />
            </button>
          </div>

          {success ? (
            <PaymentSuccess onClose={handleClose} />
          ) : (
            <PaymentForm
              amount={amount}
              card={card}
              error={error}
              isLoading={isLoading}
              onAmountChange={setAmount}
              onCardChange={setCard}
              onSubmit={handlePay}
              getBalanceMessage={getBalanceMessage}
            />
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
