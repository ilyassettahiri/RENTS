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

// Countries flags
const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const US = `${imagePath}/icons/flags/US.png`;
const DE = `${imagePath}/icons/flags/DE.png`;
const GB = `${imagePath}/icons/flags/GB.png`;
const BR = `${imagePath}/icons/flags/BR.png`;

export {
  US,
  DE,
  GB,
  BR
};


const salesTableData = [
  {
    country: [US, "united state"],
    sales: 2500,
    value: "$230,900",
    bounce: "29.9%",
  },
  {
    country: [DE, "germany"],
    sales: "3.900",
    value: "$440,000",
    bounce: "40.22%",
  },
  {
    country: [GB, "great britain"],
    sales: "1.400",
    value: "$190,700",
    bounce: "23.44%",
  },
  { country: [BR, "brasil"], sales: 562, value: "$143,960", bounce: "32.14%" },
];

export default salesTableData;
