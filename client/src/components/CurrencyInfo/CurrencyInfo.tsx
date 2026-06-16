import styles from './CurrencyInfo.module.scss';
import type { Currency } from '../../models/Currency';

type CurrencyInfoProps = {
  currency: Currency;
};

export const CurrencyInfo = ({ currency }: CurrencyInfoProps) => {
  return (
    <div className={styles.info}>
      <h3 className={styles.title}>
        {currency.Fullname} - {currency.Code} - {currency.Symbol}
      </h3>
      <p className={styles.text}>{currency.Description}</p>
    </div>
  );
};
