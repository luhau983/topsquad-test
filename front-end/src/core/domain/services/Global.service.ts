/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResError, httpAxios } from '@infrastructure/instances/httpAxios';
import dayjs from 'dayjs';

class GlobalService {
  private static instance: GlobalService;

  private constructor() {
    //
  }

  public static getInstance(): GlobalService {
    if (!GlobalService.instance) {
      GlobalService.instance = new GlobalService();
    }
    return GlobalService.instance;
  }

  _cloneDeep = <T>(data: Record<string, any> | Record<string, any>[]): T => {
    try {
      return JSON.parse(JSON.stringify(data)) as T;
    } catch (error) {
      throw Error(`${error}`);
    }
  };

  handleErrorAPI = <T = IResError, D = any>(error: any) => {
    return httpAxios.axiosErrorHandler<T, D>(error);
  };

  // Format
  formatDate = (dates: string[], format = 'DD/MM/YYYY', type = 'unix'): string[] => {
    return dates.map((date: string | number) => {
      if (type === 'unix') {
        date = Number(date) * 1000;
      }
      return dayjs(date).format(format);
    });
  };

  formatDateToQuery = (date: string[] | Date[], type?: string): string[] => {
    const startOf = dayjs(date[0], 'DD/MM/YYYY').startOf('day');
    const endOf = dayjs(date[1], 'DD/MM/YYYY').endOf('day');

    let output = [startOf.toISOString(), endOf.toISOString()];
    if (type === 'unix') {
      output = [startOf.unix().toString(), endOf.unix().toString()];
    }

    return output;
  };

  formatBeforeQuery = (obj: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object' && value.length) {
          if (['external_created_at', 'created_at', 'birthday'].includes(key)) {
            value = this.formatDateToQuery(value, 'unix');
          }
          return [key, value.join(',')];
        }
        return [key, value];
      })
    );
  };

  formatGetQuery = ({
    data,
    field,
    fieldDate,
    removeField,
  }: {
    data: Record<string, any>;
    field?: string[];
    fieldDate?: string[];
    removeField?: string[];
  }) => {
    field &&
      field.map(f => {
        if (typeof data[f] === 'string' && data[f]) data[f] = data[f].split(',');
      });

    fieldDate &&
      fieldDate.map(f => {
        if (typeof data[f] === 'string' && data[f])
          data[f] = this.formatDate(data[f].split(','), 'DD/MM/YYYY hh:mm:ss');
      });

    if (removeField?.length) {
      data = Object.fromEntries(Object.entries(data).filter(([k]) => !removeField.includes(k)));
    }

    return data;
  };

  // Filter
  filterFalsy = (obj: Record<string, any>) => {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(obj).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0; // filter non-empty arrays
        }
        return ![null, undefined, '', false].includes(value);
      })
    );
  };

  // Generate
  generateQueryTermKeyValue = (key: string, value: string | number | boolean | undefined | null) => {
    if (!value && value !== 0) return null;
    return {
      term: {
        [key]: value,
      },
    };
  };

  generateQueryTermsKeyValue = (key: string, value: string | string[] | number[] | undefined) => {
    if (!value?.length) return null;
    if (typeof value === 'string') value = value.split(',');

    return {
      terms: {
        [key]: value,
      },
    };
  };

  generateQueryMatchKeyValue = (key: string, value: string | boolean | undefined) => {
    if (!value) return null;
    return {
      match: {
        [key]: value,
      },
    };
  };

  generateQueryRange = (key: string, date: string | string[] | undefined) => {
    if (!date) return null;

    if (typeof date === 'string') date = this.formatDate(date.split(','));
    if (date && date?.every(val => !val)) return null;

    const dateFormatter = this.formatDateToQuery(date);
    if (dateFormatter.some(val => val === 'NaN')) return null;

    return {
      range: {
        [key]: {
          gte: dateFormatter[0],
          lte: dateFormatter[1],
        },
      },
    };
  };

  generateSortQueryES = (key = 'created_at', sortBy: 'desc' | 'asc' = 'desc') => {
    return { [key]: sortBy };
  };

  getUniqueItemsInArray<T>(data: T[], condition: keyof T): T[] {
    if (!Array.isArray(data) || !data?.length) return [];

    const outputArray = Array.from(new Set(data.map(item => item[condition]))).map(id =>
      data.find(item => item[condition] === id)
    );

    return outputArray.filter(Boolean) as T[];
  }

  isDifferenceObject(obj1: any, obj2: any): boolean {
    const keysA = Object.keys(obj1);
    const keysB = Object.keys(obj2);

    if (keysA.length !== keysB.length) {
      return true;
    }
    for (const key of keysA) {
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    }
    return false;
  }
  delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  getObjQueryParams = <T>(queryString: string): T | null => {
    if (!queryString) return null;

    const queryParams = new URLSearchParams(queryString);
    const paramsObject = {} as { [key: string]: unknown };

    for (const [key, value] of queryParams.entries()) {
      paramsObject[key] = value;
    }

    return paramsObject as T;
  };
}

export default GlobalService.getInstance();
