/* eslint-disable @typescript-eslint/no-explicit-any */
import helpers from './helpers';
import { toCamel } from './string';

export const keysToCamel = function (o: any) {
  if (helpers.isObject(o)) {
    const n: Record<string, any> = {};
    Object.keys(o).forEach((k: any) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });
    return n;
  } else if (helpers.isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};
