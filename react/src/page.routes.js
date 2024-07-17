/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the page layout of Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the DefaultNavbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `name` key is used for the name of the route on the DefaultNavbar.
  3. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  4. The `icon` key is used for the icon of the route on the DefaultNavbar, you have to add a node.
  5. The `collapse` key is used for making a collapsible item on the DefaultNavbar that contains other routes inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  6. The `route` key is used to store the route location which is used for the react router.
  7. The `href` key is used to store the external links location.
*/

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";
import SpaceShip from "examples/Icons/SpaceShip";


const pageRoutes = [


  // Faq

  {
    name: "Article",
    key: "dashboard",
    icon: <Shop size="12px" color="white" />,
    collapse: [
      {
        name: "Article",
        key: "article",
        route: "/article",
      },
      
    ],
  },
  
  {
    name: "Profile",
    key: "profile",
    icon: <Shop size="12px" color="white" />,
    collapse: [
      {
        name: "Profile Overview",
        key: "profile-overview",
        route: "/pages/profile/profile-overview",
      },
      {
        name: "Teams",
        key: "teams",
        route: "/pages/profile/teams",
      },
      {
        name: "All Projects",
        key: "all-projects",
        route: "/pages/profile/all-projects",
      },
    ],
  },
  {
    name: "Extra",
    key: "extra",
    icon: <Document size="12px" color="white" />,
    collapse: [
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
      },
      { name: "RTL", key: "rtl", route: "/pages/rtl" },
      { name: "Widgets", key: "widgets", route: "/pages/widgets" },
      { name: "Charts", key: "charts", route: "/pages/charts" },
      {
        name: "Sweet Alerts",
        key: "sweet-alerts",
        route: "/pages/sweet-alerts",
      },
      {
        name: "Notfications",
        key: "notifications",
        route: "/pages/notifications",
      },
    ],
  },


  
  // Contact
  {
    name: "Orders",
    key: "orders",
    icon: <Document size="12px" color="white" />,
    collapse: [
      {
        name: "Contact",
        key: "order-list",
        route: "/contact",
      },
      {
        name: "Order Details",
        key: "order-details",
        route: "/",
      },
    ],
  },

  {
    name: "Products",
    key: "products",
    icon: <Shop size="12px" color="white" />,
    collapse: [
      {
        name: "New Product",
        key: "create-listing",
        route: "/ecommerce/products/create-listing",
      },
      {
        name: "Edit Product",
        key: "edit-listing",
        route: "/ecommerce/products/edit-listing",
      },
      {
        name: "Product Page",
        key: "detail-listing",
        route: "/ecommerce/products/detail-listing",
      },
      {
        name: "Products List",
        key: "list-listing",
        route: "/ecommerce/products/list-listing",
      },
    ],
  },





  // Blog

  {
    name: "Blog",
    key: "sign-in",
    collapse: [
      {
        name: "Blog",
        key: "blog",
        route: "/blog",
      },
      {
        name: "Cover",
        key: "cover",
        route: "/authentication/sign-in/cover",
      },
      {
        name: "Illustration",
        key: "illustration",
        route: "/authentication/sign-in/illustration",
      },
    ],
  },



  
  // About
  {
    name: "Applications",
    key: "applications",
    collapse: [
      {
        name: "About",
        key: "about",
        route: "/about",
        icon: "apps",
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        icon: "badge",
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        icon: "table_view",
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        icon: "today",
      },
      {
        name: "Analytics",
        key: "analytics",
        route: "/applications/analytics",
        icon: "assessment",
      },
    ],
  },




  // Language

  {
    name: "Docs",
    key: "docs",
    collapse: [
      {
        name: "Language",
        key: "language",
        route: "/language",
        description: "All about overview, quick start, license and contents",
        icon: <SpaceShip size="15px" color="secondary" />,
      },
      {
        name: "Foundation",
        key: "foundation",
        href: "https://www.creative-tim.com/learning-lab/react/colors/soft-ui-dashboard/",
        description: "See our colors, icons and typography",
        icon: <Document size="15px" color="secondary" />,
      },
      {
        name: "Components",
        key: "components",
        href: "https://www.creative-tim.com/learning-lab/react/alerts/soft-ui-dashboard/",
        description: "Explore our collection of fully designed components",
        icon: <Cube size="15px" color="secondary" />,
      },
      {
        name: "Plugins",
        key: "plugins",
        href: "https://www.creative-tim.com/learning-lab/react/datepicker/soft-ui-dashboard/",
        description: "Check how you can integrate our plugins",
        icon: <Shop size="15px" color="secondary" />,
      },
    ],
  },


 

  // Front-ends 

  // {
  //   name: "Front ends",
  //   key: "front-ends",
  //   icon: <Shop size="12px" color="white" />,
  //   collapse: [
  //     {
  //       name: "Article",
  //       key: "article",
  //       route: "/article",
  //     },

  //     {
  //       name: "Blog",
  //       key: "blog",
  //       route: "/blog",
  //     },

  //     {
  //       name: "Home",
  //       key: "home",
  //       route: "/home",
  //     },

  //     {
  //       name: "Listing",
  //       key: "listing",
  //       route: "/listing",
  //     },

  //     {
  //       name: "Myfavorite",
  //       key: "myfavorite",
  //       route: "/myfavorite",
  //     },

  //     {
  //       name: "Shop",
  //       key: "shop",
  //       route: "/shop",
  //     },

  //     {
  //       name: "About",
  //       key: "about",
  //       route: "/about",
  //     },


  //     {
  //       name: "Contact",
  //       key: "contact",
  //       route: "/contact",
  //     },


  //     {
  //       name: "Faq",
  //       key: "faq",
  //       route: "/faq",
  //     },

  //     {
  //       name: "Term condition",
  //       key: "term-condition",
  //       route: "/term-condition",
  //     },

  //     {
  //       name: "Cart",
  //       key: "cart",
  //       route: "/cart",
  //     },

  //     {
  //       name: "Thank you",
  //       key: "thank-you",
  //       route: "/thank-you",
  //     },

  //   ],
  // },










];

export default pageRoutes;
