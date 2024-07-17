import Axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  get = async (url) => await this.request(this.getOptionsConfig('get', url));

  post = async (url, data) => await this.request(this.getOptionsConfig('post', url, data));

  put = async (url, data) => await this.request(this.getOptionsConfig('put', url, data));

  patch = async (url, data) => await this.request(this.getOptionsConfig('patch', url, data));

  delete = async (url) => await this.request(this.getOptionsConfig('delete', url));

  getOptionsConfig = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve(res.data))
        .catch((ex) => reject(ex.response.data));
    });
  }
}

const httpService = new HttpService();

export const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = async (config) => {
    const token = Cookies.get('authToken'); // Get token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onRequestFail = (error) => Promise.reject(error);

  httpService.addRequestInterceptor(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response) => response;

  const onResponseFail = (error) => {
    const status = error.status || (error.response && error.response.status);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(error);
  };

  httpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
};

export default httpService;
