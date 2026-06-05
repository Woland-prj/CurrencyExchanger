import type { Currency } from '../../../models/Currency';
import { CurrencyRow } from '../../shared/CurrencyRow/CurrencyRow';
import { Button } from '../../ui/Button/Button';
import styles from './CurrencyForm.module.scss';

type ConverterFormProps = {
  amount: string;
  fromCurrency: Currency;
  currencies: Currency[];
  setAmount: (v: string) => void;
  handleFromCurrencyChange: (c: string) => void;
  result: string;
  swap: () => void;
  toCurrency: Currency;
  handleToCurrencyChange: (c: string) => void;
};

export const ConverterForm = ({
  amount,
  fromCurrency,
  currencies,
  setAmount,
  handleFromCurrencyChange,
  result,
  swap,
  toCurrency,
  handleToCurrencyChange
}: ConverterFormProps) => {
  return (
    <>
      <CurrencyRow
        value={amount}
        currency={fromCurrency}
        currencies={currencies}
        onValueChange={setAmount}
        onCurrencyChange={handleFromCurrencyChange}
        isInputBlocked={false}
      />

      <div className={styles.buttonWrapper}>
        <Button onClick={swap}>↑↓</Button>
      </div>

      <CurrencyRow
        value={result}
        currency={toCurrency}
        currencies={currencies}
        onValueChange={() => {}}
        onCurrencyChange={handleToCurrencyChange}
        isInputBlocked={true}
      />
    </>
  );
};
