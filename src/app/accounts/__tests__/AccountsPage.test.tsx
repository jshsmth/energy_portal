import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccountsPage } from '../components/AccountsPage'
import { ERROR_MESSAGES } from '../constants/accounts'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('AccountsPage', () => {
  const mockAccounts = [
    {
      id: '1',
      accountNumber: 'ACC123',
      provider: 'EnergyCo',
      status: 'active',
      lastReading: '2024-03-20',
      energyType: 'ELECTRICITY',
      address: '123 Main St',
      balance: 100
    },
    {
      id: '2',
      accountNumber: 'ACC456',
      provider: 'PowerCorp',
      status: 'active',
      lastReading: '2024-03-19',
      energyType: 'GAS',
      address: '456 Oak Ave',
      balance: 200
    }
  ]

  beforeEach(() => {
    mockFetch.mockReset()
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockAccounts)
    })
  })

  it('displays loading state initially', () => {
    render(<AccountsPage />)
    expect(screen.getByText('Loading accounts...')).toBeInTheDocument()
  })

  it('fetches and displays energy accounts', async () => {
    render(<AccountsPage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading accounts...')).not.toBeInTheDocument()
    })

    // Verify accounts are displayed
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText('Energy Type: ELECTRICITY')).toBeInTheDocument()
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument()
    expect(screen.getByText('Energy Type: GAS')).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))
    render(<AccountsPage />)

    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGES.FETCH_ACCOUNTS)).toBeInTheDocument()
    })
  })

  it('filters accounts based on search input', async () => {
    const user = userEvent.setup()
    render(<AccountsPage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading accounts...')).not.toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by address')
    await user.type(searchInput, 'Main')

    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.queryByText('456 Oak Ave')).not.toBeInTheDocument()
  })

  it('filters accounts based on energy type', async () => {
    const user = userEvent.setup()
    render(<AccountsPage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading accounts...')).not.toBeInTheDocument()
    })

    const energyTypeSelect = screen.getByLabelText('Energy Type')
    await user.selectOptions(energyTypeSelect, 'ELECTRICITY')

    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.queryByText('456 Oak Ave')).not.toBeInTheDocument()
  })
})
