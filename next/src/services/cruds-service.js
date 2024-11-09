/* eslint-disable import/no-named-as-default, class-methods-use-this */


import HttpService from "./http.service";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads`;
    return HttpService.post(imageUpdate, formData);
  };


  // listings requests
  getListings = async () => {
    const listingsEndpoint = "listings";
    return HttpService.get(listingsEndpoint);
  };

  deleteListing = async (id) => {
    const listingsendpoint = `listings/${id}`;
    return HttpService.delete(listingsendpoint);
  };

  createListing = async (payload) => {
    const listingsendpoint = "listings";
    return HttpService.post(listingsendpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getListing = async (id) => {
    const listingsEndpoint = `listings/edit-listing/${id}`;
    return HttpService.get(listingsEndpoint);
  };

  updateListing = async (payload, id) => {
    const listingsEndpoint = `listings/edit-listing/${id}`;
    return HttpService.patch(listingsEndpoint, payload);
  };



  getUsers = async () => {
    const usersEndpoint = "users?include=roles";
    return HttpService.get(usersEndpoint);
  };

  deleteUser = async (id) => {
    const endpoint = `users/${id}`;
    return HttpService.delete(endpoint);
  };

  createUser = async (payload) => {
    const endpoint = "users";
    return HttpService.post(endpoint, payload);
  };

  getUser = async (id) => {
    const endpoint = `users/${id}?include=roles`;
    return HttpService.get(endpoint);
  };

  getUserWithPermissions = async (id) => {
    const endpoint = `users/${id}?include=roles,roles.permissions`;
    return HttpService.get(endpoint);
  };

  updateUser = async (payload, id) => {
    const endpoint = `users/${id}`;
    return HttpService.patch(endpoint, payload);
  };





  // roles requests
  getRoles = async () => {
    const rolesEndpoint = "roles";
    return HttpService.get(rolesEndpoint);
  };

  deleteRole = async (id) => {
    const endpoint = `roles/${id}`;
    return HttpService.delete(endpoint);
  };

  createRole = async (payload) => {
    const endpoint = "roles";
    return HttpService.post(endpoint, payload);
  };

  updateRole = async (payload, id) => {
    const endpoint = `roles/${id}`;
    return HttpService.patch(endpoint, payload);
  };

  getRole = async (id) => {
    const endpoint = `roles/${id}`;
    return HttpService.get(endpoint);
  };

  // categories requests
  getCategories = async () => {
    const categoriesEndpoint = "categories";
    return HttpService.get(categoriesEndpoint);
  };

  deleteCategory = async (id) => {
    const endpoint = `categories/${id}`;
    return HttpService.delete(endpoint);
  };

  createCategory = async (payload) => {
    const endpoint = "categories";
    return HttpService.post(endpoint, payload);
  };

  getCategory = async (id) => {
    const categoriesEndpoint = `categories/${id}`;
    return HttpService.get(categoriesEndpoint);
  };

  updateCategory = async (payload, id) => {
    const categoriesEndpoint = `categories/${id}`;
    return HttpService.patch(categoriesEndpoint, payload);
  };




  // Front

    // home requests
    getHome = async () => {
      const homeEndpoint = "home";
      return HttpService.get(homeEndpoint);
    };



  // Search requests
  getSearchListings = async (filters) => {
    const searchlistingsEndpoint = "search";
    const queryString = new URLSearchParams(filters).toString();
    const url = `${searchlistingsEndpoint}?${queryString}`;
    console.log('Request URL:', url); // Log the request URL
    return HttpService.get(url);
  };


  getSearchCity = async (city, searchKeyword = '') => {
    const searchcityEndpoint = `search/${city}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchcityEndpoint}${queryParams}`;


    return HttpService.get(url);
  };



  getSearchCategory = async (city, category, searchKeyword = '') => {
    const searchcityEndpoint = `search/${city}/${category}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchcityEndpoint}${queryParams}`;

    return HttpService.get(url);
  };

  getSearchType = async (city, category, type, searchKeyword = '') => {
    const searchcityEndpoint = `search/${city}/${category}/${type}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchcityEndpoint}${queryParams}`;

    return HttpService.get(url);
  };




  getSearchJobCity = async (city, searchKeyword = '') => {
    const searchjobcityEndpoint = `searchjob/${city}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchjobcityEndpoint}${queryParams}`;

    return HttpService.get(url);
  };

  getSearchJobType = async (city, type, searchKeyword = '') => {
    const searchjobcityEndpoint = `searchjob/${city}/${type}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchjobcityEndpoint}${queryParams}`;

    return HttpService.get(url);
  };

  getSearchServiceCity = async (city, searchKeyword = '') => {
    const searchcityserviceEndpoint = `searchservice/${city}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchcityserviceEndpoint}${queryParams}`;

    return HttpService.get(url);
  };

  getSearchServiceType = async (city, type, searchKeyword = '') => {
    const searchcityserviceEndpoint = `searchservice/${city}/${type}`;
    const queryParams = searchKeyword ? `?searchKeyword=${encodeURIComponent(searchKeyword)}` : '';
    const url = `${searchcityserviceEndpoint}${queryParams}`;

    return HttpService.get(url);
  };



    // Search Service
    getSearchServiceListings = async (search) => {
      const searchservicelistingsEndpoint = "service/search";
      const queryString = new URLSearchParams(search).toString();
      const url = `${searchservicelistingsEndpoint}?${queryString}`;

      return HttpService.get(url);
    };



        // Search Business
    getSearchBusinessListings = async (search) => {
      const searchbusinesslistingsEndpoint = "business/search";
      const queryString = new URLSearchParams(search).toString();
      const url = `${searchbusinesslistingsEndpoint}?${queryString}`;

      return HttpService.get(url);
    };




        // Service requests
    getSerice = async () => {
      const serviceEndpoint = "service";
      return HttpService.get(serviceEndpoint);
    };



        // Service requests
        getJobs = async () => {
          const serviceEndpoint = "job";
          return HttpService.get(serviceEndpoint);
        };



    // Business requests
    getBusiness = async () => {
      const businessEndpoint = "business";
      return HttpService.get(businessEndpoint);
    };


    // Listing requests
    getListingsFront = async (category, url) => {
      const listingsfrontEndpoint = `listings/${category}/${url}`;
      return HttpService.get(listingsfrontEndpoint);
    };

    getListingpic = async (category, url) => {
      const listingsfrontEndpoint = `listingpic/${category}/${url}`;
      return HttpService.get(listingsfrontEndpoint);
    };

    // Listing Review
    createReview = async (payload,category, url) => {
      const endpoint = `listings/${category}/${url}`;
      return HttpService.post(endpoint, payload);
    };


    // Listing Review Helpful
    createReviewHelpful = async (payload, category, url, reviewId) => {
      const endpoint = `listings/${category}/${url}/reviews/${reviewId}/like`;
      return HttpService.post(endpoint, payload);
    };

        // Listing Review Reply
    createReviewReply = async (payload, category, url, reviewId) => {
      const endpoint = `listings/${category}/${url}/reviews/${reviewId}/reply`;
      return HttpService.post(endpoint, payload);
    };


    // Listing Favorite
    createFavorite = async (category, url, id) => {
      const endpoint = `listings/${category}/${url}/${id}`;
      return HttpService.post(endpoint);
    };



    // Listing Favorite
    createFavoriteStore = async ( url, id) => {
      const endpoint = `stores/${url}/${id}`;
      return HttpService.post(endpoint);
    };


        // Listing Favorite
    getFavorites = async () => {
      const favoritesEndpoint = "favorites";
      return HttpService.get(favoritesEndpoint);
    };




    // Chat


    getConversations = async () => {
      const chatEndpoint = "chat/conversations";
      return HttpService.get(chatEndpoint);
    };






    checkConversation = async (userID) => {
      const chatEndpoint = `chat/check?userID=${userID}`;
      return HttpService.get(chatEndpoint);
    };

    getConversation = async (id) => {
      const chatEndpoint = `chat/conversation?id=${id}`;
      return HttpService.get(chatEndpoint);
    };


    clickConversation = async (id) => {
      const chatEndpoint = `chat/clickconversation?id=${id}`;
      return HttpService.get(chatEndpoint);
    };


    createConversation = async (payload, userID) => {
      const chatendpoint = `chat/createconversation?userID=${userID}`;
      return HttpService.post(chatendpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    };


    sendMessage = async (payload, id) => {
      const chatendpoint = `chat/sendmessage?id=${id}`;
      return HttpService.post(chatendpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    };


    deleteConversation = async (id) => {
      const chatendpoint = `chat/${id}`;
      return HttpService.delete(chatendpoint);
    };






            // Store Favorite
    getFavoritestore = async () => {
      const favoritesEndpoint = "favoritestores";
      return HttpService.get(favoritesEndpoint);
    };




        // Store requests
    getStore = async (url) => {
      const storeEndpoint = `stores/${url}`;
      return HttpService.get(storeEndpoint);
    };



            // Service Page requests
    getService = async (url) => {
      const serviceEndpoint = `services/${url}`;
      return HttpService.get(serviceEndpoint);
    };


    getServicepic = async (url) => {
      const serviceEndpoint = `servicepic/${url}`;
      return HttpService.get(serviceEndpoint);
    };



              // Service Page requests
              getJob = async (url) => {
                const serviceEndpoint = `jobs/${url}`;
                return HttpService.get(serviceEndpoint);
              };


              getJobpic = async (url) => {
                const serviceEndpoint = `jobpic/${url}`;
                return HttpService.get(serviceEndpoint);
              };




        // Reservation Dashboard
    getReservations = async () => {
      const reservationsEndpoint = "reservations";
      return HttpService.get(reservationsEndpoint);
    };


    getReservation = async (id) => {
      const reservationsEndpoint = `reservations/${id}`;
      return  HttpService.get(reservationsEndpoint);
    };





    checkDiscountFront = async (formData) => {
      const discountFrontEndpoint = "checkout/discount";
      return HttpService.post(discountFrontEndpoint, formData);  // Use POST here
    };

    // Reservation requests
    getReservationFront = async (category, url) => {
      const reservationfrontEndpoint = `checkout/${category}/${url}`;
      return HttpService.get(reservationfrontEndpoint);
    };

    createReservationFront = async (payload,category, url) => {
      const endpoint = `checkout/${category}/${url}`;
      return HttpService.post(endpoint, payload);
    };



    // Thank YOu


    getThankYou = async (checkout_id) => {
      const thankyouEndpoint = `thank-you/${checkout_id}`;
      return HttpService.get(thankyouEndpoint);
    };












  // collection requests
  getCollections = async () => {
    const collectionsEndpoint = "collections";
    return HttpService.get(collectionsEndpoint);
  };



  getCollection = async (id) => {
    const collectionsEndpoint = `collections/${id}`;
    return HttpService.get(collectionsEndpoint);
  };




   // discount requests
   getDiscounts = async () => {
    const discountsEndpoint = "discounts";
    return HttpService.get(discountsEndpoint);
  };


  getDiscount = async (id) => {
    const discountsEndpoint = `discounts/${id}`;
    return HttpService.get(discountsEndpoint);
  };















  // Abouts requests
  getAbouts = async () => {
    const aboutsEndpoint = "abouts";
    return HttpService.get(aboutsEndpoint);
  };


  getAbout = async (id) => {
    const aboutsEndpoint = `abouts/edit-about/${id}`;
    return HttpService.get(aboutsEndpoint);
  };








  // Accountfronts requests
  getAccountfronts = async () => {
    const accountfrontsEndpoint = "accountfronts";
    return HttpService.get(accountfrontsEndpoint);
  };

  deleteAccountfront = async (id) => {
    const endpoint = `accountfronts/${id}`;
    return HttpService.delete(endpoint);
  };

  createAccountfront = async (payload) => {
    const endpoint = "accountfronts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getAccountfront = async (id) => {
    const accountfrontsEndpoint = `accountfronts/edit-accountfront/${id}`;
    return HttpService.get(accountfrontsEndpoint);
  };

  updateAccountfront = async (payload, id) => {
    const accountfrontsEndpoint = `accountfronts/edit-accountfront/${id}`;
    return HttpService.patch(accountfrontsEndpoint, payload);
  };









  // Articles requests
  getArticles = async () => {
    const articlesEndpoint = "articles";
    return HttpService.get(articlesEndpoint);
  };




    getArticle = async (url) => {
      const articleEndpoint = `article/${url}`;
      return HttpService.get(articleEndpoint);
    };








  // Blogs requests
  getBlogs = async () => {
    const blogsEndpoint = "blogs";
    return HttpService.get(blogsEndpoint);
  };



  getBlog = async (id) => {
    const blogsEndpoint = `blogs/edit-blog/${id}`;
    return HttpService.get(blogsEndpoint);
  };















  // Cancelleds requests
  getCancelleds = async () => {
    const cancelledsEndpoint = "cancelleds";
    return HttpService.get(cancelledsEndpoint);
  };



  getCancelled = async (id) => {
    const cancelledsEndpoint = `cancelleds/edit-cancelled/${id}`;
    return HttpService.get(cancelledsEndpoint);
  };








  // Checkouts requests
  getCheckouts = async () => {
    const checkoutsEndpoint = "checkouts";
    return HttpService.get(checkoutsEndpoint);
  };

  deleteCheckout = async (id) => {
    const endpoint = `checkouts/${id}`;
    return HttpService.delete(endpoint);
  };

  createCheckout = async (payload) => {
    const endpoint = "checkouts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCheckout = async (id) => {
    const checkoutsEndpoint = `checkouts/edit-checkout/${id}`;
    return HttpService.get(checkoutsEndpoint);
  };

  updateCheckout = async (payload, id) => {
    const checkoutsEndpoint = `checkouts/edit-checkout/${id}`;
    return HttpService.patch(checkoutsEndpoint, payload);
  };








  // Completedfronts requests
  getCompletedfronts = async () => {
    const completedfrontsEndpoint = "completedfronts";
    return HttpService.get(completedfrontsEndpoint);
  };



  getCompletedfront = async (id) => {
    const completedfrontsEndpoint = `completedfronts/edit-completedfront/${id}`;
    return HttpService.get(completedfrontsEndpoint);
  };









  // Contacts requests
  getContacts = async () => {
    const contactsEndpoint = "contacts";
    return HttpService.get(contactsEndpoint);
  };

  deleteContact = async (id) => {
    const endpoint = `contacts/${id}`;
    return HttpService.delete(endpoint);
  };

  createContact = async (payload) => {
    const endpoint = "contacts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getContact = async (id) => {
    const contactsEndpoint = `contacts/edit-contact/${id}`;
    return HttpService.get(contactsEndpoint);
  };







  // Currentlyhostingfronts requests
  getCurrentlyhostingfronts = async () => {
    const currentlyhostingfrontsEndpoint = "currentlyhostingfronts";
    return HttpService.get(currentlyhostingfrontsEndpoint);
  };



  getCurrentlyhostingfront = async (id) => {
    const currentlyhostingfrontsEndpoint = `currentlyhostingfronts/edit-currentlyhostingfront/${id}`;
    return HttpService.get(currentlyhostingfrontsEndpoint);
  };








  // dashboardfronts requests
  getDashboardfronts = async () => {
    const dashboardfrontsEndpoint = "dashboardfronts";
    return HttpService.get(dashboardfrontsEndpoint);
  };

  deleteDashboardfront = async (id) => {
    const endpoint = `dashboardfronts/${id}`;
    return HttpService.delete(endpoint);
  };

  createDashboardfront = async (payload) => {
    const endpoint = "dashboardfronts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getDashboardfront = async (id) => {
    const dashboardfrontsEndpoint = `dashboardfronts/edit-dashboardfront/${id}`;
    return HttpService.get(dashboardfrontsEndpoint);
  };

  updateDashboardfront = async (payload, id) => {
    const dashboardfrontsEndpoint = `dashboardfronts/edit-dashboardfront/${id}`;
    return HttpService.patch(dashboardfrontsEndpoint, payload);
  };








  // Faqs requests
  getFaqs = async () => {
    const faqsEndpoint = "faqs";
    return HttpService.get(faqsEndpoint);
  };



  getFaq = async (id) => {
    const faqsEndpoint = `faqs/edit-faq/${id}`;
    return HttpService.get(faqsEndpoint);
  };








  // Invoicefronts requests
  getInvoicefronts = async () => {
    const invoicefrontsEndpoint = "invoicefronts";
    return HttpService.get(invoicefrontsEndpoint);
  };

  deleteInvoicefront = async (id) => {
    const endpoint = `invoicefronts/${id}`;
    return HttpService.delete(endpoint);
  };

  createInvoicefront = async (payload) => {
    const endpoint = "invoicefronts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getInvocefront = async (id) => {
    const invoicefrontsEndpoint = `invoicefronts/edit-invoicefront/${id}`;
    return HttpService.get(invoicefrontsEndpoint);
  };

  updateInvoicefront = async (payload, id) => {
    const invoicefrontsEndpoint = `invoicefronts/edit-invoicefront/${id}`;
    return HttpService.patch(invoicefrontsEndpoint, payload);
  };








  // Paymentfronts requests
  getPaymentfronts = async () => {
    const paymentfrontsEndpoint = "paymentfronts";
    return HttpService.get(paymentfrontsEndpoint);
  };

  deletePaymentfront = async (id) => {
    const endpoint = `paymentfronts/${id}`;
    return HttpService.delete(endpoint);
  };

  createPaymentfront = async (payload) => {
    const endpoint = "paymentfronts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getPaymentfront = async (id) => {
    const paymentfrontsEndpoint = `paymentfronts/edit-paymentfront/${id}`;
    return HttpService.get(paymentfrontsEndpoint);
  };

  updatePaymentfront = async (payload, id) => {
    const paymentfrontsEndpoint = `paymentfronts/edit-paymentfront/${id}`;
    return HttpService.patch(paymentfrontsEndpoint, payload);
  };








  // Reviewfronts requests
  getReviewfronts = async () => {
    const reviewfrontsEndpoint = "reviewfronts";
    return HttpService.get(reviewfrontsEndpoint);
  };

  deleteReviewfront = async (id) => {
    const endpoint = `reviewfronts/${id}`;
    return HttpService.delete(endpoint);
  };

  createReviewfront = async (payload) => {
    const endpoint = "reviewfronts";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getReviewfront = async (id) => {
    const reviewfrontsEndpoint = `reviewfronts/edit-reviewfront/${id}`;
    return HttpService.get(reviewfrontsEndpoint);
  };

  updateReviewfront = async (payload, id) => {
    const reviewfrontsEndpoint = `reviewfronts/edit-reviewfront/${id}`;
    return HttpService.patch(reviewfrontsEndpoint, payload);
  };












  getTermcondition = async (id) => {
    const termconditionsEndpoint = `termconditions/edit-termcondition/${id}`;
    return HttpService.get(termconditionsEndpoint);
  };









  // Thankyous requests
  getThankyous = async () => {
    const thankyousEndpoint = "thankyous";
    return HttpService.get(thankyousEndpoint);
  };

  deleteThankyou = async (id) => {
    const endpoint = `thankyous/${id}`;
    return HttpService.delete(endpoint);
  };

  createThankyou = async (payload) => {
    const endpoint = "thankyous";
    return HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getThankyou = async (id) => {
    const thankyousEndpoint = `thankyous/edit-thankyou/${id}`;
    return HttpService.get(thankyousEndpoint);
  };

  updateThankyou = async (payload, id) => {
    const thankyousEndpoint = `thankyous/edit-thankyou/${id}`;
    return HttpService.patch(thankyousEndpoint, payload);
  };









  // Upcomingfronts requests
  getUpcomingfronts = async () => {
    const upcomingfrontsEndpoint = "upcomingfronts";
    return HttpService.get(upcomingfrontsEndpoint);
  };



  getUpcomingfront = async (id) => {
    const upcomingfrontsEndpoint = `upcomingfronts/edit-upcomingfront/${id}`;
    return HttpService.get(upcomingfrontsEndpoint);
  };


















}

export default new CrudService();
