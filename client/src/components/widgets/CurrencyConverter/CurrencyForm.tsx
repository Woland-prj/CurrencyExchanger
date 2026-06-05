import { CurrencyRow } from '../../shared/CurrencyRow/CurrencyRow';
import { Button } from '../../ui/Button/Button';

type;

export const ConverterForm = () => {
  return (
    <>
      <CurrencyRow
        value={amount}
        currency={fromCurrency}
        currencies={currencies}
        onValueChange={setAmount}
        onCurrencyChange={handleFromCurrencyChange}
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
      />
    </>
  );
};
