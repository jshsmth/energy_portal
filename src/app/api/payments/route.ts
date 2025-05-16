import { NextResponse } from 'next/server';

// Initialize empty payment history
let paymentHistory: Array<{
  id: number;
  accountId: number;
  amount: number;
  date: string;
  status: string;
}> = [];

export async function POST(request: Request) {
  try {
    const { accountId, amount, cardDetails } = await request.json();


    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
      return NextResponse.json(
        { error: 'Invalid card details' },
        { status: 400 }
      );
    }

    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1000));

    // Record the payment
    const payment = {
      id: paymentHistory.length + 1,
      accountId,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'success'
    };

    paymentHistory.push(payment);

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(paymentHistory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    );
  }
} 