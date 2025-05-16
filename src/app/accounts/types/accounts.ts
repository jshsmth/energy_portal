export interface Account {
  id: number;
  address: string;
  balance: number;
  energyType: string;
}

export interface Filter {
  energyType: string;
  search: string;
}

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
} 