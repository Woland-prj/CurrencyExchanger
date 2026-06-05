import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ConverterCard } from '../components/widgets/CurrencyConverter/ConverterCard';

describe('ConverterCard', () => {
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
});
