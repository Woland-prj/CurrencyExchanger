import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CurrencyInfo } from '../components/CurrencyInfo';
import { usd } from '../mockdata/Currencies';

describe('CurrencyInfo', () => {
  it('should display currency title', () => {
    render(<CurrencyInfo currency={usd} />);

    expect(
      screen.getByText(
        `${usd.Fullname} - ${usd.Code} - ${usd.Symbol}`
      )
    ).toBeInTheDocument();
  });

  it('should display currency description', () => {
    render(<CurrencyInfo currency={usd} />);

    expect(
      screen.getByText(usd.Description)
    ).toBeInTheDocument();
  });
});
