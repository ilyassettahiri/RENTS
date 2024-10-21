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
const icon1 = `${imagePath}/categoryicons/surfs/surf_board_size.svg`;
const icon2 = `${imagePath}/categoryicons/surfs/surf_board_types.svg`;
const icon3 = `${imagePath}/categoryicons/surfs/surf_category.svg`;
const icon4 = `${imagePath}/categoryicons/surfs/surf_equipment.svg`;
const icon5 = `${imagePath}/categoryicons/surfs/wetsuits.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon30
};


const MoreDetails = [
  { value: 'fin setup', label: 'Fin Setup' },
  { value: 'leash', label: 'Leash' },
  { value: 'board bag', label: 'Board Bag' },
  { value: 'wax', label: 'Wax' },
  { value: 'surfboard repair kit', label: 'Surfboard Repair Kit' },
  { value: 'surfboard traction pad', label: 'Surfboard Traction Pad' },
  { value: 'surfboard straps', label: 'Surfboard Straps' },
  { value: 'swim fins', label: 'Swim Fins' },
  { value: 'sunscreen', label: 'Sunscreen' },
  { value: 'surf hat', label: 'Surf Hat' },
  { value: 'surf watch', label: 'Surf Watch' },
  { value: 'water camera', label: 'Water Camera' },
  { value: 'dry bag', label: 'Dry Bag' },
  { value: 'cooler', label: 'Cooler' },
  { value: 'snorkel gear', label: 'Snorkel Gear' },
  { value: 'beach towel', label: 'Beach Towel' },
  { value: 'first aid kit', label: 'First Aid Kit' },
  { value: 'water shoes', label: 'Water Shoes' },
  { value: 'surf training equipment', label: 'Surf Training Equipment' }
];


const surfCategory = [
  { value: 'Traditional Surfing', label: 'Traditional Surfing' },
  { value: 'Kite Surfing', label: 'Kite Surfing' },
  { value: 'Bodyboarding', label: 'Bodyboarding' },
  { value: 'Stand-up Paddleboarding (SUP)', label: 'Stand-up Paddleboarding (SUP)' },
  { value: 'Tow-in Surfing', label: 'Tow-in Surfing' }
];
const surfTypes = [
  { value: 'Shortboard', label: 'Shortboard' },
  { value: 'Longboard', label: 'Longboard' },
  { value: 'Fish', label: 'Fish' },
  { value: 'Funboard', label: 'Funboard' },
  { value: 'Gun', label: 'Gun' },
  { value: 'Mini Malibu', label: 'Mini Malibu' },
  { value: 'Soft-Top', label: 'Soft-Top' }
];
const surfingSize = [
  { value: 'Short (1.8 meters)', label: 'Short (1.8 meters)' },
  { value: 'Medium (1.8 to 2.4 meters)', label: 'Medium (1.8 to 2.4 meters)' },
  { value: 'Long (2.4+ meters)', label: 'Long (2.4+ meters)' }
];
const surfWetsuits = [
  { value: 'Full Suit', label: 'Full Suit' },
  { value: 'Spring Suit', label: 'Spring Suit' },
  { value: 'Long John', label: 'Long John' },
  { value: 'Shorty', label: 'Shorty' },
  { value: 'Rash Guard', label: 'Rash Guard' },
  { value: 'Neoprene Top', label: 'Neoprene Top' },
  { value: 'Booties', label: 'Booties' },
  { value: 'Gloves', label: 'Gloves' },
  { value: 'Hood', label: 'Hood' }
];
const surfOther = [
  { value: 'Stand-Up Paddleboard', label: 'Stand-Up Paddleboard' },
  { value: 'Surf Board Kite', label: 'Surf Board Kite' }
];

function Surfs({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
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
        title="Surf Category"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        
          <FormField
            
            type="text"
            name="surfCategory"
            placeholder="Enter Surf Category"
            value={initiallistingsData.surfCategory}
            onChange={(e) => handleSelectChange("surfCategory", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Board Types"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        


          <FormField
            
            type="text"
            name="surfTypes"
            placeholder="Enter Surf Types"
            value={initiallistingsData.surfTypes}
            onChange={(e) => handleSelectChange("surfTypes", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Board Size"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        



          <FormField
            
            type="text"
            name="surfingSize"
            placeholder="Enter Surfing Size"
            value={initiallistingsData.surfingSize}
            onChange={(e) => handleSelectChange("surfingSize", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Wetsuits"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="surfWetsuits"
          options={surfWetsuits}
          value={initiallistingsData.surfWetsuits}
          onChange={(options) => handleSelectChange("surfWetsuits", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Surf Other"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="surfOther"
          options={surfOther}
          value={initiallistingsData.surfOther}
          onChange={(options) => handleSelectChange("surfOther", options)}
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

Surfs.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Surfs.defaultProps = {
  initialState: {


    surfCategory: '',
    surfTypes: '',
    surfingSize: '',
    surfWetsuits: [],
    surfOther: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Surfs;
