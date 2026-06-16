import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ConverterCard } from '../components/ConverterCard';

describe('ConverterCard', () => {
  it('should render selected currencies in selects and amount inputs with mock data', () => {
    render(<ConverterCard />);

    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);

    expect(selects[0]).toHaveValue('CAD');
    expect(selects[1]).toHaveValue('PLN');

    const allOptions = screen.getAllByRole('option');
    const optionValues = [...new Set(allOptions.map((o) => o.getAttribute('value')))];
    expect(optionValues).toEqual(['CAD', 'PLN', 'AUD', 'JPY', 'ZAR']);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2.95')).toBeInTheDocument();

    expect(screen.getByText('↑↓')).toBeInTheDocument();
  });

  it('should recalculate result when amount changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const input = screen.getByDisplayValue('1');
    await user.clear(input);
    await user.type(input, '2');

    expect(screen.getByDisplayValue('5.9')).toBeInTheDocument();
  });

  it('should recalculate result when from currency changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'AUD');

    expect(screen.getByDisplayValue('2.66')).toBeInTheDocument();
  });

  it('should recalculate result when to currency changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[1], 'AUD');

    expect(screen.getByDisplayValue('1.11')).toBeInTheDocument();
  });

  it('should prevent selecting same currency when from changes to match to', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'PLN');

    expect(selects[0]).toHaveValue('PLN');
    expect(selects[1]).toHaveValue('CAD');
  });

  it('should prevent selecting same currency when to changes to match from', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[1], 'CAD');

    expect(selects[0]).toHaveValue('PLN');
    expect(selects[1]).toHaveValue('CAD');
  });

  it('should render pair info block', () => {
    render(<ConverterCard />);

    expect(
      screen.getByRole('button', {
        name: /about/i
      })
    ).toBeInTheDocument();
  });

  it('should show additional currency information after click', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const button = screen.getByRole('button', {
      name: /about/i
    });

    await user.click(button);

    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });

  it('should reset PairInfo open state when currency pair changes', async () => {
    const user = userEvent.setup();

    render(<ConverterCard />);

    const badge = screen.getByRole('button', { name: /about/i });
    await user.click(badge);

    expect(screen.getByText(/More about/)).toBeInTheDocument();

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'AUD');

    expect(screen.getByRole('button', { name: /AUD\/PLN: about ↑/ })).toBeInTheDocument();

    expect(screen.queryByText(/More about/)).not.toBeInTheDocument();
  });
});
