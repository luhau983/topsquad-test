/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { differenceWith, fromPairs, isEqual, toPairs } from 'lodash';

const helpers = {
  getQueryParams: function (url?: string) {
    if (!url) url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const params: { [key: string]: string } = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  },

  replaceQueryParam: function (url: string, param: string, newValue: string): string {
    if (url && (!param || !newValue)) return url;
    if (!url || !param || !newValue) return '';

    const newUrl = new URL(url);
    const searchParams = new URLSearchParams(newUrl.search);
    searchParams.set(param, newValue);

    newUrl.search = searchParams.toString();
    return newUrl.toString();
  },

  isArray: function (a: any) {
    return Array.isArray(a);
  },

  isObject: function (o: any) {
    return o === Object(o) && !this.isArray(o) && typeof o !== 'function';
  },

  formatPrice: function (price = 0) {
    return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫';
  },

  generateUID: function (): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  },

  generateCustomNumber: function (range = 1000000): number {
    return Math.floor(Math.random() * range) + 1;
  },

  isToday: function (dateString: string): boolean {
    if (!dateString) return false;
    dayjs.extend(isToday);
    return dayjs(dateString).isToday();
  },

  genRamdomImg: function ({ width = 200, height = 300 }: { width: number; height: number }): string {
    return `https://picsum.photos/${width}/${height}`;
  },

  isValidEmail: function (email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone: function (phoneNumber: string): boolean {
    const landlineRegex = /^0[2-9][0-9]{8}$/; // sdt bàn
    const mobileRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

    if (phoneNumber.length > 10) {
      return landlineRegex.test(phoneNumber);
    }
    return mobileRegex.test(phoneNumber);
  },

  convertToTimestamp: function (dateString: string) {
    if (!dateString) return '';
    return dayjs(dateString, 'DD/MM/YYYY').format();
  },

  convertDateStringWithFormat: function (dateString: string, format?: string) {
    if (!dateString) return '';
    return dayjs(dateString)
      .format(format || 'DD/MM/YYYY HH:mm:ss')
      .toString();
  },

  convertDateStringToHHMMDDMMYYYY: function (dateString: string) {
    if (!dateString) return '';
    return this.convertDateStringWithFormat(dateString, 'HH:mm DD/MM/YYYY');
  },

  getUniqueStringArray: function (arr: string[]): string[] {
    // ["a", "b", "a", "c", "d","d"] ---> ["a", "b", "c", "d"]
    const uniqueElements: string[] = [];
    arr.forEach((element: string) => {
      if (!uniqueElements.includes(element)) uniqueElements.push(element);
    });
    return uniqueElements;
  },

  getUniqueStrings: function (arr: string[], caseArr: string[]): string[] {
    //  ["a", "b", "c", "d"] vs ["a", "d", "c", "s", "g"]; ---> ["b"]
    const uniqueElements: string[] = [];
    arr.forEach((element: string) => {
      if (!caseArr.includes(element)) uniqueElements.push(element);
    });
    return uniqueElements;
  },

  isEveryElmStrContainInArray: function (rootArr: string[], caseArr: string[]): boolean {
    // rootArr = ["a", "b", "c", "d"]; caseArr = ["a", "b", ] ---> true
    // rootArr = ["a", "b", "c", "d"]; caseArr = ["a", "b", "s"] ---> false
    let bool = true;
    caseArr.forEach(x => {
      if (!rootArr.includes(x)) bool = false;
    });
    return bool;
  },

  capitalizeFirstLetter: function (s: string) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  capitalizeToUpperCase: function (s: string) {
    if (!s) return s;
    return s.toUpperCase();
  },
  capitalizeWordsFirstLetter: function (s: string) {
    if (!s) return s;

    return s
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  objectDiff: (a: any, b: any) => fromPairs(differenceWith(toPairs(a), toPairs(b), isEqual)),
  isJsonString: (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  localStorage: () => {
    // parseJSON
    const parseJson = (data: string | null) => {
      if (data && !helpers.isJsonString(data)) return data;
      return data ? JSON.parse(data) : data;
    };

    // setItem
    const set = (
      key: string,
      value: string | number | boolean | Record<string, unknown> | Record<string, unknown>[] | []
    ) => {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    };

    // getItem
    const get = (key: string) => {
      const value = localStorage.getItem(key);
      return parseJson(value);
    };

    // remove
    const remove = (key?: string) => {
      if (key) {
        localStorage.removeItem(key);
      } else {
        localStorage.clear();
      }
    };

    return {
      set,
      get,
      remove,
    };
  },
};

export default helpers;
