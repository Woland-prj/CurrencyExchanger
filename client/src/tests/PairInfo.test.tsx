import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PairInfo } from '../components/PairInfo';

const pln = {
  code: 'PLN',
  description:
    'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.',
  name: 'Polish zloty',
  symbol: 'zł'
};

const jpy = {
  code: 'JPY',
  description:
    'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.',
  name: 'Japanese yen',
  symbol: '¥'
};

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
