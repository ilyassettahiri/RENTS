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
const icon1 = `${imagePath}/categoryicons/eclairages/brand.svg`;
const icon2 = `${imagePath}/categoryicons/eclairages/brightness.svg`;
const icon3 = `${imagePath}/categoryicons/eclairages/chandeliers.svg`;
const icon4 = `${imagePath}/categoryicons/eclairages/connectivity_protocol.svg`;
const icon5 = `${imagePath}/categoryicons/eclairages/controller_type.svg`;
const icon6 = `${imagePath}/categoryicons/eclairages/eclairage.svg`;
const icon7 = `${imagePath}/categoryicons/eclairages/fixture_form.svg`;
const icon8 = `${imagePath}/categoryicons/eclairages/fixture_type.svg`;
const icon9 = `${imagePath}/categoryicons/eclairages/lamps.svg`;
const icon10 = `${imagePath}/categoryicons/eclairages/led_light.svg`;
const icon11 = `${imagePath}/categoryicons/eclairages/light_color.svg`;
const icon12 = `${imagePath}/categoryicons/eclairages/light_fixtures.svg`;
const icon13 = `${imagePath}/categoryicons/eclairages/light_source_type.svg`;
const icon14 = `${imagePath}/categoryicons/eclairages/lighting_method.svg`;
const icon15 = `${imagePath}/categoryicons/eclairages/number_of_blades.svg`;
const icon16 = `${imagePath}/categoryicons/eclairages/number_of_light_sources.svg`;
const icon17 = `${imagePath}/categoryicons/eclairages/other_equipment.svg`;
const icon18 = `${imagePath}/categoryicons/eclairages/plug_format.svg`;
const icon19 = `${imagePath}/categoryicons/eclairages/power_source.svg`;
const icon20 = `${imagePath}/categoryicons/eclairages/projectors.svg`;
const icon21 = `${imagePath}/categoryicons/eclairages/size.svg`;
const icon22 = `${imagePath}/categoryicons/eclairages/voltage.svg`;
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
  icon17,
  icon18,
  icon19,
  icon20,
  icon21,
  icon22,
  icon30
};


const MoreDetails = [
  { value: 'Smart Connectivity', label: 'Smart Connectivity' },
  { value: 'Remote Control', label: 'Remote Control' },
  { value: 'Adjustable Color RGB', label: 'Adjustable Color RGB' },
  { value: 'Motion Sensor', label: 'Motion Sensor' },
  { value: 'Timer Function', label: 'Timer Function' },
  { value: 'Dimming Capability', label: 'Dimming Capability' },
  { value: 'Light Sensors', label: 'Light Sensors' },
  { value: 'App Control', label: 'App Control' },
  { value: 'Energy Efficient', label: 'Energy Efficient' },
  { value: 'Weatherproof', label: 'Weatherproof' },
  { value: 'Easy Installation', label: 'Easy Installation' },
  { value: 'Multi-Function Remote', label: 'Multi-Function Remote' },
  { value: 'Color Temperature Adjustment', label: 'Color Temperature Adjustment' },
  { value: 'Overheat Protection', label: 'Overheat Protection' },
  { value: 'Adjustable Mounting Bracket', label: 'Adjustable Mounting Bracket' },
  { value: 'Integrated Speakers', label: 'Integrated Speakers' }
];



const eclairageBrand = [
  { value: 'Philips Lighting', label: 'Philips Lighting' },
  { value: 'Osram', label: 'Osram' },
  { value: 'GE Lighting', label: 'GE Lighting' },
  { value: 'Acuity Brands', label: 'Acuity Brands' },
  { value: 'ETC', label: 'ETC' },
  { value: 'Clay Paky', label: 'Clay Paky' },
  { value: 'Martin Professional', label: 'Martin Professional' },
  { value: 'Vari-Lite', label: 'Vari-Lite' },
  { value: 'Chauvet Professional', label: 'Chauvet Professional' },
  { value: 'Robe Lighting', label: 'Robe Lighting' }
];
const eclairageSize = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'Extra-large', label: 'Extra-large' }
];
const eclairageVoltage = [
  { value: 'Low Voltage (under 50 volts)', label: 'Low Voltage (under 50 volts)' },
  { value: 'Standard Voltage (110-120 volts)', label: 'Standard Voltage (110-120 volts)' },
  { value: 'Line Voltage (220-240 volts)', label: 'Line Voltage (220-240 volts)' },
  { value: 'High Voltage (over 240 volts)', label: 'High Voltage (over 240 volts)' }
];
const EclairageChandeliers = [
  { value: 'Traditional Chandelier', label: 'Traditional Chandelier' },
  { value: 'Crystal Chandelier', label: 'Crystal Chandelier' },
  { value: 'Modern Chandelier', label: 'Modern Chandelier' },
  { value: 'Rustic Chandelier', label: 'Rustic Chandelier' },
  { value: 'Transitional Chandelier', label: 'Transitional Chandelier' },
  { value: 'Drum Chandelier', label: 'Drum Chandelier' },
  { value: 'Sputnik Chandelier', label: 'Sputnik Chandelier' },
  { value: 'Lantern Chandelier', label: 'Lantern Chandelier' },
  { value: 'Mini Chandelier', label: 'Mini Chandelier' },
  { value: 'LED Chandelier', label: 'LED Chandelier' }
];
const EclairageLamps = [
  { value: 'Incandescent Lamps', label: 'Incandescent Lamps' },
  { value: 'Halogen Lamps', label: 'Halogen Lamps' },
  { value: 'Fluorescent Lamps', label: 'Fluorescent Lamps' },
  { value: 'LED Lamps', label: 'LED Lamps' },
  { value: 'High-Intensity Discharge Lamps', label: 'High-Intensity Discharge Lamps' },
  { value: 'Tungsten Lamps', label: 'Tungsten Lamps' }
];
const eclaiargeLight = [
  { value: 'PAR Cans', label: 'PAR Cans' },
  { value: 'Fresnel Lights', label: 'Fresnel Lights' },
  { value: 'Ellipsoidal Reflector Spotlights (ERS)', label: 'Ellipsoidal Reflector Spotlights (ERS)' },
  { value: 'LED Wash Lights', label: 'LED Wash Lights' },
  { value: 'Moving Head Lights', label: 'Moving Head Lights' },
  { value: 'Up-Lights', label: 'Up-Lights' },
  { value: 'Gobo Projectors', label: 'Gobo Projectors' },
  { value: 'String Lights', label: 'String Lights' },
  { value: 'Track Lights', label: 'Track Lights' },
  { value: 'Strip Lights', label: 'Strip Lights' }
];
const eclairageProjectors = [
  { value: 'Video Projectors', label: 'Video Projectors' },
  { value: 'Laser Projectors', label: 'Laser Projectors' },
  { value: 'Mapping Projectors', label: 'Mapping Projectors' },
  { value: 'LED Projectors', label: 'LED Projectors' },
  { value: 'Gobo Projectors', label: 'Gobo Projectors' },
  { value: 'Outdoor Projectors', label: 'Outdoor Projectors' },
  { value: 'Short Throw Projectors', label: 'Short Throw Projectors' },
  { value: 'Long Throw Projectors', label: 'Long Throw Projectors' },
  { value: '3D Projectors', label: '3D Projectors' },
  { value: 'Interactive Projectors', label: 'Interactive Projectors' }
];
const eclairageLed = [
  { value: 'ED PAR Cans', label: 'ED PAR Cans' },
  { value: 'LED Wash Lights', label: 'LED Wash Lights' },
  { value: 'LED Moving Head Lights', label: 'LED Moving Head Lights' },
  { value: 'LED Strip Lights', label: 'LED Strip Lights' },
  { value: 'LED Uplights', label: 'LED Uplights' },
  { value: 'LED Panels', label: 'LED Panels' },
  { value: 'LED Bulbs', label: 'LED Bulbs' },
  { value: 'LED Gobo Projectors', label: 'LED Gobo Projectors' }
];
const eclairagePower = [
  { value: 'AC Power', label: 'AC Power' },
  { value: 'DC Power', label: 'DC Power' },
  { value: 'Rechargeable Battery', label: 'Rechargeable Battery' },
  { value: 'External Power Supply', label: 'External Power Supply' },
  { value: 'Power over Ethernet', label: 'Power over Ethernet' },
  { value: 'Solar Power', label: 'Solar Power' }
];
const eclairageLightSourceType = [
  { value: 'LED', label: 'LED' },
  { value: 'Incandescent', label: 'Incandescent' },
  { value: 'Halogen', label: 'Halogen' },
  { value: 'Fluorescent', label: 'Fluorescent' },
  { value: 'HID', label: 'HID' },
  { value: 'Xenon', label: 'Xenon' },
  { value: 'RGB LEDs', label: 'RGB LEDs' }
];
const eclairageLightColor = [
  { value: 'White', label: 'White' },
  { value: 'Warm White', label: 'Warm White' },
  { value: 'Cool White', label: 'Cool White' },
  { value: 'Red', label: 'Red' },
  { value: 'Green', label: 'Green' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Amber', label: 'Amber' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Cyan', label: 'Cyan' },
  { value: 'Magenta', label: 'Magenta' },
  { value: 'RGB', label: 'RGB' },
  { value: 'RGBW', label: 'RGBW' },
  { value: 'RGBA', label: 'RGBA' },
  { value: 'Tunable White', label: 'Tunable White' }
];
const eclairageLightingMethod = [
  { value: 'Wash Lighting', label: 'Wash Lighting' },
  { value: 'Spotlighting', label: 'Spotlighting' },
  { value: 'Uplighting', label: 'Uplighting' },
  { value: 'Downlighting', label: 'Downlighting' },
  { value: 'Accent Lighting', label: 'Accent Lighting' },
  { value: 'Ambient Lighting', label: 'Ambient Lighting' },
  { value: 'Mood Lighting', label: 'Mood Lighting' },
  { value: 'Dynamic Lighting', label: 'Dynamic Lighting' },
  { value: 'Static Lighting', label: 'Static Lighting' },
  { value: 'attern Projection', label: 'attern Projection' },
  { value: 'Color Changing', label: 'Color Changing' }
];
const eclairageController = [
  { value: 'DMX Controller', label: 'DMX Controller' },
  { value: 'Wireless DMX Controller', label: 'Wireless DMX Controller' },
  { value: 'Software-based Controller', label: 'Software-based Controller' },
  { value: 'Standalone Controller', label: 'Standalone Controller' },
  { value: 'MIDI  Controller', label: 'MIDI  Controller' },
  { value: 'Remote Control', label: 'Remote Control' },
  { value: 'Smartphone/Tablet App', label: 'Smartphone/Tablet App' }
];
const eclairageOther = [
  { value: 'lighting kit', label: 'lighting kit' },
  { value: 'tripod', label: 'tripod' }
];

function Eclairages({ onDataChange, initialState, isOpen }) {

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
        title="Brand Name"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        



          <FormField
            
            type="text"
            name="brandName"
            placeholder="Enter Brand Name"
            value={initiallistingsData.brandName}
            onChange={(e) => handleSelectChange("brandName", e.target.value)}
          />



      </CollapseList>

      <CollapseList
        image={<img src={icon21} style={{ width: '40px' }} />}
        title="Size"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        

          <FormField
            
            type="text"
            name="size"
            placeholder="Enter size"
            value={initiallistingsData.size}
            onChange={(e) => handleSelectChange("size", e.target.value)}
          />



      </CollapseList>

      <CollapseList
        image={<img src={icon22} style={{ width: '40px' }} />}
        title="Voltage"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
       



          <FormField
            
            type="text"
            name="voltage"
            placeholder="Enter voltage"
            value={initiallistingsData.voltage}
            onChange={(e) => handleSelectChange("voltage", e.target.value)}
          />



      </CollapseList>

      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Chandeliers"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="chandeliers"
          options={EclairageChandeliers}
          value={initiallistingsData.chandeliers}
          onChange={(options) => handleSelectChange("chandeliers", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Lamps"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="lamps"
          options={EclairageLamps}
          value={initiallistingsData.lamps}
          onChange={(options) => handleSelectChange("lamps", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Light"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="light"
          options={eclaiargeLight}
          value={initiallistingsData.light}
          onChange={(options) => handleSelectChange("light", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon20} style={{ width: '40px' }} />}
        title="Projectors"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="projectors"
          options={eclairageProjectors}
          value={initiallistingsData.projectors}
          onChange={(options) => handleSelectChange("projectors", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Led"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="led"
          options={eclairageLed}
          value={initiallistingsData.led}
          onChange={(options) => handleSelectChange("led", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon19} style={{ width: '40px' }} />}
        title="Power"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        



          <FormField
            
            type="text"
            name="power"
            placeholder="Enter power"
            value={initiallistingsData.power}
            onChange={(e) => handleSelectChange("power", e.target.value)}
          />




      </CollapseList>

      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Light Source Type"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        



          <FormField
            
            type="text"
            name="lightSourceType"
            placeholder="Enter Light SourceType"
            value={initiallistingsData.lightSourceType}
            onChange={(e) => handleSelectChange("lightSourceType", e.target.value)}
          />





      </CollapseList>

      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Light Color"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <MultSelect
          name="lightColor"
          options={eclairageLightColor}
          value={initiallistingsData.lightColor}
          onChange={(options) => handleSelectChange("lightColor", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Lighting Method"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <MultSelect
          name="lightingMethod"
          options={eclairageLightingMethod}
          value={initiallistingsData.lightingMethod}
          onChange={(options) => handleSelectChange("lightingMethod", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Controller"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        




          <FormField
            
            type="text"
            name="controller"
            placeholder="Enter controller"
            value={initiallistingsData.controller}
            onChange={(e) => handleSelectChange("controller", e.target.value)}
          />




      </CollapseList>

      <CollapseList
        image={<img src={icon17} style={{ width: '40px' }} />}
        title="Other"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <MultSelect
          name="other"
          options={eclairageOther}
          value={initiallistingsData.other}
          onChange={(options) => handleSelectChange("other", options)}
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

Eclairages.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Eclairages.defaultProps = {
  initialState: {


    brandName: '',
    size: '',
    voltage: '',
    chandeliers: [],
    lamps: [],
    light: [],
    projectors: [],
    led: [],
    power: '',
    lightSourceType: '',
    lightColor: [],
    lightingMethod: [],
    controller: '',
    other: [],
    moreDetails: [],

    
  },
  isOpen: false,
};
export default Eclairages;
