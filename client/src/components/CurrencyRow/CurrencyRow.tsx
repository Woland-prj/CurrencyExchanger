import styles from './CurrencyRow.module.scss';
import { AmountInput } from '../AmountInput';
import { CurrencySelect } from '../CurrencySelect';
import type { Currency } from '../../models/Currency';

type CurrencyRowProps = {
  value: string;
  currency: Currency;
  currencies: Currency[];
  onValueChange: (v: string) => void;
  onCurrencyChange: (c: string) => void;
  isInputBlocked: boolean;
};

export const CurrencyRow = ({
  value,
  currency,
  currencies,
  onValueChange,
  onCurrencyChange,
  isInputBlocked
}: CurrencyRowProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <AmountInput isBlocked={isInputBlocked} value={value} onChange={onValueChange} />
        <div className={styles.divider}></div>
        <CurrencySelect currentCurrency={currency} currencies={currencies} onChange={onCurrencyChange} />
      </div>
    </div>
  );
};
