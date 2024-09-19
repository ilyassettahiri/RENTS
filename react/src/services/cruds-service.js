import HttpService from "./http.service";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads`;
    return await HttpService.post(imageUpdate, formData);
  };

  imageUploadCollection = async (formData, id) => {
    formData.append('collection_id', id); // Add collection_id to FormData
    const imageUpdateCollection = `uploads/collections`;
    return await HttpService.post(imageUpdateCollection, formData);
  };
  

  imageUploadListing = async (formData) => {
    //formData.append('listing_id', listingid); // Add collection_id to FormData
    const imageUploadListing = `uploads/listings`;
    return await HttpService.post(imageUploadListing, formData);
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


  getDetailListing = async (id) => {
    const listingsEndpoint = `listings/detail-listing/${id}`;
    return await HttpService.get(listingsEndpoint);
  };


  updateListing = async (payload, id) => {
    const listingsEndpoint = `listings/${id}`;
    return await HttpService.patch(listingsEndpoint, payload);
  };







  // Onlinestore requests
  getOnlinestores = async () => {
    const onlinestoresEndpoint = "onlinestores";
    return await HttpService.get(onlinestoresEndpoint);
  };

  deleteOnlinestore = async (id) => {
    const endpoint = `onlinestores/${id}`;
    return await HttpService.delete(endpoint);
  };

  createOnlinestore = async (payload) => {
    const endpoint = "onlinestores";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getOnlinestore = async (id) => {
    const onlinestoresEndpoint = `onlinestores/edit-onlinestore/${id}`;
    return await HttpService.get(onlinestoresEndpoint);
  };


  getDetailOnlinestore = async () => {
    const onlinestoresEndpoint = `onlinestores`;
    return await HttpService.get(onlinestoresEndpoint);
  };


  updateOnlinestore = async (payload) => {
    const uponlinestoresEndpoint = `onlinestores`;
    return await HttpService.patch(uponlinestoresEndpoint, payload);
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





    // Reservation requests
    getReservations = async () => {
      const reservationsEndpoint = "reservations";
      return await HttpService.get(reservationsEndpoint);
    };


    deleteReservation = async (id) => {
      const endpoint = `reservations/${id}`;
      return await HttpService.delete(endpoint);
    };
  
    createReservation = async (payload) => {
      const endpoint = "reservations";
      return await HttpService.post(endpoint, payload);
    };
  
    getReservation = async (id) => {
      const reservationsEndpoint = `reservations/${id}`;
      return await HttpService.get(reservationsEndpoint);
    };
  
    updateReservation = async (payload, id) => {
      const reservationsEndpoint = `reservations/${id}`;
      return await HttpService.patch(reservationsEndpoint, payload);
    };


    updateReservationStatus = async (payload, id) => {
      const reservationsEndpoint = `reservations/${id}/status`;
      return await HttpService.patch(reservationsEndpoint, payload);
    };






  
       // Reservation requests
    getUpcomings = async () => {
      const upcomingsEndpoint = "upcomings";
      return await HttpService.get(upcomingsEndpoint);
    };


    getCheckingOuts = async () => {
      const checkingoutsEndpoint = "checkingouts";
      return await HttpService.get(checkingoutsEndpoint);
    };


    getCurrentlyHostings = async () => {
      const currentlyhostingsEndpoint = "currentlyhostings";
      return await HttpService.get(currentlyhostingsEndpoint);
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

  getCollection = async (id) => {
    const collectionsEndpoint = `collections/${id}`;
    return await HttpService.get(collectionsEndpoint);
  };





   // discount requests
   getDiscounts = async () => {
    const discountsEndpoint = "discounts";
    return await HttpService.get(discountsEndpoint);
  };


  getDiscountData = async () => {
    const discountdataEndpoint = "discount/discount-data";
    return await HttpService.get(discountdataEndpoint);
  };


  getDiscount = async (id) => {
    const discountsEndpoint = `discounts/${id}`;
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






   // reviews requests
   getReviews = async () => {
    const reviewsEndpoint = "reviews";
    return await HttpService.get(reviewsEndpoint);
  };



  deleteReview = async (id) => {
    const endpoint = `reviews/${id}`;
    return await HttpService.delete(endpoint);
  };

  createReview = async (payload) => {
    const endpoint = "reviews";
    return await HttpService.post(endpoint, payload);
  };

  getReview = async (id) => {
    const reviewsEndpoint = `reviews/${id}`;
    return await HttpService.get(reviewsEndpoint);
  };

  updateReview = async (payload, id) => {
    const reviewsEndpoint = `reviews/${id}`;
    return await HttpService.patch(reviewsEndpoint, payload);
  };





   // customer requests
   getCustomers = async () => {
    const customersEndpoint = "customers";
    return await HttpService.get(customersEndpoint);
  };

  getCustomer = async (id) => {
    const customersEndpoint = `customers/${id}`;
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








  // Accounts requests
  getAccounts = async () => {
    const accountsEndpoint = "accounts";
    return await HttpService.get(accountsEndpoint);
  };

  deleteAccount = async (id) => {
    const endpoint = `accounts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createAccount = async (payload) => {
    const endpoint = "accounts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getAccount = async (id) => {
    const accountsEndpoint = `accounts/edit-account/${id}`;
    return await HttpService.get(accountsEndpoint);
  };


  getDetailAccount = async (id) => {
    const accountsEndpoint = `accounts/detail-account/${id}`;
    return await HttpService.get(accountsEndpoint);
  };


  updateAccount = async (payload, id) => {
    const accountsEndpoint = `accounts/edit-account/${id}`;
    return await HttpService.patch(accountsEndpoint, payload);
  };








  // listings requests
  getAnalytics = async () => {
    const analyticsEndpoint = "analytics";
    return await HttpService.get(analyticsEndpoint);
  };



  createAnalytics = async (payload) => {
    const endpoint = "analytics";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };



  getDetailAnalytics = async (id) => {
    const analyticsEndpoint = `analytics/detail-analytics/${id}`;
    return await HttpService.get(analyticsEndpoint);
  };


  updateAnalytics = async (payload, id) => {
    const analyticsEndpoint = `analytics/edit-analytics/${id}`;
    return await HttpService.patch(analyticsEndpoint, payload);
  };






  


  // Boosteds requests
  getBoosteds = async () => {
    const boostedsEndpoint = "boosteds";
    return await HttpService.get(boostedsEndpoint);
  };

  deleteBoosted = async (id) => {
    const endpoint = `boosteds/${id}`;
    return await HttpService.delete(endpoint);
  };

  createBoosted = async (payload) => {
    const endpoint = "boosteds";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getBoosted = async (id) => {
    const boostedsEndpoint = `boosteds/edit-boosted/${id}`;
    return await HttpService.get(boostedsEndpoint);
  };


  getDetailBoosted = async (id) => {
    const boostedsEndpoint = `boosteds/detail-boosted/${id}`;
    return await HttpService.get(boostedsEndpoint);
  };


  updateBoosted = async (payload, id) => {
    const boostedsEndpoint = `boosteds/edit-boosted/${id}`;
    return await HttpService.patch(boostedsEndpoint, payload);
  };







  // Checkingouts requests
  getCheckingouts = async () => {
    const checkingoutsEndpoint = "checkingouts";
    return await HttpService.get(checkingoutsEndpoint);
  };

  deleteCheckingout = async (id) => {
    const endpoint = `checkingouts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCheckingout = async (payload) => {
    const endpoint = "checkingouts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCheckingout = async (id) => {
    const checkingoutsEndpoint = `checkingouts/edit-checkingout/${id}`;
    return await HttpService.get(checkingoutsEndpoint);
  };


  getDetailCheckingout = async (id) => {
    const checkingoutsEndpoint = `checkingouts/detail-checkingout/${id}`;
    return await HttpService.get(checkingoutsEndpoint);
  };


  updateCheckingout = async (payload, id) => {
    const checkingoutsEndpoint = `checkingouts/edit-checkingout/${id}`;
    return await HttpService.patch(checkingoutsEndpoint, payload);
  };







  // Completeds requests
  getCompleteds = async () => {
    const completedsEndpoint = "completeds";
    return await HttpService.get(completedsEndpoint);
  };

  deleteCompleted = async (id) => {
    const endpoint = `completeds/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCompleted = async (payload) => {
    const endpoint = "completeds";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCompleted = async (id) => {
    const completedsEndpoint = `completeds/edit-completed/${id}`;
    return await HttpService.get(completedsEndpoint);
  };


  getDetailCompleted = async (id) => {
    const completedsEndpoint = `completeds/detail-completed/${id}`;
    return await HttpService.get(completedsEndpoint);
  };


  updateCompleted = async (payload, id) => {
    const completedsEndpoint = `completeds/edit-completed/${id}`;
    return await HttpService.patch(completedsEndpoint, payload);
  };








  // Currentlyhostings requests
  getCurrentlyhostings = async () => {
    const currentlyhostingsEndpoint = "currentlyhostings";
    return await HttpService.get(currentlyhostingsEndpoint);
  };

  deleteCurrentlyhosting = async (id) => {
    const endpoint = `currentlyhostings/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCurrentlyhosting = async (payload) => {
    const endpoint = "currentlyhostings";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getCurrentlyhosting = async (id) => {
    const currentlyhostingsEndpoint = `currentlyhostings/edit-currentlyhosting/${id}`;
    return await HttpService.get(currentlyhostingsEndpoint);
  };


  getDetailCurrentlyhosting = async (id) => {
    const currentlyhostingsEndpoint = `currentlyhostings/detail-currentlyhosting/${id}`;
    return await HttpService.get(currentlyhostingsEndpoint);
  };


  updateCurrentlyhosting = async (payload, id) => {
    const currentlyhostingsEndpoint = `currentlyhostings/edit-currentlyhosting/${id}`;
    return await HttpService.patch(currentlyhostingsEndpoint, payload);
  };








  // Dashboard requests
  getDashboard = async () => {
    const dashboardEndpoint = "dashboards";
    return await HttpService.get(dashboardEndpoint);
  };



  createDashboard = async (payload) => {
    const endpoint = "dashboard";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };


  getDetailDashboard = async (id) => {
    const dashboardEndpoint = `dashboard/detail-dashboard/${id}`;
    return await HttpService.get(dashboardEndpoint);
  };


  updateDashboard = async (payload, id) => {
    const dashboardEndpoint = `dashboard/edit-dashboard/${id}`;
    return await HttpService.patch(dashboardEndpoint, payload);
  };









  // Drafts requests
  getDrafts = async () => {
    const draftsEndpoint = "drafts";
    return await HttpService.get(draftsEndpoint);
  };

  deleteDraft = async (id) => {
    const endpoint = `drafts/${id}`;
    return await HttpService.delete(endpoint);
  };

  createDraft = async (payload) => {
    const endpoint = "drafts";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getDraft = async (id) => {
    const draftsEndpoint = `drafts/edit-draft/${id}`;
    return await HttpService.get(draftsEndpoint);
  };


  getDetailDraft = async (id) => {
    const draftsEndpoint = `drafts/detail-draft/${id}`;
    return await HttpService.get(draftsEndpoint);
  };


  updateDraft = async (payload, id) => {
    const draftsEndpoint = `drafts/edit-draft/${id}`;
    return await HttpService.patch(draftsEndpoint, payload);
  };








  // Finances requests
  getFinances = async () => {
    const financesEndpoint = "finances";
    return await HttpService.get(financesEndpoint);
  };

  deleteFinance = async (id) => {
    const endpoint = `finances/${id}`;
    return await HttpService.delete(endpoint);
  };

  createFinance = async (payload) => {
    const endpoint = "finances";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getFinance = async (id) => {
    const financesEndpoint = `finances/edit-finance/${id}`;
    return await HttpService.get(financesEndpoint);
  };


  getDetailFinance = async (id) => {
    const financesEndpoint = `finances/detail-finance/${id}`;
    return await HttpService.get(financesEndpoint);
  };


  updateFinance = async (payload, id) => {
    const financesEndpoint = `finances/edit-finance/${id}`;
    return await HttpService.patch(financesEndpoint, payload);
  };







  // Helps requests
  getHelps = async () => {
    const helpsEndpoint = "helps";
    return await HttpService.get(helpsEndpoint);
  };

  deleteHelp = async (id) => {
    const endpoint = `helps/${id}`;
    return await HttpService.delete(endpoint);
  };

  createHelp = async (payload) => {
    const endpoint = "helps";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getHelp = async (id) => {
    const helpsEndpoint = `helps/edit-help/${id}`;
    return await HttpService.get(helpsEndpoint);
  };


  getDetailHelp = async (id) => {
    const helpsEndpoint = `helps/detail-help/${id}`;
    return await HttpService.get(helpsEndpoint);
  };


  updateHelp = async (payload, id) => {
    const helpsEndpoint = `helps/edit-help/${id}`;
    return await HttpService.patch(helpsEndpoint, payload);
  };







  // Invoices requests
  getInvoices = async () => {
    const invoicesEndpoint = "invoices";
    return await HttpService.get(invoicesEndpoint);
  };

  deleteInvoice = async (id) => {
    const endpoint = `invoices/${id}`;
    return await HttpService.delete(endpoint);
  };

  createInvoice = async (payload) => {
    const endpoint = "invoices";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getInvoice = async (id) => {
    const invoicesEndpoint = `invoices/edit-invoice/${id}`;
    return await HttpService.get(invoicesEndpoint);
  };


  getDetailInvoice = async (id) => {
    const invoicesEndpoint = `invoices/detail-invoice/${id}`;
    return await HttpService.get(invoicesEndpoint);
  };


  updateInvoice = async (payload, id) => {
    const invoicesEndpoint = `invoices/edit-invoice/${id}`;
    return await HttpService.patch(invoicesEndpoint, payload);
  };








  // Payments requests
  getPayments = async () => {
    const paymentsEndpoint = "payments";
    return await HttpService.get(paymentsEndpoint);
  };

  deletePayment = async (id) => {
    const endpoint = `payments/${id}`;
    return await HttpService.delete(endpoint);
  };

  createPayment = async (payload) => {
    const endpoint = "payments";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getPayment = async (id) => {
    const paymentsEndpoint = `payments/edit-payment/${id}`;
    return await HttpService.get(paymentsEndpoint);
  };


  getDetailPayment = async (id) => {
    const paymentsEndpoint = `payments/detail-payment/${id}`;
    return await HttpService.get(paymentsEndpoint);
  };


  updatePayment = async (payload, id) => {
    const paymentsEndpoint = `payments/edit-payment/${id}`;
    return await HttpService.patch(paymentsEndpoint, payload);
  };








  // Plans requests
  getPlans = async () => {
    const plansEndpoint = "plans";
    return await HttpService.get(plansEndpoint);
  };

  deletePlan = async (id) => {
    const endpoint = `plans/${id}`;
    return await HttpService.delete(endpoint);
  };

  createPlan = async (payload) => {
    const endpoint = "plans";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getPlan = async (id) => {
    const plansEndpoint = `plans/edit-plan/${id}`;
    return await HttpService.get(plansEndpoint);
  };


  getDetailPlan = async (id) => {
    const plansEndpoint = `plans/detail-plan/${id}`;
    return await HttpService.get(plansEndpoint);
  };


  updatePlan = async (payload, id) => {
    const plansEndpoint = `plans/edit-plan/${id}`;
    return await HttpService.patch(plansEndpoint, payload);
  };







  // Securitys requests
  getSecuritys = async () => {
    const securitysEndpoint = "securities";
    return await HttpService.get(securitysEndpoint);
  };

  deleteSecurity = async (id) => {
    const endpoint = `securitys/${id}`;
    return await HttpService.delete(endpoint);
  };

  createSecurity = async (payload) => {
    const endpoint = "securitys";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getSecurity = async (id) => {
    const securitysEndpoint = `securitys/edit-security/${id}`;
    return await HttpService.get(securitysEndpoint);
  };


  getDetailSecurity = async (id) => {
    const securitysEndpoint = `securitys/detail-security/${id}`;
    return await HttpService.get(securitysEndpoint);
  };


  updateSecurity = async (payload, id) => {
    const securitysEndpoint = `securitys/edit-security/${id}`;
    return await HttpService.patch(securitysEndpoint, payload);
  };







  // Teams requests
  getTeams = async () => {
    const teamsEndpoint = "teams";
    return await HttpService.get(teamsEndpoint);
  };

  deleteTeam = async (id) => {
    const endpoint = `teams/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTeam = async (payload) => {
    const endpoint = "teams";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getTeam = async (id) => {
    const teamsEndpoint = `teams/edit-team/${id}`;
    return await HttpService.get(teamsEndpoint);
  };


  getDetailTeam = async (id) => {
    const teamsEndpoint = `teams/detail-team/${id}`;
    return await HttpService.get(teamsEndpoint);
  };


  updateTeam = async (payload, id) => {
    const teamsEndpoint = `teams/edit-team/${id}`;
    return await HttpService.patch(teamsEndpoint, payload);
  };







  // Trackings requests
  getTrackings = async () => {
    const trackingsEndpoint = "trackings";
    return await HttpService.get(trackingsEndpoint);
  };

  deleteTracking = async (id) => {
    const endpoint = `trackings/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTracking = async (payload) => {
    const endpoint = "trackings";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getTracking = async (id) => {
    const trackingsEndpoint = `trackings/edit-tracking/${id}`;
    return await HttpService.get(trackingsEndpoint);
  };


  getDetailTracking = async (id) => {
    const trackingsEndpoint = `trackings/detail-tracking/${id}`;
    return await HttpService.get(trackingsEndpoint);
  };


  updateTracking = async (payload, id) => {
    const trackingsEndpoint = `trackings/edit-tracking/${id}`;
    return await HttpService.patch(trackingsEndpoint, payload);
  };









  // Upcomings requests
  getUpcomings = async () => {
    const upcomingsEndpoint = "upcomings";
    return await HttpService.get(upcomingsEndpoint);
  };

  deleteUpcoming = async (id) => {
    const endpoint = `upcomings/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUpcoming = async (payload) => {
    const endpoint = "upcomings";
    return await HttpService.post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  getUpcoming = async (id) => {
    const upcomingsEndpoint = `upcomings/edit-upcoming/${id}`;
    return await HttpService.get(upcomingsEndpoint);
  };


  getDetailUpcoming = async (id) => {
    const upcomingsEndpoint = `upcomings/detail-upcoming/${id}`;
    return await HttpService.get(upcomingsEndpoint);
  };


  updateUpcoming = async (payload, id) => {
    const upcomingsEndpoint = `upcomings/edit-upcoming/${id}`;
    return await HttpService.patch(upcomingsEndpoint, payload);
  };









}

export default new CrudService();
