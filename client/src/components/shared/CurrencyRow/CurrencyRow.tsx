import styles from './CurrencyRow.module.scss';
import { AmountInput } from '../AmountInput/AmountInput';
import { CurrencySelect } from '../CurrencySelect/CurrencySelect';
import type { Currency } from '../../../models/Currency';

type CurrencyRowProps = {
  value: string;
  currency: Currency;
  currencies: Currency[];
  onValueChange: (v: string) => void;
  onCurrencyChange: (c: string) => void;
};

export const CurrencyRow = ({ value, currency, currencies, onValueChange, onCurrencyChange }: CurrencyRowProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <AmountInput value={value} onChange={onValueChange} />
        <div className={styles.divider}></div>
        <CurrencySelect currentCurrency={currency} currencies={currencies} onChange={onCurrencyChange} />
      </div>
    </div>
  );
};
