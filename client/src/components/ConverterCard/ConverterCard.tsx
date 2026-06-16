import { Card } from '../Card';
import { ExchangeRateHeader } from '../ExchangeRateHeader';
import { PairInfo } from '../PairInfo';
import { currencies } from '../../mockdata/Currencies';
import { priceChanges } from '../../mockdata/Rates';
import { useConverter } from '../../hooks/useConverter';
import { ConverterForm } from '../ConverterForm';

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

  const key: string = `${fromCurrency.code}-${toCurrency.code}`;

  return (
    <Card>
      <ExchangeRateHeader rate={rate} from={fromCurrency.name} to={toCurrency.name} updateDate={updateDate} />

      <ConverterForm
        amount={amount}
        fromCurrency={fromCurrency}
        currencies={currencies}
        setAmount={setAmount}
        handleFromCurrencyChange={handleFromCurrencyChange}
        result={result}
        swap={swap}
        toCurrency={toCurrency}
        handleToCurrencyChange={handleToCurrencyChange}
      ></ConverterForm>

      <PairInfo key={key} from={fromCurrency} to={toCurrency} />
    </Card>
  );
};
