import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';
import FormField from "admin/components/FormFieldCollap";

import MultSelect from "admin/components/MultSelect";


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/scooters/battery_capacity.svg`;
const icon2 = `${imagePath}/categoryicons/scooters/box_dimensions.svg`;
const icon3 = `${imagePath}/categoryicons/scooters/car_condition.svg`;
const icon4 = `${imagePath}/categoryicons/scooters/charging_time.svg`;
const icon5 = `${imagePath}/categoryicons/scooters/electric_scooter.svg`;
const icon6 = `${imagePath}/categoryicons/scooters/foldable.svg`;
const icon7 = `${imagePath}/categoryicons/scooters/maximum_speed.svg`;
const icon8 = `${imagePath}/categoryicons/scooters/weight_capacity.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon30
};


const MoreDetails = [
  { value: 'Top Speed', label: 'Top Speed (up to XX mph)' }, // Replace XX with actual speed
  { value: 'Battery Life', label: 'Battery Life (up to XX miles)' }, // Replace XX with actual distance
  { value: 'Weight Capacity', label: 'Weight Capacity (up to XX lbs/kg)' }, // Replace XX with weight
  { value: 'Motor Power', label: 'Motor Power (e.g., 250W, 500W, etc.)' },
  { value: 'Charging Time', label: 'Charging Time (e.g., 3-5 hours)' },
  { value: 'Foldable Design', label: 'Foldable for Easy Storage' },
  { value: 'LED Lights', label: 'Built-in LED Lights for Safety' },
  { value: 'Shock Absorption', label: 'Front and Rear Shock Absorption' },
  { value: 'Braking System', label: 'E-Brake and Rear Brake' },
  { value: 'Tire Type', label: 'Pneumatic or Solid Tires' },
  { value: 'Display Features', label: 'LCD Display for Speed and Battery Level' },
  { value: 'App Connectivity', label: 'Mobile App for Tracking and Settings' },
  { value: 'Cruise Control', label: 'Cruise Control Feature' },
  { value: 'Regenerative Braking', label: 'Regenerative Braking System' },
  { value: 'Warranty', label: 'Manufacturer Warranty Details' }
];



const ElectricScooterCondition = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' }
];

function Scooters({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
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
        title="Condition"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="condition"
          options={ElectricScooterCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
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

Scooters.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Scooters.defaultProps = {
  initialState: {


    condition: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Scooters;
