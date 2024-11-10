export const paths = (lang = 'en') => ({
  // Marketing
  home: `/${lang}`,

  // Auth
  login: `/${lang}/auth/login`,
  register: `/${lang}/auth/register`,
  forgotPassword: `/${lang}/auth/forgot-password`,
  verify: `/${lang}/auth/verify`,

  // Travel
  travel: {
    root: `/${lang}/info-page`,
    tour: `/${lang}/`, // Base path for the dynamic route
    checkout: `/${lang}/checkout`,
    orderCompleted: `/${lang}/thank-you`,
    posts: `/${lang}/blog`,
    post: `/${lang}/post`,
    about: `/${lang}/about`,
    privacy: `/${lang}/privacy-policy`,
    termcondition: `/${lang}/terms-of-service`,
    contact: `/${lang}/contact-us`,
  },

  // Career
  career: {
    root: `/${lang}/services`,
    jobs: `/${lang}/services`,
    job: `/${lang}/service`,
  },

  job: {
    root: `/${lang}/jobs`,
    jobbs: `/${lang}/jobs`,
    jobb: `/${lang}/job`,
  },

  // E-learning
  eLearning: {
    root: `/${lang}/business`,
    courses: `/${lang}/stores`,
  },

  // Dashboard
  eCommerce: {
    root: `/${lang}/dashboard`,
    stores: `/${lang}/store`,
    personal: `/${lang}/dashboard/personal`,
    wishlist: `/${lang}/dashboard/wishlist`,
    vouchers: `/${lang}/dashboard/vouchers`,
    chat: `/${lang}/dashboard/chat`,
    orders: `/${lang}/dashboard/orders`,
    payment: `/${lang}/dashboard/payment`,
    reservation: `/${lang}/dashboard/reservation-detail`,
  },

  // Common
  maintenance: `/${lang}/maintenance`,
  comingsoon: `/${lang}/coming-soon`,
  support: `/${lang}/faqs`,
  page404: `/${lang}/error/404`,
  page500: `/${lang}/error/500`,
  pages: `/${lang}/pages`,
});
