

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";
import PropTypes from "prop-types";


// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";
 



const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/powertools/amperage.svg`;
const icon2 = `${imagePath}/categoryicons/powertools/battery_life.svg`;
const icon3 = `${imagePath}/categoryicons/powertools/blade_material.svg`;
const icon4 = `${imagePath}/categoryicons/powertools/condition.svg`;
const icon5 = `${imagePath}/categoryicons/powertools/dimensions.svg`;
const icon6 = `${imagePath}/categoryicons/powertools/material.svg`;
const icon7 = `${imagePath}/categoryicons/powertools/noise_level.svg`;
const icon8 = `${imagePath}/categoryicons/powertools/power_source.svg`;
const icon9 = `${imagePath}/categoryicons/powertools/rotational_speed.svg`;
const icon10 = `${imagePath}/categoryicons/powertools/safety_lock.svg`;
const icon11 = `${imagePath}/categoryicons/powertools/style.svg`;
const icon12 = `${imagePath}/categoryicons/powertools/voltage.svg`;
const icon13 = `${imagePath}/categoryicons/powertools/weight.svg`;
const icon14 = `${imagePath}/categoryicons/powertools/surface.svg`;
const icon15 = `${imagePath}/categoryicons/powertools/tool_type.svg`;
const icon16 = `${imagePath}/categoryicons/powertools/grit_numbre.svg`;
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
  icon15,
  icon16,
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];

const PowertoolsType = [
  { value: 'Drill', label: 'Drill' },
  { value: 'Impact Driver', label: 'Impact Driver' },
  { value: 'Circular Saw', label: 'Circular Saw' },
  { value: 'Jigsaw', label: 'Jigsaw' },
  { value: 'Reciprocating Saw', label: 'Reciprocating Saw' },
  { value: 'Angle Grinder', label: 'Angle Grinder' },
  { value: 'Belt Sander', label: 'Belt Sander' },
  { value: 'Random Orbital Sander', label: 'Random Orbital Sander' },
  { value: 'Miter Saw', label: 'Miter Saw' },
  { value: 'Table Saw', label: 'Table Saw' },
  { value: 'Scroll Saw', label: 'Scroll Saw' },
  { value: 'Router', label: 'Router' },
  { value: 'Planer', label: 'Planer' },
  { value: 'Heat Gun', label: 'Heat Gun' },
  { value: 'Nail Gun', label: 'Nail Gun' },
  { value: 'Staple Gun', label: 'Staple Gun' },
  { value: 'Chainsaw', label: 'Chainsaw' },
  { value: 'Hedge Trimmer', label: 'Hedge Trimmer' },
  { value: 'Power Drill Press', label: 'Power Drill Press' },
  { value: 'Rotary Tool (such as Dremel)', label: 'Rotary Tool (such as Dremel)' },
  { value: 'Band Saw', label: 'Band Saw' },
  { value: 'Oscillating Multi-Tool', label: 'Oscillating Multi-Tool' },
  { value: 'Concrete Saw', label: 'Concrete Saw' },
  { value: 'Demolition Hammer', label: 'Demolition Hammer' },
  { value: 'Tile Saw', label: 'Tile Saw' },
  { value: 'Paint Sprayer', label: 'Paint Sprayer' },
  { value: 'Air Compressor', label: 'Air Compressor' },
  { value: 'Pressure Washer', label: 'Pressure Washer' },
  { value: 'Welder', label: 'Welder' },
  { value: 'Bench Grinder', label: 'Bench Grinder' }
];

const PowertoolsCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Used', label: 'Used' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' }
];

const PowertoolsPowersource = [
  { value: 'Corded Electric', label: 'Corded Electric' },
  { value: 'Battery-Powered (Cordless)', label: 'Battery-Powered (Cordless)' },
  { value: 'Pneumatic (Air-powered)', label: 'Pneumatic (Air-powered)' },
  { value: 'Hydraulic', label: 'Hydraulic' },
  { value: 'Gasoline-Powered', label: 'Gasoline-Powered' },
  { value: 'Diesel-Powered', label: 'Diesel-Powered' },
  { value: 'Propane-Powered', label: 'Propane-Powered' },
  { value: 'Electric Generator Powered', label: 'Electric Generator Powered' },
  { value: 'Hand-Cranked', label: 'Hand-Cranked' },
  { value: 'Solar-Powered', label: 'Solar-Powered' }
];

const PowertoolsVoltage = [
  { value: '120 volts', label: '120 volts' },
  { value: '240 volts', label: '240 volts' },
  { value: '18 volts', label: '18 volts' },
  { value: '20 volts', label: '20 volts' },
  { value: '24 volts', label: '24 volts' }
];

const PowertoolsBatteryLife = [
  { value: 'Less than 1 hour', label: 'Less than 1 hour' },
  { value: '1 to 3 hours', label: '1 to 3 hours' },
  { value: '3 to 8 hours', label: '3 to 8 hours' }
];

const PowertoolsMaterial = [
  { value: 'Steel', label: 'Steel' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Plastic', label: 'Plastic' },
  { value: 'Cast Iron', label: 'Cast Iron' },
  { value: 'Magnesium', label: 'Magnesium' },
  { value: 'Rubber', label: 'Rubber' },
  { value: 'Composite Materials', label: 'Composite Materials' },
  { value: 'Wood', label: 'Wood' },
  { value: 'Brass', label: 'Brass' },
  { value: 'Ceramic', label: 'Ceramic' }
];

const PowertoolsNoiseLevel = [
  { value: 'Below 80 decibels', label: 'Below 80 decibels' },
  { value: '80 to 90 dB', label: '80 to 90 dB' },
  { value: 'Above 90 dB', label: 'Above 90 dB' },
  { value: 'Exceeding 100 dB', label: 'Exceeding 100 dB' }
];

const PowertoolsGritNumber = [
  { value: '24 - 36 grit', label: '24 - 36 grit' },
  { value: '40 - 60 grit', label: '40 - 60 grit' },
  { value: '80 - 120 grit', label: '80 - 120 grit' },
  { value: '150 - 180 grit', label: '150 - 180 grit' },
  { value: '220 - 240 grit', label: '220 - 240 grit' },
  { value: '280 - 600 grit', label: '280 - 600 grit' }
];

const PowertoolsRotationalspeed = [
  { value: 'Low RPM: Below 1,000 RPM', label: 'Low RPM: Below 1,000 RPM' },
  { value: 'Medium RPM: 1,000 - 5,000 RPM', label: 'Medium RPM: 1,000 - 5,000 RPM' },
  { value: 'High RPM: Above 5,000 RPM', label: 'High RPM: Above 5,000 RPM' }
];

const PowertoolsBladeMaterial = [
  { value: 'High-Speed Steel', label: 'High-Speed Steel' },
  { value: 'Carbide-Tipped', label: 'Carbide-Tipped' },
  { value: 'Bi-Metal', label: 'Bi-Metal' },
  { value: 'Carbon Steel', label: 'Carbon Steel' },
  { value: 'Diamond', label: 'Diamond' },
  { value: 'Abrasive', label: 'Abrasive' }
];

const PowertoolsSurface = [
  { value: 'Metal', label: 'Metal' },
  { value: 'Plastic', label: 'Plastic' },
  { value: 'Rubber', label: 'Rubber' },
  { value: 'Composite Materials', label: 'Composite Materials' },
  { value: 'Wood', label: 'Wood' }
];

const PowertoolsStyle = [
  { value: 'Handheld', label: 'Handheld' },
  { value: 'Stationary', label: 'Stationary' },
  { value: 'Cordless', label: 'Cordless' },
  { value: 'Benchtop', label: 'Benchtop' },
  { value: 'Pneumatic', label: 'Pneumatic' },
  { value: 'Rotary', label: 'Rotary' },
  { value: 'Reciprocating', label: 'Reciprocating' },
  { value: 'Oscillating', label: 'Oscillating' }
];

const PowertoolsAmperage = [
  { value: 'Below 5 amps', label: 'Below 5 amps' },
  { value: '5 to 10 amps', label: '5 to 10 amps' },
  { value: 'Above 10 amps', label: 'Above 10 amps' }
];




 


function Powertools({ onDataChange, initialState, isOpen }) {

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
    const [collapse12, setCollapse12] = useState(isOpen);
    const [collapse13, setCollapse13] = useState(isOpen);
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
          image={<img src={icon15} style={{ width: "40px" }} />}
          title="Tool Type"
          open={collapse1}
          onClick={() => setCollapse1(!collapse1)}
        >
          <OneSelect
            name="toolType"
            options={PowertoolsType}
            value={initiallistingsData.toolType}
            onChange={(option) => handleSelectChange("toolType", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon4} style={{ width: "40px" }} />}
          title="Condition"
          open={collapse2}
          onClick={() => setCollapse2(!collapse2)}
        >
          <OneSelect
            name="condition"
            options={PowertoolsCondition}
            value={initiallistingsData.condition}
            onChange={(option) => handleSelectChange("condition", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon8} style={{ width: "40px" }} />}
          title="Power Source"
          open={collapse3}
          onClick={() => setCollapse3(!collapse3)}
        >
          <OneSelect
            name="powerSource"
            options={PowertoolsPowersource}
            value={initiallistingsData.powerSource}
            onChange={(option) => handleSelectChange("powerSource", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon12} style={{ width: "40px" }} />}
          title="Voltage"
          open={collapse4}
          onClick={() => setCollapse4(!collapse4)}
        >
          <OneSelect
            name="voltage"
            options={PowertoolsVoltage}
            value={initiallistingsData.voltage}
            onChange={(option) => handleSelectChange("voltage", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon2} style={{ width: "40px" }} />}
          title="Battery Life"
          open={collapse13}
          onClick={() => setCollapse13(!collapse13)}
        >
          <OneSelect
            name="batteryLife"
            options={PowertoolsBatteryLife}
            value={initiallistingsData.batteryLife}
            onChange={(option) => handleSelectChange("batteryLife", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon6} style={{ width: "40px" }} />}
          title="Material"
          open={collapse5}
          onClick={() => setCollapse5(!collapse5)}
        >
          <OneSelect
            name="material"
            options={PowertoolsMaterial}
            value={initiallistingsData.material}
            onChange={(option) => handleSelectChange("material", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon7} style={{ width: "40px" }} />}
          title="Noise Level"
          open={collapse6}
          onClick={() => setCollapse6(!collapse6)}
        >
          <OneSelect
            name="noiseLevel"
            options={PowertoolsNoiseLevel}
            value={initiallistingsData.noiseLevel}
            onChange={(option) => handleSelectChange("noiseLevel", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon16} style={{ width: "40px" }} />}
          title="Grit Number"
          open={collapse7}
          onClick={() => setCollapse7(!collapse7)}
        >
          <OneSelect
            name="gritNumber"
            options={PowertoolsGritNumber}
            value={initiallistingsData.gritNumber}
            onChange={(option) => handleSelectChange("gritNumber", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon9} style={{ width: "40px" }} />}
          title="Rotational Speed"
          open={collapse8}
          onClick={() => setCollapse8(!collapse8)}
        >
          <OneSelect
            name="rotationalSpeed"
            options={PowertoolsRotationalspeed}
            value={initiallistingsData.rotationalSpeed}
            onChange={(option) => handleSelectChange("rotationalSpeed", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon3} style={{ width: "40px" }} />}
          title="Blade Material"
          open={collapse9}
          onClick={() => setCollapse9(!collapse9)}
        >
          <OneSelect
            name="bladeMaterial"
            options={PowertoolsBladeMaterial}
            value={initiallistingsData.bladeMaterial}
            onChange={(option) => handleSelectChange("bladeMaterial", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon14} style={{ width: "40px" }} />}
          title="Surface"
          open={collapse10}
          onClick={() => setCollapse10(!collapse10)}
        >
          <OneSelect
            name="surface"
            options={PowertoolsSurface}
            value={initiallistingsData.surface}
            onChange={(option) => handleSelectChange("surface", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon11} style={{ width: "40px" }} />}
          title="Style"
          open={collapse11}
          onClick={() => setCollapse11(!collapse11)}
        >
          <OneSelect
            name="style"
            options={PowertoolsStyle}
            value={initiallistingsData.style}
            onChange={(option) => handleSelectChange("style", option.value)}
          />
        </CollapseList>
        <CollapseList
          image={<img src={icon1} style={{ width: "40px" }} />}
          title="Amperage"
          open={collapse12}
          onClick={() => setCollapse12(!collapse12)}
        >
          <OneSelect
            name="amperage"
            options={PowertoolsAmperage}
            value={initiallistingsData.amperage}
            onChange={(option) => handleSelectChange("amperage", option.value)}
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
  
  Powertools.propTypes = {
    onDataChange: PropTypes.func.isRequired,
    initialState: PropTypes.object,
    isOpen: PropTypes.bool,
  };
  
  Powertools.defaultProps = {
    initialState: {
  
      toolType: '',
      condition: '',
      powerSource: '',
      voltage: '',
      batteryLife: '',
      material: '',
      noiseLevel: '',
      gritNumber: '',
      rotationalSpeed: '',
      bladeMaterial: '',
      surface: '',
      style: '',
      amperage: '',
      moreDetails: [],
  
  
      
    },
    isOpen: false,
  };
  
export default Powertools;