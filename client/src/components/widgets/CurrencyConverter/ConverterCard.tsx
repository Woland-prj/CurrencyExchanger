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

  return (
    <Card>
      <ExchangeRateHeader rate={rate} from={fromCurrency.name} to={toCurrency.name} updateDate={updateDate} />

      <PairInfo from={fromCurrency} to={toCurrency} />
    </Card>
  );
};
