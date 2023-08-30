import axios from 'axios';
import { $toast } from '@/logic/notification';
import type {
  ResponseType400,
  ResponseType401,
  ResponseType403,
  ResponseType404,
} from '../logic/responseHandler';
import { responseCodes } from '../logic/responseHandler';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_CONFIG = {
  baseURL: import.meta.env.VITE_POKEMON_API_URL as string,
  withCredentials: true,
  timeout: 100_000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
};

export const $axios = axios.create(API_CONFIG as any);

$axios.interceptors.request.use(
  (req) => {
    const ignore: Array<string> = ['/auth/login', '/auth/register'];
    if (req && !ignore.includes(req.url as string)) {
    const X_CSRF_TOKEN: string = cookies.get('X-CSRF-TOKEN');    
      if (X_CSRF_TOKEN) {
        // @ts-ignore
        req.headers.set('X-CSRF-TOKEN',X_CSRF_TOKEN);
      }
    }

    return req;
  },
  (error: any) => {    
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (window.location.pathname === '/') {
      return Promise.reject(error);
    }
    switch (error?.response?.status) {
      case 400:
        if (
          Object.prototype.hasOwnProperty.call(
            responseCodes[400],
            error?.response?.data?.code
          )
        ) {
          $toast({
            message: error?.response?.data?.cause,
            type: 'error',
            duration: 'long',
          });
          responseCodes[400][
            error.response.data.code as ResponseType400
          ]?.handleResponse();
        }
        break;
      case 401:
        if (
          Object.prototype.hasOwnProperty.call(
            responseCodes[401],
            error?.response?.data?.code
          )
        ) {
          $toast({
            message: error?.response?.data?.cause,
            type: 'error',
            duration: 'long',
          });
          responseCodes[401][
            error.response.data.code as ResponseType401
          ]?.handleResponse();
        }
        break;
      case 403:
        if (
          Object.prototype.hasOwnProperty.call(
            responseCodes[403],
            error?.response?.data?.code
          )
        ) {
          $toast({
            message: error?.response?.data?.cause,
            type: 'error',
            duration: 'long',
          });

          responseCodes[403][
            error.response.data.code as ResponseType403
          ]?.handleResponse();
        }
        break;
      case 404:
        if (
          Object.prototype.hasOwnProperty.call(
            responseCodes[404],
            error?.response?.data?.code
          )
        ) {
          $toast({
            message: error?.response?.data?.cause,
            type: 'error',
            duration: 'long',
          });

          responseCodes[404][
            error.response.data.code as ResponseType404
          ]?.handleResponse();
        }
        break;
    }
    return Promise.reject(error);
  }
);
