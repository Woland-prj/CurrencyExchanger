import styles from './CurrencySelect.module.scss';
import type { Currency } from '../../../models/Currency';

type CurrencySelectProps = {
  currentCurrency: Currency;
  currencies: Currency[];
  onChange: (value: string) => void;
};

export const CurrencySelect = ({ currentCurrency, currencies, onChange }: CurrencySelectProps) => {
  return (
    <select className={styles.select} value={currentCurrency.Code} onChange={(e) => onChange(e.target.value)}>
      {currencies.map((currency) => (
        <option value={currency.Code} key={currency.Code}>
          {currency.Code}
        </option>
      ))}
    </select>
  );
};
