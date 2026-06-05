import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CurrencyInfo } from '../components/shared/CurrencyInfo/CurrencyInfo';
import { currencies } from '../mockdata/Currencies';

const pln = currencies.find((c) => c.code === 'PLN')!;

describe('CurrencyInfo', () => {
  it('should display currency title', () => {
    render(<CurrencyInfo currency={pln} />);

    expect(screen.getByText(`${pln.name} - ${pln.code} - ${pln.symbol}`)).toBeInTheDocument();
  });

  it('should display currency description', () => {
    render(<CurrencyInfo currency={pln} />);

    expect(screen.getByText(pln.description)).toBeInTheDocument();
  });
});
