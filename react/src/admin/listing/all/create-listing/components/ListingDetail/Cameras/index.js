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
const icon1 = `${imagePath}/categoryicons/cameras/camera_battery_life.svg`;
const icon2 = `${imagePath}/categoryicons/cameras/camera_exposure.svg`;
const icon3 = `${imagePath}/categoryicons/cameras/camera_image_resolution.svg`;
const icon4 = `${imagePath}/categoryicons/cameras/camera_lens.svg`;
const icon5 = `${imagePath}/categoryicons/cameras/camera_memory.svg`;
const icon6 = `${imagePath}/categoryicons/cameras/connectivity.svg`;
const icon7 = `${imagePath}/categoryicons/cameras/image_stabilization.svg`;
const icon8 = `${imagePath}/categoryicons/cameras/photo_size.svg`;
const icon9 = `${imagePath}/categoryicons/cameras/sensor_size.svg`;
const icon10 = `${imagePath}/categoryicons/cameras/shutter_speed.svg`;
const icon11 = `${imagePath}/categoryicons/cameras/condition.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' },
  { value: 'HDR Capability', label: 'HDR Capability' },
  { value: 'Face Detection', label: 'Face Detection' },
  { value: 'Wi-Fi Connectivity', label: 'Wi-Fi Connectivity' },
  { value: 'Bluetooth Connectivity', label: 'Bluetooth Connectivity' },
  { value: 'Live View', label: 'Live View' },
  { value: 'Touchscreen', label: 'Touchscreen' },
  { value: '4K Video Recording', label: '4K Video Recording' },
  { value: 'Time-Lapse Functionality', label: 'Time-Lapse Functionality' },
  { value: 'Panorama Mode', label: 'Panorama Mode' },
  { value: 'Custom Shooting Modes', label: 'Custom Shooting Modes' },
  { value: 'Weather Sealing', label: 'Weather Sealing' }
];



const CameraPhotoSize = [
  { value: 'Large', label: 'Large' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Small', label: 'Small' }
];

const CameraSensorSize = [
  { value: 'Full Frame (35mm)', label: 'Full Frame (35mm)' },
  { value: 'APS-C (Crop Sensor)', label: 'APS-C (Crop Sensor)' },
  { value: 'Micro Four Thirds', label: 'Micro Four Thirds' }
];

const CameraImageStabilization = [
  { value: 'Optical Image Stabilization', label: 'Optical Image Stabilization' },
  { value: 'Sensor-Shift Image Stabilization', label: 'Sensor-Shift Image Stabilization' }
];

const CameraShutterSpeed = [
  { value: '1/4000 second', label: '1/4000 second' },
  { value: '1/2000 second', label: '1/2000 second' },
  { value: '1/1000 second', label: '1/1000 second' },
  { value: '1/500 second', label: '1/500 second' },
  { value: '1/250 second', label: '1/250 second' },
  { value: '1/125 second', label: '1/125 second' },
  { value: '1/60 second', label: '1/60 second' },
  { value: '1/30 second', label: '1/30 second' },
  { value: '1/15 second', label: '1/15 second' },
  { value: '1/8 second', label: '1/8 second' }
];

const CameraExposureControl = [
  { value: 'Manual Mode (M)', label: 'Manual Mode (M)' },
  { value: 'Aperture Priority Mode (A or Av)', label: 'Aperture Priority Mode (A or Av)' },
  { value: 'Shutter Priority Mode (S or Tv)', label: 'Shutter Priority Mode (S or Tv)' },
  { value: 'Program Mode (P)', label: 'Program Mode (P)' },
  { value: 'Auto Mode (Auto)', label: 'Auto Mode (Auto)' }
];

const CameraImageResolution = [
  { value: '24MP', label: '24MP' },
  { value: '20MP', label: '20MP' },
  { value: '18MP', label: '18MP' },
  { value: '16MP', label: '16MP' },
  { value: '12MP', label: '12MP' }
];

const CameraCondition = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Excellent', label: 'Excellent' }
];

const CameraConnectivity = [
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'USB', label: 'USB' }
];

const CameraMemory = [
  { value: '16GB', label: '16GB' },
  { value: '32GB', label: '32GB' },
  { value: '64GB', label: '64GB' },
  { value: '128GB', label: '128GB' },
  { value: '256GB', label: '256GB' }
];

const CameraLens = [
  { value: '18-55mm', label: '18-55mm' },
  { value: '24-70mm', label: '24-70mm' },
  { value: '70-200mm', label: '70-200mm' },
  { value: '50mm', label: '50mm' },
  { value: '85mm', label: '85mm' }
];

function Cameras({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Photo Size"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >


        


          <FormField
            
            type="text"
            name="photoSize"
            placeholder="Enter Photo Size "
            value={initiallistingsData.photoSize}
            onChange={(e) => handleSelectChange("photoSize", e.target.value)}
          />


      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Sensor Size"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        


          <FormField
            
            type="text"
            name="sensorSize"
            placeholder="Enter Sensor Size"
            value={initiallistingsData.sensorSize}
            onChange={(e) => handleSelectChange("sensorSize", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Image Stabilization"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        


          <FormField
            
            type="text"
            name="imageStabilization"
            placeholder="Enter Image Stabilization"
            value={initiallistingsData.imageStabilization}
            onChange={(e) => handleSelectChange("imageStabilization", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="Shutter Speed"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        




          <FormField
            
            type="text"
            name="shutterSpeed"
            placeholder="Enter Shutter Speed"
            value={initiallistingsData.shutterSpeed}
            onChange={(e) => handleSelectChange("shutterSpeed", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Exposure Control"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="exposureControl"
          options={CameraExposureControl}
          value={initiallistingsData.exposureControl}
          onChange={(option) => handleSelectChange("exposureControl", option.value)}
        />



          <FormField
            
            type="text"
            name="exposureControl"
            placeholder="Enter Exposure Control"
            value={initiallistingsData.exposureControl}
            onChange={(e) => handleSelectChange("exposureControl", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Image Resolution"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >



        



          <FormField
            
            type="text"
            name="imageResolution"
            placeholder="Enter Image Resolution"
            value={initiallistingsData.imageResolution}
            onChange={(e) => handleSelectChange("imageResolution", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="condition"
          options={CameraCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />




       





      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Connectivity"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="connectivity"
          options={CameraConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Memory"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        




          <FormField
            
            type="text"
            name="memory"
            placeholder="Enter memory"
            value={initiallistingsData.memory}
            onChange={(e) => handleSelectChange("memory", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Lens"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        



          <FormField
            
            type="text"
            name="lens"
            placeholder="Enter lens"
            value={initiallistingsData.lens}
            onChange={(e) => handleSelectChange("lens", e.target.value)}
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

Cameras.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Cameras.defaultProps = {
  initialState: {


    photoSize: '',
    sensorSize: '',
    imageStabilization: '',
    shutterSpeed: '',
    exposureControl: '',
    imageResolution: '',
    condition: '',
    connectivity: [],
    memory: '',
    lens: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Cameras;
