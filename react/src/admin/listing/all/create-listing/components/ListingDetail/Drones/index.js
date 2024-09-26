import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';

import MultSelect from "admin/components/MultSelect";


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/drones/battery_life.svg`;
const icon2 = `${imagePath}/categoryicons/drones/condition.svg`;
const icon3 = `${imagePath}/categoryicons/drones/connectivity.svg`;
const icon4 = `${imagePath}/categoryicons/drones/flight_time.svg`;
const icon5 = `${imagePath}/categoryicons/drones/max_distance.svg`;
const icon6 = `${imagePath}/categoryicons/drones/memory.svg`;
const icon7 = `${imagePath}/categoryicons/drones/weight.svg`;
const icon8 = `${imagePath}/categoryicons/drones/included_components.svg`;
const icon9 = `${imagePath}/categoryicons/drones/remote_control.svg`;
const icon10 = `${imagePath}/categoryicons/drones/remote_control.svg`;
const icon11 = `${imagePath}/categoryicons/drones/video_resolution.svg`;
const icon12 = `${imagePath}/categoryicons/drones/battery_capacity.svg`;
const icon13 = `${imagePath}/categoryicons/drones/image_resolution.svg`;
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
  icon30
};




const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const DroneFlightTime = [
  { value: '10 minutes', label: '10 minutes' },
  { value: '15 minutes', label: '15 minutes' },
  { value: '20 minutes', label: '20 minutes' },
  { value: '25 minutes', label: '25 minutes' },
  { value: '30 minutes', label: '30 minutes' },
  { value: '35 minutes', label: '35 minutes' },
  { value: '40 minutes', label: '40 minutes' },
  { value: '45 minutes', label: '45 minutes' },
  { value: '50 minutes', label: '50 minutes' },
  { value: '60 minutes', label: '60 minutes' }
];

const DroneBatteryLife = [
  { value: '15 minutes', label: '15 minutes' },
  { value: '18 minutes', label: '18 minutes' },
  { value: '20 minutes', label: '20 minutes' },
  { value: '25 minutes', label: '25 minutes' },
  { value: '30 minutes', label: '30 minutes' },
  { value: '35 minutes', label: '35 minutes' },
  { value: '40 minutes', label: '40 minutes' },
  { value: '45 minutes', label: '45 minutes' },
  { value: '50 minutes', label: '50 minutes' },
  { value: '55 minutes', label: '55 minutes' },
  { value: '60 minutes', label: '60 minutes' }
];

const DroneCondition = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' }
];

const DroneVideoResolution = [
  { value: '720p', label: '720p' },
  { value: '1080p (Full HD)', label: '1080p (Full HD)' },
  { value: '2.7K', label: '2.7K' },
  { value: '4K', label: '4K' },
  { value: '5.7K', label: '5.7K' },
  { value: '6K', label: '6K' },
  { value: '8K', label: '8K' }
];

const DroneConnectivity = [
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Radio Frequency(RF)', label: 'Radio Frequency(RF)' },
  { value: 'GPS', label: 'GPS' },
  { value: 'Both Wi-Fi and GPS', label: 'Both Wi-Fi and GPS' }
];

const DroneBatteryCapacity = [
  { value: '500mAh', label: '500mAh' },
  { value: '1000mAh', label: '1000mAh' },
  { value: '1500mAh', label: '1500mAh' },
  { value: '2000mAh', label: '2000mAh' },
  { value: '2500mAh', label: '2500mAh' },
  { value: '3000mAh', label: '3000mAh' },
  { value: '3500mAh', label: '3500mAh' },
  { value: '4000mAh', label: '4000mAh' },
  { value: '4500mAh', label: '4500mAh' },
  { value: '5000mAh', label: '5000mAh' }
];

const DroneMemory = [
  { value: '4GB', label: '4GB' },
  { value: '8GB', label: '8GB' },
  { value: '16GB', label: '16GB' },
  { value: '32GB', label: '32GB' },
  { value: '64GB', label: '64GB' },
  { value: '128GB', label: '128GB' },
  { value: '256GB', label: '256GB' }
];

const DroneImageResolution = [
  { value: '8 megapixels', label: '8 megapixels' },
  { value: '12 megapixels', label: '12 megapixels' },
  { value: '20 megapixels', label: '20 megapixels' },
  { value: '24 megapixels', label: '24 megapixels' },
  { value: '48 megapixels', label: '48 megapixels' }
];

const DroneIncludedComponents = [
  { value: 'Remote controller', label: 'Remote controller' },
  { value: 'Spare propellers', label: 'Spare propellers' },
  { value: 'Batteries', label: 'Batteries' },
  { value: 'Charging cable', label: 'Charging cable' },
  { value: 'Carrying case', label: 'Carrying case' },
  { value: 'User manual', label: 'User manual' },
  { value: 'Propeller guards', label: 'Propeller guards' },
  { value: 'SD card', label: 'SD card' }
];

const DroneRemoteControl = [
  { value: '2.4GHz', label: '2.4GHz' },
  { value: '5.8GHz', label: '5.8GHz' },
  { value: 'Radio frequency range (e.g., up to 1km, up to 5km)', label: 'Radio frequency range (e.g., up to 1km, up to 5km)' },
  { value: 'Integrated display screen', label: 'Integrated display screen' },
  { value: 'Smartphone holder', label: 'Smartphone holder' },
  { value: 'Telemetry data display', label: 'Telemetry data display' }
];

const DroneMaxDistance = [
  { value: 'Up to 100 meters', label: 'Up to 100 meters' },
  { value: 'Up to 200 meters', label: 'Up to 200 meters' },
  { value: 'Up to 300 meters', label: 'Up to 300 meters' },
  { value: 'Up to 500 meters', label: 'Up to 500 meters' },
  { value: 'Up to 800 meters', label: 'Up to 800 meters' },
  { value: 'Up to 1 kilometer', label: 'Up to 1 kilometer' },
  { value: 'Up to 2 kilometer', label: 'Up to 2 kilometer' },
  { value: 'Up to 3 kilometer', label: 'Up to 3 kilometer' },
  { value: 'Up to 5 kilometer', label: 'Up to 5 kilometer' },
  { value: 'Up to 10 kilometer', label: 'Up to 10 kilometer' }
];

function Drones({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Flight Time"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="flightTime"
          options={DroneFlightTime}
          value={initiallistingsData.flightTime}
          onChange={(option) => handleSelectChange("flightTime", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Battery Life"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="batteryLife"
          options={DroneBatteryLife}
          value={initiallistingsData.batteryLife}
          onChange={(option) => handleSelectChange("batteryLife", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="condition"
          options={DroneCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Video Resolution"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="videoResolution"
          options={DroneVideoResolution}
          value={initiallistingsData.videoResolution}
          onChange={(option) => handleSelectChange("videoResolution", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="connectivity"
          options={DroneConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Battery Capacity"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="batteryCapacity"
          options={DroneBatteryCapacity}
          value={initiallistingsData.batteryCapacity}
          onChange={(option) => handleSelectChange("batteryCapacity", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Memory"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="memory"
          options={DroneMemory}
          value={initiallistingsData.memory}
          onChange={(option) => handleSelectChange("memory", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Image Resolution"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="imageResolution"
          options={DroneImageResolution}
          value={initiallistingsData.imageResolution}
          onChange={(option) => handleSelectChange("imageResolution", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Included Components"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="includedComponents"
          options={DroneIncludedComponents}
          value={initiallistingsData.includedComponents}
          onChange={(options) => handleSelectChange("includedComponents", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Remote Control"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="remoteControl"
          options={DroneRemoteControl}
          value={initiallistingsData.remoteControl}
          onChange={(option) => handleSelectChange("remoteControl", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Max Distance"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="maxDistance"
          options={DroneMaxDistance}
          value={initiallistingsData.maxDistance}
          onChange={(option) => handleSelectChange("maxDistance", option.value)}
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

Drones.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Drones.defaultProps = {
  initialState: {


    flightTime: '',
    batteryLife: '',
    condition: '',
    videoResolution: '',
    connectivity: [],
    batteryCapacity: '',
    memory: '',
    imageResolution: '',
    includedComponents: [],
    remoteControl: '',
    maxDistance: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Drones;
