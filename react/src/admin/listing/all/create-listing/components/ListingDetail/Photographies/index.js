import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/evenements/photography/battery.svg`;
const icon2 = `${imagePath}/categoryicons/evenements/photography/brand.svg`;
const icon3 = `${imagePath}/categoryicons/evenements/photography/camera.svg`;
const icon4 = `${imagePath}/categoryicons/evenements/photography/lcd.svg`;
const icon5 = `${imagePath}/categoryicons/evenements/photography/max_shutter_speed.svg`;
const icon6 = `${imagePath}/categoryicons/evenements/photography/maximum_webcam_image_resolution.svg`;
const icon7 = `${imagePath}/categoryicons/evenements/photography/other_equipment.svg`;
const icon8 = `${imagePath}/categoryicons/evenements/photography/photography.svg`;
const icon9 = `${imagePath}/categoryicons/evenements/photography/sensor.svg`;
const icon10 = `${imagePath}/categoryicons/evenements/photography/size.svg`;
const icon11 = `${imagePath}/categoryicons/evenements/photography/wide_angle.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

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
  { value: 'Board Computer', label: 'Board Computer' }
];



const photographyBrand = [
  { value: 'Canon', label: 'Canon' },
  { value: 'Nikon', label: 'Nikon' },
  { value: 'Sony', label: 'Sony' },
  { value: 'Fujifilm', label: 'Fujifilm' },
  { value: 'Panasonic', label: 'Panasonic' },
  { value: 'Olympus', label: 'Olympus' },
  { value: 'Leica', label: 'Leica' },
  { value: 'Pentax', label: 'Pentax' },
  { value: 'Sigma', label: 'Sigma' },
  { value: 'Hasselblad', label: 'Hasselblad' },
  { value: 'GoPro', label: 'GoPro' },
  { value: 'DJI', label: 'DJI' },
  { value: 'Ricoh', label: 'Ricoh' },
  { value: 'Phase One', label: 'Phase One' },
  { value: 'Zeiss', label: 'Zeiss' }
];
const photographySize = [
  { value: 'Compact', label: 'Compact' },
  { value: 'Mirrorless', label: 'Mirrorless' },
  { value: 'DSLR', label: 'DSLR' },
  { value: 'Medium Format', label: 'Medium Format' },
  { value: 'Large Format', label: 'Large Format' }
];
const photographyCamera = [
  { value: 'Compact Camera', label: 'Compact Camera' },
  { value: 'Mirrorless Camera', label: 'Mirrorless Camera' },
  { value: 'DSLR Camera', label: 'DSLR Camera' },
  { value: 'Medium Format Camera', label: 'Medium Format Camera' },
  { value: 'Large Format Camera', label: 'Large Format Camera' },
  { value: 'Action Camera', label: 'Action Camera' },
  { value: 'Point-and-Shoot Camera', label: 'Point-and-Shoot Camera' },
  { value: 'Instant Camera', label: 'Instant Camera' },
  { value: 'Film Camera', label: 'Film Camera' },
  { value: 'Underwater Camera', label: 'Underwater Camera' },
  { value: '360-Degree Camera', label: '360-Degree Camera' },
  { value: 'Aerial/Drone Camera', label: 'Aerial/Drone Camera' }
];
const photographySensor = [
  { value: 'Full Frame Sensor', label: 'Full Frame Sensor' },
  { value: 'APS-C Sensor', label: 'APS-C Sensor' },
  { value: 'Micro Four Thirds Sensor', label: 'Micro Four Thirds Sensor' },
  { value: 'Medium Format Sensor', label: 'Medium Format Sensor' },
  { value: 'Crop Sensor', label: 'Crop Sensor' },
  { value: 'CMOS Sensor', label: 'CMOS Sensor' },
  { value: 'CCD Sensor', label: 'CCD Sensor' }
];
const photographyWideAngle = [
  { value: 'Prime Wide Angle Lens', label: 'Prime Wide Angle Lens' },
  { value: 'Zoom Wide Angle Lens', label: 'Zoom Wide Angle Lens' },
  { value: 'Fisheye Lens', label: 'Fisheye Lens' },
  { value: 'Ultra Wide Angle Lens', label: 'Ultra Wide Angle Lens' }
];
const photographyLCD = [
  { value: 'Fixed LCD Screen', label: 'Fixed LCD Screen' },
  { value: 'Tilting LCD Screen', label: 'Tilting LCD Screen' },
  { value: 'Vari-angle LCD Screen', label: 'Vari-angle LCD Screen' },
  { value: 'Touchscreen LCD Screen', label: 'Touchscreen LCD Screen' }
];
const photographyBattery = [
  { value: 'Lithium-ion Battery', label: 'Lithium-ion Battery' },
  { value: 'Nickel Metal Hydride Battery', label: 'Nickel Metal Hydride Battery' },
  { value: 'Alkaline Battery', label: 'Alkaline Battery' },
  { value: 'Rechargeable Battery Pack', label: 'Rechargeable Battery Pack' },
  { value: 'AA Battery', label: 'AA Battery' },
  { value: 'AAA Battery', label: 'AAA Battery' },
  { value: 'Proprietary Battery', label: 'Proprietary Battery' }
];
const photographyOther = [ 
  { value: 'external flashes', label: 'external flashes' },
  { value: 'tripod', label: 'tripod' },
  { value: 'bag', label: 'bag' },
  { value: 'Panorama Capture', label: 'Panorama Capture' },
  { value: 'Burst Shooting', label: 'Burst Shooting' },
  { value: 'WiFi Connectivity', label: 'WiFi Connectivity' },
  { value: 'external lenses', label: 'external lenses' }
];

function Photographies({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
  const [collapse7, setCollapse7] = useState(isOpen);
  const [collapse8, setCollapse8] = useState(isOpen);
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
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Brand Name"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="brand"
          options={photographyBrand}
          value={initiallistingsData.brand}
          onChange={(option) => handleSelectChange("brand", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Size"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="size"
          options={photographySize}
          value={initiallistingsData.size}
          onChange={(option) => handleSelectChange("size", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Camera"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="camera"
          options={photographyCamera}
          value={initiallistingsData.camera}
          onChange={(options) => handleSelectChange("camera", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Sensor"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="sensor"
          options={photographySensor}
          value={initiallistingsData.sensor}
          onChange={(options) => handleSelectChange("sensor", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Wide Angle"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="wideAngle"
          options={photographyWideAngle}
          value={initiallistingsData.wideAngle}
          onChange={(options) => handleSelectChange("wideAngle", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="LCD"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="lcd"
          options={photographyLCD}
          value={initiallistingsData.lcd}
          onChange={(options) => handleSelectChange("lcd", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Battery"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="battery"
          options={photographyBattery}
          value={initiallistingsData.battery}
          onChange={(option) => handleSelectChange("battery", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Other Equipment"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="otherEquipment"
          options={photographyOther}
          value={initiallistingsData.otherEquipment}
          onChange={(options) => handleSelectChange("otherEquipment", options)}
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

Photographies.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Photographies.defaultProps = {
  initialState: {


    brand: '',
    size: '',
    camera: [],
    sensor: [],
    wideAngle: [],
    lcd: [],
    battery: '',
    otherEquipment: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Photographies;
