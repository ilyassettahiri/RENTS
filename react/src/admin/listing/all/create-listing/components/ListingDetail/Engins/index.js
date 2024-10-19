

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
const icon1 = `${imagePath}/categoryicons/engins/car_transmission.svg`;
const icon2 = `${imagePath}/categoryicons/engins/horsepower.svg`;
const icon3 = `${imagePath}/categoryicons/engins/mechanical_condition.svg`;
const icon4 = `${imagePath}/categoryicons/engins/seat_condition.svg`;
const icon5 = `${imagePath}/categoryicons/engins/tire_size.svg`;
const icon6 = `${imagePath}/categoryicons/engins/type.svg`;
const icon7 = `${imagePath}/categoryicons/engins/cab_type.svg`;
const icon8 = `${imagePath}/categoryicons/engins/cab_condition.svg`;
const icon9 = `${imagePath}/categoryicons/engins/coupler_type.svg`;
const icon10 = `${imagePath}/categoryicons/engins/hydraulics_type.svg`;
const icon11 = `${imagePath}/categoryicons/cars/more_details.svg`;

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
  icon10,
  icon11
};


const MachineryType = [
  { value: 'Excavators', label: 'Excavators' },
  { value: 'Bulldozers', label: 'Bulldozers' },
  { value: 'Grader', label: 'Grader' },
  { value: 'Backhoe', label: 'Backhoe' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Loaders', label: 'Loaders' },
  { value: 'Compactors', label: 'Compactors' },
  { value: 'Cranes', label: 'Cranes' },
  { value: 'Scraper', label: 'Scraper' },
  { value: 'Feller Bunchers', label: 'Feller Bunchers' },
  { value: 'Paver', label: 'Paver' },
  { value: 'Telehandlers', label: 'Telehandlers' },
  { value: 'Trenchers', label: 'Trenchers' },
  { value: 'Roller', label: 'Roller' },
  { value: 'Skid Steer Loaders', label: 'Skid Steer Loaders' },
  { value: 'Cold Planer', label: 'Cold Planer' },
  { value: 'Forklift', label: 'Forklift' },
  { value: 'Boom lift', label: 'Boom lift' },
  { value: 'Harvester', label: 'Harvester' },
  { value: 'Articulated trucks', label: 'Articulated trucks' },
  { value: 'Drills', label: 'Drills' },
  { value: 'Mixer', label: 'Mixer' },
  { value: 'Tractor', label: 'Tractor' }
];

const MachineryMechanicalCondition = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' }
];

const MachinerySeatCondition = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' }
];


const EngineSeats = [
  { value: '1 to 2 passengers', label: '1 to 2 passengers' },
  { value: '3 to 5 passengers', label: '3 to 5 passengers' },
  { value: '6 or more', label: '6 or more' }
];

const MachineryTransmissionType = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'CVT (Continuously Variable Transmission)', label: 'CVT (Continuously Variable Transmission)' },
  { value: 'Hydrostatic ', label: 'Hydrostatic ' }
];

const MachineryCabType = [
  { value: 'Enclosed', label: 'Enclosed' },
  { value: 'Open', label: 'Open' },
  { value: 'ROPS (Roll Overprotective Structure)', label: 'ROPS (Roll Overprotective Structure)' }
];

const MachineryCabCondition = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' }
];

const MachineryCouplerType = [
  { value: 'Quick Hitch', label: 'Quick Hitch' },
  { value: 'Three-point Hitch', label: 'Three-point Hitch' },
  { value: 'Drawbar', label: 'Drawbar' }
];

const MachineryHydraulicsType = [
  { value: 'Standard', label: 'Standard' },
  { value: 'High Flow', label: 'High Flow' }
];


const MachineryMoreDetails = [
  { value: 'Hydraulic System', label: 'Hydraulic System' },
  { value: 'Air Conditioning', label: 'Air Conditioning' },
  { value: 'LED Work Lights', label: 'LED Work Lights' },
  { value: 'Bluetooth Connectivity', label: 'Bluetooth Connectivity' },
  { value: 'Automatic Lubrication', label: 'Automatic Lubrication' },
  { value: 'Telematics System', label: 'Telematics System' },
  { value: 'High-Visibility Paint', label: 'High-Visibility Paint' },
  { value: 'Anti-theft System', label: 'Anti-theft System' },
  { value: 'Data Logger', label: 'Data Logger' },
  { value: 'Rearview Sensors', label: 'Rearview Sensors' },
  { value: 'Front and Rear Cameras', label: 'Front and Rear Cameras' },
  { value: 'Onboard Weighing System', label: 'Onboard Weighing System' },
  { value: 'Load Management System', label: 'Load Management System' },
  { value: 'Noise Reduction Features', label: 'Noise Reduction Features' },
  { value: 'Dust Control System', label: 'Dust Control System' }
];



function Engins({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
  const [collapse7, setCollapse7] = useState(isOpen);
  const [collapse8, setCollapse8] = useState(isOpen);
  const [collapse9, setCollapse9] = useState(isOpen);


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
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="type"
          options={MachineryType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Mechanical Condition"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="mechanicalCondition"
          options={MachineryMechanicalCondition}
          value={initiallistingsData.mechanicalCondition}
          onChange={(option) => handleSelectChange("mechanicalCondition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Seats"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="seats"
          options={EngineSeats}
          value={initiallistingsData.seats}
          onChange={(option) => handleSelectChange("seats", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Transmission Type"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="transmissionType"
          options={MachineryTransmissionType}
          value={initiallistingsData.transmissionType}
          onChange={(option) => handleSelectChange("transmissionType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Cab Type"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="cabType"
          options={MachineryCabType}
          value={initiallistingsData.cabType}
          onChange={(option) => handleSelectChange("cabType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Cab Condition"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="cabCondition"
          options={MachineryCabCondition}
          value={initiallistingsData.cabCondition}
          onChange={(option) => handleSelectChange("cabCondition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Coupler Type"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="couplerType"
          options={MachineryCouplerType}
          value={initiallistingsData.couplerType}
          onChange={(option) => handleSelectChange("couplerType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Hydraulics Type"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="hydraulicsType"
          options={MachineryHydraulicsType}
          value={initiallistingsData.hydraulicsType}
          onChange={(option) => handleSelectChange("hydraulicsType", option.value)}
        />
      </CollapseList>




      <CollapseList
        image={<img src={icon11} style={{ width: "40px" }} />}
        title="More Details"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="moreDetails"
          options={MachineryMoreDetails}
          value={initiallistingsData.moreDetails}
          onChange={(options) => handleSelectChange("moreDetails", options)}
        />
      </CollapseList>


    </SoftBox>
  );
}

Engins.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Engins.defaultProps = {
  initialState: {


    type: '',
    mechanicalCondition: '',
    transmissionType: '',
    cabType: '',
    cabCondition: '',
    couplerType: '',
    hydraulicsType: '',
    seats: '',
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Engins;