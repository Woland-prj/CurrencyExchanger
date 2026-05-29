import styles from './CurrencySelect.module.scss';
import type { Currency } from '../../../models/Currency';

type Props = {
  currentCurrency: Currency;
  currencies: Currency[];
  onChange: (value: string) => void;
};

export const CurrencySelect = ({ currentCurrency, currencies, onChange }: Props) => {
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
