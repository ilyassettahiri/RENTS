import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    console.log('Response Data here:', res.data);

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: 'me',
    signIn: '/login',
    signUp: '/register',
  },

  post: {
    list: 'blogs',
    data: 'blogsdata',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  user: {
    list: 'users',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  product: {
    list: 'cancelleds',
    details: '/api/product/details',
    search: '/api/product/search',
  },

  blogcategory: {
    list: 'blogs/category',
  },
  blogtag: {
    list: 'blogs/tag',
  },

  author: {
    list: 'blogs/author',
  },


  policypage: {
    list: 'blogs/policypage',
  },

  generaleinfo: {
    list: 'blogs/generaleinfo',
  },

  about: {
    list: 'blogs/about',
  },



};
