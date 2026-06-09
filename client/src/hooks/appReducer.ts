import type { Currency } from '../models/Currency';
import type { PriceChange } from '../models/PriceChange';

export type AppState = {
  currencies: Currency[];
  isLoadingCurrencies: boolean;
  currenciesError: string | null;

  from: string;
  to: string;
  amount: string;

  currentPrice: PriceChange | null;
  isLoadingPrice: boolean;
  priceError: string | null;
};

export const actions = {
  currenciesLoading: () => ({ type: 'CURRENCIES_LOADING' }) as const,
  currenciesLoaded: (currencies: Currency[]) => ({ type: 'CURRENCIES_LOADED', currencies }) as const,
  currenciesError: (error: string) => ({ type: 'CURRENCIES_ERROR', error }) as const,
  priceLoading: () => ({ type: 'PRICE_LOADING' }) as const,
  priceLoaded: (price: PriceChange) => ({ type: 'PRICE_LOADED', price }) as const,
  priceError: (error: string) => ({ type: 'PRICE_ERROR', error }) as const,
  setFrom: (code: string) => ({ type: 'SET_FROM', code }) as const,
  setTo: (code: string) => ({ type: 'SET_TO', code }) as const,
  setAmount: (amount: string) => ({ type: 'SET_AMOUNT', amount }) as const
};

export type Action = ReturnType<(typeof actions)[keyof typeof actions]>;

export const initialState: AppState = {
  currencies: [],
  isLoadingCurrencies: true,
  currenciesError: null,

  from: '',
  to: '',
  amount: '1',

  currentPrice: null,
  isLoadingPrice: false,
  priceError: null
};

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'CURRENCIES_LOADING':
      return { ...state, isLoadingCurrencies: true, currenciesError: null };

    case 'CURRENCIES_LOADED':
      return {
        ...state,
        currencies: action.currencies,
        isLoadingCurrencies: false,
        from: action.currencies[0]?.code ?? '',
        to: action.currencies[1]?.code ?? ''
      };

    case 'CURRENCIES_ERROR':
      return { ...state, isLoadingCurrencies: false, currenciesError: action.error };

    case 'PRICE_LOADING':
      return { ...state, isLoadingPrice: true, priceError: null };

    case 'PRICE_LOADED':
      return { ...state, currentPrice: action.price, isLoadingPrice: false };

    case 'PRICE_ERROR':
      return { ...state, isLoadingPrice: false, priceError: action.error };

    case 'SET_FROM': {
      const newFrom = action.code;
      const newTo = newFrom === state.to ? state.from : state.to;

      return { ...state, from: newFrom, to: newTo };
    }

    case 'SET_TO': {
      const newTo = action.code;
      const newFrom = newTo === state.from ? state.to : state.from;

      return { ...state, from: newFrom, to: newTo };
    }

    case 'SET_AMOUNT':
      return { ...state, amount: action.amount };

    default:
      return state;
  }
};
