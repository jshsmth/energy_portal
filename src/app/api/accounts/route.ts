import { NextResponse } from 'next/server';

const mockEnergyAccounts = [
  { id: 1, address: "123 Main St", energyType: "Electricity" },
  { id: 2, address: "456 Oak Ave", energyType: "Gas" },
  { id: 3, address: "789 Pine Rd", energyType: "Solar" },
];

const mockDueCharges = [
  { accountId: 1, amount: 100 },
  { accountId: 2, amount: -50 },
  { accountId: 3, amount: 0 },
];

export async function GET() {
  try {

    // Calculate balance for each account
    const accountsWithBalance = mockEnergyAccounts.map(account => {
      const charges = mockDueCharges.find(charge => charge.accountId === account.id);
      return {
        ...account,
        balance: charges?.amount ?? 0
      };
    });

    return NextResponse.json(accountsWithBalance);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
} 