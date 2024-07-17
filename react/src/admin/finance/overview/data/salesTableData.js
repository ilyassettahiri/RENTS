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

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const US = `${imagePath}/icons/flags/US.png`;
const DE = `${imagePath}/icons/flags/DE.png`;
const GB = `${imagePath}/icons/flags/GB.png`;
const BR = `${imagePath}/icons/flags/BR.png`;
const AU = `${imagePath}/icons/flags/AU.png`;

export {
  US,
  DE,
  GB,
  BR,
  AU
};


const salesTableData = [
  {
    country: [US, "united state"],
    sales: 2500,
    bounce: "29.9%",
  },
  {
    country: [DE, "germany"],
    sales: "3.900",
    bounce: "40.22%",
  },
  {
    country: [GB, "great britain"],
    sales: "1.400",
    bounce: "23.44%",
  },
  { country: [BR, "brasil"], sales: 562, bounce: "32.14%" },
  { country: [AU, "australia"], sales: 400, bounce: "56.83%" },
];

export default salesTableData;
