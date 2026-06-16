import { Card } from '../Card';
import { ExchangeRateHeader } from '../ExchangeRateHeader';
import { CurrencyRow } from '../CurrencyRow';
import { PairInfo } from '../PairInfo';
import { CurrencyInfo } from '../CurrencyInfo';

import { usd, pln, jpy } from '../../mockdata/Currencies';

export const ConverterCard = () => {
  const currencies = [usd, pln, jpy];

  return (
    <Card>
      <ExchangeRateHeader rate={0.99} from={pln.Fullname} to={jpy.Fullname} updateDate={new Date()} />

      <CurrencyRow
        value="1"
        currency={pln}
        currencies={currencies}
        onValueChange={() => {}}
        onCurrencyChange={() => {}}
      />

      <CurrencyRow
        value="0.99"
        currency={jpy}
        currencies={currencies}
        onValueChange={() => {}}
        onCurrencyChange={() => {}}
      />

      <PairInfo pair="PLN/JPY" />

      <CurrencyInfo currency={pln} />
      <CurrencyInfo currency={jpy} />
    </Card>
  );
};
