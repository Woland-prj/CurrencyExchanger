import styles from './CurrencySelect.module.scss';
import type { Currency } from '../../../models/Currency';

type CurrencySelectProps = {
  currentCurrency: Currency;
  currencies: Currency[];
  onChange: (value: string) => void;
};

export const CurrencySelect = ({ currentCurrency, currencies, onChange }: CurrencySelectProps) => {
  return (
    <select
      className={styles.select}
      value={currentCurrency.code}
      onChange={(e) => onChange(e.target.value)}
    >
      {currencies.map((currency) => (
        <option value={currency.code} key={currency.code}>
          {currency.code}
        </option>
      ))}
    </select>
  );
};
