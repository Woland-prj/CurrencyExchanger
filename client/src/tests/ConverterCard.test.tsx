import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ConverterCard } from '../components/widgets/CurrencyConverter/ConverterCard';

const mockCurrencies = [
  { code: 'CAD', name: 'Canadian dollar', description: 'CAD description', symbol: '$' },
  { code: 'PLN', name: 'Polish zloty', description: 'PLN description', symbol: 'zł' },
  { code: 'AUD', name: 'Australian dollar', description: 'AUD description', symbol: '$' },
  { code: 'JPY', name: 'Japanese yen', description: 'JPY description', symbol: '¥' },
  { code: 'ZAR', name: 'South African rand', description: 'ZAR description', symbol: 'R' }
];

const mockPrices = (from: string, to: string) => {
  const rates: Record<string, Record<string, number>> = {
    CAD: { PLN: 2.95, AUD: 1.11, JPY: 106.4, ZAR: 13.82 },
    PLN: { CAD: 0.34, AUD: 0.38, JPY: 36.05, ZAR: 4.69 },
    AUD: { CAD: 0.9, PLN: 2.66, JPY: 95.77, ZAR: 12.45 },
    JPY: { CAD: 0.0094, PLN: 0.0277, AUD: 0.0104, ZAR: 0.13 },
    ZAR: { CAD: 0.072, PLN: 0.213, AUD: 0.08, JPY: 7.69 }
  };

  const price = rates[from]?.[to] ?? 1;

  return [
    {
      purchasedCurrencyCode: from,
      paymentCurrencyCode: to,
      price,
      dateTime: '2026-04-27T09:00:00.000Z'
    }
  ];
};

vi.mock('../api/currencies', () => ({
  fetchCurrencies: vi.fn(() => Promise.resolve(mockCurrencies))
}));

vi.mock('../api/prices', () => ({
  fetchPrices: vi.fn((from: string, to: string) => Promise.resolve(mockPrices(from, to)))
}));

describe('ConverterCard', () => {
  it('shows loading state while currencies are being fetched', () => {
    render(<ConverterCard />);

    expect(screen.getByText('Loading currencies...')).toBeInTheDocument();
  });

  it('renders selects, inputs and swap button after data loads', async () => {
    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);
    expect(selects[0]).toHaveValue('CAD');
    expect(selects[1]).toHaveValue('PLN');

    const allOptions = screen.getAllByRole('option');
    const optionValues = [...new Set(allOptions.map((o) => o.getAttribute('value')))];
    expect(optionValues).toEqual(['CAD', 'PLN', 'AUD', 'JPY', 'ZAR']);

    expect(screen.getByDisplayValue('2.95')).toBeInTheDocument();

    expect(screen.getByText('↑↓')).toBeInTheDocument();
  });

  it('recalculates result when amount changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const input = screen.getByDisplayValue('1');
    await user.clear(input);
    await user.type(input, '2');

    expect(screen.getByDisplayValue('5.9')).toBeInTheDocument();
  });

  it('recalculates result when from currency changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'AUD');

    await waitFor(() => {
      expect(screen.getByDisplayValue('2.66')).toBeInTheDocument();
    });
  });

  it('recalculates result when to currency changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[1], 'AUD');

    await waitFor(() => {
      expect(screen.getByDisplayValue('1.11')).toBeInTheDocument();
    });
  });

  it('prevents selecting same currency when from changes to match to', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'PLN');

    expect(selects[0]).toHaveValue('PLN');
    expect(selects[1]).toHaveValue('CAD');
  });

  it('prevents selecting same currency when to changes to match from', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[1], 'CAD');

    expect(selects[0]).toHaveValue('PLN');
    expect(selects[1]).toHaveValue('CAD');
  });

  it('shows error state when currencies fetch fails', async () => {
    const { fetchCurrencies } = await import('../api/currencies');
    vi.mocked(fetchCurrencies).mockRejectedValueOnce(new Error('Network failure'));

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByText('Server is unavailable. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows PairInfo and toggles on click', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();

    const badge = screen.getByRole('button', { name: /about/i });
    await user.click(badge);

    expect(screen.getByText(/More about/)).toBeInTheDocument();
  });

  it('resets PairInfo open state when pair changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    const badge = screen.getByRole('button', { name: /about/i });
    await user.click(badge);

    expect(screen.getByText(/More about/)).toBeInTheDocument();

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'AUD');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /AUD\/PLN: about ↑/ })).toBeInTheDocument();
    });

    expect(screen.queryByText(/More about/)).not.toBeInTheDocument();
  });
});
