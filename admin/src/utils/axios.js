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



    details: 'blogs/${id}',
    delete: 'blogs/${id}',

    editstatus: 'blogs/status/${id}',

    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  user: {
    list: 'users',
    details: 'users/${id}',
    delete: 'users/${id}',

    editstatus: 'users/status/${id}',


    latest: '/api/post/latest',
    search: '/api/post/search',
  },


  review: {
    list: 'pricings',


    details: 'pricings/${id}',
    delete: 'pricings/${id}',

    editstatus: 'pricings/status/${id}',


    latest: '/api/post/latest',
    search: '/api/post/search',
  },


  invoice: {
    list: 'upcomingfronts',


    details: 'upcomingfronts/${id}',
    delete: 'upcomingfronts/${id}',

    editstatus: 'upcomingfronts/status/${id}',

    latest: '/api/post/latest',
    search: '/api/post/search',
  },


  customer: {
    list: 'currentlyhostingfronts',


    details: 'currentlyhostingfronts/${id}',
    delete: 'currentlyhostingfronts/${id}',

    editstatus: 'currentlyhostingfronts/status/${id}',


    latest: '/api/post/latest',
    search: '/api/post/search',
  },


  order: {
    list: 'dashboardfronts',

    latest: '/api/post/latest',

    details: 'dashboardfronts/${id}',
    delete: 'dashboardfronts/${id}',

    editstatus: 'dashboardfronts/status/${id}',


    search: '/api/post/search',
  },

  product: {
    list: 'cancelleds',


    details: 'cancelleds/${id}',
    delete: 'cancelleds/${id}',

    editstatus: 'cancelleds/status/${id}',


    search: '/api/product/search',
  },

  blogcategory: {
    list: 'blogs/category',

    details: 'blogs/category/${id}',
    delete: 'blogs/category/${id}',



  },
  blogtag: {
    list: 'blogs/tag',

    details: 'blogs/tag/${id}',
    delete: 'blogs/tag/${id}',



  },

  author: {
    list: 'blogs/author',

    details: 'blogs/author/${id}',
    delete: 'blogs/author/${id}',



  },


  policypage: {
    list: 'blogs/policypage',

    details: 'blogs/policypage/${id}',
    delete: 'blogs/policypage/${id}',



  },

  generaleinfo: {
    list: 'blogs/generaleinfo',

    details: 'blogs/generaleinfo/${id}',
    delete: 'blogs/generaleinfo/${id}',


  },

  about: {
    list: 'blogs/about',

    details: 'blogs/about/${id}',
    delete: 'blogs/about/${id}',



  },



};
