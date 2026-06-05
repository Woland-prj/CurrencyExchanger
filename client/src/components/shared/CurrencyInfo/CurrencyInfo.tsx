import styles from './CurrencyInfo.module.scss';
import type { Currency } from '../../../models/Currency';

type CurrencyInfoProps = {
  currency: Currency;
};

export const CurrencyInfo = ({ currency }: CurrencyInfoProps) => {
  return (
    <div className={styles.info}>
      <h3>
        {currency.name} - {currency.code} - {currency.symbol}
      </h3>
      <p>{currency.description}</p>
    </div>
  );
};
