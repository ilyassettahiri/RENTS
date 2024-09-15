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
const icon1 = `${imagePath}/categoryicons/huntings/binoculars.svg`;
const icon2 = `${imagePath}/categoryicons/huntings/clothing.svg`;
const icon3 = `${imagePath}/categoryicons/huntings/crossbow.svg`;
const icon4 = `${imagePath}/categoryicons/huntings/decoy.svg`;
const icon5 = `${imagePath}/categoryicons/huntings/equipment.svg`;
const icon6 = `${imagePath}/categoryicons/huntings/game_call.svg`;
const icon7 = `${imagePath}/categoryicons/huntings/bow_arrow.svg`;
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


const HuntingBow = [
  { value: 'Compound Bow', label: 'Compound Bow' },
  { value: 'Recurve Bow', label: 'Recurve Bow' },
  { value: 'Longbow', label: 'Longbow' },
  { value: 'Traditional Bow', label: 'Traditional Bow' },
  { value: 'Youth Bow', label: 'Youth Bow' },
  { value: 'Custom Bow', label: 'Custom Bow' }
];
const HuntingCrossbow = [
  { value: 'Compound Crossbow', label: 'Compound Crossbow' },
  { value: 'Recurve Crossbow', label: 'Recurve Crossbow' },
  { value: 'Reverse Draw Crossbow', label: 'Reverse Draw Crossbow' },
  { value: 'Pistol Crossbow', label: 'Pistol Crossbow' },
  { value: 'Tactical Crossbow', label: 'Tactical Crossbow' },
  { value: 'Youth Crossbow', label: 'Youth Crossbow' },
  { value: 'Custom Crossbow', label: 'Custom Crossbow' }
];
const HuntingDecoy = [
  { value: 'Duck Decoy', label: 'Duck Decoy' },
  { value: 'Goose Decoy', label: 'Goose Decoy' },
  { value: 'Turkey Decoy', label: 'Turkey Decoy' },
  { value: 'Deer Decoy', label: 'Deer Decoy' },
  { value: 'Predator Decoy', label: 'Predator Decoy' },
  { value: 'Dove Decoy', label: 'Dove Decoy' },
  { value: 'Pigeon Decoy', label: 'Pigeon Decoy' },
  { value: 'Crow Decoy', label: 'Crow Decoy' },
  { value: 'Owl Decoy', label: 'Owl Decoy' },
  { value: 'Motion Decoy', label: 'Motion Decoy' }
];
const HuntingGame = [
  { value: 'Duck Call', label: 'Duck Call' },
  { value: 'Goose Call', label: 'Goose Call' },
  { value: 'Turkey Call', label: 'Turkey Call' },
  { value: 'Deer Call', label: 'Deer Call' },
  { value: 'Predator Call', label: 'Predator Call' },
  { value: 'Elk Call', label: 'Elk Call' },
  { value: 'Moose Call', label: 'Moose Call' },
  { value: 'Quail Call', label: 'Quail Call' },
  { value: 'Dove Call', label: 'Dove Call' },
  { value: 'Crow Call', label: 'Crow Call' }
];
const HuntingBinoculars = [
  { value: 'Compact Binoculars', label: 'Compact Binoculars' },
  { value: 'Full-Size Binoculars', label: 'Full-Size Binoculars' },
  { value: 'Zoom Binoculars', label: 'Zoom Binoculars' },
  { value: 'Waterproof Binoculars', label: 'Waterproof Binoculars' },
  { value: 'Fogproof Binoculars', label: 'Fogproof Binoculars' },
  { value: 'Image Stabilizing Binoculars', label: 'Image Stabilizing Binoculars' },
  { value: 'Night Vision Binoculars', label: 'Night Vision Binoculars' },
  { value: 'Thermal Imaging Binoculars', label: 'Thermal Imaging Binoculars' },
  { value: 'Rangefinder Binoculars', label: 'Rangefinder Binoculars' },
  { value: 'Hunting-Specific Binoculars', label: 'Hunting-Specific Binoculars' }
];
const HuntingClothing = [
  { value: 'Camouflage Jacket', label: 'Camouflage Jacket' },
  { value: 'Camouflage Pants', label: 'Camouflage Pants' },
  { value: 'Camouflage Shirt', label: 'Camouflage Shirt' },
  { value: 'Camouflage Hat', label: 'Camouflage Hat' },
  { value: 'Camouflage Gloves', label: 'Camouflage Gloves' },
  { value: 'Camouflage Face Mask', label: 'Camouflage Face Mask' },
  { value: 'Hunting Boots', label: 'Hunting Boots' },
  { value: 'Base Layer', label: 'Base Layer' },
  { value: 'Insulated Jacket', label: 'Insulated Jacket' },
  { value: 'Rain Jacket', label: 'Rain Jacket' },
  { value: 'Hunting Vest', label: 'Hunting Vest' },
  { value: 'Ghillie Suit', label: 'Ghillie Suit' }
];
const HuntingEquipment = [
  { value: 'Riffle', label: 'Riffle' },
  { value: 'Scopes', label: 'Scopes' },
  { value: 'Shotgun', label: 'Shotgun' },
  { value: 'Treestands', label: 'Treestands' },
  { value: 'Gun Ammunitions', label: 'Gun Ammunitions' },
  { value: 'Hearing Protection', label: 'Hearing Protection' }
];

function Huntings({ onDataChange, initialState, isOpen }) {

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
        title="Bow & Arrow"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="bowArrow"
          options={HuntingBow}
          value={initiallistingsData.bowArrow}
          onChange={(option) => handleSelectChange("bowArrow", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Crossbow"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="crossbow"
          options={HuntingCrossbow}
          value={initiallistingsData.crossbow}
          onChange={(option) => handleSelectChange("crossbow", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Decoy"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="decoy"
          options={HuntingDecoy}
          value={initiallistingsData.decoy}
          onChange={(options) => handleSelectChange("decoy", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Game Call"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="gameCall"
          options={HuntingGame}
          value={initiallistingsData.gameCall}
          onChange={(options) => handleSelectChange("gameCall", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Binoculars"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="binoculars"
          options={HuntingBinoculars}
          value={initiallistingsData.binoculars}
          onChange={(options) => handleSelectChange("binoculars", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Clothing"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="clothing"
          options={HuntingClothing}
          value={initiallistingsData.clothing}
          onChange={(options) => handleSelectChange("clothing", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Equipment"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="equipment"
          options={HuntingEquipment}
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

Huntings.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Huntings.defaultProps = {
  initialState: {



    bowArrow: '',
    crossbow: '',
    decoy: [],
    gameCall: [],
    binoculars: [],
    clothing: [],
    equipment: [],
    moreDetails: [],
    
  },
  isOpen: false,
};

export default Huntings;
