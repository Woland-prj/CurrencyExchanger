import styles from './CurrencyInfo.module.scss';
import type { Currency } from '../../../models/Currency';

type CurrencyInfoProps = {
  currency: Currency;
};

export const CurrencyInfo = ({ currency }: CurrencyInfoProps) => {
  return (
    <div className={styles.info}>
      <h3>
        {currency.Fullname} - {currency.Code} - {currency.Symbol}
      </h3>
      <p>{currency.Description}</p>
    </div>
  );
};
