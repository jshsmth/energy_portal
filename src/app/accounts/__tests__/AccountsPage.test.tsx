import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccountsPage } from '../components/AccountsPage'
import { ERROR_MESSAGES } from '../constants/accounts'
import { renderWithClient } from '../../test-utils'

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
    renderWithClient(<AccountsPage />)
    expect(screen.getByRole('heading', { name: /my energy accounts/i })).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('fetches and displays energy accounts', async () => {
    renderWithClient(<AccountsPage />)

    await waitFor(() => {
      expect(screen.getByText('123 Main St')).toBeInTheDocument()
    })

    // Verify accounts are displayed
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText((_, node) => !!node && node.textContent === 'Electricity')).toBeInTheDocument()
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument()
    expect(screen.getByText((_, node) => !!node && node.textContent === 'Gas')).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))
    renderWithClient(<AccountsPage />)

    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGES.FETCH_ACCOUNTS)).toBeInTheDocument()
    })
  })

  it('filters accounts based on search input', async () => {
    const user = userEvent.setup()
    renderWithClient(<AccountsPage />)

    await waitFor(() => {
      expect(screen.getByText('123 Main St')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by address')
    await user.type(searchInput, 'Main')

    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.queryByText('456 Oak Ave')).not.toBeInTheDocument()
  })

  it('filters accounts based on energy type', async () => {
    const user = userEvent.setup()
    renderWithClient(<AccountsPage />)

    await waitFor(() => {
      expect(screen.getByText('123 Main St')).toBeInTheDocument()
    })

    const energyTypeSelect = screen.getByLabelText('Energy Type')
    await user.selectOptions(energyTypeSelect, 'ELECTRICITY')

    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.queryByText('456 Oak Ave')).not.toBeInTheDocument()
  })
})
