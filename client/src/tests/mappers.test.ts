import { describe, expect, it } from 'vitest';

import { mapCurrencyDtoToCurrency } from '../models/mappers/mapCurrencyDto';
import { mapPriceChangeDtoToPriceChange } from '../models/mappers/mapPriceChangeDto';

import type { CurrencyDto } from '../models/dto/CurrencyDto';
import type { PriceChangeDto } from '../models/dto/PriceChangeDto';

describe('mapCurrencyDtoToCurrency', () => {
  it('maps all fields', () => {
    const dto: CurrencyDto = {
      code: 'USD',
      name: 'US Dollar',
      description: 'United States dollar',
      symbol: '$'
    };

    const result = mapCurrencyDtoToCurrency(dto);

    expect(result).toEqual({
      code: 'USD',
      name: 'US Dollar',
      description: 'United States dollar',
      symbol: '$'
    });
  });
});

describe('mapPriceChangeDtoToPriceChange', () => {
  it('maps all fields', () => {
    const dto: PriceChangeDto = {
      purchasedCurrencyCode: 'EUR',
      paymentCurrencyCode: 'USD',
      price: 1.18,
      dateTime: '2026-01-01T00:00:00.000Z'
    };

    const result = mapPriceChangeDtoToPriceChange(dto);

    expect(result).toEqual({
      purchasedCurrencyCode: 'EUR',
      paymentCurrencyCode: 'USD',
      price: 1.18,
      dateTime: '2026-01-01T00:00:00.000Z'
    });
  });
});
