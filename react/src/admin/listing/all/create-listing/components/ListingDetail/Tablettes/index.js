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
const icon1 = `${imagePath}/categoryicons/tablets/camera_specifications.svg`;
const icon2 = `${imagePath}/categoryicons/tablets/condition.svg`;
const icon3 = `${imagePath}/categoryicons/tablets/connectivity.svg`;
const icon4 = `${imagePath}/categoryicons/tablets/display_size.svg`;
const icon5 = `${imagePath}/categoryicons/tablets/operating_system.svg`;
const icon6 = `${imagePath}/categoryicons/tablets/pressure_sensitivity.svg`;
const icon7 = `${imagePath}/categoryicons/tablets/ram.svg`;
const icon8 = `${imagePath}/categoryicons/tablets/storage.svg`;
const icon9 = `${imagePath}/categoryicons/tablets/display_resolution.svg`;
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
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const TabletOperatingSystem = [
  { value: 'iOS', label: 'iOS' },
  { value: 'iPadOS', label: 'iPadOS' },
  { value: 'Android', label: 'Android' },
  { value: 'Windows', label: 'Windows' },
  { value: 'Fire OS', label: 'Fire OS' },
  { value: 'HarmonyOS', label: 'HarmonyOS' },
  { value: 'Chrome OS', label: 'Chrome OS' }
];

const TabletRAM = [
  { value: '2GB', label: '2GB' },
  { value: '3GB', label: '3GB' },
  { value: '4GB', label: '4GB' },
  { value: '6GB', label: '6GB' },
  { value: '8GB', label: '8GB' },
  { value: '12GB', label: '12GB' },
  { value: '16GB', label: '16GB' }
];

const TabletStorage = [
  { value: '32GB', label: '32GB' },
  { value: '64GB', label: '64GB' },
  { value: '128GB', label: '128GB' },
  { value: '256GB', label: '256GB' },
  { value: '512GB', label: '512GB' },
  { value: '1T', label: '1T' }
];

const TabletDisplaySize = [
  { value: '7inches', label: '7inches' },
  { value: '8inches', label: '8inches' },
  { value: '9inches', label: '9inches' },
  { value: '10inches', label: '10inches' },
  { value: '11inches', label: '11inches' },
  { value: '12inches', label: '12inches' },
  { value: '13inches', label: '13inches' },
  { value: '14inches', label: '14inches' }
];

const TabletDisplayResolution = [
  { value: 'HD (1280 x 720 pixels)', label: 'HD (1280 x 720 pixels)' },
  { value: 'Full HD (1920 x 1080 pixels)', label: 'Full HD (1920 x 1080 pixels)' },
  { value: 'Quad HD (2560 x 1440 pixels)', label: 'Quad HD (2560 x 1440 pixels)' },
  { value: '2K (2048 x 1536 pixels)', label: '2K (2048 x 1536 pixels)' },
  { value: 'Retina (Varies by manufacturer)', label: 'Retina (Varies by manufacturer)' },
  { value: '4K (3840 x 2160 pixels)', label: '4K (3840 x 2160 pixels)' }
];

const TabletConnectivity = [
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'Wi-Fi + Cellular', label: 'Wi-Fi + Cellular' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'USB-C', label: 'USB-C' },
  { value: 'Micro USB', label: 'Micro USB' },
  { value: 'Lightning', label: 'Lightning' }
];

const TabletCondition = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' },
  { value: 'Refurbished', label: 'Refurbished' }
];

function Tablettes({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Operating System"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="operatingSystem"
          options={TabletOperatingSystem}
          value={initiallistingsData.operatingSystem}
          onChange={(option) => handleSelectChange("operatingSystem", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="RAM"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="ram"
          options={TabletRAM}
          value={initiallistingsData.ram}
          onChange={(option) => handleSelectChange("ram", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Storage"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="storage"
          options={TabletStorage}
          value={initiallistingsData.storage}
          onChange={(option) => handleSelectChange("storage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Display Size"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="displaySize"
          options={TabletDisplaySize}
          value={initiallistingsData.displaySize}
          onChange={(option) => handleSelectChange("displaySize", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Display Resolution"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="displayResolution"
          options={TabletDisplayResolution}
          value={initiallistingsData.displayResolution}
          onChange={(option) => handleSelectChange("displayResolution", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="connectivity"
          options={TabletConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="condition"
          options={TabletCondition}
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


Tablettes.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Tablettes.defaultProps = {
  initialState: {


    operatingSystem: '',
    ram: '',
    storage: '',
    displaySize: '',
    displayResolution: '',
    connectivity: [],
    condition: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Tablettes;
