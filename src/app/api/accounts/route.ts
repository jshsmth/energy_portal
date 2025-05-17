import { NextResponse } from 'next/server';
import db, { EnergyAccount, DueCharge } from '../db/database';

export async function GET() {
  try {
    await db.read();
    const rawAccounts = db.data?.accounts || [];

    const accountsWithDetails = rawAccounts.map((account: EnergyAccount) => {
      const accountCharges: DueCharge[] = (db.data?.dueCharges || []).filter(
        (charge) => charge.accountId === account.id
      );
      const balance = accountCharges.reduce((sum, charge) => sum + charge.amount, 0);

      return {
        ...account,
        energyType: account.type,
        balance,
        dueCharges: accountCharges
      };
    });

    return NextResponse.json(accountsWithDetails);
  } catch (error) {
    console.error("Error in /accounts:", error);
    return NextResponse.json(
      { error: 'Failed to fetch energy accounts' },
      { status: 500 }
    );
  }
}
