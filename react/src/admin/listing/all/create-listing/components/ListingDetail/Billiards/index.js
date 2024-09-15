import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/billiards/balls_design.svg`;
const icon2 = `${imagePath}/categoryicons/billiards/bridge_stick.svg`;
const icon3 = `${imagePath}/categoryicons/billiards/chalk.svg`;
const icon4 = `${imagePath}/categoryicons/billiards/condition.svg`;
const icon5 = `${imagePath}/categoryicons/billiards/table_details.svg`;
const icon6 = `${imagePath}/categoryicons/billiards/other_information.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const billiardsTable = [
  { value: "Brunswick", label: "Brunswick" },
  { value: "Diamond Billiards", label: "Diamond Billiards" },
  { value: "Olhausen Billiards", label: "Olhausen Billiards" },
  { value: "Valley-Dynamo", label: "Valley-Dynamo" },
  { value: "Predator Cues", label: "Predator Cues" },
  { value: "McDermott Cue", label: "McDermott Cue" },
  { value: "Aramith", label: "Aramith" },
  { value: "Viking Cue", label: "Viking Cue" },
  { value: "Imperial International", label: "Imperial International" },
  { value: "Shender", label: "Shender" },
  { value: "Riley", label: "Riley" },
  { value: "BCE (British Crown Equipment)", label: "BCE (British Crown Equipment)" },
  { value: "American Heritage Billiards", label: "American Heritage Billiards" },
  { value: "Connelly Billiards", label: "Connelly Billiards" },
  { value: "Gandy", label: "Gandy" },
  { value: "Legacy Billiards", label: "Legacy Billiards" },
];

const billiardsCondition = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "refurbished", label: "Refurbished" },
  { value: "Costum built", label: "Costum built" },
  { value: "Antique", label: "Antique" },
  { value: "Vintage", label: "Vintage" },
  { value: "Excellent", label: "Excellent" },
];

const billiardsBalls = [
  { value: "Standard Solid Color Balls", label: "Standard Solid Color Balls" },
  { value: "Striped/Solid Combination Balls", label: "Striped/Solid Combination Balls" },
  { value: "Artistic Design Balls", label: "Artistic Design Balls" },
  { value: "Transparent Balls", label: "Transparent Balls" },
  { value: "Glow-in-the-dark Balls", label: "Glow-in-the-dark Balls" },
  { value: "Metallic Finish Balls", label: "Metallic Finish Balls" },
  { value: "Marbleized Design Balls", label: "Marbleized Design Balls" },
  { value: "UV Reactive Balls", label: "UV Reactive Balls" },
  { value: "Holographic Design Balls", label: "Holographic Design Balls" },
];

const billiardsBridge = [
  { value: "Regular Bridge", label: "Regular Bridge" },
  { value: "Cross Bridge", label: "Cross Bridge" },
  { value: "Moosehead Bridge", label: "Moosehead Bridge" },
  { value: "Spider Bridge", label: "Spider Bridge" },
  { value: "Mechanical Bridge", label: "Mechanical Bridge" },
  { value: "Rest", label: "Rest" },
];

const billiardsChalk = [
  { value: "Standard Blue Chalk", label: "Standard Blue Chalk" },
  { value: "Green Chalk", label: "Green Chalk" },
  { value: "Red Chalk", label: "Red Chalk" },
  { value: "Black Chalk", label: "Black Chalk" },
  { value: "Master Chalk", label: "Master Chalk" },
  { value: "Predator Chalk", label: "Predator Chalk" },
  { value: "Kamui Chalk", label: "Kamui Chalk" },
  { value: "Triangle Chalk", label: "Triangle Chalk" },
  { value: "Silver Cup Chalk", label: "Silver Cup Chalk" },
  { value: "Magic Chalk", label: "Magic Chalk" },
];

const billiardsOther = [
  { value: "Table Cover", label: "Table Cover" },
  { value: "Holder", label: "Holder" },
  { value: "Scoreboards", label: "Scoreboards" },
];

function Billiards({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
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
        title="Table Details"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="tableDetails"
          options={billiardsTable}
          value={initiallistingsData.tableDetails}
          onChange={(option) => handleSelectChange("tableDetails", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="condition"
          options={billiardsCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Balls Design"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="ballsDesign"
          options={billiardsBalls}
          value={initiallistingsData.ballsDesign}
          onChange={(options) => handleSelectChange("ballsDesign", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Bridge & Stick"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="bridgeAndStick"
          options={billiardsBridge}
          value={initiallistingsData.bridgeAndStick}
          onChange={(options) => handleSelectChange("bridgeAndStick", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Chalk"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="chalk"
          options={billiardsChalk}
          value={initiallistingsData.chalk}
          onChange={(options) => handleSelectChange("chalk", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Other Information"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="otherInformation"
          options={billiardsOther}
          value={initiallistingsData.otherInformation}
          onChange={(options) => handleSelectChange("otherInformation", options)}
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

Billiards.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Billiards.defaultProps = {
  initialState: {

    tableDetails: '',
    condition: '',
    ballsDesign: [],
    bridgeAndStick: [],
    chalk: [],
    otherInformation: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Billiards;
