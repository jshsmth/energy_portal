import { NextResponse } from "next/server";
import db from "../db/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountId, amount, cardDetails } = body;

    if (!accountId || !amount || !cardDetails) {
      return NextResponse.json(
        { error: "Missing required fields: accountId, amount, or cardDetails" },
        { status: 400 }
      );
    }

    const { number, expiry, cvc } = cardDetails;
    if (!number || !expiry || !cvc) {
      return NextResponse.json(
        { error: "Invalid card details" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Payment amount must be greater than 0" },
        { status: 400 }
      );
    }

    await db.read();
    const account = db.data?.accounts.find(acc => acc.id === accountId);
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Simulate delay (e.g., for card processing)
    await new Promise((res) => setTimeout(res, 1000));

    const accountCharges = (db.data?.dueCharges || []).filter(
      (charge) => charge.accountId === accountId
    );

    const newPayment = {
      id: (db.data?.payments.length || 0) + 1,
      accountId,
      amount,
      date: new Date().toISOString().split("T")[0],
      status: "success" as const,
      chargeIds: accountCharges.map((c) => c.id),
    };

    // Add payment to database
    if (!db.data) {
      throw new Error("Database not initialized");
    }
    db.data.payments.push(newPayment);

    // Add credit charge
    const creditCharge = {
      id: `CREDIT-${String(newPayment.id).padStart(4, '0')}`,
      accountId: newPayment.accountId,
      date: newPayment.date,
      amount: -newPayment.amount
    };
    db.data.dueCharges.push(creditCharge);

    await db.write();

    return NextResponse.json({
      ...newPayment,
      accountType: account.type,
      address: account.address,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      {
        error: "Payment processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await db.read();
    return NextResponse.json(db.data?.payments || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}
