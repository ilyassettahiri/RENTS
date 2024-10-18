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
const icon1 = `${imagePath}/categoryicons/lightings/color_temperature.svg`;
const icon2 = `${imagePath}/categoryicons/lightings/compatibility.svg`;
const icon3 = `${imagePath}/categoryicons/lightings/condition.svg`;
const icon4 = `${imagePath}/categoryicons/lightings/connectivity.svg`;
const icon5 = `${imagePath}/categoryicons/lightings/dimensions.svg`;
const icon6 = `${imagePath}/categoryicons/lightings/included_accessories.svg`;
const icon7 = `${imagePath}/categoryicons/lightings/led_light.svg`;
const icon8 = `${imagePath}/categoryicons/lightings/self_timer.svg`;
const icon9 = `${imagePath}/categoryicons/lightings/weight.svg`;
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
  { value: 'Adjustable Brightness', label: 'Adjustable Brightness' },
  { value: 'Color Changing', label: 'Color Changing' },
  { value: 'Flicker-Free Technology', label: 'Flicker-Free Technology' },
  { value: 'Dimmable', label: 'Dimmable' },
  { value: 'Remote Control Functionality', label: 'Remote Control Functionality' },
  { value: 'Built-in Effects', label: 'Built-in Effects' },
  { value: 'Light Diffuser', label: 'Light Diffuser' },
  { value: 'Battery Operated', label: 'Battery Operated' },
  { value: 'Mounting Options', label: 'Mounting Options' },
  { value: 'Safety Features', label: 'Safety Features' }
];



const LightingConnectivity = [
  { value: 'USB', label: 'USB' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'DMX', label: 'DMX' },
  { value: 'Remote Control', label: 'Remote Control' },
  { value: 'Cable Connections', label: 'Cable Connections' }
];

const LightingIncludedAccessories = [
  { value: 'Light Stands', label: 'Light Stands' },
  { value: 'Softboxes', label: 'Softboxes' },
  { value: 'Diffusion Panels', label: 'Diffusion Panels' },
  { value: 'Color Filters/Gels', label: 'Color Filters/Gels' },
  { value: 'Carrying Case/Bag', label: 'Carrying Case/Bag' },
  { value: 'Power Adapters', label: 'Power Adapters' },
  { value: 'Remote Control', label: 'Remote Control' },
  { value: 'Mounting Hardware', label: 'Mounting Hardware' },
  { value: 'Batteries', label: 'Batteries' }
];

const LightingCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

const LightingColorTemperature = [
  { value: 'Warm White: 2700K - 3000K', label: 'Warm White: 2700K - 3000K' },
  { value: 'Soft White: 3000K - 3500K', label: 'Soft White: 3000K - 3500K' },
  { value: 'Neutral White: 3500K - 4000K', label: 'Neutral White: 3500K - 4000K' },
  { value: 'Cool White: 4000K - 4500K', label: 'Cool White: 4000K - 4500K' },
  { value: 'Daylight: 5000K - 6500K', label: 'Daylight: 5000K - 6500K' },
  { value: 'Cool Daylight: 6500K - 7500K', label: 'Cool Daylight: 6500K - 7500K' }
];

const LightingCompatibility = [
  { value: 'Camera', label: 'Camera' },
  { value: 'Smartphones', label: 'Smartphones' },
  { value: 'Software/Apps', label: 'Software/Apps' },
  { value: 'Streaming Platforms', label: 'Streaming Platforms' },
  { value: 'Tripods/Mounting Systems', label: 'Tripods/Mounting Systems' },
  { value: 'Studio Equipment', label: 'Studio Equipment' }
];

function Lightings({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
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
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="connectivity"
          options={LightingConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Included Accessories"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="includedAccessories"
          options={LightingIncludedAccessories}
          value={initiallistingsData.includedAccessories}
          onChange={(options) => handleSelectChange("includedAccessories", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="condition"
          options={LightingCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Color Temperature"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="colorTemperature"
          options={LightingColorTemperature}
          value={initiallistingsData.colorTemperature}
          onChange={(options) => handleSelectChange("colorTemperature", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Compatibility"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="compatibility"
          options={LightingCompatibility}
          value={initiallistingsData.compatibility}
          onChange={(options) => handleSelectChange("compatibility", options)}
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

Lightings.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Lightings.defaultProps = {
  initialState: {


    connectivity: [],
    includedAccessories: [],
    condition: '',
    colorTemperature: [],
    compatibility: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Lightings;
