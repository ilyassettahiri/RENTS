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
const icon1 = `${imagePath}/categoryicons/routers/compatibility.svg`;
const icon2 = `${imagePath}/categoryicons/routers/condition.svg`;
const icon3 = `${imagePath}/categoryicons/routers/connectivity.svg`;
const icon4 = `${imagePath}/categoryicons/routers/mbps_speed.svg`;
const icon5 = `${imagePath}/categoryicons/routers/signal_coverage.svg`;
const icon6 = `${imagePath}/categoryicons/routers/wireless.svg`;
const icon7 = `${imagePath}/categoryicons/routers/antennas.svg`;
const icon8 = `${imagePath}/categoryicons/routers/frequency.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'Dual Band', label: 'Dual Band (2.4 GHz & 5 GHz)' },
  { value: 'Tri Band', label: 'Tri Band (2.4 GHz & 2 x 5 GHz)' },
  { value: 'MU-MIMO Technology', label: 'MU-MIMO Technology for Multiple Users' },
  { value: 'QoS (Quality of Service)', label: 'Quality of Service (QoS) Management' },
  { value: 'Guest Network', label: 'Guest Network Support' },
  { value: 'VPN Support', label: 'VPN Support' },
  { value: 'Beamforming Technology', label: 'Beamforming Technology' },
  { value: 'Parental Controls', label: 'Parental Control Features' },
  { value: 'Firewall Protection', label: 'Built-in Firewall Protection' },
  { value: 'Mobile App Management', label: 'Mobile App for Easy Management' },
  { value: 'Firmware Updates', label: 'Automatic Firmware Updates' },
  { value: 'IPv6 Support', label: 'IPv6 Support' },
  { value: 'Power over Ethernet (PoE)', label: 'Power over Ethernet (PoE) Capable' },
  { value: 'Voice Control Compatibility', label: 'Voice Control Compatibility' },
  { value: 'Customizable LED Lights', label: 'Customizable LED Lights' },
  { value: 'Mesh Networking Capability', label: 'Mesh Networking Capability' }
];



const RoutersGbpsSpeed = [
  { value: 'Up to 6000 Mbps', label: 'Up to 6000 Mbps' },
  { value: 'Up to 10.8 Gbps', label: 'Up to 10.8 Gbps' },
  { value: 'Up to 11000 Mbps', label: 'Up to 11000 Mbps' },
  { value: 'Up to 5300 Mbps', label: 'Up to 5300 Mbps' },
  { value: 'Up to 100 Gbps', label: 'Up to 100 Gbps' },
  { value: 'Up to 1900 Mbps', label: 'Up to 1900 Mbps' },
  { value: 'Up to 3600 Mbps', label: 'Up to 3600 Mbps' },
  { value: 'Up to 3000 Mbps', label: 'Up to 3000 Mbps' },
  { value: 'Up to 1200 Mbps', label: 'Up to 1200 Mbps' }
];

const RoutersWireless = [
  { value: '802.11ac', label: '802.11ac' },
  { value: '802.11ax', label: '802.11ax' },
  { value: '802.11n', label: '802.11n' }
];

const RoutersFrequency = [
  { value: 'Single-band 2.4 GHz', label: 'Single-band 2.4 GHz' },
  { value: 'Dual-band (2.4 GHz & 5 GHz)', label: 'Dual-band (2.4 GHz & 5 GHz)' }
];

const RoutersConnectivity = [
  { value: 'Ethernet ports', label: 'Ethernet ports' },
  { value: 'USB ports', label: 'USB ports' },
  { value: 'WAN port', label: 'WAN port' },
  { value: 'Power port', label: 'Power port' },
  { value: 'Reset button', label: 'Reset button' },
  { value: 'WPS button', label: 'WPS button' },
  { value: 'LED indicators', label: 'LED indicators' },
  { value: 'Gigabit Ethernet ports', label: 'Gigabit Ethernet ports' }
];

const RoutersAntennas = [
  { value: 'External antennas', label: 'External antennas' },
  { value: 'Internal antennas', label: 'Internal antennas' }
];

const RoutersCondition = [
  { value: 'new', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Open Box', label: 'Open Box' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' }
];

const RoutersCompatible = [
  { value: 'Windows', label: 'Windows' },
  { value: 'macOS', label: 'macOS' },
  { value: 'iOS devices (iPhone, iPad)', label: 'iOS devices (iPhone, iPad)' },
  { value: 'Android devices', label: 'Android devices' },
  { value: 'most Internet Service Providers (ISPs)', label: 'most Internet Service Providers (ISPs)' }
];

const RoutersSignalCoverage = [
  { value: 'Up to 1000 square feet', label: 'Up to 1000 square feet' },
  { value: 'Up to 2000 square feet', label: 'Up to 2000 square feet' },
  { value: 'Up to 3000 square feet', label: 'Up to 3000 square feet' },
  { value: 'Up to 4000 square feet', label: 'Up to 4000 square feet' },
  { value: 'Up to 5000 square feet', label: 'Up to 5000 square feet' },
  { value: 'Up to 6000 square feet', label: 'Up to 6000 square feet' },
  { value: 'Up to 7000 square feet', label: 'Up to 7000 square feet' },
  { value: 'Up to 8000 square feet', label: 'Up to 8000 square feet' },
  { value: 'Up to 9000 square feet', label: 'Up to 9000 square feet' },
  { value: 'Up to 10,000 square feet', label: 'Up to 10,000 square feet' }
];

function Routers({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Gbps Speed"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="gbpsSpeed"
          options={RoutersGbpsSpeed}
          value={initiallistingsData.gbpsSpeed}
          onChange={(option) => handleSelectChange("gbpsSpeed", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Wireless"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="wireless"
          options={RoutersWireless}
          value={initiallistingsData.wireless}
          onChange={(option) => handleSelectChange("wireless", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Frequency"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="frequency"
          options={RoutersFrequency}
          value={initiallistingsData.frequency}
          onChange={(option) => handleSelectChange("frequency", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="connectivity"
          options={RoutersConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Antennas"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="antennas"
          options={RoutersAntennas}
          value={initiallistingsData.antennas}
          onChange={(option) => handleSelectChange("antennas", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="condition"
          options={RoutersCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Compatible"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="compatible"
          options={RoutersCompatible}
          value={initiallistingsData.compatible}
          onChange={(options) => handleSelectChange("compatible", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Signal Coverage"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="signalCoverage"
          options={RoutersSignalCoverage}
          value={initiallistingsData.signalCoverage}
          onChange={(option) => handleSelectChange("signalCoverage", option.value)}
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

Routers.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Routers.defaultProps = {
  initialState: {


    gbpsSpeed: '',
    wireless: '',
    frequency: '',
    connectivity: [],
    antennas: '',
    condition: '',
    compatible: [],
    signalCoverage: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Routers;
