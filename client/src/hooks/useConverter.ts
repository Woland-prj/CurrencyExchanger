import { useReducer, useEffect, useCallback } from 'react';
import { mapCurrencyDtoToCurrency } from '../models/mappers/mapCurrencyDto';
import { fetchCurrencies } from '../api/currencies';
import { fetchPrices } from '../api/prices';
import { appReducer, initialState, actions } from './appReducer';
import { mapPriceChangeDtoToPriceChange } from '../models/mappers/mapPriceChangeDto';

export const useConverter = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch(actions.currenciesLoading());

    const loadCurrencies = async () => {
      try {
        const dtos = await fetchCurrencies();
        dispatch(actions.currenciesLoaded(dtos.map(mapCurrencyDtoToCurrency)));
      } catch (err) {
        dispatch(actions.currenciesError(err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    loadCurrencies();
  }, []);

  useEffect(() => {
    if (!state.from || !state.to || state.currencies.length === 0) {
      return;
    }

    dispatch(actions.priceLoading());

    const loadPrice = async () => {
      try {
        const dtos = await fetchPrices(state.from, state.to);
        const latest = dtos[dtos.length - 1];

        if (!latest) {
          dispatch(actions.priceError('No price data for this pair'));
          return;
        }

        dispatch(actions.priceLoaded(mapPriceChangeDtoToPriceChange(latest)));
      } catch (err) {
        dispatch(actions.priceError(err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    loadPrice();
  }, [state.from, state.to, state.currencies.length]);

  const fromCurrency = state.currencies.find((c) => c.code === state.from) ?? null;
  const toCurrency = state.currencies.find((c) => c.code === state.to) ?? null;

  const rate = state.currentPrice?.price ?? 1;
  const updateDate = state.currentPrice ? new Date(state.currentPrice.dateTime) : new Date();

  const numAmount = parseFloat(state.amount);
  const result = Number.isNaN(numAmount) || !fromCurrency || !toCurrency ? '' : (numAmount * rate).toString();

  const swap = useCallback(() => {
    dispatch(actions.setFrom(state.to));
  }, [state.to]);

  const handleFromCurrencyChange = useCallback((code: string) => {
    dispatch(actions.setFrom(code));
  }, []);

  const handleToCurrencyChange = useCallback((code: string) => {
    dispatch(actions.setTo(code));
  }, []);

  const setAmount = useCallback((value: string) => {
    dispatch(actions.setAmount(value));
  }, []);

  return {
    amount: state.amount,
    result,
    fromCurrency,
    toCurrency,
    rate,
    updateDate,
    currencies: state.currencies,
    isLoadingCurrencies: state.isLoadingCurrencies,
    currenciesError: state.currenciesError,
    isLoadingPrice: state.isLoadingPrice,
    priceError: state.priceError,
    setAmount,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    swap
  };
};
