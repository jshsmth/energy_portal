"use client";

import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop } from "@headlessui/react";
import { usePaymentModal } from "../hooks/usePaymentModal";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  account: {
    id: number;
    address: string;
    balance: number;
    energyType: string;
  } | null;
  onPay: (card: { number: string; expiry: string; cvc: string }) => Promise<void>;
}

export default function PaymentModal({ open, onClose, account, onPay }: PaymentModalProps) {
  const { card, loading, success, handlePay, handleClose, setCard } = usePaymentModal({
    onPay,
    onClose,
  });

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
         <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 border bg-white p-6">
          {success ? (
            <>
              <DialogTitle className="text-lg font-medium text-gray-900">
                Payment Successful
              </DialogTitle>
              <Description className="text-sm text-gray-600">
                Your payment has been successfully submitted. We've sent you an email with all of the details of your order.
              </Description>
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                onClick={handleClose}
              >
                Got it, thanks!
              </button>
            </>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              <DialogTitle className="text-lg font-medium text-gray-900">
                Make a Payment
              </DialogTitle>
              <Description className="text-sm text-gray-600">
                Account: {account?.address}
                <br />
                Balance: ${account?.balance}
              </Description>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full rounded border p-2"
                  value={card.number}
                  onChange={e => setCard({ ...card, number: e.target.value })}
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 rounded border p-2"
                    value={card.expiry}
                    onChange={e => setCard({ ...card, expiry: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 rounded border p-2"
                    value={card.cvc}
                    onChange={e => setCard({ ...card, cvc: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Paying..." : "Pay"}
                </button>
              </div>
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
} 