

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
const icon1 = `${imagePath}/categoryicons/electricaltools/amperage.svg`;
const icon2 = `${imagePath}/categoryicons/electricaltools/battery_life.svg`;
const icon3 = `${imagePath}/categoryicons/electricaltools/compatibility.svg`;
const icon4 = `${imagePath}/categoryicons/electricaltools/condition.svg`;
const icon5 = `${imagePath}/categoryicons/electricaltools/cord_length.svg`;
const icon6 = `${imagePath}/categoryicons/electricaltools/detector.svg`;
const icon7 = `${imagePath}/categoryicons/electricaltools/diode.svg`;
const icon8 = `${imagePath}/categoryicons/electricaltools/display.svg`;
const icon9 = `${imagePath}/categoryicons/electricaltools/frequency.svg`;
const icon10 = `${imagePath}/categoryicons/electricaltools/included_accessories.svg`;
const icon11 = `${imagePath}/categoryicons/electricaltools/operating_altitude.svg`;
const icon12 = `${imagePath}/categoryicons/electricaltools/temperature.svg`;
const icon13 = `${imagePath}/categoryicons/electricaltools/voltage_sensing_range.svg`;
const icon14 = `${imagePath}/categoryicons/electricaltools/voltage.svg`;
const icon15 = `${imagePath}/categoryicons/electricaltools/binding_angle.svg`;
const icon16 = `${imagePath}/categoryicons/electricaltools/tool_type.svg`;
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
  
  
  { value: 'Rotating Head', label: 'Rotating Head' },
  { value: 'Automatic Feed Mechanism', label: 'Automatic Feed Mechanism' },
  { value: 'Included Carrying Case', label: 'Included Carrying Case' },
  { value: 'Built-In Storage Compartments', label: 'Built-In Storage Compartments' },
  { value: 'Hang Hook or Storage Loop', label: 'Hang Hook or Storage Loop' },
  { value: 'Stackable Design', label: 'Stackable Design' },
  { value: 'Calibration Tools Included', label: 'Calibration Tools Included' },
  { value: 'Maintenance Alerts', label: 'Maintenance Alerts' },
  { value: 'Self-Diagnostic Features', label: 'Self-Diagnostic Features' },
  { value: 'Easy-to-Replace Parts', label: 'Easy-to-Replace Parts' },
  { value: 'Tool Belt', label: 'Tool Belt' },
  { value: 'Magnetic Tool Holder', label: 'Magnetic Tool Holder' },
  { value: 'Quick-Release Clamps', label: 'Quick-Release Clamps' },
  { value: 'Replacement Parts and Consumables', label: 'Replacement Parts and Consumables' },
  { value: 'Extension Cords', label: 'Extension Cords' }
];




const ElectricaltoolsTooltype = [
  { value: 'Power drills', label: 'Power drills' },
  { value: 'Circular saws', label: 'Circular saws' },
  { value: 'Angle grinders', label: 'Angle grinders' },
  { value: 'Jigsaws', label: 'Jigsaws' },
  { value: 'Power sanders', label: 'Power sanders' },
  { value: 'Electric screwdrivers', label: 'Electric screwdrivers' },
  { value: 'Rotary tools (Dremel)', label: 'Rotary tools (Dremel)' },
  { value: 'Heat guns', label: 'Heat guns' },
  { value: 'Electric planers', label: 'Electric planers' },
  { value: 'Soldering irons', label: 'Soldering irons' },
  { value: 'Multimeters', label: 'Multimeters' },
  { value: 'Voltage testers', label: 'Voltage testers' },
  { value: 'Wire strippers', label: 'Wire strippers' },
  { value: 'Cable cutters', label: 'Cable cutters' },
  { value: 'Crimping tools', label: 'Crimping tools' },
  { value: 'Electric staplers', label: 'Electric staplers' },
  { value: 'Electric nail guns', label: 'Electric nail guns' },
  { value: 'Heat shrink guns', label: 'Heat shrink guns' },
  { value: 'Electrical tape dispensers', label: 'Electrical tape dispensers' },
  { value: 'Wire brushes (for cleaning)', label: 'Wire brushes (for cleaning)' },
  { value: 'Oscilloscopes', label: 'Oscilloscopes' },
  { value: 'Bench power supplies', label: 'Bench power supplies' },
  { value: 'Circuit breakers', label: 'Circuit breakers' },
  { value: 'Voltage regulators', label: 'Voltage regulators' },
  { value: 'Insulation testers', label: 'Insulation testers' }
];

const ElectricaltoolsCondition = [
  { value: 'new', label: 'New' },
  { value: 'Used', label: 'Used' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

const ElectricaltoolsVoltage = [
  { value: '12V - 20V', label: '12V - 20V' },
  { value: '120V - 18V', label: '120V - 18V' },
  { value: '3.6V - 12V', label: '3.6V - 12V' },
  { value: '120V - 12V', label: '120V - 12V' },
  { value: '120V', label: '120V' },
  { value: '25W - 60W', label: '25W - 60W' },
  { value: '9V - 1.5V', label: '9V - 1.5V' }
];

const ElectricaltoolsAmperage = [
  { value: '10A', label: '10A' },
  { value: '7.2A', label: '7.2A' },
  { value: '6.8A', label: '6.8A' },
  { value: '4.5A', label: '4.5A' },
  { value: '2.0A', label: '2.0A' },
  { value: '3.0A', label: '3.0A' },
  { value: '12A', label: '12A' },
  { value: '9A', label: '9A' },
  { value: '3.5A', label: '3.5A' },
  { value: '0.2A', label: '0.2A' },
  { value: '0.1A', label: '0.1A' },
  { value: '0.3A', label: '0.3A' },
  { value: '0.4A', label: '0.4A' },
  { value: '5.5A', label: '5.5A' },
  { value: '6A', label: '6A' },
  { value: '7A', label: '7A' },
  { value: '4A', label: '4A' },
  { value: '8A', label: '8A' },
  { value: '6.5A', label: '6.5A' },
  { value: '7.5A', label: '7.5A' },
  { value: '5A', label: '5A' }
];

const ElectricaltoolsCordlength = [
  { value: '6 ft', label: '6 ft' },
  { value: '10 ft', label: '10 ft' },
  { value: '8 ft', label: '8 ft' },
  { value: '12 ft', label: '12 ft' },
  { value: '15 ft', label: '15 ft' },
  { value: '3 ft', label: '3 ft' },
  { value: '5 ft', label: '5 ft' },
  { value: '7 ft', label: '7 ft' },
  { value: '9 ft', label: '9 ft' },
  { value: '4 ft', label: '4 ft' }
];

const ElectricaltoolsBatterylife = [
  { value: '1 hour', label: '1 hour' },
  { value: '2 hours', label: '2 hours' },
  { value: '3 hours', label: '3 hours' },
  { value: '4 hours', label: '4 hours' },
  { value: '5 hours', label: '5 hours' },
  { value: '6 hours', label: '6 hours' },
  { value: '7 hours', label: '7 hours' },
  { value: '8 hours', label: '8 hours' },
  { value: '9 hours', label: '9 hours' },
  { value: '10 hours', label: '10 hours' },
  { value: '12 hours', label: '12 hours' },
  { value: '15 hours', label: '15 hours' }
];

const ElectricaltoolsDisplay = [
  { value: 'LCD screen', label: 'LCD screen' },
  { value: 'LED indicator', label: 'LED indicator' },
  { value: 'Digital readout', label: 'Digital readout' },
  { value: 'Touchscreen interface', label: 'Touchscreen interface' },
  { value: 'Backlit display', label: 'Backlit display' },
  { value: 'Graphical user interface', label: 'Graphical user interface' },
  { value: 'Color display', label: 'Color display' }
];

const ElectricaltoolsFrequency = [
  { value: '50-60 Hz', label: '50-60 Hz' },
  { value: '100 Hz', label: '100 Hz' },
  { value: '200 Hz', label: '200 Hz' },
  { value: '400 Hz', label: '400 Hz' },
  { value: '1 kHz', label: '1 kHz' },
  { value: '5 kHz', label: '5 kHz' },
  { value: '10 kHz', label: '10 kHz' },
  { value: '20 kHz', label: '20 kHz' },
  { value: '50 kHz', label: '50 kHz' },
  { value: '100 kHz', label: '100 kHz' }
];

const ElectricaltoolsTemperature = [
  { value: '10°C to 40°C', label: '10°C to 40°C' },
  { value: '-20°C to 60°C', label: '-20°C to 60°C' },
  { value: '40°C', label: '40°C' },
  { value: '0°C to 50°C', label: '0°C to 50°C' },
  { value: '50°C to 450°C', label: '50°C to 450°C' },
  { value: '25°C ± 5°C', label: '25°C ± 5°C' },
  { value: '±2°C', label: '±2°C' },
  { value: '70°C', label: '70°C' },
  { value: 'Up to 200°C', label: 'Up to 200°C' },
  { value: '-20°C', label: '-20°C' }
];

const ElectricaltoolsVoltagesensingranges = [
  { value: '0-600 volts', label: '0-600 volts' },
  { value: '0-1000 volts', label: '0-1000 volts' },
  { value: '0-120 volts', label: '0-120 volts' },
  { value: '0-250 volts', label: '0-250 volts' },
  { value: '0-500 volts', label: '0-500 volts' },
  { value: '0-200 volts', label: '0-200 volts' },
  { value: '0-300 volts', label: '0-300 volts' },
  { value: '0-400 volts', label: '0-400 volts' },
  { value: '0-800 volts', label: '0-800 volts' },
  { value: '0-1500 volts', label: '0-1500 volts' }
];


const ElectricaltoolsDetector = [
  { value: 'Voltage detector', label: 'Voltage detector' },
  { value: 'Current detector', label: 'Current detector' },
  { value: 'Metal detector', label: 'Metal detector' },
  { value: 'Stud finder', label: 'Stud finder' },
  { value: 'Cable detector', label: 'Cable detector' },
  { value: 'Wire tracer', label: 'Wire tracer' },
  { value: 'Gas leak detector', label: 'Gas leak detector' },
  { value: 'Moisture detector', label: 'Moisture detector' },
  { value: 'Temperature detector', label: 'Temperature detector' },
  { value: 'Frequency detector', label: 'Frequency detector' }
];

const ElectricaltoolsOperatingaltitude = [
  { value: '0-2000 meters', label: '0-2000 meters' },
  { value: '0-3000 meters', label: '0-3000 meters' },
  { value: '0-4000 meters', label: '0-4000 meters' },
  { value: '0-5000 meters', label: '0-5000 meters' },
  { value: '0-6000 meters', label: '0-6000 meters' },
  { value: '0-7000 meters', label: '0-7000 meters' },
  { value: '0-8000 meters', label: '0-8000 meters' },
  { value: '0-9000 meters', label: '0-9000 meters' },
  { value: '0-10000 meters', label: '0-10000 meters' },
  { value: '0-12000 meters', label: '0-12000 meters' }
];

const ElectricaltoolsCompatible = [
  { value: 'AC power sources', label: 'AC power sources' },
  { value: 'DC power sources', label: 'DC power sources' },
  { value: '110V electrical systems', label: '110V electrical systems' },
  { value: '220V electrical systems', label: '220V electrical systems' },
  { value: 'Standard electrical outlets', label: 'Standard electrical outlets' },
  { value: 'Specific battery models (e.g., AA, AAA, lithium-ion)', label: 'Specific battery models (e.g., AA, AAA, lithium-ion)' },
  { value: 'Various accessories and attachments', label: 'Various accessories and attachments' }
];

const ElectricaltoolsBindingangle = [
  { value: '0-90 degrees', label: '0-90 degrees' },
  { value: '0-180 degrees', label: '0-180 degrees' },
  { value: '0-270 degrees', label: '0-270 degrees' },
  { value: '0-360 degrees', label: '0-360 degrees' },
  { value: '0-45 degrees', label: '0-45 degrees' },
  { value: '0-60 degrees', label: '0-60 degrees' },
  { value: '0-120 degrees', label: '0-120 degrees' },
  { value: '0-135 degrees', label: '0-135 degrees' },
  { value: '0-150 degrees', label: '0-150 degrees' },
  { value: '0-170 degrees', label: '0-170 degrees' }
];

const ElectricaltoolsAccessories = [
  { value: 'Drill bits', label: 'Drill bits' },
  { value: 'Saw blades', label: 'Saw blades' },
  { value: 'Sanding discs', label: 'Sanding discs' },
  { value: 'Grinding wheels', label: 'Grinding wheels' },
  { value: 'Router bits', label: 'Router bits' },
  { value: 'Screwdriver bits', label: 'Screwdriver bits' },
  { value: 'Impact sockets', label: 'Impact sockets' },
  { value: 'Jigsaw blades', label: 'Jigsaw blades' },
  { value: 'Wire brushes', label: 'Wire brushes' },
  { value: 'Cutting wheels', label: 'Cutting wheels' },
  { value: 'Chisels', label: 'Chisels' },
  { value: 'Clamps', label: 'Clamps' },
  { value: 'Batteries', label: 'Batteries' },
  { value: 'Chargers', label: 'Chargers' },
  { value: 'Carrying cases', label: 'Carrying cases' },
  { value: 'Dust collection bags', label: 'Dust collection bags' },
  { value: 'Safety goggles', label: 'Safety goggles' },
  { value: 'Ear protection', label: 'Ear protection' },
  { value: 'Tool belts', label: 'Tool belts' },
  { value: 'Work gloves', label: 'Work gloves' }
];

const ElectricaltoolsStyle = [
  { value: 'Corded', label: 'Corded' },
  { value: 'Cordless', label: 'Cordless' },
  { value: 'Handheld', label: 'Handheld' },
  { value: 'Benchtop', label: 'Benchtop' },
  { value: 'Compact', label: 'Compact' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Professional-grade', label: 'Professional-grade' },
  { value: 'Heavy-duty', label: 'Heavy-duty' },
  { value: 'Lightweight', label: 'Lightweight' },
  { value: 'Ergonomic', label: 'Ergonomic' },
  { value: 'Portable', label: 'Portable' },
  { value: 'Multi-functional', label: 'Multi-functional' },
  { value: 'Precision', label: 'Precision' },
  { value: 'Robust', label: 'Robust' },
  { value: 'High-performance', label: 'High-performance' },
  { value: 'Slimline', label: 'Slimline' },
  { value: 'Retro', label: 'Retro' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Specialized', label: 'Specialized' }
];


function Electricaltools({ onDataChange, initialState, isOpen }) {

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
  const [collapse14, setCollapse14] = useState(isOpen);
  const [collapse15, setCollapse15] = useState(isOpen);
  const [collapse16, setCollapse16] = useState(isOpen);
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
        image={<img src={icon16} style={{ width: "40px" }} />}
        title="Tool Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="toolType"
          options={ElectricaltoolsTooltype}
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
          options={ElectricaltoolsCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: "40px" }} />}
        title="Voltage"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="voltage"
          options={ElectricaltoolsVoltage}
          value={initiallistingsData.voltage}
          onChange={(option) => handleSelectChange("voltage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Amperage"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="amperage"
          options={ElectricaltoolsAmperage}
          value={initiallistingsData.amperage}
          onChange={(options) => handleSelectChange("amperage", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Cord Length"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="cordLength"
          options={ElectricaltoolsCordlength}
          value={initiallistingsData.cordLength}
          onChange={(options) => handleSelectChange("cordLength", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Battery Life"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="batteryLife"
          options={ElectricaltoolsBatterylife}
          value={initiallistingsData.batteryLife}
          onChange={(options) => handleSelectChange("batteryLife", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Display"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="display"
          options={ElectricaltoolsDisplay}
          value={initiallistingsData.display}
          onChange={(option) => handleSelectChange("display", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Frequency"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="frequency"
          options={ElectricaltoolsFrequency}
          value={initiallistingsData.frequency}
          onChange={(option) => handleSelectChange("frequency", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: "40px" }} />}
        title="Temperature"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="temperature"
          options={ElectricaltoolsTemperature}
          value={initiallistingsData.temperature}
          onChange={(options) => handleSelectChange("temperature", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: "40px" }} />}
        title="Voltage Sensing Ranges"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="voltageSensingRanges"
          options={ElectricaltoolsVoltagesensingranges}
          value={initiallistingsData.voltageSensingRanges}
          onChange={(option) => handleSelectChange("voltageSensingRanges", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Detector"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="detector"
          options={ElectricaltoolsDetector}
          value={initiallistingsData.detector}
          onChange={(option) => handleSelectChange("detector", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: "40px" }} />}
        title="Operating Altitude"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="operatingAltitude"
          options={ElectricaltoolsOperatingaltitude}
          value={initiallistingsData.operatingAltitude}
          onChange={(option) => handleSelectChange("operatingAltitude", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Compatible"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <OneSelect
          name="compatible"
          options={ElectricaltoolsCompatible}
          value={initiallistingsData.compatible}
          onChange={(option) => handleSelectChange("compatible", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: "40px" }} />}
        title="Binding Angle"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <MultSelect
          name="bindingAngle"
          options={ElectricaltoolsBindingangle}
          value={initiallistingsData.bindingAngle}
          onChange={(options) => handleSelectChange("bindingAngle", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="Accessories"
        open={collapse15}
        onClick={() => setCollapse15(!collapse15)}
      >
        <OneSelect
          name="accessories"
          options={ElectricaltoolsAccessories}
          value={initiallistingsData.accessories}
          onChange={(option) => handleSelectChange("accessories", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon16} style={{ width: "40px" }} />}
        title="Style"
        open={collapse16}
        onClick={() => setCollapse16(!collapse16)}
      >
        <OneSelect
          name="style"
          options={ElectricaltoolsStyle}
          value={initiallistingsData.style}
          onChange={(option) => handleSelectChange("style", option.value)}
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

Electricaltools.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Electricaltools.defaultProps = {
  initialState: {

    toolType: '',
    condition: '',
    voltage: '',
    amperage: [],
    cordLength: [],
    batteryLife: [],
    display: '',
    frequency: '',
    temperature: [],
    voltageSensingRanges: '',
    detector: '',
    operatingAltitude: '',
    compatible: '',
    bindingAngle: [],
    accessories: '',
    style: '',
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Electricaltools;