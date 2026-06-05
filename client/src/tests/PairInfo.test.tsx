import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PairInfo } from '../components/widgets/CurrencyConverter/PairInfo';
import { currencies } from '../mockdata/Currencies';

const pln = currencies.find((c) => c.code === 'PLN')!;
const jpy = currencies.find((c) => c.code === 'JPY')!;

describe('PairInfo', () => {
  it('should render selected pair', () => {
    render(<PairInfo from={pln} to={jpy} />);

    expect(
      screen.getByRole('button', {
        name: 'PLN/JPY: about ↑'
      })
    ).toBeInTheDocument();
  });

  it('should not show currency descriptions initially', () => {
    render(<PairInfo from={pln} to={jpy} />);

    expect(screen.queryByText(pln.description)).not.toBeInTheDocument();

    expect(screen.queryByText(jpy.description)).not.toBeInTheDocument();
  });

  it('should show information after click', async () => {
    const user = userEvent.setup();

    render(<PairInfo from={pln} to={jpy} />);

    await user.click(
      screen.getByRole('button', {
        name: 'PLN/JPY: about ↑'
      })
    );

    expect(screen.getByText(`${pln.name} - ${pln.code} - ${pln.symbol}`)).toBeInTheDocument();

    expect(screen.getByText(`${jpy.name} - ${jpy.code} - ${jpy.symbol}`)).toBeInTheDocument();

    expect(screen.getByText(pln.description)).toBeInTheDocument();

    expect(screen.getByText(jpy.description)).toBeInTheDocument();
  });
});
