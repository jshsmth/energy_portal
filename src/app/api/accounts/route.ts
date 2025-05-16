import { NextResponse } from 'next/server';
import { MOCK_ENERGY_ACCOUNTS_API } from '../mocks/energyAccountsAPIMock';
import { MOCK_DUE_CHARGES_API } from '../mocks/dueChargesAPIMock';

export async function GET() {
  try {
    const [accounts, charges] = await Promise.all([
      MOCK_ENERGY_ACCOUNTS_API(),
      MOCK_DUE_CHARGES_API()
    ]);

    // Calculate total balance for each account
    const accountsWithBalance = accounts.map(account => {
      const accountCharges = charges.filter(charge => charge.accountId === account.id);
      const balance = accountCharges.reduce((sum, charge) => sum + charge.amount, 0);
      
      return {
        ...account,
        energyType: account.type,
        balance,
        dueCharges: accountCharges
      };
    });

    return NextResponse.json(accountsWithBalance);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch energy accounts' },
      { status: 500 }
    );
  }
} 