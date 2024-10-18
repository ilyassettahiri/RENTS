import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';
import FormField from "admin/components/FormFieldCollap";

import MultSelect from "admin/components/MultSelect";
 



const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/taxiaeroports/language.svg`;
const icon2 = `${imagePath}/categoryicons/taxiaeroports/luggage.svg`;
const icon3 = `${imagePath}/categoryicons/taxiaeroports/passengers.svg`;
const icon4 = `${imagePath}/categoryicons/taxiaeroports/storage.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon30
};



const MoreDetails = [
  { value: 'Child seat available', label: 'Child Seat Available' },
  { value: 'Pet-friendly vehicle', label: 'Pet-Friendly Vehicle' },
  { value: 'Wi-Fi on board', label: 'Wi-Fi On Board' },
  { value: 'Wheelchair accessible', label: 'Wheelchair Accessible' },
  { value: 'Air conditioning', label: 'Air Conditioning' },
  { value: 'Complimentary water', label: 'Complimentary Water' },
  { value: 'Meet and greet service', label: 'Meet and Greet Service' },
  { value: 'Flight tracking', label: 'Flight Tracking' },
  { value: '24/7 availability', label: '24/7 Availability' },
  { value: 'Credit card payment accepted', label: 'Credit Card Payment Accepted' },
  { value: 'GPS navigation', label: 'GPS Navigation' },
  { value: 'Safety measures in place', label: 'Safety Measures In Place' },
  { value: 'Multi-lingual driver', label: 'Multi-Lingual Driver' },
  { value: 'Eco-friendly vehicle options', label: 'Eco-Friendly Vehicle Options' },
  { value: 'Luggage assistance', label: 'Luggage Assistance' },
  { value: 'Group bookings available', label: 'Group Bookings Available' },
  { value: 'Child-friendly driver', label: 'Child-Friendly Driver' }
];



const AirportTaxiPassengers = [
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8+', label: '8+' }
];

const AirportTaxiLuggage = [
  { value: '2 Suitcases + 2 Carry-On Bags', label: '2 Suitcases + 2 Carry-On Bags' },
  { value: '4 Suitcases', label: '4 Suitcases' },
  { value: '6 Pieces of Luggage', label: '6 Pieces of Luggage' }
];

const AirportTaxiStorage = [
  { value: 'Trunk', label: 'Trunk' },
  { value: 'Roof Rack', label: 'Roof Rack' },
  { value: 'Both', label: 'Both' }
];

const AirportTaxiLanguage = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Dutch', label: 'Dutch' },
];

function Taxiaeroports({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse30, setCollapse30] = useState(isOpen);


  useEffect(() => {
    setInitiallistingsData(initialState);
  }, [initialState]);

  const handleSelectChange = (name, value) => {
    const updatedData = { ...initiallistingsData, [name]: value };
    setInitiallistingsData(updatedData);
    onDataChange(name, value);
  };

  return (
    <SoftBox mt={3}>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Passengers"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="passengers"
          options={AirportTaxiPassengers}
          value={initiallistingsData.passengers}
          onChange={(option) => handleSelectChange("passengers", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Luggage"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="luggage"
          options={AirportTaxiLuggage}
          value={initiallistingsData.luggage}
          onChange={(option) => handleSelectChange("luggage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Storage"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="storage"
          options={AirportTaxiStorage}
          value={initiallistingsData.storage}
          onChange={(option) => handleSelectChange("storage", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon30} style={{ width: "40px" }} />}
        title="More Details"
        open={collapse30}
        onClick={() => setCollapse30(!collapse30)}
      >
        <MultSelect
          name="moreDetails"
          options={MoreDetails}
          value={initiallistingsData.moreDetails}
          onChange={(options) => handleSelectChange("moreDetails", options)}
        />
      </CollapseList>
    </SoftBox>
  );
}


Taxiaeroports.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Taxiaeroports.defaultProps = {
  initialState: {


    passengers: '',
    luggage: '',
    storage: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Taxiaeroports;
