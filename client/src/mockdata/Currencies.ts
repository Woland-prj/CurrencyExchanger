import type { Currency } from '../models/Currency';

export const usd: Currency = {
  Fullname: 'American dollar',
  Code: 'USD',
  Symbol: '$',
  Description: 'This is the official currency and legal tender of United States of America.'
};

export const pln: Currency = {
  Fullname: 'Polish zloty',
  Code: 'PLN',
  Symbol: 'zł',
  Description:
    'This is the official currency and legal tender of Poland.It is subdivided into 100 grosz - y(gr).It is the most traded currency in Central and Eastern Europe and ranks 21st most- traded in the foreign exchange market.'
};

export const jpy: Currency = {
  Fullname: 'Japanese yen',
  Code: 'JPY',
  Symbol: '¥',
  Description:
    'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.'
};
