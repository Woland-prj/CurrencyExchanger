import styles from './CurrencyInfo.module.scss';
import type { Currency } from '../../../models/Currency';

type Props = {
  currency: Currency;
};

export const CurrencyInfo = ({ currency }: Props) => {
  return (
    <div className={styles.info}>
      <h3>
        {currency.Fullname} - {currency.Code} - {currency.Symbol}
      </h3>
      <p>{currency.Description}</p>
    </div>
  );
};
