import type { Currency } from '../Currency';
import type { CurrencyDto } from '../dto/CurrencyDto';

export const mapCurrencyDtoToCurrency = (dto: CurrencyDto): Currency => ({
  code: dto.code,
  name: dto.name,
  description: dto.description,
  symbol: dto.symbol
});
