import { useState } from "react";
import type { Account } from "../../accounts/types/accounts";
import { usePaymentMutation } from "./usePaymentMutation";

interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
}

interface UsePaymentModalProps {
  onClose: () => void;
  account: Account | null;
}

interface UsePaymentModalReturn {
  card: CardDetails;
  amount: string;
  isLoading: boolean;
  success: boolean;
  error: string | null;
  handlePay: (e: React.FormEvent) => Promise<void>;
  handleClose: () => void;
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  clearError: () => void;
  getBalanceMessage: () => string;
}

export const usePaymentModal = ({
  onClose,
  account,
}: UsePaymentModalProps): UsePaymentModalReturn => {
  const [card, setCard] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentMutation = usePaymentMutation();

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    if (!account) {
      setError("No account selected");
      return;
    }

    try {
      const paymentAmount = parseFloat(amount);
      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        throw new Error("Please enter a valid amount");
      }
      if (account.balance < 0 && paymentAmount > Math.abs(account.balance)) {
        throw new Error("Payment amount cannot exceed outstanding balance");
      }

      await paymentMutation.mutateAsync({
        card,
        amount: paymentAmount,
        account,
      });
      
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during payment"
      );
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setCard({ number: "", expiry: "", cvc: "" });
    setAmount("");
    onClose();
  };

  const clearError = () => {
    setError(null);
  };

  const getBalanceMessage = () => {
    if (!account) return "";
    if (account.balance < 0) {
      return `Outstanding Balance: $${Math.abs(account.balance).toFixed(2)}`;
    }
    if (account.balance === 0) {
      return "Current Balance: $0.00";
    }
    return `Current Balance: $${account.balance.toFixed(2)}`;
  };

  return {
    card,
    amount,
    isLoading: paymentMutation.isPending,
    success,
    error,
    handlePay,
    handleClose,
    setCard,
    setAmount,
    clearError,
    getBalanceMessage,
  };
};
