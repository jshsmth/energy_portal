import { NextResponse } from 'next/server';
import { MOCK_ENERGY_ACCOUNTS_API } from '../mocks/energyAccountsAPIMock';
import { dueCharges } from '../mocks/dueChargesMock';

interface Payment {
  id: number;
  accountId: string;
  amount: number;
  date: string;
  status: 'success' | 'failed';
  chargeIds: string[];
}

const paymentHistory: Payment[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountId, amount, cardDetails } = body;

    if (!accountId || !amount || !cardDetails) {
      return NextResponse.json(
        { error: 'Missing required fields: accountId, amount, or cardDetails' },
        { status: 400 }
      );
    }

    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
      return NextResponse.json(
        { error: 'Invalid card details' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Payment amount must be greater than 0' },
        { status: 400 }
      );
    }

    const accounts = await MOCK_ENERGY_ACCOUNTS_API();
    const account = accounts.find(acc => acc.id === accountId);
    
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    const accountCharges = dueCharges.filter(charge => charge.accountId === accountId);
    const totalDue = accountCharges.reduce((sum, charge) => sum + charge.amount, 0);
    
    if (amount < totalDue) {
      return NextResponse.json(
        { 
          error: 'Payment amount is less than total due amount',
          totalDue,
          currentAmount: amount
        },
        { status: 400 }
      );
    }

    await new Promise((res) => setTimeout(res, 1000));

    const payment: Payment = {
      id: paymentHistory.length + 1,
      accountId,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'success',
      chargeIds: accountCharges.map(charge => charge.id)
    };

    paymentHistory.push(payment);

    return NextResponse.json({
      ...payment,
      accountType: account.type,
      address: account.address
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { 
        error: 'Payment processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(paymentHistory);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    );
  }
} 