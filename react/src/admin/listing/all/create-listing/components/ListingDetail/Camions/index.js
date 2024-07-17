import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/vehicules/camions/box_dimensions.svg`;
const icon2 = `${imagePath}/categoryicons/vehicules/camions/c.svg`;
const icon3 = `${imagePath}/categoryicons/vehicules/camions/cargo_capacity.svg`;
const icon4 = `${imagePath}/categoryicons/vehicules/camions/fuel.svg`;
const icon5 = `${imagePath}/categoryicons/vehicules/camions/insurance.svg`;
const icon6 = `${imagePath}/categoryicons/vehicules/camions/navigation_system.svg`;
const icon7 = `${imagePath}/categoryicons/vehicules/camions/transmission.svg`;
const icon8 = `${imagePath}/categoryicons/vehicules/camions/type.svg`;
const icon9 = `${imagePath}/categoryicons/vehicules/camions/condition.svg`;
const icon10 = `${imagePath}/categoryicons/vehicules/camions/other_details.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

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
  icon30
};





const TruckType = [
  { value: 'Semi-truck', label: 'Semi-truck' },
  { value: 'Pickup truck', label: 'Pickup truck' },
  { value: 'Box truck', label: 'Box truck' },
  { value: 'Dump truck', label: 'Dump truck' },
  { value: 'Flatbed truck', label: 'Flatbed truck' },
  { value: 'Tow truck', label: 'Tow truck' },
  { value: 'Refrigerated truck', label: 'Refrigerated truck' },
  { value: 'Tank truck', label: 'Tank truck' },
  { value: 'Crane truck', label: 'Crane truck' },
  { value: 'Logging truck', label: 'Logging truck' },
  { value: 'Concrete mixer truck', label: 'Concrete mixer truck' },
  { value: 'Garbage truck', label: 'Garbage truck' },
  { value: 'Utility truck', label: 'Utility truck' },
  { value: 'Fire truck', label: 'Fire truck' },
  { value: 'Armored truck', label: 'Armored truck' }
];

const TruckFuelType = [
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Natural Gas (CNG/LNG)', label: 'Natural Gas (CNG/LNG)' }
];

const TruckCondition = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' }
];

const TruckTransmission = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Automated Manual Transmission (AMT)', label: 'Automated Manual Transmission (AMT)' }
];

const TruckInsurance = [
  { value: 'Comprehensive', label: 'Comprehensive' },
  { value: 'Third-party liability', label: 'Third-party liability' }
];

const TruckNavigationSystem = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Integrated navigation system', label: 'Integrated navigation system' }
];

const MoreDetails = [
  { value: 'Hydraulics', label: 'Hydraulics' },
  { value: 'Retarder', label: 'Retarder' },
  { value: 'Obu Operation', label: 'Obu Operation' }
];

function Camions({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="type"
          options={TruckType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Fuel Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="fuelType"
          options={TruckFuelType}
          value={initiallistingsData.fuelType}
          onChange={(option) => handleSelectChange("fuelType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="condition"
          options={TruckCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Transmission"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="transmission"
          options={TruckTransmission}
          value={initiallistingsData.transmission}
          onChange={(option) => handleSelectChange("transmission", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Insurance"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="insurance"
          options={TruckInsurance}
          value={initiallistingsData.insurance}
          onChange={(option) => handleSelectChange("insurance", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Navigation"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="navigation"
          options={TruckNavigationSystem}
          value={initiallistingsData.navigation}
          onChange={(option) => handleSelectChange("navigation", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="More Details"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="otherDetails"
          options={MoreDetails}
          value={initiallistingsData.moreDetails}
          onChange={(options) => handleSelectChange("moreDetails", options)}
        />
      </CollapseList>
      
    </SoftBox>
  );
}

Camions.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Camions.defaultProps = {
  initialState: {


    type: '',
    fuelType: '',
    condition: '',
    transmission: '',
    insurance: '',
    navigation: '',
    moreDetails: []

    
  },
  isOpen: false,
};

export default Camions;
