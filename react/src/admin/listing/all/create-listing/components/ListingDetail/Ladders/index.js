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
const icon1 = `${imagePath}/categoryicons/ladders/assembly_required.svg`;
const icon2 = `${imagePath}/categoryicons/ladders/battery_life.svg`;
const icon3 = `${imagePath}/categoryicons/ladders/condition.svg`;
const icon4 = `${imagePath}/categoryicons/ladders/dimensions.svg`;
const icon5 = `${imagePath}/categoryicons/ladders/height.svg`;
const icon6 = `${imagePath}/categoryicons/ladders/instructions.svg`;
const icon7 = `${imagePath}/categoryicons/ladders/load_capacity.svg`;
const icon8 = `${imagePath}/categoryicons/ladders/material.svg`;
const icon9 = `${imagePath}/categoryicons/ladders/number_of_steps.svg`;
const icon10 = `${imagePath}/categoryicons/ladders/power_source.svg`;
const icon11 = `${imagePath}/categoryicons/ladders/style.svg`;
const icon12 = `${imagePath}/categoryicons/ladders/weight.svg`;
const icon13 = `${imagePath}/categoryicons/ladders/wheel_size.svg`;
const icon14 = `${imagePath}/categoryicons/ladders/tool_type.svg`;
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
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon30
};


const MoreDetails = [
  { value: 'Safety Features', label: 'Safety Features' },
  { value: 'Weight Capacity', label: 'Weight Capacity' },
  { value: 'Versatility', label: 'Versatility' },
  { value: 'Portability', label: 'Portability' },
  { value: 'Durability', label: 'Durability' },
  { value: 'Easy Setup', label: 'Easy Setup' },
  { value: 'Adjustable Height', label: 'Adjustable Height' },
  { value: 'Maintenance Requirements', label: 'Maintenance Requirements' }
];



const LaddersandScaffoldingToolType = [
  { value: 'Step Ladders', label: 'Step Ladders' },
  { value: 'Extension Ladders', label: 'Extension Ladders' },
  { value: 'Platform Ladders', label: 'Platform Ladders' },
  { value: 'Telescopic Ladders', label: 'Telescopic Ladders' },
  { value: 'Folding Ladders', label: 'Folding Ladders' },
  { value: 'Multi-Position Ladders', label: 'Multi-Position Ladders' },
  { value: 'Attic Ladders', label: 'Attic Ladders' },
  { value: 'A-Frame Ladders', label: 'A-Frame Ladders' },
  { value: 'Single Section Ladders', label: 'Single Section Ladders' },
  { value: 'Combination Ladders', label: 'Combination Ladders' },
  { value: 'Mobile Scaffolding', label: 'Mobile Scaffolding' },
  { value: 'Modular Scaffolding', label: 'Modular Scaffolding' },
  { value: 'Tube and Coupler Scaffolding', label: 'Tube and Coupler Scaffolding' },
  { value: 'Systems Scaffolding', label: 'Systems Scaffolding' },
  { value: 'Suspended Scaffolding', label: 'Suspended Scaffolding' },
  { value: 'Cantilever Scaffolding', label: 'Cantilever Scaffolding' },
  { value: 'Trestle Scaffolding', label: 'Trestle Scaffolding' },
  { value: 'Frame Scaffolding', label: 'Frame Scaffolding' },
  { value: 'Access Towers', label: 'Access Towers' },
  { value: 'Staircase Towers', label: 'Staircase Towers' }
];

const LaddersandScaffoldingCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Used', label: 'Used' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

const LaddersandScaffoldingPowersource = [
  { value: 'Electric', label: 'Electric' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Battery-powered', label: 'Battery-powered' },
  { value: 'Hydraulic', label: 'Hydraulic' },
  { value: 'Pneumatic', label: 'Pneumatic' }
];

const LaddersandScaffoldingMaterial = [
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Fiberglass', label: 'Fiberglass' },
  { value: 'Steel', label: 'Steel' },
  { value: 'Wood', label: 'Wood' },
  { value: 'Stainless Steel', label: 'Stainless Steel' },
  { value: 'Carbon Fiber', label: 'Carbon Fiber' },
  { value: 'Composite Materials', label: 'Composite Materials' }
];

const LaddersandScaffoldingHeight = [
  { value: '1.2 meters', label: '1.2 meters' },
  { value: '1.8 meters', label: '1.8 meters' },
  { value: '2.4 meters', label: '2.4 meters' },
  { value: '3 meters', label: '3 meters' },
  { value: '3.7 meters', label: '3.7 meters' },
  { value: '4.9 meters', label: '4.9 meters' },
  { value: '6.1 meters', label: '6.1 meters' },
  { value: '9.1 meters', label: '9.1 meters' },
  { value: '12.2 meters', label: '12.2 meters' },
  { value: '15.2 meters', label: '15.2 meters' }
];

const LaddersandScaffoldingWeight = [
  { value: 'Up to 5 kg', label: 'Up to 5 kg' },
  { value: '5 kg to 20 kg', label: '5 kg to 20 kg' },
  { value: 'Over 20 kg', label: 'Over 20 kg' }
];

const LaddersandScaffoldingNumberofsteps = [
  { value: '2 steps', label: '2 steps' },
  { value: '3 steps', label: '3 steps' },
  { value: '4 steps', label: '4 steps' },
  { value: '5 steps', label: '5 steps' },
  { value: '6 steps', label: '6 steps' },
  { value: '7 steps', label: '7 steps' },
  { value: '8 steps', label: '8 steps' },
  { value: '10 steps', label: '10 steps' },
  { value: '12 steps', label: '12 steps' },
  { value: '14 steps', label: '14 steps' }
];

const LaddersandScaffoldingLoadCapacity = [
  { value: '80 kg', label: '80 kg' },
  { value: '150 kg', label: '150 kg' },
  { value: '300 kg', label: '300 kg' }
];

const LaddersandScaffoldingBatteryLife = [
  { value: '1 hour or less', label: '1 hour or less' },
  { value: '1-3 hours', label: '1-3 hours' },
  { value: '3-6 hours', label: '3-6 hours' },
  { value: '6-10 hours', label: '6-10 hours' },
  { value: '10 hours or more', label: '10 hours or more' }
];

const LaddersandScaffoldingStyle = [
  { value: 'A-frame', label: 'A-frame' },
  { value: 'Extension', label: 'Extension' },
  { value: 'Step', label: 'Step' },
  { value: 'Telescopic', label: 'Telescopic' },
  { value: 'Platform', label: 'Platform' },
  { value: 'Multi-position', label: 'Multi-position' },
  { value: 'Attic', label: 'Attic' },
  { value: 'Single section', label: 'Single section' },
  { value: 'Folding', label: 'Folding' },
  { value: 'Combination', label: 'Combination' },
  { value: 'Modular', label: 'Modular' },
  { value: 'Tube and coupler', label: 'Tube and coupler' },
  { value: 'Systems (such as Ringlock or Cuplock)', label: 'Systems (such as Ringlock or Cuplock)' },
  { value: 'Frame', label: 'Frame' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Cantilever', label: 'Cantilever' },
  { value: 'Trestle', label: 'Trestle' },
  { value: 'Access towers', label: 'Access towers' },
  { value: 'Staircase towers', label: 'Staircase towers' }
];

const LaddersandScaffoldingWheelSize = [
  { value: '3 inches', label: '3 inches' },
  { value: '6 inches', label: '6 inches' },
  { value: '8 inches', label: '8 inches' },
  { value: '10 inches', label: '10 inches' },
  { value: '12 inches', label: '12 inches' }
];

function Ladders({ onDataChange, initialState, isOpen }) {

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
  const [collapse10, setCollapse10] = useState(isOpen);
  const [collapse11, setCollapse11] = useState(isOpen);
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
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Tool Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        


          <FormField
            
            type="text"
            name="toolType"
            placeholder="Enter Tool Type"
            value={initiallistingsData.toolType}
            onChange={(e) => handleSelectChange("toolType", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="condition"
          options={LaddersandScaffoldingCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />






      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Power Source"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        



          <FormField
            
            type="text"
            name="powerSource"
            placeholder="Enter Power Source"
            value={initiallistingsData.powerSource}
            onChange={(e) => handleSelectChange("powerSource", e.target.value)}
          />



      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Material"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        



          <FormField
            
            type="text"
            name="material"
            placeholder="Enter material"
            value={initiallistingsData.material}
            onChange={(e) => handleSelectChange("material", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Height"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        



          <FormField
            
            type="text"
            name="height"
            placeholder="Enter height"
            value={initiallistingsData.height}
            onChange={(e) => handleSelectChange("height", e.target.value)}
          />



      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Weight"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        



          <FormField
            
            type="text"
            name="weight"
            placeholder="Enter weight"
            value={initiallistingsData.weight}
            onChange={(e) => handleSelectChange("weight", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Number of Steps"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        


          <FormField
            
            type="text"
            name="numberOfSteps"
            placeholder="Enter Number Of Steps"
            value={initiallistingsData.numberOfSteps}
            onChange={(e) => handleSelectChange("numberOfSteps", e.target.value)}
          />






      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Load Capacity"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        




          <FormField
            
            type="text"
            name="loadCapacity"
            placeholder="Enter Load Capacity"
            value={initiallistingsData.loadCapacity}
            onChange={(e) => handleSelectChange("loadCapacity", e.target.value)}
          />






      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Battery Life"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        


          <FormField
            
            type="text"
            name="batteryLife"
            placeholder="Enter Battery Life"
            value={initiallistingsData.batteryLife}
            onChange={(e) => handleSelectChange("batteryLife", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Style"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <MultSelect
          name="style"
          options={LaddersandScaffoldingStyle}
          value={initiallistingsData.style}
          onChange={(options) => handleSelectChange("style", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Wheel Size"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="wheelSize"
          options={LaddersandScaffoldingWheelSize}
          value={initiallistingsData.wheelSize}
          onChange={(option) => handleSelectChange("wheelSize", option.value)}
        />




          <FormField
            
            type="text"
            name="wheelSize"
            placeholder="Enter Wheel Size"
            value={initiallistingsData.wheelSize}
            onChange={(e) => handleSelectChange("wheelSize", e.target.value)}
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

Ladders.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Ladders.defaultProps = {
  initialState: {


    toolType: '',
    condition: '',
    powerSource: '',
    material: '',
    height: '',
    weight: '',
    numberOfSteps: '',
    loadCapacity: '',
    batteryLife: '',
    style: [],
    wheelSize: '',
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Ladders;
