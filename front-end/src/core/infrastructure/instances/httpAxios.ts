/* eslint-disable @typescript-eslint/no-explicit-any */
import { Http } from '@domain/repositories/Http';
import axios, { AxiosError, AxiosResponse } from 'axios';

import helpers from '@/core/utils/helpers';

export interface IResError {
  code?: number;
  status?: string;
  message?: string;
}

const headers = {
  'Content-Type': 'application/json',
};

export const currentAxios = axios.create({
  headers,
});

// const checkRefreshToken = async () => {};

currentAxios.interceptors.request.use(
  async config => {
    const token_user_id = helpers.localStorage().get('token_user_id');
    const token = localStorage.getItem('accessToken') || null;
    if (token) {
      config.headers.Authorization = `Basic ${token_user_id || token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

currentAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
      helpers.localStorage().remove();
    }

    return Promise.reject({
      error,
      response: error.response?.data,
    });
  }
);

export const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await currentAxios.get(path, {
      ...config,
      params,
    });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any> | string | any[], config?: any) => {
    const response = await currentAxios.post(path, params, config);
    return response.data as T;
  },
  put: async <T>(path: string, params?: Record<string, any> | string | any[], config?: any) => {
    const response = await currentAxios.put(path, params, config);
    return response.data as T;
  },
  patch: async <T>(path: string, params?: Record<string, any> | string | any[], config?: any) => {
    const response = await currentAxios.patch(path, params, config);
    return response.data as T;
  },
  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await currentAxios.delete(path, {
      ...config,
      params,
    });
    return response.data as T;
  },
  axiosErrorHandler: <T = IResError, D = any>(data: any) => {
    return data?.error?.response as AxiosResponse<T, D>;
  },
};
