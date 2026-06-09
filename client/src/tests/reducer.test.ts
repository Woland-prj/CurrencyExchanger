import { describe, expect, it } from 'vitest';

import { appReducer, initialState, actions } from '../hooks/appReducer';

import type { Currency } from '../models/Currency';
import type { PriceChange } from '../models/PriceChange';

const mockCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', description: '', symbol: '$' },
  { code: 'EUR', name: 'Euro', description: '', symbol: '€' }
];

const mockPrice: PriceChange = {
  purchasedCurrencyCode: 'EUR',
  paymentCurrencyCode: 'USD',
  price: 1.18,
  dateTime: '2026-01-01T00:00:00.000Z'
};

describe('appReducer', () => {
  it('transitions to loading state on CURRENCIES_LOADING', () => {
    const state = appReducer(initialState, actions.currenciesLoading());

    expect(state.isLoadingCurrencies).toBe(true);
    expect(state.currenciesError).toBeNull();
  });

  it('stores currencies and sets from/to on CURRENCIES_LOADED', () => {
    const state = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));

    expect(state.currencies).toEqual(mockCurrencies);
    expect(state.isLoadingCurrencies).toBe(false);
    expect(state.from).toBe('USD');
    expect(state.to).toBe('EUR');
  });

  it('stores error on CURRENCIES_ERROR', () => {
    const state = appReducer(initialState, actions.currenciesError('Network error'));

    expect(state.isLoadingCurrencies).toBe(false);
    expect(state.currenciesError).toBe('Network error');
  });

  it('handles PRICE_LOADING state', () => {
    const state = appReducer(initialState, actions.priceLoading());

    expect(state.isLoadingPrice).toBe(true);
    expect(state.priceError).toBeNull();
  });

  it('stores price on PRICE_LOADED', () => {
    const withCurrencies = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));
    const state = appReducer(withCurrencies, actions.priceLoaded(mockPrice));

    expect(state.currentPrice).toEqual(mockPrice);
    expect(state.isLoadingPrice).toBe(false);
  });

  it('stores error on PRICE_ERROR', () => {
    const state = appReducer(initialState, actions.priceError('No price data'));

    expect(state.isLoadingPrice).toBe(false);
    expect(state.priceError).toBe('No price data');
  });

  it('swaps currencies when SET_FROM matches current to', () => {
    const withCurrencies = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));
    const state = appReducer(withCurrencies, actions.setFrom('EUR'));

    expect(state.from).toBe('EUR');
    expect(state.to).toBe('USD');
  });

  it('keeps to unchanged when SET_FROM is different', () => {
    const withCurrencies = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));
    const state = appReducer(withCurrencies, actions.setFrom('USD'));

    expect(state.from).toBe('USD');
    expect(state.to).toBe('EUR');
  });

  it('swaps currencies when SET_TO matches current from', () => {
    const withCurrencies = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));
    const state = appReducer(withCurrencies, actions.setTo('USD'));

    expect(state.from).toBe('EUR');
    expect(state.to).toBe('USD');
  });

  it('keeps from unchanged when SET_TO is different', () => {
    const withCurrencies = appReducer(initialState, actions.currenciesLoaded(mockCurrencies));
    const state = appReducer(withCurrencies, actions.setTo('EUR'));

    expect(state.from).toBe('USD');
    expect(state.to).toBe('EUR');
  });

  it('sets amount on SET_AMOUNT', () => {
    const state = appReducer(initialState, actions.setAmount('100'));

    expect(state.amount).toBe('100');
  });
});
