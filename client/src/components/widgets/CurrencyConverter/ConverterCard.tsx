import { Card } from '../../ui/Card/Card';
import { ExchangeRateHeader } from './ExchangeRateHeader';
import { CurrencyRow } from '../../shared/CurrencyRow/CurrencyRow';
import { PairInfo } from './PairInfo';
import { Button } from '../../ui/Button/Button';
import { useConverter } from '../../../hooks/useConverter';
import { currencies } from '../../../mockdata/Currencies';
import { priceChanges } from '../../../mockdata/Rates';
import styles from './ConverterCard.module.scss';

export const ConverterCard = () => {
  const {
    amount,
    result,
    fromCurrency,
    toCurrency,
    rate,
    updateDate,
    setAmount,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    swap
  } = useConverter(currencies, priceChanges);

  const pairKey = `${fromCurrency.code}-${toCurrency.code}`;

  return (
    <Card>
      <ExchangeRateHeader rate={rate} from={fromCurrency.name} to={toCurrency.name} updateDate={updateDate} />

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

      <PairInfo key={pairKey} from={fromCurrency} to={toCurrency} />
    </Card>
  );
};
