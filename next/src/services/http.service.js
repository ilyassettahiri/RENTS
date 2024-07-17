/* eslint-disable import/no-named-as-default, class-methods-use-this */


import Axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  constructor() {
    // Add request interceptor to include token from cookies
    this._axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get('authToken'); // Get token from cookies
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this._axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.status || (error.response && error.response.status);

        return Promise.reject(error);
      }
    );
  }

  get = async (url) =>  this.request(this.getOptionsConfig('get', url));

  post = async (url, data) =>  this.request(this.getOptionsConfig('post', url, data));

  put = async (url, data) =>  this.request(this.getOptionsConfig('put', url, data));

  patch = async (url, data) =>  this.request(this.getOptionsConfig('patch', url, data));

  delete = async (url) =>  this.request(this.getOptionsConfig('delete', url));

  // Simplified getOptionsConfig by removing the block statement
  getOptionsConfig = (method, url, data) => ({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
  });


  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve(res.data))
        .catch((ex) => reject(ex.response?.data || ex));
    });
  }
}

const httpService = new HttpService();

export default httpService;
