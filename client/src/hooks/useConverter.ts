import { useState } from 'react';
import type { Currency } from '../models/Currency';
import type { PriceChanges } from '../models/RateMap';

export const useConverter = (currencies: Currency[], priceChanges: PriceChanges) => {
  const [from, setFrom] = useState(currencies[0].code);
  const [to, setTo] = useState(currencies[1].code);
  const [amount, setAmount] = useState('1');

  const fromCurrency = currencies.find((c) => c.code === from)!;
  const toCurrency = currencies.find((c) => c.code === to)!;

  const rateRecord = priceChanges[from]?.[to];
  const rate = rateRecord?.price ?? 1;
  const updateDate = rateRecord ? new Date(rateRecord.dateTime) : new Date();

  const numAmount = parseFloat(amount);
  const result = Number.isNaN(numAmount) ? '' : (numAmount * rate).toString();

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleFromCurrencyChange = (code: string) => {
    if (code === to) {
      setTo(from);
    }
    setFrom(code);
  };

  const handleToCurrencyChange = (code: string) => {
    if (code === from) {
      setFrom(to);
    }
    setTo(code);
  };

  return {
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
  };
};
