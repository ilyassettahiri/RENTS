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
    details: (id) => `blogs/${id}`,
    delete: (id) => `blogs/${id}`,
    editstatus: (id) => `blogs/status/${id}`,
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  user: {
    list: 'users',
    details: (id) => `users/${id}`,
    delete: (id) => `users/${id}`,
    editstatus: (id) => `users/status/${id}`,
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  review: {
    list: 'pricings',
    details: (id) => `pricings/${id}`,
    delete: (id) => `pricings/${id}`,
    editstatus: (id) => `pricings/status/${id}`,
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  invoice: {
    list: 'upcomingfronts',
    details: (id) => `upcomingfronts/${id}`,
    delete: (id) => `upcomingfronts/${id}`,
    editstatus: (id) => `upcomingfronts/status/${id}`,
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  customer: {
    list: 'currentlyhostingfronts',
    details: (id) => `currentlyhostingfronts/${id}`,
    delete: (id) => `currentlyhostingfronts/${id}`,
    editstatus: (id) => `currentlyhostingfronts/status/${id}`,
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  order: {
    list: 'dashboardfronts',
    latest: '/api/post/latest',
    details: (id) => `dashboardfronts/${id}`,
    delete: (id) => `dashboardfronts/${id}`,
    editstatus: (id) => `dashboardfronts/status/${id}`,
    search: '/api/post/search',
  },

  product: {
    list: 'cancelleds',
    details: (id) => `cancelleds/${id}`,
    delete: (id) => `cancelleds/${id}`,
    editstatus: (id) => `cancelleds/status/${id}`,
    search: '/api/product/search',
  },

  blogcategory: {
    list: 'blogs/category',
    details: (id) => `blogs/category/${id}`,
    delete: (id) => `blogs/category/${id}`,
  },

  blogtag: {
    list: 'blogs/tag',
    details: (id) => `blogs/tag/${id}`,
    delete: (id) => `blogs/tag/${id}`,
  },

  author: {
    list: 'blogs/author',
    details: (id) => `blogs/author/${id}`,
    delete: (id) => `blogs/author/${id}`,
  },

  policypage: {
    list: 'blogs/policypage',
    details: (id) => `blogs/policypage/${id}`,
    delete: (id) => `blogs/policypage/${id}`,
  },

  generaleinfo: {
    list: 'blogs/generaleinfo',
    details: (id) => `blogs/generaleinfo/${id}`,
    delete: (id) => `blogs/generaleinfo/${id}`,
  },

  about: {
    list: 'blogs/about',
    details: (id) => `blogs/about/${id}`,
    delete: (id) => `blogs/about/${id}`,
  },
};
