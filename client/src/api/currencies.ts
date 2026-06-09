import { request } from './client';
import { CURRENCIES_ENDPOINT } from './endpoints';

import type { CurrencyDto } from '../models/dto/CurrencyDto';

export const fetchCurrencies = (): Promise<CurrencyDto[]> => request<CurrencyDto[]>(CURRENCIES_ENDPOINT);
