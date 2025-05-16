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
  onPay: (card: CardDetails) => Promise<void>;
  onClose: () => void;
}

interface UsePaymentModalReturn {
  card: CardDetails;
  loading: boolean;
  success: boolean;
  handlePay: (e: React.FormEvent) => Promise<void>;
  handleClose: () => void;
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>;
}

export const usePaymentModal = ({ onPay, onClose }: UsePaymentModalProps): UsePaymentModalReturn => {
  const [card, setCard] = useState<CardDetails>({ number: "", expiry: "", cvc: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onPay(card);
    setLoading(false);
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setCard({ number: "", expiry: "", cvc: "" });
    onClose();
  };

  return {
    card,
    loading,
    success,
    handlePay,
    handleClose,
    setCard,
  };
}; 