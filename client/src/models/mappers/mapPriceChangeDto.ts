import type { PriceChange } from '../PriceChange';
import type { PriceChangeDto } from '../dto/PriceChangeDto';

export const mapPriceChangeDtoToPriceChange = (dto: PriceChangeDto): PriceChange => ({
  purchasedCurrencyCode: dto.purchasedCurrencyCode,
  paymentCurrencyCode: dto.paymentCurrencyCode,
  price: dto.price,
  dateTime: dto.dateTime
});
