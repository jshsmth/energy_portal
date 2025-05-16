import { NextResponse } from 'next/server';
import { MOCK_DUE_CHARGES_API } from '../mocks/dueChargesAPIMock';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    const charges = await MOCK_DUE_CHARGES_API();
    
    // If accountId is provided, filter charges for that account
    const filteredCharges = accountId 
      ? charges.filter(charge => charge.accountId === accountId)
      : charges;

    return NextResponse.json(filteredCharges);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch due charges' },
      { status: 500 }
    );
  }
} 