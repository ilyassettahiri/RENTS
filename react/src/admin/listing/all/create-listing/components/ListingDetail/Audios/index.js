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
const icon1 = `${imagePath}/categoryicons/audios/battery_life.svg`;
const icon2 = `${imagePath}/categoryicons/audios/box_dimensions.svg`;
const icon3 = `${imagePath}/categoryicons/audios/car_condition.svg`;
const icon4 = `${imagePath}/categoryicons/audios/charging_time.svg`;
const icon5 = `${imagePath}/categoryicons/audios/compatibility.svg`;
const icon6 = `${imagePath}/categoryicons/audios/connectivity.svg`;
const icon7 = `${imagePath}/categoryicons/audios/noise_cancellation.svg`;
const icon8 = `${imagePath}/categoryicons/audios/sound_quality.svg`;
const icon9 = `${imagePath}/categoryicons/audios/audio_type.svg`;
const icon10 = `${imagePath}/categoryicons/audios/max_wireless_range.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'Noise Cancellation', label: 'Noise Cancellation' },
  { value: 'Water Resistance', label: 'Water Resistance' },
  { value: 'Surround Sound', label: 'Surround Sound' },
  { value: 'Built-in Microphone', label: 'Built-in Microphone' },
  { value: 'Bass Boost', label: 'Bass Boost' },
  { value: 'Voice Assistant Support', label: 'Voice Assistant Support' },
  { value: 'Touch Controls', label: 'Touch Controls' },
  { value: 'Foldable Design', label: 'Foldable Design' },
  { value: 'Wireless Charging', label: 'Wireless Charging' },
  { value: 'Customizable Sound Profiles', label: 'Customizable Sound Profiles' },
  { value: 'App Control', label: 'App Control' },
  { value: 'EQ Settings', label: 'EQ Settings' },
  { value: 'Lightweight', label: 'Lightweight' },
  { value: 'Detachable Cable', label: 'Detachable Cable' },
  { value: 'Quick Charge', label: 'Quick Charge' },
  { value: 'Low Latency', label: 'Low Latency' },
  { value: 'Multi-Device Pairing', label: 'Multi-Device Pairing' }
];



const AudioType = [
  { value: 'Headphones', label: 'Headphones' },
  { value: 'Earphones', label: 'Earphones' },
  { value: 'Bluetooth speakers', label: 'Bluetooth speakers' },
  { value: 'Soundbars', label: 'Soundbars' },
  { value: 'Home theater systems', label: 'Home theater systems' },
  { value: 'Portable speakers', label: 'Portable speakers' },
  { value: 'In-ear monitors (IEMs)', label: 'In-ear monitors (IEMs)' },
  { value: 'Studio monitors', label: 'Studio monitors' },
  { value: 'Microphones', label: 'Microphones' },
  { value: 'Amplifiers', label: 'Amplifiers' },
  { value: 'Digital audio players (DAPs)', label: 'Digital audio players (DAPs)' },
  { value: 'Turntables', label: 'Turntables' },
  { value: 'DJ controllers', label: 'DJ controllers' },
  { value: 'Mixers', label: 'Mixers' },
  { value: 'Audio interfaces', label: 'Audio interfaces' },
  { value: 'Voice recorders', label: 'Voice recorders' },
  { value: 'Car audio systems', label: 'Car audio systems' },
  { value: 'Conference call systems', label: 'Conference call systems' },
  { value: 'PA systems', label: 'PA systems' }
];

const AudioSoundQuality = [
  { value: 'High Resolution', label: 'High Resolution' },
  { value: 'Dynamic Range', label: 'Dynamic Range' },
  { value: 'Natural', label: 'Natural' },
  { value: 'Smooth Frequency Response', label: 'Smooth Frequency Response' },
  { value: 'Low Noise Floor', label: 'Low Noise Floor' }
];

const AudioConnectivity = [
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'Wired (3.5mm audio jack)', label: 'Wired (3.5mm audio jack)' },
  { value: 'USB', label: 'USB' }
];

const AudioMaxWirelessRange = [
  { value: '10 meters', label: '10 meters' },
  { value: '20 meters', label: '20 meters' },
  { value: '30 meters', label: '30 meters' }
];

const AudioBatteryLife = [
  { value: 'Up to 6 hours', label: 'Up to 6 hours' },
  { value: 'Up to 8 hours', label: 'Up to 8 hours' },
  { value: 'Up to 10 hours', label: 'Up to 10 hours' },
  { value: 'Up to 12 hours', label: 'Up to 12 hours' },
  { value: 'Up to 20 hours', label: 'Up to 20 hours' }
];

const AudioChargingTime = [
  { value: '1 hour', label: '1 hour' },
  { value: '2 hours', label: '2 hours' },
  { value: '3 hours', label: '3 hours' },
  { value: '4 hours', label: '4 hours' }
];

const AudioCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' }
];

const AudioCompatibility = [
  { value: 'iOS', label: 'iOS' },
  { value: 'Android', label: 'Android' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Streaming services', label: 'Streaming services' }
];

function Audios({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Audio Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="audioType"
          options={AudioType}
          value={initiallistingsData.audioType}
          onChange={(option) => handleSelectChange("audioType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Sound Quality"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="soundQuality"
          options={AudioSoundQuality}
          value={initiallistingsData.soundQuality}
          onChange={(option) => handleSelectChange("soundQuality", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Connectivity"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="connectivity"
          options={AudioConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="Max Wireless Range"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="maxWirelessRange"
          options={AudioMaxWirelessRange}
          value={initiallistingsData.maxWirelessRange}
          onChange={(option) => handleSelectChange("maxWirelessRange", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Battery Life"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="batteryLife"
          options={AudioBatteryLife}
          value={initiallistingsData.batteryLife}
          onChange={(option) => handleSelectChange("batteryLife", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Charging Time"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="chargingTime"
          options={AudioChargingTime}
          value={initiallistingsData.chargingTime}
          onChange={(option) => handleSelectChange("chargingTime", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="condition"
          options={AudioCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Compatibility"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="compatibility"
          options={AudioCompatibility}
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

Audios.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Audios.defaultProps = {
  initialState: {


    audioType: '',
    soundQuality: '',
    connectivity: [],
    maxWirelessRange: '',
    batteryLife: '',
    chargingTime: '',
    condition: '',
    compatibility: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Audios;
