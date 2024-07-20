import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/gamings/condition.svg`;
const icon2 = `${imagePath}/categoryicons/gamings/connectivity.svg`;
const icon3 = `${imagePath}/categoryicons/gamings/controller.svg`;
const icon4 = `${imagePath}/categoryicons/gamings/games.svg`;
const icon5 = `${imagePath}/categoryicons/gamings/number_of_ports.svg`;
const icon6 = `${imagePath}/categoryicons/gamings/online_services.svg`;
const icon7 = `${imagePath}/categoryicons/gamings/storage.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const GamingStorage = [
  { value: '500GB', label: '500GB' },
  { value: '1TB', label: '1TB' },
  { value: '2TB', label: '2TB' },
  { value: '4TB', label: '4TB' },
  { value: '8TB and above', label: '8TB and above' }
];

const GamingConnectivity = [
  { value: 'HDMI', label: 'HDMI' },
  { value: 'DisplayPort', label: 'DisplayPort' },
  { value: 'USB', label: 'USB' },
  { value: 'Ethernet', label: 'Ethernet' },
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Audio Jacks', label: 'Audio Jacks' }
];

const GamingPorts = [
  { value: '1', label: '1' },
  { value: '2', label: '2' }
];

const GamingOnlineservices = [
  { value: 'PlayStation Network', label: 'PlayStation Network' },
  { value: 'Xbox Live', label: 'Xbox Live' },
  { value: 'Steam', label: 'Steam' },
  { value: 'Nintendo Switch Online', label: 'Nintendo Switch Online' },
  { value: 'Epic Games Store', label: 'Epic Games Store' },
  { value: 'Origin', label: 'Origin' },
  { value: 'Battle.net', label: 'Battle.net' },
  { value: 'Xbox Game Pass', label: 'Xbox Game Pass' },
  { value: 'PlayStation Now', label: 'PlayStation Now' }
];

const GamingCondition = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' }
];

const GamingGames = [
  { value: 'Fortnite', label: 'Fortnite' },
  { value: 'Minecraft', label: 'Minecraft' },
  { value: 'League of Legends', label: 'League of Legends' },
  { value: 'Counter-Strike: Global Offensive (CS:GO)', label: 'Counter-Strike: Global Offensive (CS:GO)' },
  { value: 'Call of Duty series', label: 'Call of Duty series' },
  { value: 'Grand Theft Auto V (GTA V)', label: 'Grand Theft Auto V (GTA V)' },
  { value: 'FIFA series', label: 'FIFA series' },
  { value: 'The Legend of Zelda series', label: 'The Legend of Zelda series' },
  { value: 'Super Mario series', label: 'Super Mario series' },
  { value: 'Overwatch', label: 'Overwatch' }
];

const GamingController = [
  { value: 'Xbox Controller', label: 'Xbox Controller' },
  { value: 'PlayStation DualShock Controller', label: 'PlayStation DualShock Controller' },
  { value: 'Nintendo Switch Pro Controller', label: 'Nintendo Switch Pro Controller' },
  { value: 'PC Gaming Mouse and Keyboard', label: 'PC Gaming Mouse and Keyboard' },
  { value: 'Steam Controller', label: 'Steam Controller' },
  { value: 'Nintendo Joy-Con', label: 'Nintendo Joy-Con' },
  { value: 'Arcade Fight Stick', label: 'Arcade Fight Stick' },
  { value: 'Mobile Gaming Controllers', label: 'Mobile Gaming Controllers' }
];

function Gamings({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Storage"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="storage"
          options={GamingStorage}
          value={initiallistingsData.storage}
          onChange={(option) => handleSelectChange("storage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="connectivity"
          options={GamingConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Ports"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="ports"
          options={GamingPorts}
          value={initiallistingsData.ports}
          onChange={(option) => handleSelectChange("ports", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Online Services"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="onlineServices"
          options={GamingOnlineservices}
          value={initiallistingsData.onlineServices}
          onChange={(options) => handleSelectChange("onlineServices", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="condition"
          options={GamingCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Games"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="games"
          options={GamingGames}
          value={initiallistingsData.games}
          onChange={(options) => handleSelectChange("games", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Controller"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="controller"
          options={GamingController}
          value={initiallistingsData.controller}
          onChange={(options) => handleSelectChange("controller", options)}
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

Gamings.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Gamings.defaultProps = {
  initialState: {

    storage: '',
    connectivity: [],
    ports: [],
    onlineServices: '',
    condition: '',
    games: [],
    controller: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Gamings;
