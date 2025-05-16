export const API_ENDPOINTS = {
  ACCOUNTS: "/api/accounts",
  PAYMENTS: "/api/payments",
} as const;

export const ERROR_MESSAGES = {
  FETCH_ACCOUNTS: "Failed to load accounts. Please try again later.",
  PAYMENT_FAILED: "Payment failed. Please try again.",
} as const;
