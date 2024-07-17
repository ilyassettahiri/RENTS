import HttpService from "./http.service";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads`;
    return await HttpService.post(imageUpdate, formData);
  };


  // listings requests
  getListings = async () => {
    const listingsEndpoint = "listings";
    return await HttpService.get(listingsEndpoint);
  };

  deleteListing = async (id) => {
    const endpoint = `listings/${id}`;
    return await HttpService.delete(endpoint);
  };

  createListing = async (payload) => {
    const endpoint = "listings";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getListing = async (id) => {
    const listingsEndpoint = `listings/edit-listing/${id}`;
    return await HttpService.get(listingsEndpoint);
  };

  updateListing = async (payload, id) => {
    const listingsEndpoint = `listings/edit-listing/${id}`;
    return await HttpService.patch(listingsEndpoint, payload);
  };



  getUsers = async () => {
    const usersEndpoint = "users?include=roles";
    return await HttpService.get(usersEndpoint);
  };

  deleteUser = async (id) => {
    const endpoint = `users/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUser = async (payload) => {
    const endpoint = "users";
    return await HttpService.post(endpoint, payload);
  };

  getUser = async (id) => {
    const endpoint = `users/${id}?include=roles`;
    return await HttpService.get(endpoint);
  };

  getUserWithPermissions = async (id) => {
    const endpoint = `users/${id}?include=roles,roles.permissions`;
    return await HttpService.get(endpoint);
  };

  updateUser = async (payload, id) => {
    const endpoint = `users/${id}`;
    return await HttpService.patch(endpoint, payload);
  };





  // roles requests
  getRoles = async () => {
    const rolesEndpoint = "roles";
    return await HttpService.get(rolesEndpoint);
  };

  deleteRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.delete(endpoint);
  };

  createRole = async (payload) => {
    const endpoint = "roles";
    return await HttpService.post(endpoint, payload);
  };

  updateRole = async (payload, id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  getRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.get(endpoint);
  };

  // categories requests
  getCategories = async () => {
    const categoriesEndpoint = "categories";
    return await HttpService.get(categoriesEndpoint);
  };

  deleteCategory = async (id) => {
    const endpoint = `categories/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCategory = async (payload) => {
    const endpoint = "categories";
    return await HttpService.post(endpoint, payload);
  };

  getCategory = async (id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.get(categoriesEndpoint);
  };

  updateCategory = async (payload, id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.patch(categoriesEndpoint, payload);
  };




  // Front

    // home requests
    getHome = async () => {
      const homeEndpoint = "home";
      return await HttpService.get(homeEndpoint);
    };



  // Search requests
  getSearchListings = async (filters) => {
    const searchlistingsEndpoint = "search";
    const queryString = new URLSearchParams(filters).toString();
    const url = `${searchlistingsEndpoint}?${queryString}`;
    console.log('Request URL:', url); // Log the request URL
    return await HttpService.get(url);
  };


    // Search Service
    getSearchServiceListings = async (search) => {
      const searchservicelistingsEndpoint = "service/search";
      const queryString = new URLSearchParams(search).toString();
      const url = `${searchservicelistingsEndpoint}?${queryString}`;

      return await HttpService.get(url);
    };



        // Search Business
    getSearchBusinessListings = async (search) => {
      const searchbusinesslistingsEndpoint = "business/search";
      const queryString = new URLSearchParams(search).toString();
      const url = `${searchbusinesslistingsEndpoint}?${queryString}`;

      return await HttpService.get(url);
    };




        // Service requests
    getSerice = async () => {
      const serviceEndpoint = "service";
      return await HttpService.get(serviceEndpoint);
    };


    // Business requests
    getBusiness = async () => {
      const businessEndpoint = "business";
      return await HttpService.get(businessEndpoint);
    };


    // Listing requests
    getListingsFront = async (category, url) => {
      const listingsfrontEndpoint = `listings/${category}/${url}`;
      return await HttpService.get(listingsfrontEndpoint);
    };

    // Listing Review
    createReview = async (payload,category, url) => {
      const endpoint = `listings/${category}/${url}`;
      return await HttpService.post(endpoint, payload);
    };


    // Listing Review Helpful
    createReviewHelpful = async (payload, category, url, reviewId) => {
      const endpoint = `listings/${category}/${url}/reviews/${reviewId}/like`;
      return await HttpService.post(endpoint, payload);
    };

        // Listing Review Reply
    createReviewReply = async (payload, category, url, reviewId) => {
      const endpoint = `listings/${category}/${url}/reviews/${reviewId}/reply`;
      return await HttpService.post(endpoint, payload);
    };


    // Listing Favorite
    createFavorite = async (category, url, id) => {
      const endpoint = `listings/${category}/${url}/${id}`;
      return await HttpService.post(endpoint);
    };


        // Listing Favorite
    getFavorites = async () => {
      const favoritesEndpoint = "favorites";
      return await HttpService.get(favoritesEndpoint);
    };




        // Store requests
    getStore = async (url) => {
      const storeEndpoint = `stores/${url}`;
      return await HttpService.get(storeEndpoint);
    };



            // Service Page requests
    getService = async (url) => {
      const serviceEndpoint = `services/${url}`;
      return await HttpService.get(serviceEndpoint);
    };





        // Reservation Dashboard
    getReservations = async () => {
      const reservationsEndpoint = "reservations";
      return await HttpService.get(reservationsEndpoint);
    };



    // Reservation requests
    getReservationFront = async (category, url) => {
      const reservationfrontEndpoint = `checkout/${category}/${url}`;
      return await HttpService.get(reservationfrontEndpoint);
    };

    createReservationFront = async (payload,category, url) => {
      const endpoint = `checkout/${category}/${url}`;
      return await HttpService.post(endpoint, payload);
    };



    // Thank YOu


    getThankYou = async (checkout_id) => {
      const thankyouEndpoint = `thank-you/${checkout_id}`;
      return await HttpService.get(thankyouEndpoint);
    };












  // collection requests
  getCollections = async () => {
    const collectionsEndpoint = "collections";
    return await HttpService.get(collectionsEndpoint);
  };

  deleteCollection = async (id) => {
    const endpoint = `collections/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCollection = async (payload) => {
    const endpoint = "collections";
    return await HttpService.post(endpoint, payload);
  };

  getCollection = async (id) => {
    const collectionsEndpoint = `collections/${id}`;
    return await HttpService.get(collectionsEndpoint);
  };

  updateCollection = async (payload, id) => {
    const collectionsEndpoint = `collections/${id}`;
    return await HttpService.patch(collectionsEndpoint, payload);
  };





   // discount requests
   getDiscounts = async () => {
    const discountsEndpoint = "discounts";
    return await HttpService.get(discountsEndpoint);
  };

  deleteDiscount = async (id) => {
    const endpoint = `discounts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createDiscount = async (payload) => {
    const endpoint = "discounts";
    return await HttpService.post(endpoint, payload);
  };

  getDiscount = async (id) => {
    const discountsEndpoint = `discounts/${id}`;
    return await HttpService.get(discountsEndpoint);
  };

  updateDiscount = async (payload, id) => {
    const discountsEndpoint = `discounts/${id}`;
    return await HttpService.patch(discountsEndpoint, payload);
  };






   // customer requests
   getCustomers = async () => {
    const customersEndpoint = "customers";
    return await HttpService.get(customersEndpoint);
  };

  deleteCustomer = async (id) => {
    const endpoint = `customers/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCustomer = async (payload) => {
    const endpoint = "customers";
    return await HttpService.post(endpoint, payload);
  };

  getCustomer = async (id) => {
    const customersEndpoint = `customers/${id}`;
    return await HttpService.get(customersEndpoint);
  };

  updateCustomer = async (payload, id) => {
    const customersEndpoint = `customers/${id}`;
    return await HttpService.patch(customersEndpoint, payload);
  };



  // tag requests
  getTags = async () => {
    const tagsEndpoint = "tags";
    return await HttpService.get(tagsEndpoint);
  };

  deleteTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTag = async (payload) => {
    const endpoint = "tags";
    return await HttpService.post(endpoint, payload);
  };

  getTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.get(endpoint);
  };

  updateTag = async (payload, id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // item requests
  getItems = async () => {
    const tagsEndpoint = "items";
    return await HttpService.get(tagsEndpoint);
  };

  deleteItem = async (id) => {
    const endpoint = `items/${id}`;
    return await HttpService.delete(endpoint);
  };

  getCategoryOfItem = async (id) => {
    const endpoint = `items/${id}/category`;
    return await HttpService.get(endpoint);
  };

  getTagsOfItem = async (id) => {
    const endpoint = `items/${id}/tags`;
    return await HttpService.get(endpoint);
  };

  createItem = async (payload) => {
    const endpoint = "items";
    return await HttpService.post(endpoint, payload);
  };

  itemImageUpload = async (formData, id) => {
    const imageUpdate = `uploads/items/${id}/image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getItem = async (id) => {
    const endpoint = `items/${id}?include=category,tags`;
    return await HttpService.get(endpoint);
  };

  updateItem = async (payload, id) => {
    const endpoint = `items/${id}`;
    return await HttpService.patch(endpoint, payload);
  };










  // Abouts requests
  getAbouts = async () => {
    const aboutsEndpoint = "abouts";
    return await HttpService.get(aboutsEndpoint);
  };

  deleteAbout = async (id) => {
    const endpoint = `abouts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createAbout = async (payload) => {
    const endpoint = "abouts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getAbout = async (id) => {
    const aboutsEndpoint = `abouts/edit-about/${id}`;
    return await HttpService.get(aboutsEndpoint);
  };

  updateAbout = async (payload, id) => {
    const aboutsEndpoint = `abouts/edit-about/${id}`;
    return await HttpService.patch(aboutsEndpoint, payload);
  };








  // Accountfronts requests
  getAccountfronts = async () => {
    const accountfrontsEndpoint = "accountfronts";
    return await HttpService.get(accountfrontsEndpoint);
  };

  deleteAccountfront = async (id) => {
    const endpoint = `accountfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createAccountfront = async (payload) => {
    const endpoint = "accountfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getAccountfront = async (id) => {
    const accountfrontsEndpoint = `accountfronts/edit-accountfront/${id}`;
    return await HttpService.get(accountfrontsEndpoint);
  };

  updateAccountfront = async (payload, id) => {
    const accountfrontsEndpoint = `accountfronts/edit-accountfront/${id}`;
    return await HttpService.patch(accountfrontsEndpoint, payload);
  };









  // Articles requests
  getArticles = async () => {
    const articlesEndpoint = "articles";
    return await HttpService.get(articlesEndpoint);
  };

  deleteArticle = async (id) => {
    const endpoint = `articles/${id}`;
    return await HttpService.delete(endpoint);
  };

  createArticle = async (payload) => {
    const endpoint = "articles";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };


    getArticle = async (url) => {
      const articleEndpoint = `article/${url}`;
      return await HttpService.get(articleEndpoint);
    };



  updateArticle = async (payload, id) => {
    const articlesEndpoint = `articles/edit-article/${id}`;
    return await HttpService.patch(articlesEndpoint, payload);
  };








  // Blogs requests
  getBlogs = async () => {
    const blogsEndpoint = "blogs";
    return await HttpService.get(blogsEndpoint);
  };

  deleteBlog = async (id) => {
    const endpoint = `blogs/${id}`;
    return await HttpService.delete(endpoint);
  };

  createBlog = async (payload) => {
    const endpoint = "blogs";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getBlog = async (id) => {
    const blogsEndpoint = `blogs/edit-blog/${id}`;
    return await HttpService.get(blogsEndpoint);
  };

  updateBlog = async (payload, id) => {
    const blogsEndpoint = `blogs/edit-blog/${id}`;
    return await HttpService.patch(blogsEndpoint, payload);
  };















  // Cancelleds requests
  getCancelleds = async () => {
    const cancelledsEndpoint = "cancelleds";
    return await HttpService.get(cancelledsEndpoint);
  };

  deleteCancelled = async (id) => {
    const endpoint = `cancelleds/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCancelled = async (payload) => {
    const endpoint = "cancelleds";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCancelled = async (id) => {
    const cancelledsEndpoint = `cancelleds/edit-cancelled/${id}`;
    return await HttpService.get(cancelledsEndpoint);
  };

  updateCancelled = async (payload, id) => {
    const cancelledsEndpoint = `cancelleds/edit-cancelled/${id}`;
    return await HttpService.patch(cancelledsEndpoint, payload);
  };








  // Checkouts requests
  getCheckouts = async () => {
    const checkoutsEndpoint = "checkouts";
    return await HttpService.get(checkoutsEndpoint);
  };

  deleteCheckout = async (id) => {
    const endpoint = `checkouts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCheckout = async (payload) => {
    const endpoint = "checkouts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCheckout = async (id) => {
    const checkoutsEndpoint = `checkouts/edit-checkout/${id}`;
    return await HttpService.get(checkoutsEndpoint);
  };

  updateCheckout = async (payload, id) => {
    const checkoutsEndpoint = `checkouts/edit-checkout/${id}`;
    return await HttpService.patch(checkoutsEndpoint, payload);
  };








  // Completedfronts requests
  getCompletedfronts = async () => {
    const completedfrontsEndpoint = "completedfronts";
    return await HttpService.get(completedfrontsEndpoint);
  };

  deleteCompletedfront = async (id) => {
    const endpoint = `completedfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCompletedfront = async (payload) => {
    const endpoint = "completedfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCompletedfront = async (id) => {
    const completedfrontsEndpoint = `completedfronts/edit-completedfront/${id}`;
    return await HttpService.get(completedfrontsEndpoint);
  };

  updateCompletedfront = async (payload, id) => {
    const completedfrontsEndpoint = `completedfronts/edit-completedfront/${id}`;
    return await HttpService.patch(completedfrontsEndpoint, payload);
  };









  // Contacts requests
  getContacts = async () => {
    const contactsEndpoint = "contacts";
    return await HttpService.get(contactsEndpoint);
  };

  deleteContact = async (id) => {
    const endpoint = `contacts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createContact = async (payload) => {
    const endpoint = "contacts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getContact = async (id) => {
    const contactsEndpoint = `contacts/edit-contact/${id}`;
    return await HttpService.get(contactsEndpoint);
  };

  updateContact = async (payload, id) => {
    const contactsEndpoint = `contacts/edit-contact/${id}`;
    return await HttpService.patch(contactsEndpoint, payload);
  };









  // Currentlyhostingfronts requests
  getCurrentlyhostingfronts = async () => {
    const currentlyhostingfrontsEndpoint = "currentlyhostingfronts";
    return await HttpService.get(currentlyhostingfrontsEndpoint);
  };

  deleteCurrentlyhostingfront = async (id) => {
    const endpoint = `currentlyhostingfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCurrentlyhostingfront = async (payload) => {
    const endpoint = "currentlyhostingfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCurrentlyhostingfront = async (id) => {
    const currentlyhostingfrontsEndpoint = `currentlyhostingfronts/edit-currentlyhostingfront/${id}`;
    return await HttpService.get(currentlyhostingfrontsEndpoint);
  };

  updateCurrentlyhostingfront = async (payload, id) => {
    const currentlyhostingfrontsEndpoint = `currentlyhostingfronts/edit-currentlyhostingfront/${id}`;
    return await HttpService.patch(currentlyhostingfrontsEndpoint, payload);
  };









  // dashboardfronts requests
  getDashboardfronts = async () => {
    const dashboardfrontsEndpoint = "dashboardfronts";
    return await HttpService.get(dashboardfrontsEndpoint);
  };

  deleteDashboardfront = async (id) => {
    const endpoint = `dashboardfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createDashboardfront = async (payload) => {
    const endpoint = "dashboardfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getDashboardfront = async (id) => {
    const dashboardfrontsEndpoint = `dashboardfronts/edit-dashboardfront/${id}`;
    return await HttpService.get(dashboardfrontsEndpoint);
  };

  updateDashboardfront = async (payload, id) => {
    const dashboardfrontsEndpoint = `dashboardfronts/edit-dashboardfront/${id}`;
    return await HttpService.patch(dashboardfrontsEndpoint, payload);
  };








  // Faqs requests
  getFaqs = async () => {
    const faqsEndpoint = "faqs";
    return await HttpService.get(faqsEndpoint);
  };

  deleteFaq = async (id) => {
    const endpoint = `faqs/${id}`;
    return await HttpService.delete(endpoint);
  };

  createFaq = async (payload) => {
    const endpoint = "faqs";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getFaq = async (id) => {
    const faqsEndpoint = `faqs/edit-faq/${id}`;
    return await HttpService.get(faqsEndpoint);
  };

  updateFaq = async (payload, id) => {
    const faqsEndpoint = `faqs/edit-faq/${id}`;
    return await HttpService.patch(faqsEndpoint, payload);
  };








  // Invoicefronts requests
  getInvoicefronts = async () => {
    const invoicefrontsEndpoint = "invoicefronts";
    return await HttpService.get(invoicefrontsEndpoint);
  };

  deleteInvoicefront = async (id) => {
    const endpoint = `invoicefronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createInvoicefront = async (payload) => {
    const endpoint = "invoicefronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getInvocefront = async (id) => {
    const invoicefrontsEndpoint = `invoicefronts/edit-invoicefront/${id}`;
    return await HttpService.get(invoicefrontsEndpoint);
  };

  updateInvoicefront = async (payload, id) => {
    const invoicefrontsEndpoint = `invoicefronts/edit-invoicefront/${id}`;
    return await HttpService.patch(invoicefrontsEndpoint, payload);
  };








  // Paymentfronts requests
  getPaymentfronts = async () => {
    const paymentfrontsEndpoint = "paymentfronts";
    return await HttpService.get(paymentfrontsEndpoint);
  };

  deletePaymentfront = async (id) => {
    const endpoint = `paymentfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createPaymentfront = async (payload) => {
    const endpoint = "paymentfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getPaymentfront = async (id) => {
    const paymentfrontsEndpoint = `paymentfronts/edit-paymentfront/${id}`;
    return await HttpService.get(paymentfrontsEndpoint);
  };

  updatePaymentfront = async (payload, id) => {
    const paymentfrontsEndpoint = `paymentfronts/edit-paymentfront/${id}`;
    return await HttpService.patch(paymentfrontsEndpoint, payload);
  };








  // Reviewfronts requests
  getReviewfronts = async () => {
    const reviewfrontsEndpoint = "reviewfronts";
    return await HttpService.get(reviewfrontsEndpoint);
  };

  deleteReviewfront = async (id) => {
    const endpoint = `reviewfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createReviewfront = async (payload) => {
    const endpoint = "reviewfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getReviewfront = async (id) => {
    const reviewfrontsEndpoint = `reviewfronts/edit-reviewfront/${id}`;
    return await HttpService.get(reviewfrontsEndpoint);
  };

  updateReviewfront = async (payload, id) => {
    const reviewfrontsEndpoint = `reviewfronts/edit-reviewfront/${id}`;
    return await HttpService.patch(reviewfrontsEndpoint, payload);
  };









  // Termconditions requests
  getTermconditions = async () => {
    const termconditionsEndpoint = "termconditions";
    return await HttpService.get(termconditionsEndpoint);
  };

  deleteTermcondition = async (id) => {
    const endpoint = `termconditions/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTermcondition = async (payload) => {
    const endpoint = "termconditions";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getTermcondition = async (id) => {
    const termconditionsEndpoint = `termconditions/edit-termcondition/${id}`;
    return await HttpService.get(termconditionsEndpoint);
  };

  updateTermcondition = async (payload, id) => {
    const termconditionsEndpoint = `termconditions/edit-termcondition/${id}`;
    return await HttpService.patch(termconditionsEndpoint, payload);
  };









  // Thankyous requests
  getThankyous = async () => {
    const thankyousEndpoint = "thankyous";
    return await HttpService.get(thankyousEndpoint);
  };

  deleteThankyou = async (id) => {
    const endpoint = `thankyous/${id}`;
    return await HttpService.delete(endpoint);
  };

  createThankyou = async (payload) => {
    const endpoint = "thankyous";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getThankyou = async (id) => {
    const thankyousEndpoint = `thankyous/edit-thankyou/${id}`;
    return await HttpService.get(thankyousEndpoint);
  };

  updateThankyou = async (payload, id) => {
    const thankyousEndpoint = `thankyous/edit-thankyou/${id}`;
    return await HttpService.patch(thankyousEndpoint, payload);
  };









  // Upcomingfronts requests
  getUpcomingfronts = async () => {
    const upcomingfrontsEndpoint = "upcomingfronts";
    return await HttpService.get(upcomingfrontsEndpoint);
  };

  deleteUpcomingfront = async (id) => {
    const endpoint = `upcomingfronts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUpcomingfront = async (payload) => {
    const endpoint = "upcomingfronts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getUpcomingfront = async (id) => {
    const upcomingfrontsEndpoint = `upcomingfronts/edit-upcomingfront/${id}`;
    return await HttpService.get(upcomingfrontsEndpoint);
  };

  updateUpcomingfront = async (payload, id) => {
    const upcomingfrontsEndpoint = `upcomingfronts/edit-upcomingfront/${id}`;
    return await HttpService.patch(upcomingfrontsEndpoint, payload);
  };












  // pricings requests
  getPricings = async () => {
    const pricingsEndpoint = "pricings";
    return await HttpService.get(pricingsEndpoint);
  };

  deletePricing = async (id) => {
    const endpoint = `pricings/${id}`;
    return await HttpService.delete(endpoint);
  };

  createPricing = async (payload) => {
    const endpoint = "pricings";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getPricing = async (id) => {
    const pricingsEndpoint = `pricings/edit-pricing/${id}`;
    return await HttpService.get(pricingsEndpoint);
  };

  updatePricing = async (payload, id) => {
    const pricingsEndpoint = `pricings/edit-pricing/${id}`;
    return await HttpService.patch(pricingsEndpoint, payload);
  };









}

export default new CrudService();
