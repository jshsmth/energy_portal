export type EnergyType = 'ELECTRICITY' | 'GAS';

export interface Account {
  id: string;
  address: string;
  balance: number;
  energyType: EnergyType;
  meterNumber?: string;
  volume?: number;
  dueCharges?: Array<{
    id: string;
    accountId: string;
    date: string;
    amount: number;
  }>;
}

export interface Filter {
  energyType: EnergyType | '';
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