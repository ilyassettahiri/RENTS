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
const icon1 = `${imagePath}/categoryicons/motos/car_condition.svg`;
const icon2 = `${imagePath}/categoryicons/motos/clothing.svg`;
const icon3 = `${imagePath}/categoryicons/motos/helmet.svg`;
const icon4 = `${imagePath}/categoryicons/motos/insurance.svg`;
const icon5 = `${imagePath}/categoryicons/motos/intercom.svg`;
const icon6 = `${imagePath}/categoryicons/motos/maximum_speed.svg`;
const icon7 = `${imagePath}/categoryicons/motos/power_in_watts.svg`;
const icon8 = `${imagePath}/categoryicons/motos/toolkit.svg`;
const icon9 = `${imagePath}/categoryicons/motos/transmission.svg`;
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
  icon9,
  icon30
};



const MoreDetails = [
  { value: 'Anti-lock Braking System (ABS)', label: 'Anti-lock Braking System (ABS)' },
  { value: 'Traction Control System', label: 'Traction Control System' },
  { value: 'Cruise Control', label: 'Cruise Control' },
  { value: 'Keyless Ignition', label: 'Keyless Ignition' },
  { value: 'Bluetooth Connectivity', label: 'Bluetooth Connectivity' },
  { value: 'GPS Navigation', label: 'GPS Navigation' },
  { value: 'Heated Grips', label: 'Heated Grips' },
  { value: 'LED Headlights', label: 'LED Headlights' },
  { value: 'Adjustable Suspension', label: 'Adjustable Suspension' },
  { value: 'Integrated Dash Cam', label: 'Integrated Dash Cam' },
  { value: 'Alarm System', label: 'Alarm System' },
  { value: 'Quick Shifter', label: 'Quick Shifter' },
  { value: 'Custom Seat', label: 'Custom Seat' },
  { value: 'Luggage System', label: 'Luggage System' },
  { value: 'Carbon Fiber Components', label: 'Carbon Fiber Components' }
];



const MotorcyclePower = [
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' }
];
const MotorcycleSpeed = [
  { value: '60 mph (97 km/h)', label: '60 mph (97 km/h)' },
  { value: '100 mph (161 km/h)', label: '100 mph (161 km/h)' },
  { value: '150 mph (241 km/h)', label: '150 mph (241 km/h)' },
  { value: '200 mph (322 km/h)', label: '200 mph (322 km/h)' },
  { value: '250 mph (402 km/h)', label: '250 mph (402 km/h)' }
];
const MotorcycleCondition = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' }
];
const MotorcycleInsurance = [
  { value: 'Liability Coverage', label: 'Liability Coverage' },
  { value: 'Collision Coverage', label: 'Collision Coverage' },
  { value: 'Comprehensive Coverage', label: 'Comprehensive Coverage' },
  { value: 'Uninsured/Underinsured Motorist Coverage', label: 'Uninsured/Underinsured Motorist Coverage' },
  { value: 'Medical Payments/PIP', label: 'Medical Payments/PIP' },
  { value: 'Accessory Coverage', label: 'Accessory Coverage' },
  { value: 'Roadside Assistance/Towing', label: 'Roadside Assistance/Towing' },
  { value: 'Rental Reimbursement', label: 'Rental Reimbursement' }
];
const MotorcycleToolkit = [
  { value: 'Screwdrivers', label: 'Screwdrivers' },
  { value: 'Wrenches', label: 'Wrenches' },
  { value: 'Socket Set', label: 'Socket Set' },
  { value: 'Adjustable Wrench', label: 'Adjustable Wrench' },
  { value: 'Pliers', label: 'Pliers' },
  { value: 'Hex Key Set', label: 'Hex Key Set' },
  { value: 'Tire Pressure Gauge', label: 'Tire Pressure Gauge' },
  { value: 'Tire Repair Kit', label: 'Tire Repair Kit' },
  { value: 'Chain Maintenance Tools', label: 'Chain Maintenance Tools' },
  { value: 'Spark Plug Wrench', label: 'Spark Plug Wrench' },
  { value: 'Electrical Tape', label: 'Electrical Tape' },
  { value: 'Fuse Kit', label: 'Fuse Kit' },
  { value: 'Multi-Tool', label: 'Multi-Tool' },
  { value: 'First Aid Kit', label: 'First Aid Kit' },
  { value: 'Manual', label: 'Manual' }
];
const MotorcycleGearbox = [
  { value: 'Fixed', label: 'Fixed' },
  { value: 'Freewheeling', label: 'Freewheeling' },
  { value: 'Slider', label: 'Slider' }
];
const MotorcycleIntercom = [
  { value: 'Wired Intercom', label: 'Wired Intercom' },
  { value: 'Helmet-Mounted Communication Device', label: 'Helmet-Mounted Communication Device' },
  { value: 'Integrated Motorcycle Communication System', label: 'Integrated Motorcycle Communication System' },
  { value: 'Third-Party Accessories', label: 'Third-Party Accessories' }
];

function Motos({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
  const [collapse7, setCollapse7] = useState(isOpen);
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
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="condition"
          options={MotorcycleCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Gearbox"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="gearbox"
          options={MotorcycleGearbox}
          value={initiallistingsData.gearbox}
          onChange={(option) => handleSelectChange("gearbox", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Insurance"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="insurance"
          options={MotorcycleInsurance}
          value={initiallistingsData.insurance}
          onChange={(option) => handleSelectChange("insurance", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Power"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="power"
          options={MotorcyclePower}
          value={initiallistingsData.power}
          onChange={(option) => handleSelectChange("power", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Speed"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        


          <FormField
            
            type="text"
            name="speed"
            placeholder="Enter speed"
            value={initiallistingsData.speed}
            onChange={(e) => handleSelectChange("speed", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Toolkit"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="toolkit"
          options={MotorcycleToolkit}
          value={initiallistingsData.toolkit}
          onChange={(options) => handleSelectChange("toolkit", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Intercom"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        




          <FormField
            
            type="text"
            name="intercom"
            placeholder="Enter intercom"
            value={initiallistingsData.intercom}
            onChange={(e) => handleSelectChange("intercom", e.target.value)}
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


Motos.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Motos.defaultProps = {
  initialState: {


    condition: '',
    gearbox: '',
    insurance: '',
    power: '',
    speed: '',
    toolkit: '',
    intercom: '',
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Motos;
