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
const icon1 = `${imagePath}/categoryicons/laptops/battery_life.svg`;
const icon2 = `${imagePath}/categoryicons/laptops/condition.svg`;
const icon3 = `${imagePath}/categoryicons/laptops/graphic_card.svg`;
const icon4 = `${imagePath}/categoryicons/laptops/number_of_ports.svg`;
const icon5 = `${imagePath}/categoryicons/laptops/operating_system.svg`;
const icon6 = `${imagePath}/categoryicons/laptops/ram.svg`;
const icon7 = `${imagePath}/categoryicons/laptops/screen_size.svg`;
const icon8 = `${imagePath}/categoryicons/laptops/storage.svg`;
const icon9 = `${imagePath}/categoryicons/laptops/touch_screen.svg`;
const icon10 = `${imagePath}/categoryicons/laptops/weight.svg`;
const icon11 = `${imagePath}/categoryicons/laptops/cpu.svg`;
const icon12 = `${imagePath}/categoryicons/laptops/resolution.svg`;
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


const ComputerRam = [
  { value: '4GB', label: '4GB' },
  { value: '8GB', label: '8GB' },
  { value: '16GB', label: '16GB' },
  { value: '32GB', label: '32GB' },
  { value: '64GB', label: '64GB' },
  { value: '128GB', label: '128GB' },
  { value: '256GB', label: '256GB' },
  { value: '512GB', label: '512GB' },
  { value: '1TB', label: '1TB' },
  { value: '2TB', label: '2TB' }
];

const ComputerGraphicsCard = [
  { value: 'NVIDIA', label: 'NVIDIA' },
  { value: 'AMD', label: 'AMD' },
  { value: 'ASUS', label: 'ASUS' },
  { value: 'Gigabyte', label: 'Gigabyte' },
  { value: 'MSI', label: 'MSI' },
  { value: 'EVGA', label: 'EVGA' },
  { value: 'Zotac', label: 'Zotac' },
  { value: 'Sapphire', label: 'Sapphire' },
  { value: 'XFX', label: 'XFX' },
  { value: 'Palit', label: 'Palit' }
];

const ComputerOperatingSystem = [
  { value: 'Microsoft Windows', label: 'Microsoft Windows' },
  { value: 'macOS', label: 'macOS' },
  { value: 'Linux', label: 'Linux' },
  { value: 'Chrome OS', label: 'Chrome OS' }
];

const ComputerNumberPorts = [
  { value: 'USB ports', label: 'USB ports' },
  { value: 'HDMI ports', label: 'HDMI ports' },
  { value: 'DisplayPort', label: 'DisplayPort' },
  { value: 'Ethernet port', label: 'Ethernet port' },
  { value: 'Audio jacks', label: 'Audio jacks' },
  { value: 'Thunderbolt ports', label: 'Thunderbolt ports' },
  { value: 'VGA ports', label: 'VGA ports' },
  { value: 'SD card reader', label: 'SD card reader' }
];

const ComputerBatteryLife = [
  { value: 'Up to 8 hours', label: 'Up to 8 hours' },
  { value: 'Up to 10 hours', label: 'Up to 10 hours' },
  { value: 'Up to 12 hours', label: 'Up to 12 hours' },
  { value: 'Up to 14 hours', label: 'Up to 14 hours' },
  { value: 'Up to 16 hours', label: 'Up to 16 hours' },
  { value: 'Up to 18 hours', label: 'Up to 18 hours' },
  { value: 'Up to 20 hours', label: 'Up to 20 hours' }
];

const ComputerStorage = [
  { value: '64GB', label: '64GB' },
  { value: '256GB', label: '256GB' },
  { value: '512GB', label: '512GB' },
  { value: '1TB', label: '1TB' },
  { value: '2TB', label: '2TB' }
];

const ComputerResolution = [
  { value: '1920 x 1080 pixels (Full HD)', label: '1920 x 1080 pixels (Full HD)' },
  { value: '1366 x 768 pixels (HD)', label: '1366 x 768 pixels (HD)' },
  { value: '2560 x 1440 pixels (QHD or WQHD)', label: '2560 x 1440 pixels (QHD or WQHD)' },
  { value: '3840 x 2160 pixels (4K Ultra HD)', label: '3840 x 2160 pixels (4K Ultra HD)' },
  { value: '1280 x 800 pixels (WXGA)', label: '1280 x 800 pixels (WXGA)' }
];

const ComputerWeight = [
  { value: '1.2 kg', label: '1.2 kg' },
  { value: '1.4 kg', label: '1.4 kg' },
  { value: '1.6 kg', label: '1.6 kg' },
  { value: '1.8 kg', label: '1.8 kg' },
  { value: '2.0 kg', label: '2.0 kg' },
  { value: '2.2 kg', label: '2.2 kg' },
  { value: '2.3 kg', label: '2.3 kg' },
  { value: '2.5 kg', label: '2.5 kg' },
  { value: '2.7 kg', label: '2.7 kg' },
  { value: '2.8 kg', label: '2.8 kg' }
];

const ComputerScreenSize = [
  { value: '13.3 inches', label: '13.3 inches' },
  { value: '14 inches', label: '14 inches' },
  { value: '15.6 inches', label: '15.6 inches' },
  { value: '12.3 inches', label: '12.3 inches' },
  { value: '11.6 inches', label: '11.6 inches' },
  { value: '17.3 inches', label: '17.3 inches' },
  { value: '12.9 inches', label: '12.9 inches' },
  { value: '15 inches', label: '15 inches' },
  { value: '10.1 inches', label: '10.1 inches' },
  { value: '27 inches', label: '27 inches' }
];

const ComputerCPU = [
  { value: 'Intel Core i3-10100', label: 'Intel Core i3-10100' },
  { value: 'Intel Core i5-11400', label: 'Intel Core i5-11400' },
  { value: 'Intel Core i7-11700K', label: 'Intel Core i7-11700K' },
  { value: 'Intel Core i9-11900K', label: 'Intel Core i9-11900K' },
  { value: 'AMD Ryzen 3 3100', label: 'AMD Ryzen 3 3100' },
  { value: 'AMD Ryzen 5 5600X', label: 'AMD Ryzen 5 5600X' },
  { value: 'AMD Ryzen 7 5800X', label: 'AMD Ryzen 7 5800X' },
  { value: 'AMD Ryzen 9 5900X', label: 'AMD Ryzen 9 5900X' },
  { value: 'Apple M1', label: 'Apple M1' },
  { value: 'Apple M2', label: 'Apple M2' }
];

const ComputerCondition = [
  { value: 'new', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

function Laptops({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Ram"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="ram"
          options={ComputerRam}
          value={initiallistingsData.ram}
          onChange={(option) => handleSelectChange("ram", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Graphics Card"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="graphicsCard"
          options={ComputerGraphicsCard}
          value={initiallistingsData.graphicsCard}
          onChange={(option) => handleSelectChange("graphicsCard", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Operating System"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="operatingSystem"
          options={ComputerOperatingSystem}
          value={initiallistingsData.operatingSystem}
          onChange={(option) => handleSelectChange("operatingSystem", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Number Ports"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="numberPorts"
          options={ComputerNumberPorts}
          value={initiallistingsData.numberPorts}
          onChange={(options) => handleSelectChange("numberPorts", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Battery Life"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="batteryLife"
          options={ComputerBatteryLife}
          value={initiallistingsData.batteryLife}
          onChange={(option) => handleSelectChange("batteryLife", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Device Storage"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="storage"
          options={ComputerStorage}
          value={initiallistingsData.storage}
          onChange={(option) => handleSelectChange("storage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Resolution"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="resolution"
          options={ComputerResolution}
          value={initiallistingsData.resolution}
          onChange={(option) => handleSelectChange("resolution", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Weight"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="weight"
          options={ComputerWeight}
          value={initiallistingsData.weight}
          onChange={(option) => handleSelectChange("weight", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Screen Size"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="screenSize"
          options={ComputerScreenSize}
          value={initiallistingsData.screenSize}
          onChange={(option) => handleSelectChange("screenSize", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="CPU"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="cpu"
          options={ComputerCPU}
          value={initiallistingsData.cpu}
          onChange={(option) => handleSelectChange("cpu", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="condition"
          options={ComputerCondition}
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



Laptops.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Laptops.defaultProps = {
  initialState: {


    ram: '',
    graphicsCard: '',
    operatingSystem: '',
    numberPorts: [],
    batteryLife: '',
    storage: '',
    resolution: '',
    weight: '',
    screenSize: '',
    cpu: '',
    condition: '',
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Laptops;
