import type { RateMap } from '../models/RateMap';
import { usd, pln, jpy } from './Currencies';

export const rates: RateMap = new Map([
  [usd.Code, 1],
  [pln.Code, 150],
  [jpy.Code, 4]
]);
