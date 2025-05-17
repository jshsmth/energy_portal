import { NextResponse } from 'next/server';
import { MOCK_ENERGY_ACCOUNTS_API } from '../mocks/energyAccountsAPIMock';
import { dueCharges } from '../mocks/dueChargesMock';

export async function GET() {
  try {
    const accounts = await MOCK_ENERGY_ACCOUNTS_API();

    // Calculate total balance for each account
    const accountsWithBalance = accounts.map(account => {
      const accountCharges = dueCharges.filter(charge => charge.accountId === account.id);
      const balance = accountCharges.reduce((sum, charge) => sum + charge.amount, 0);
      
      return {
        ...account,
        energyType: account.type,
        balance,
        dueCharges: accountCharges
      };
    });

    return NextResponse.json(accountsWithBalance);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch energy accounts' },
      { status: 500 }
    );
  }
} 