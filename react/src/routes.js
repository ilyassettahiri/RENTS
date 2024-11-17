
 // Admin


 import Dashboard from "admin/dashboard";



 // reservation

import ListReservation from "admin/reservation/all";
import CreateReservation from "admin/reservation/all/create-reservation";
import DetailReservation from "admin/reservation/all/detail-reservation";


import ListCheckingOut from "admin/reservation/checking-out";
import DetailCheckingOut from "admin/reservation/checking-out/detail-checking-out";


import ListCurrentlyHosting from "admin/reservation/currently-hosting";
import DetailCurrentlyHosting from "admin/reservation/currently-hosting/detail-currently-hosting";


import Tracking from "admin/reservation/tracking";

import ListUpcoming from "admin/reservation/upcoming";
import DetailUpcoming from "admin/reservation/upcoming/detail-upcoming";













  // message

import Message from "admin/message";









  // listing
import ListListing from "admin/listing/all";
import CreateListing from "admin/listing/all/create-listing";
import EditListing from "admin/listing/all/edit-listing";
import DetailListing from "admin/listing/all/detail-listing";


import ListBoosted from "admin/listing/boosted";
import EditBoosted from "admin/listing/boosted/edit-boosted";
import DetailBoosted from "admin/listing/boosted/detail-boosted";



import ListCollection from "admin/listing/collection";
import CreateCollection from "admin/listing/collection/create-collection";
import DetailCollection from "admin/listing/collection/detail-collection";


import ListCompleted from "admin/listing/completed";
import EditCompleted from "admin/listing/completed/edit-completed";



import ListDiscount from "admin/listing/discount";

import CreateDiscount from "admin/listing/discount/create-discount";
import DetailDiscount from "admin/listing/discount/detail-discount";



import ListDraft from "admin/listing/draft";













  // Customers
import ListCustomer from "admin/customer/customer";
import CreateCustomer from "admin/customer/customer/create-customer";
import DetailCustomer from "admin/customer/customer/detail-customer";



import ListReview from "admin/customer/review";
import DetailReview from "admin/customer/review/detail-review";




  // Analytics

import Analytics from "admin/analytics";


  // finance
import ListInvoice from "admin/finance/invoice";
import Overview from "admin/finance/overview";
import Paymentsettings from "admin/finance/payment-settings";



  // Onlinestore
import CreateStore from "admin/store/create-store";
import DetailStore from "admin/store/detail-store";
import Plan from "admin/store/plan";







  // settings
import Account from "admin/settings/account";



import ListTeam from "admin/settings/team";
import DetailTeam from "admin/settings/team/detail-team";

import CreateTeam from "admin/settings/team/create-team";



import Security from "admin/settings/security";








// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import SettingsIcon from "examples/Icons/Settings";
import Basket from "examples/Icons/Basket";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Shop size="12px" />,
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,


    
  },


  
  {
   
    name: "Home",
    key: "home",
    icon: <Shop size="12px" />,
    route: "/",
    component: <Dashboard />,


    
  },





  // Admin

 // reservation


  {
    type: "collapse",
    name: "Reservations",
    key: "reservation",
    icon: <Basket size="12px" />,
    collapse: [
      {
        name: "Upcoming",
        key: "upcoming",
        route: "/reservation/upcoming",
        component: <ListUpcoming />,
      },
      {
        name: "Checking out",
        key: "checking-out",
        route: "/reservation/checking-out",
        component: <ListCheckingOut />,
      },
      {
        name: "Currently hosting",
        key: "currently-hosting",
        route: "/reservation/currently-hosting",
        component: <ListCurrentlyHosting />,
      },
      {
        name: "All Reservations",
        key: "all-reservations",
        route: "/reservation/all-reservations",
        component: <ListReservation />,
      },
      // {
      //   name: "Tracking",
      //   key: "tracking",
      //   route: "/reservation/tracking",
      //   component: <Tracking />,
      // },
    ],
  },




  // listing


  {
    type: "collapse",
    name: "Listings",
    key: "listing",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "All",
        key: "all",
        route: "/listing/all",
        component: <ListListing />,
      },

     

      {
        name: "Completed",
        key: "completed",
        route: "/listing/completed",
        component: <ListCompleted />,
      },
      {
        name: "Draft",
        key: "draft",
        route: "/listing/draft",
        component: <ListDraft />,
      },
      {
        name: "Boosted",
        key: "boosted",
        route: "/listing/boosted",
        component: <ListBoosted />,
      },
      {
        name: "Collections",
        key: "collection",
        route: "/listing/collection",
        component: <ListCollection />,
      },
      {
        name: "Discounts",
        key: "discount",
        route: "/listing/discount",
        component: <ListDiscount />,
      },
    ],
  },


  {
    noCollapse: true,
    name: "Create Listing",
    key: "create-listing",
    icon: <SettingsIcon size="12px" />,
    collapse: [
      {
        name: "Create Listing",
        key: "create-listing",
        route: "/listing/create-listing",
        component: <CreateListing />,
      },
      
      {
        name: "Edit Listing",
        key: "edit-listing",
        route: "/listing/edit-listing/:id",
        component: <EditListing />,
      },
      {
        name: "Detail Listing",
        key: "detail-listing",
        route: "/listing/detail-listing/:id",
        component: <DetailListing />,
      },
      {
        name: "Edit Boosted",
        key: "edit-boosted",
        route: "/listing/edit-boosted/:id",
        component: <EditBoosted />,
      },
      {
        name: "Detail Boosted",
        key: "detail-boosted",
        route: "/listing/detail-boosted/:id",
        component: <DetailBoosted />,
      },
      {
        name: "Edit Completed",
        key: "edit-completed",
        route: "/listing/edit-completed/:id",
        component: <EditCompleted />,
      },
      




      {
        name: "Create Collection",
        key: "create-collection",
        route: "/collection/create-collection",
        component: <CreateCollection />,
      },
      
      
      {
        name: "Detail Collection",
        key: "detail-collection",
        route: "/collection/detail-collection/:id",
        component: <DetailCollection />,
      },



      {
        name: "Create Discount",
        key: "create-discount",
        route: "/discount/create-discount",
        component: <CreateDiscount />,
      },
      
      
      {
        name: "Detail Discount",
        key: "detail-discount",
        route: "/discount/detail-discount/:id",
        component: <DetailDiscount />,
      },


      // {
      //   name: "Create Team",
      //   key: "create-team",
      //   route: "/team/create-team",
      //   component: <CreateTeam />,
      // },
      
      // {
      //   name: "Detail Team",
      //   key: "detail-team",
      //   route: "/team/detail-team/:id",
      //   component: <DetailTeam />,
      // },
      

      {
        name: "Create Reservation",
        key: "create-reservation",
        route: "/reservation/create-reservation",
        component: <CreateReservation />,
      },
      
      
      {
        name: "Detail Reservation",
        key: "detail-reservation",
        route: "/reservation/detail-reservation/:id",
        component: <DetailReservation />,
      },


      
      {
        name: "Detail Checking Out",
        key: "detail-checking-out",
        route: "/reservation/detail-checking-out/:id",
        component: <DetailCheckingOut />,
      },

    
      {
        name: "Detail Currently Hosting",
        key: "detail-currently-hosting",
        route: "/reservation/detail-currently-hosting/:id",
        component: <DetailCurrentlyHosting />,
      },


    
      {
        name: "Detail Upcoming",
        key: "detail-upcoming",
        route: "/reservation/detail-upcoming/:id",
        component: <DetailUpcoming />,
      },


      {
        name: "Detail Review",
        key: "detail-review",
        route: "/review/detail-review/:id",
        component: <DetailReview />,
      },


      {
        name: "Create Customer",
        key: "create-customer",
        route: "/customer/create-customer",
        component: <CreateCustomer />,
      },
      
      
      {
        name: "Detail Customer",
        key: "detail-customer",
        route: "/customer/detail-customer/:id",
        component: <DetailCustomer />,
      },



    ],
  },


 




  // Customers


  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    icon: <CustomerSupport size="12px" />,
    collapse: [
      {
        name: "Customers",
        key: "all-customers",
        route: "/customers/all-customers",
        component: <ListCustomer />,
      },
      {
        name: "Reviews",
        key: "reviews",
        route: "/customers/reviews",
        component: <ListReview />,
      },
      
    ],
  },



  // Analytics


  {
    type: "collapse",
    name: "Analytics",
    key: "analytics",
    icon: <SpaceShip size="12px" />,
    route: "/analytics",
    component: <Analytics />,
    noCollapse: true,

    
  },



  // finance


  {
    type: "collapse",
    name: "Finances",
    key: "finance",
    icon: <CreditCard size="12px" />,
    collapse: [
      {
        name: "Overview",
        key: "overview",
        route: "/finance/overview",
        component: <Overview />,
      },
      // {
      //   name: "Payment Settings",
      //   key: "payment-settings",
      //   route: "/finance/payment-settings",
      //   component: <Paymentsettings />,
      // },
      {
        name: "Invoices",
        key: "invoices",
        route: "/finance/invoices",
        component: <ListInvoice />,
      },
      
    ],
  },



  // Onlinestore



  {
    type: "collapse",
    name: "Store",
    key: "store",
    icon: <Office size="12px" />,
    collapse: [
      {
        name: "Create Store",
        key: "create-store",
        route: "/store/create-store",
        component: <CreateStore />,
      },
      {
        name: "Detail Store",
        key: "detail-store",
        route: "/store/detail-store",
        component: <DetailStore />,
      },
      // {
      //   name: "Plan",
      //   key: "plan",
      //   route: "/store/plan",
      //   component: <Plan />,
      // },
      
    ],
  },

  { type: "divider", key: "divider-1" },

  // settings


  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <SettingsIcon size="12px" />,
    collapse: [
      {
        name: "Account",
        key: "account",
        route: "/settings/account",
        component: <Account />,
      },
      // {
      //   name: "Team",
      //   key: "team",
      //   route: "/settings/team",
      //   component: <ListTeam />,
      // },
      {
        name: "Security",
        key: "security",
        route: "/settings/security",
        component: <Security />,
      },
      
    ],
  },

  

 
  




];

export default routes;
