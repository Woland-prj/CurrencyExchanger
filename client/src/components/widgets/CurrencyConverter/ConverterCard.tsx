import { Card } from '../../ui/Card/Card';
import { ExchangeRateHeader } from './ExchangeRateHeader';
import { PairInfo } from './PairInfo';
import { useConverter } from '../../../hooks/useConverter';
import { ConverterForm } from './CurrencyForm';
import { LoadingCurrencies } from './LoadingCurrencies/LoadingCurrencies';
import { CurrenciesError } from './CurrenciesError/CurrenciesError';
import { PriceNotification } from '../../ui/PriceNotification/PriceNotification';

export const ConverterCard = () => {
  const {
    amount,
    result,
    fromCurrency,
    toCurrency,
    rate,
    updateDate,
    currencies,
    isLoadingCurrencies,
    currenciesError,
    isLoadingPrice,
    priceError,
    setAmount,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    swap
  } = useConverter();

  if (isLoadingCurrencies) {
    return <LoadingCurrencies />;
  }

  if (currenciesError) {
    return <CurrenciesError error={currenciesError} />;
  }

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  const key: string = `${fromCurrency.code}-${toCurrency.code}`;

  return (
    <Card>
      {priceError && <PriceNotification type="error" message={priceError} />}

      {isLoadingPrice && <PriceNotification type="loading" message="Updating rate..." />}

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
      />

      <PairInfo key={key} from={fromCurrency} to={toCurrency} />
    </Card>
  );
};
