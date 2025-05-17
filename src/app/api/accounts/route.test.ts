import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET } from './route';
import { NextResponse } from 'next/server';
import db, { EnergyAccount, DueCharge } from '../db/database';

vi.mock('../db/database', () => ({
  default: {
    read: vi.fn(),
    data: {
      accounts: [
        {
          id: '1',
          type: 'electricity',
          customerId: 'cust1',
          meterNumber: '12345',
          address: '123 Test St'
        },
        {
          id: '2',
          type: 'gas',
          customerId: 'cust1',
          meterNumber: '67890',
          address: '123 Test St'
        }
      ],
      dueCharges: [
        {
          id: '1',
          accountId: '1',
          amount: 100,
          dueDate: '2024-04-01'
        },
        {
          id: '2',
          accountId: '1',
          amount: 50,
          dueDate: '2024-04-15'
        },
        {
          id: '3',
          accountId: '2',
          amount: 75,
          dueDate: '2024-04-01'
        }
      ]
    }
  }
}));

describe('GET /api/accounts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return accounts with their details and balances', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response).toBeInstanceOf(NextResponse);
    expect(data).toHaveLength(2);

    expect(data[0]).toEqual({
      id: '1',
      type: 'electricity',
      customerId: 'cust1',
      meterNumber: '12345',
      address: '123 Test St',
      energyType: 'electricity',
      balance: 150, // 100 + 50
      dueCharges: [
        {
          id: '1',
          accountId: '1',
          amount: 100,
          dueDate: '2024-04-01'
        },
        {
          id: '2',
          accountId: '1',
          amount: 50,
          dueDate: '2024-04-15'
        }
      ]
    });

    expect(data[1]).toEqual({
      id: '2',
      type: 'gas',
      customerId: 'cust1',
      meterNumber: '67890',
      address: '123 Test St',
      energyType: 'gas',
      balance: 75,
      dueCharges: [
        {
          id: '3',
          accountId: '2',
          amount: 75,
          dueDate: '2024-04-01'
        }
      ]
    });
  });

  it('should handle empty accounts array', async () => {
    (db.data as { accounts: EnergyAccount[]; dueCharges: DueCharge[] }).accounts = [];
    (db.data as { accounts: EnergyAccount[]; dueCharges: DueCharge[] }).dueCharges = [];

    const response = await GET();
    const data = await response.json();

    expect(response).toBeInstanceOf(NextResponse);
    expect(data).toHaveLength(0);
  });

  it('should handle database read error', async () => {
    vi.mocked(db.read).mockRejectedValueOnce(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch energy accounts' });
  });
}); 