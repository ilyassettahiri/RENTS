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
const icon1 = `${imagePath}/categoryicons/sonorisations/amplifier.svg`;
const icon2 = `${imagePath}/categoryicons/sonorisations/battery.svg`;
const icon3 = `${imagePath}/categoryicons/sonorisations/brand.svg`;
const icon4 = `${imagePath}/categoryicons/sonorisations/cabless_connectors.svg`;
const icon5 = `${imagePath}/categoryicons/sonorisations/connectivity_technology.svg`;
const icon6 = `${imagePath}/categoryicons/sonorisations/device_compatibility.svg`;
const icon7 = `${imagePath}/categoryicons/sonorisations/fastener_type.svg`;
const icon8 = `${imagePath}/categoryicons/sonorisations/microphone.svg`;
const icon9 = `${imagePath}/categoryicons/sonorisations/mixage_table.svg`;
const icon10 = `${imagePath}/categoryicons/sonorisations/number_of_channels.svg`;
const icon11 = `${imagePath}/categoryicons/sonorisations/output_power.svg`;
const icon12 = `${imagePath}/categoryicons/sonorisations/power_in_watts.svg`;
const icon13 = `${imagePath}/categoryicons/sonorisations/power_source.svg`;
const icon14 = `${imagePath}/categoryicons/sonorisations/power_type.svg`;
const icon15 = `${imagePath}/categoryicons/sonorisations/size.svg`;
const icon16 = `${imagePath}/categoryicons/sonorisations/sonorisation.svg`;
const icon17 = `${imagePath}/categoryicons/sonorisations/speaker.svg`;
const icon18 = `${imagePath}/categoryicons/sonorisations/watt.svg`;
const icon19 = `${imagePath}/categoryicons/sonorisations/weight.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'equalizer', label: 'Equalizer' },
  { value: 'noise gate', label: 'Noise Gate' },
  { value: 'compressor', label: 'Compressor' },
  { value: 'effects processor', label: 'Effects Processor' },
  { value: 'crossover', label: 'Crossover' },
  { value: 'graphic equalizer', label: 'Graphic Equalizer' },
  { value: 'limiters', label: 'Limiters' },
  { value: 'patch bay', label: 'Patch Bay' },
  { value: 'power conditioner', label: 'Power Conditioner' },
  { value: 'microphone stand', label: 'Microphone Stand' },
  { value: 'pop filter', label: 'Pop Filter' },
  { value: 'windshield', label: 'Windshield' },
  { value: 'monitor speakers', label: 'Monitor Speakers' },
  { value: 'headphones', label: 'Headphones' },
  { value: 'cables and connectors', label: 'Cables and Connectors' },
  { value: 'racks and cases', label: 'Racks and Cases' },
  { value: 'remote control', label: 'Remote Control' },
  { value: 'software integration', label: 'Software Integration' },
  { value: 'lighting control', label: 'Lighting Control' },
  { value: 'acoustic treatment', label: 'Acoustic Treatment' },
  { value: 'carrying case', label: 'Carrying Case' }
];



const sonorizationBrand = [
  { value: 'bose', label: 'Bose' },
  { value: 'jbl', label: 'JBL' },
  { value: 'yamaha', label: 'Yamaha' },
  { value: 'qsc', label: 'QSC' },
  { value: 'shure', label: 'Shure' },
  { value: 'sennheiser', label: 'Sennheiser' },
  { value: 'behringer', label: 'Behringer' },
  { value: 'electro voice', label: 'Electro-Voice' },
  { value: 'mackie', label: 'Mackie' },
  { value: 'akg', label: 'AKG' }
];

const sonorizationSize = [
  { value: 'small scale', label: 'Small-scale' },
  { value: 'medium scale', label: 'Medium-scale' },
  { value: 'large scale', label: 'Large-scale' }
];

const sonorizationConnectivityTechnology = [
  { value: 'wired connectivity', label: 'Wired Connectivity' },
  { value: 'wireless connectivity', label: 'Wireless Connectivity' },
  { value: 'digital connectivity', label: 'Digital Connectivity' },
  { value: 'networked audio', label: 'Networked Audio' },
  { value: 'usb connectivity', label: 'USB Connectivity' }
];

const sonorizationFastenerType = [
  { value: 'screws', label: 'Screws' },
  { value: 'bolts', label: 'Bolts' },
  { value: 'nuts', label: 'Nuts' },
  { value: 'washers', label: 'Washers' },
  { value: 'rivets', label: 'Rivets' },
  { value: 'clips', label: 'Clips' },
  { value: 'velcro', label: 'Velcro' },
  { value: 'zip ties', label: 'Zip Ties' },
  { value: 'hook and loop straps', label: 'Hook-and-loop Straps' },
  { value: 'snap fasteners', label: 'Snap Fasteners' }
];

const sonorizationPowerSource = [
  { value: 'AC Power (Mains Power)', label: 'AC Power (Mains Power)' },
  { value: 'DC Power (Battery Power)', label: 'DC Power (Battery Power)' },
  { value: 'Rechargeable Battery', label: 'Rechargeable Battery' },
  { value: 'Disposable Battery', label: 'Disposable Battery' },
  { value: 'Phantom Power', label: 'Phantom Power' },
  { value: 'Power over Ethernet (PoE)', label: 'Power over Ethernet (PoE)' },
  { value: 'USB Power', label: 'USB Power' }
];

const sonorizationOutputPower = [
  { value: 'Watts (W)', label: 'Watts (W)' },
  { value: 'Kilowatts (kW)', label: 'Kilowatts (kW)' },
  { value: 'Milliwatts (mW)', label: 'Milliwatts (mW)' },
  { value: 'Decibels (dB)', label: 'Decibels (dB)' }
];

const sonorizationNumberofChannels = [
  { value: 'Mono', label: 'Mono' },
  { value: 'Stereo', label: 'Stereo' },
  { value: 'Dual Mono', label: 'Dual Mono' },
  { value: 'Multi-channel', label: 'Multi-channel' }
];

const sonorizationDeviceCompatibility = [
  { value: 'analog compatibility', label: 'Analog Compatibility' },
  { value: 'digital compatibility', label: 'Digital Compatibility' },
  { value: 'ios compatibility', label: 'iOS Compatibility' },
  { value: 'android compatibility', label: 'Android Compatibility' },
  { value: 'mac compatibility', label: 'Mac Compatibility' },
  { value: 'windows compatibility', label: 'Windows Compatibility' },
  { value: 'linux compatibility', label: 'Linux Compatibility' },
  { value: 'bluetooth compatibility', label: 'Bluetooth Compatibility' },
  { value: 'wifi compatibility', label: 'Wi-Fi Compatibility' },
  { value: 'usb compatibility', label: 'USB Compatibility' }
];

const sonorizationPowerinWatts = [
  { value: '100 watts', label: '100 Watts' },
  { value: '200 watts', label: '200 Watts' },
  { value: '500 watts', label: '500 Watts' },
  { value: '1000 watts', label: '1000 Watts' },
  { value: '2000 watts', label: '2000 Watts' },
  { value: '5000+ watts', label: '5000+ Watts' }
];

const sonorizationPowerType = [
  { value: 'power', label: 'Power' },
  { value: 'dc power', label: 'DC Power' },
  { value: 'battery power', label: 'Battery Power' },
  { value: 'phantom power', label: 'Phantom Power' },
  { value: 'power over ethernet', label: 'Power over Ethernet' },
  { value: 'usb power', label: 'USB Power' }
];

const sonorizationBattery = [
  { value: 'none', label: 'None' },
  { value: 'alkaline_batteries', label: 'Alkaline Batteries' },
  { value: 'lithium_batteries', label: 'Lithium Batteries' },
  { value: 'rechargeable_batteries', label: 'Rechargeable Batteries' },
  { value: 'disposable_batteries', label: 'Disposable Batteries' },
  { value: 'aa_batteries', label: 'AA Batteries' },
  { value: 'aaa_batteries', label: 'AAA Batteries' },
  { value: '9v_batteries', label: '9V Batteries' },
  { value: 'cr2032_batteries', label: 'CR2032 Batteries' }
];

const sonorizationWeight = [
  { value: 'Lightweight (4.5 kg)', label: 'Lightweight (4.5 kg)' },
  { value: 'Mediumweight (4.5-23 kg)', label: 'Mediumweight (4.5-23 kg)' },
  { value: 'Heavyweight (23+ kg)', label: 'Heavyweight (23+ kg)' }
];

const sonorizationMicrophone = [
  { value: 'none', label: 'None' },
  { value: 'dynamic microphone', label: 'Dynamic Microphone' },
  { value: 'condenser microphone', label: 'Condenser Microphone' },
  { value: 'ribbon microphone', label: 'Ribbon Microphone' },
  { value: 'lavalier microphone', label: 'Lavalier Microphone' },
  { value: 'headset microphone', label: 'Headset Microphone' },
  { value: 'shotgun microphone', label: 'Shotgun Microphone' },
  { value: 'boundary microphone', label: 'Boundary Microphone' },
  { value: 'usb microphone', label: 'USB Microphone' },
  { value: 'wireless microphone', label: 'Wireless Microphone' },
  { value: 'handheld microphone', label: 'Handheld Microphone' }
];

const sonorizationMixageTable = [
  { value: 'none', label: 'None' },
  { value: 'analog mixing console', label: 'Analog Mixing Console' },
  { value: 'digital mixing console', label: 'Digital Mixing Console' },
  { value: 'compact mixer', label: 'Compact Mixer' },
  { value: 'rackmount mixer', label: 'Rackmount Mixer' },
  { value: 'powered mixer', label: 'Powered Mixer' },
  { value: 'portable mixer', label: 'Portable Mixer' },
  { value: 'studio mixer', label: 'Studio Mixer' },
  { value: 'live sound mixer', label: 'Live Sound Mixer' },
  { value: 'dj mixer', label: 'DJ Mixer' }
];

const sonorizationAmplifier = [
  { value: 'none', label: 'None' },
  { value: 'stereo amplifier', label: 'Stereo Amplifier' },
  { value: 'mono amplifier', label: 'Mono Amplifier' },
  { value: 'multi channel_amplifier', label: 'Multi-Channel Amplifier' },
  { value: 'power amplifier', label: 'Power Amplifier' },
  { value: 'integrated amplifier', label: 'Integrated Amplifier' },
  { value: 'tube amplifier', label: 'Tube Amplifier' },
  { value: 'solid state amplifier', label: 'Solid-State Amplifier' },
  { value: 'class d amplifier', label: 'Class-D Amplifier' },
  { value: 'headphone amplifier', label: 'Headphone Amplifier' },
  { value: 'guitar amplifier', label: 'Guitar Amplifier' }
];

const sonorizationCables = [
  { value: 'xlr cable', label: 'XLR Cable' },
  { value: 'trs cable', label: 'TRS Cable' },
  { value: 'ts cable', label: 'TS Cable' },
  { value: 'rca cable', label: 'RCA Cable' },
  { value: 'speakon cable', label: 'Speakon Cable' },
  { value: 'quarter inch cable', label: 'Quarter-inch Cable' },
  { value: 'mini jack cable', label: 'Mini-jack Cable' },
  { value: 'ethernet cable', label: 'Ethernet Cable' },
  { value: 'usb cable', label: 'USB Cable' },
  { value: 'optical cable', label: 'Optical Cable' },
  { value: 'hdmi cable', label: 'HDMI Cable' }
];

const sonorizationSpeaker = [
  { value: 'none', label: 'None' },
  { value: 'passive speakers', label: 'Passive Speakers' },
  { value: 'active speakers', label: 'Active Speakers' },
  { value: 'studio monitors', label: 'Studio Monitors' },
  { value: 'pa speakers', label: 'PA Speakers' },
  { value: 'line array speakers', label: 'Line Array Speakers' },
  { value: 'floor monitors', label: 'Floor Monitors' },
  { value: 'subwoofers', label: 'Subwoofers' },
  { value: 'portable speakers', label: 'Portable Speakers' },
  { value: 'in wall speakers', label: 'In-wall Speakers' },
  { value: 'ceiling speakers', label: 'Ceiling Speakers' }
];

function Sonorisations({ onDataChange, initialState, isOpen }) {

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
  const [collapse17, setCollapse17] = useState(isOpen);
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
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Brand"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="brand"
          options={sonorizationBrand}
          value={initiallistingsData.brand}
          onChange={(option) => handleSelectChange("brand", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: '40px' }} />}
        title="Size"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="size"
          options={sonorizationSize}
          value={initiallistingsData.size}
          onChange={(option) => handleSelectChange("size", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Connectivity Technology"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="connectivityTechnology"
          options={sonorizationConnectivityTechnology}
          value={initiallistingsData.connectivityTechnology}
          onChange={(option) => handleSelectChange("connectivityTechnology", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Fastener Type"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="fastenerType"
          options={sonorizationFastenerType}
          value={initiallistingsData.fastenerType}
          onChange={(option) => handleSelectChange("fastenerType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Power Source"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="powerSource"
          options={sonorizationPowerSource}
          value={initiallistingsData.powerSource}
          onChange={(option) => handleSelectChange("powerSource", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Output Power"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="outputPower"
          options={sonorizationOutputPower}
          value={initiallistingsData.outputPower}
          onChange={(option) => handleSelectChange("outputPower", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Number of Channels"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="numberOfChannels"
          options={sonorizationNumberofChannels}
          value={initiallistingsData.numberOfChannels}
          onChange={(option) => handleSelectChange("numberOfChannels", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Device Compatibility"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="deviceCompatibility"
          options={sonorizationDeviceCompatibility}
          value={initiallistingsData.deviceCompatibility}
          onChange={(option) => handleSelectChange("deviceCompatibility", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Power in Watts"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="powerInWatts"
          options={sonorizationPowerinWatts}
          value={initiallistingsData.powerInWatts}
          onChange={(option) => handleSelectChange("powerInWatts", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Power Type"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <MultSelect
          name="powerType"
          options={sonorizationPowerType}
          value={initiallistingsData.powerType}
          onChange={(options) => handleSelectChange("powerType", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Battery"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <MultSelect
          name="battery"
          options={sonorizationBattery}
          value={initiallistingsData.battery}
          onChange={(options) => handleSelectChange("battery", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon19} style={{ width: '40px' }} />}
        title="Weight"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="weight"
          options={sonorizationWeight}
          value={initiallistingsData.weight}
          onChange={(option) => handleSelectChange("weight", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Microphone"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <MultSelect
          name="microphone"
          options={sonorizationMicrophone}
          value={initiallistingsData.microphone}
          onChange={(options) => handleSelectChange("microphone", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Mixage Table"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <OneSelect
          name="mixageTable"
          options={sonorizationMixageTable}
          value={initiallistingsData.mixageTable}
          onChange={(option) => handleSelectChange("mixageTable", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Amplifier"
        open={collapse15}
        onClick={() => setCollapse15(!collapse15)}
      >
        <OneSelect
          name="amplifier"
          options={sonorizationAmplifier}
          value={initiallistingsData.amplifier}
          onChange={(option) => handleSelectChange("amplifier", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Cables and Connectors"
        open={collapse16}
        onClick={() => setCollapse16(!collapse16)}
      >
        <MultSelect
          name="cablesAndConnectors"
          options={sonorizationCables}
          value={initiallistingsData.cablesAndConnectors}
          onChange={(options) => handleSelectChange("cablesAndConnectors", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon17} style={{ width: '40px' }} />}
        title="Speaker"
        open={collapse17}
        onClick={() => setCollapse17(!collapse17)}
      >
        <MultSelect
          name="speaker"
          options={sonorizationSpeaker}
          value={initiallistingsData.speaker}
          onChange={(options) => handleSelectChange("speaker", options)}
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

Sonorisations.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Sonorisations.defaultProps = {
  initialState: {

    brand: '',
    size: '',
    connectivityTechnology: '',
    fastenerType: '',
    powerSource: '',
    outputPower: '',
    numberOfChannels: '',
    deviceCompatibility: '',
    powerInWatts: '',
    powerType: [],
    battery: [],
    weight: '',
    microphone: [],
    mixageTable: '',
    amplifier: '',
    cablesAndConnectors: [],
    speaker: [],
    moreDetails: [],


    
  },
  isOpen: false,
};
export default Sonorisations;
