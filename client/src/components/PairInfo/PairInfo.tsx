import { useState } from 'react';
import styles from './PairInfo.module.scss';
import { CurrencyInfo } from '../CurrencyInfo';
import type { Currency } from '../../models/Currency';

type PairInfoProps = {
  from: Currency;
  to: Currency;
};

export const PairInfo = ({ from, to }: PairInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pair = `${from.code}/${to.code}`;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.divider}></div>
        <button className={styles.badge} onClick={() => setIsOpen((v) => !v)}>
          {isOpen ? `More about ${pair} ↓` : `${pair}: about ↑`}
        </button>
      </div>
      {isOpen && (
        <div>
          <CurrencyInfo currency={from} />
          <CurrencyInfo currency={to} />
        </div>
      )}
    </>
  );
};
