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
    country: ["", "Casablanca"],
    sales: 0,
    bounce: "0%",
  },
  {
    country: ["", "Marrakech"],
    sales: "0",
    bounce: "0%",
  },
  {
    country: ["", "Rabat"],
    sales: "0",
    bounce: "0%",
  },
  { country: ["", "Agadir"], sales: 0, bounce: "0%" },
  { country: ["", "Tanger"], sales: 0, bounce: "0%" },
  { country: ["", "Fes"], sales: 0, bounce: "0%" },
  { country: ["", "Meknes"], sales: 0, bounce: "0%" },


];

export default salesTableData;
