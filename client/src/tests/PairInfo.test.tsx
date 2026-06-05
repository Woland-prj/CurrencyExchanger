import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PairInfo } from '../components/widgets/CurrencyConverter/PairInfo';

describe('PairInfo', () => {
  it('should render selected currency pair', () => {
    render(<PairInfo pair="PLN/JPY" />);

    expect(screen.getByText('PLN/JPY: about ↑')).toBeInTheDocument();
  });

  it('should render another currency pair', () => {
    render(<PairInfo pair="USD/JPY" />);

    expect(screen.getByText('USD/JPY: about ↑')).toBeInTheDocument();
  });
});
