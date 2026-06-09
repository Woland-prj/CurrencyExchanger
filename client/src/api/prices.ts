import { request } from './client';
import { PRICES_ENDPOINT } from './endpoints';

import type { PriceChangeDto } from '../models/dto/PriceChangeDto';

export const fetchPrices = (paymentCurrency: string, purchasedCurrency: string): Promise<PriceChangeDto[]> => {
  const from = new Date(0).toISOString();
  const params = new URLSearchParams({ paymentCurrency, purchasedCurrency, fromDateTime: from });

  return request<PriceChangeDto[]>(`${PRICES_ENDPOINT}?${params}`);
};
