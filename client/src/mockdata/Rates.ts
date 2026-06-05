import type { RateMap } from '../models/RateMap';
import { usd, pln, jpy } from './Currencies';

const PLN_RATE = 150;
const JPY_RATE = 4;

export const rates: RateMap = new Map([
  [usd.Code, 1],
  [pln.Code, PLN_RATE],
  [jpy.Code, JPY_RATE]
]);
