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
const icon1 = `${imagePath}/categoryicons/footballs/equipment.svg`;
const icon2 = `${imagePath}/categoryicons/footballs/terrain_dimensions.svg`;
const icon3 = `${imagePath}/categoryicons/footballs/type.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon30
};


const MoreDetails = [
  { value: 'Scoreboard', label: 'Scoreboard' },
  { value: 'Referee Whistle', label: 'Referee Whistle' },
  { value: 'Training Cones', label: 'Training Cones' },
  { value: 'First Aid Kit', label: 'First Aid Kit' },
  { value: 'Water Bottles', label: 'Water Bottles' },
  { value: 'Goal Posts', label: 'Goal Posts' },
  { value: 'Protective Gear', label: 'Protective Gear' },
  { value: 'Fitness Tracker', label: 'Fitness Tracker' },
  { value: 'Jump Rope', label: 'Jump Rope' },
  { value: 'Yoga Mat', label: 'Yoga Mat' },
  { value: 'Agility Ladder', label: 'Agility Ladder' },
  { value: 'Dumbbells', label: 'Dumbbells' },
  { value: 'Kettlebells', label: 'Kettlebells' },
  { value: 'Resistance Bands', label: 'Resistance Bands' },
  { value: 'Tennis Racket', label: 'Tennis Racket' }
];


const footballType = [
  { value: 'Football', label: 'Football' },
  { value: 'Volleyball', label: 'Volleyball' },
  { value: 'Basketball', label: 'Basketball' }
];

const footballEquipment = [
  { value: 'Ball', label: 'Ball' },
  { value: 'Clothing', label: 'Clothing' }
];

function Footballs({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
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
        title="Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="type"
          options={footballType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Equipment"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="equipment"
          options={footballEquipment}
          value={initiallistingsData.equipment}
          onChange={(options) => handleSelectChange("equipment", options)}
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

Footballs.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Footballs.defaultProps = {
  initialState: {

    type: '',
    equipment: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Footballs;
