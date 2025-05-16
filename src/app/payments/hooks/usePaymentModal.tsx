import { useState } from 'react';

interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
}

interface Account {
  id: number;
  address: string;
  balance: number;
  energyType: string;
}

interface UsePaymentModalProps {
  onPay: (card: CardDetails, amount: number) => Promise<void>;
  onClose: () => void;
  account: Account | null;
}

interface UsePaymentModalReturn {
  card: CardDetails;
  amount: string;
  loading: boolean;
  success: boolean;
  error: string | null;
  handlePay: (e: React.FormEvent) => Promise<void>;
  handleClose: () => void;
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  clearError: () => void;
  getBalanceMessage: () => string;
}

export const usePaymentModal = ({ onPay, onClose, account }: UsePaymentModalProps): UsePaymentModalReturn => {
  const [card, setCard] = useState<CardDetails>({ number: "", expiry: "", cvc: "" });
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const paymentAmount = parseFloat(amount);
      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        throw new Error("Please enter a valid amount");
      }
      if (account && account.balance < 0 && paymentAmount > Math.abs(account.balance)) {
        throw new Error("Payment amount cannot exceed outstanding balance");
      }
      await onPay(card, paymentAmount);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during payment");
    } finally {
      setLoading(false);
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
  }

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
    loading,
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