import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { PaymentsHistory } from '../components/PaymentsHistory'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('PaymentsHistory', () => {
  const mockPayments = [
    {
      id: 1,
      accountId: 123,
      amount: 150.00,
      date: '2024-03-20',
      status: 'COMPLETED'
    },
    {
      id: 2,
      accountId: 456,
      amount: 75.50,
      date: '2024-03-19',
      status: 'PENDING'
    }
  ]

  beforeEach(() => {
    mockFetch.mockReset()
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPayments)
    })
  })

  it('displays loading state initially', () => {
    render(<PaymentsHistory />)
    
    expect(screen.getByRole('heading', { name: /payment history/i })).toBeInTheDocument()
    
    const mainContent = screen.getByRole('main')
    expect(mainContent).toBeInTheDocument()
    expect(mainContent).toHaveClass('max-w-7xl')
  })

  it('displays error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))
    render(<PaymentsHistory />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load payment history. Please try again later.')).toBeInTheDocument()
    })
  })

  it('displays payment data correctly when loaded', async () => {
    render(<PaymentsHistory />)

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('2024-03-20')).toBeInTheDocument()
    })

    // Check table headers
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Account ID')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()

    // Check first payment data
    expect(screen.getByText('2024-03-20')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('150'))).toBeInTheDocument()
    expect(screen.getByText('COMPLETED')).toBeInTheDocument()

    // Check second payment data
    expect(screen.getByText('2024-03-19')).toBeInTheDocument()
    expect(screen.getByText('456')).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('75.5'))).toBeInTheDocument()
    expect(screen.getByText('PENDING')).toBeInTheDocument()
  })
})
