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
const icon1 = `${imagePath}/categoryicons/mechanicaltools/battery_life.svg`;
const icon2 = `${imagePath}/categoryicons/mechanicaltools/blade_diameter.svg`;
const icon3 = `${imagePath}/categoryicons/mechanicaltools/condition.svg`;
const icon4 = `${imagePath}/categoryicons/mechanicaltools/dimensions.svg`;
const icon5 = `${imagePath}/categoryicons/mechanicaltools/materiall.svg`;
const icon6 = `${imagePath}/categoryicons/mechanicaltools/power_source.svg`;
const icon7 = `${imagePath}/categoryicons/mechanicaltools/style.svg`;
const icon8 = `${imagePath}/categoryicons/mechanicaltools/voltage.svg`;
const icon9 = `${imagePath}/categoryicons/mechanicaltools/materiall.svg`;
const icon10 = `${imagePath}/categoryicons/mechanicaltools/tool_type.svg`;
const icon11 = `${imagePath}/categoryicons/mechanicaltools/cutting_width.svg`;
const icon12 = `${imagePath}/categoryicons/mechanicaltools/carburetor_type.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const MechanicaltoolsTooltype = [
  { value: 'Wrenches', label: 'Wrenches' },
  { value: 'Screwdrivers', label: 'Screwdrivers' },
  { value: 'Pliers', label: 'Pliers' },
  { value: 'Hammers', label: 'Hammers' },
  { value: 'Socket wrench set', label: 'Socket wrench set' },
  { value: 'Allen wrench set', label: 'Allen wrench set' },
  { value: 'Ratchet and socket set', label: 'Ratchet and socket set' },
  { value: 'Spanners', label: 'Spanners' },
  { value: 'Hand saws', label: 'Hand saws' },
  { value: 'Chisels', label: 'Chisels' },
  { value: 'Files', label: 'Files' },
  { value: 'Clamps', label: 'Clamps' },
  { value: 'Vise grips', label: 'Vise grips' },
  { value: 'Pry bars', label: 'Pry bars' },
  { value: 'Bolt cutters', label: 'Bolt cutters' },
  { value: 'Grease guns', label: 'Grease guns' },
  { value: 'Wire strippers', label: 'Wire strippers' },
  { value: 'Measuring tools', label: 'Measuring tools' },
  { value: 'Levels', label: 'Levels' },
  { value: 'Torque wrenches', label: 'Torque wrenches' }
];

const MechanicaltoolsCondition = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

const MechanicaltoolsPowersource = [
  { value: 'Electricity', label: 'Electricity' },
  { value: 'Battery', label: 'Battery' },
  { value: 'Pneumatic', label: 'Pneumatic' },
  { value: 'Hydraulic', label: 'Hydraulic' },
  { value: 'Gasoline-Powered', label: 'Gasoline-Powered' }
];

const MechanicaltoolsVoltage = [
  { value: '110-120 Volts', label: '110-120 Volts' },
  { value: '18 Volts', label: '18 Volts' },
  { value: '24 Volts', label: '24 Volts' },
  { value: '36 Volts', label: '36 Volts' },
  { value: '40 Volts', label: '40 Volts' },
  { value: '80 Volts', label: '80 Volts' }
];

const MechanicaltoolsBatterylife = [
  { value: '1.5 - 3 Ah', label: '1.5 - 3 Ah' },
  { value: '3 - 5 Ah', label: '3 - 5 Ah' },
  { value: '5 - 7 Ah', label: '5 - 7 Ah' },
  { value: '7+ Ah', label: '7+ Ah' }
];

const MechanicaltoolsBladediameter = [
  { value: '4 - 6 inches', label: '4 - 6 inches' },
  { value: '7 - 8 inches', label: '7 - 8 inches' },
  { value: '10 - 12 inches', label: '10 - 12 inches' },
  { value: '14 inches and above', label: '14 inches and above' }
];

const MechanicaltoolsMaterial = [
  { value: 'Steel', label: 'Steel' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Titanium', label: 'Titanium' },
  { value: 'Carbide', label: 'Carbide' },
  { value: 'High-speed steel', label: 'High-speed steel' },
  { value: 'Chrome vanadium', label: 'Chrome vanadium' },
  { value: 'Stainless steel', label: 'Stainless steel' },
  { value: 'Cast iron', label: 'Cast iron' },
  { value: 'Plastic/composite materials', label: 'Plastic/composite materials' },
  { value: 'Wood', label: 'Wood' }
];

const MechanicaltoolsStyle = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Compact', label: 'Compact' },
  { value: 'Heavy-duty', label: 'Heavy-duty' },
  { value: 'Ergonomic', label: 'Ergonomic' },
  { value: 'Precision', label: 'Precision' },
  { value: 'Multi-functional', label: 'Multi-functional' },
  { value: 'Adjustable', label: 'Adjustable' },
  { value: 'Modular', label: 'Modular' },
  { value: 'Professional', label: 'Professional' },
  { value: 'DIY/Homeowner', label: 'DIY/Homeowner' }
];

const MechanicaltoolsCuttingwidth = [
  { value: '1/4 inch - 1/2 inch', label: '1/4 inch - 1/2 inch' },
  { value: '1/2 inch - 1 inch', label: '1/2 inch - 1 inch' },
  { value: '1 inch - 2 inches', label: '1 inch - 2 inches' },
  { value: '2 inches and above', label: '2 inches and above' }
];

const MechanicaltoolsCarburetortype = [
  { value: 'Float carburetor', label: 'Float carburetor' },
  { value: 'Diaphragm carburetor', label: 'Diaphragm carburetor' },
  { value: 'Fixed-jet carburetor', label: 'Fixed-jet carburetor' },
  { value: 'Variable venturi carburetor', label: 'Variable venturi carburetor' },
  { value: 'Downdraft carburetor', label: 'Downdraft carburetor' },
  { value: 'Updraft carburetor', label: 'Updraft carburetor' }
];

function Mechanicaltools({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Tool Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="toolType"
          options={MechanicaltoolsTooltype}
          value={initiallistingsData.toolType}
          onChange={(option) => handleSelectChange("toolType", option.value)}
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
          options={MechanicaltoolsCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Power Source"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="powerSource"
          options={MechanicaltoolsPowersource}
          value={initiallistingsData.powerSource}
          onChange={(option) => handleSelectChange("powerSource", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Voltage"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="voltage"
          options={MechanicaltoolsVoltage}
          value={initiallistingsData.voltage}
          onChange={(option) => handleSelectChange("voltage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Battery life"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="batteryLife"
          options={MechanicaltoolsBatterylife}
          value={initiallistingsData.batteryLife}
          onChange={(option) => handleSelectChange("batteryLife", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Blade Diameter"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="bladeDiameter"
          options={MechanicaltoolsBladediameter}
          value={initiallistingsData.bladeDiameter}
          onChange={(option) => handleSelectChange("bladeDiameter", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Material"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="material"
          options={MechanicaltoolsMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Style"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="style"
          options={MechanicaltoolsStyle}
          value={initiallistingsData.style}
          onChange={(option) => handleSelectChange("style", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Cutting Width"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="cuttingWidth"
          options={MechanicaltoolsCuttingwidth}
          value={initiallistingsData.cuttingWidth}
          onChange={(option) => handleSelectChange("cuttingWidth", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Carburetor type"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="carburetorType"
          options={MechanicaltoolsCarburetortype}
          value={initiallistingsData.carburetorType}
          onChange={(option) => handleSelectChange("carburetorType", option.value)}
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

Mechanicaltools.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Mechanicaltools.defaultProps = {
  initialState: {


    toolType: '',
    condition: '',
    powerSource: '',
    voltage: '',
    batteryLife: '',
    bladeDiameter: '',
    material: '',
    style: '',
    cuttingWidth: '',
    carburetorType: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Mechanicaltools;
