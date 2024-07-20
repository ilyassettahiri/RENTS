import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/chargers/amperage.svg`;
const icon2 = `${imagePath}/categoryicons/chargers/cable_length.svg`;
const icon3 = `${imagePath}/categoryicons/chargers/car_condition.svg`;
const icon4 = `${imagePath}/categoryicons/chargers/compatibility.svg`;
const icon5 = `${imagePath}/categoryicons/chargers/connector_type.svg`;
const icon6 = `${imagePath}/categoryicons/chargers/number_of_ports.svg`;
const icon7 = `${imagePath}/categoryicons/chargers/wattage.svg`;
const icon8 = `${imagePath}/categoryicons/chargers/voltage.svg`;
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
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const ChargersCompatibility = [
  { value: 'iPhone', label: 'iPhone' },
  { value: 'iPad', label: 'iPad' },
  { value: 'Android smartphones', label: 'Android smartphones' },
  { value: 'Tablets', label: 'Tablets' },
  { value: 'Laptops', label: 'Laptops' },
  { value: 'Smartwatches', label: 'Smartwatches' },
  { value: 'Bluetooth earphones/headphones', label: 'Bluetooth earphones/headphones' },
  { value: 'Digital cameras', label: 'Digital cameras' },
  { value: 'Gaming devices', label: 'Gaming devices' },
  { value: 'Portable speakers', label: 'Portable speakers' }
];

const ChargersNumberOfPorts = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
];

const ChargersLength = [
  { value: '3-6 feet', label: '3-6 feet' },
  { value: '6-10 feet', label: '6-10 feet' },
  { value: '1-3 feet', label: '1-3 feet' }
];

const ChargersInputVoltage = [
  { value: '100-240V AC', label: '100-240V AC' },
  { value: '110-120V AC', label: '110-120V AC' },
  { value: '220-240V AC', label: '220-240V AC' },
  { value: '5V DC', label: '5V DC' },
  { value: '12V DC', label: '12V DC' }
];

const ChargersWattage = [
  { value: '5W', label: '5W' },
  { value: '10W', label: '10W' },
  { value: '18W', label: '18W' },
  { value: '20W', label: '20W' },
  { value: '30W', label: '30W' },
  { value: '45W', label: '45W' },
  { value: '60W', label: '60W' },
  { value: '65W', label: '65W' },
  { value: '87W', label: '87W' }
];

const ChargersCondition = [
  { value: 'New', label: 'New' },
  { value: 'Open-box', label: 'Open-box' },
  { value: 'Used', label: 'Used' }
];

const ChargersConnectorType = [
  { value: 'USB-A', label: 'USB-A' },
  { value: 'USB-C', label: 'USB-C' },
  { value: 'Lightning', label: 'Lightning' },
  { value: 'Micro USB', label: 'Micro USB' }
];

const ChargersAmperage = [
  { value: '1A', label: '1A' },
  { value: '2.1A', label: '2.1A' },
  { value: '2.4A', label: '2.4A' },
  { value: '3A', label: '3A' },
  { value: '3.4A', label: '3.4A' },
  { value: '4.8A', label: '4.8A' },
  { value: '5A', label: '5A' }
];

function Chargers({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Compatibility"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="compatibility"
          options={ChargersCompatibility}
          value={initiallistingsData.compatibility}
          onChange={(options) => handleSelectChange("compatibility", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Number Of Ports"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="numberOfPorts"
          options={ChargersNumberOfPorts}
          value={initiallistingsData.numberOfPorts}
          onChange={(option) => handleSelectChange("numberOfPorts", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Length"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="length"
          options={ChargersLength}
          value={initiallistingsData.length}
          onChange={(option) => handleSelectChange("length", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Input Voltage"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="inputVoltage"
          options={ChargersInputVoltage}
          value={initiallistingsData.inputVoltage}
          onChange={(option) => handleSelectChange("inputVoltage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Wattage"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="wattage"
          options={ChargersWattage}
          value={initiallistingsData.wattage}
          onChange={(option) => handleSelectChange("wattage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="condition"
          options={ChargersCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Connector Type"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="connectorType"
          options={ChargersConnectorType}
          value={initiallistingsData.connectorType}
          onChange={(option) => handleSelectChange("connectorType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Amperage"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="amperage"
          options={ChargersAmperage}
          value={initiallistingsData.amperage}
          onChange={(option) => handleSelectChange("amperage", option.value)}
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

Chargers.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Chargers.defaultProps = {
  initialState: {


    compatibility: [],
    numberOfPorts: '',
    length: '',
    inputVoltage: '',
    wattage: '',
    condition: '',
    connectorType: '',
    amperage: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Chargers;
