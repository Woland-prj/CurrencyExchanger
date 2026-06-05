import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ConverterCard } from '../components/widgets/CurrencyConverter/ConverterCard';
import { pln, jpy } from '../mockdata/Currencies';

describe('ConverterCard', () => {
  it('should render information about selected pair', () => {
    render(<ConverterCard />);

    expect(screen.getByText('PLN/JPY: about ↑')).toBeInTheDocument();
  });

  it('should render PLN information', () => {
    render(<ConverterCard />);

    expect(screen.getByText(`${pln.Fullname} - ${pln.Code} - ${pln.Symbol}`)).toBeInTheDocument();

    expect(screen.getByText(pln.Description)).toBeInTheDocument();
  });

  it('should render JPY information', () => {
    render(<ConverterCard />);

    expect(screen.getByText(`${jpy.Fullname} - ${jpy.Code} - ${jpy.Symbol}`)).toBeInTheDocument();

    expect(screen.getByText(jpy.Description)).toBeInTheDocument();
  });
});
