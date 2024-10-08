// ----------------------------------------------------------------------

export const paths = {
  // Marketing
  marketing: {
    root: '/marketing',

    posts: '/marketing/posts',
    post: `/marketing/post`,

  },




   // Auth

   login: '/auth/login',


   register: '/auth/register',

   forgotPassword: '/auth/forgot-password',
   verify: '/auth/verify',




  // Travel
  travel: {
    root: '/info-page',

    tour: `/listing-page`, // Base path for the dynamic route

    checkout: '/checkout',
    orderCompleted: '/thank-you',
    posts: '/blog',
    post: `/article`,
    about: '/about',

    privacy: '/privacy',

    termcondition: '/termcondition',


    contact: '/contact',
  },
  // Career
  career: {
    root: '/services',
    jobs: '/services-list',
    job: `/service-page`,

  },


  job: {
    root: '/jobs',
    jobbs: '/jobs-list',
    jobb: `/job-page`,

  },

  // E-learning
  eLearning: {
    root: '/business',
    courses: '/business-list',
    course: `/business-page`,

  },
  // dashboard
  eCommerce: {
    root: '/dashboard',
    stores: '/stores',
    products: '/e-commerce/products',

    product: `/dashboard/product`,
    cart: '/dashboard/cart',
    personal: `/dashboard/personal`,
    wishlist: `/dashboard/wishlist`,
    vouchers: `/dashboard/chat`,
    chat: `/dashboard/chat`,
    orders: `/dashboard/orders`,
    payment: `/dashboard/payment`,

    reservation: `/dashboard/reservation-detail`,

  },

  // Common
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',

  support: '/faqs',
  page404: '/error/404',
  page500: '/error/500',


  pages: '/pages',


  createlisting: 'https://accounts.rents.ma',
};
