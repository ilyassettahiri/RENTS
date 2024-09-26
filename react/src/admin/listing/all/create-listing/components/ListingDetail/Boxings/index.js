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
const icon1 = `${imagePath}/categoryicons/boxings/boxing_clothing.svg`;
const icon2 = `${imagePath}/categoryicons/boxings/brand.svg`;
const icon3 = `${imagePath}/categoryicons/boxings/other_equipment.svg`;
const icon4 = `${imagePath}/categoryicons/boxings/padding_thickness.svg`;
const icon5 = `${imagePath}/categoryicons/boxings/ring_dimensions.svg`;
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
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const BoxingRing = [
  { value: 'Small Ring (4.3 to 4.9 meters)', label: 'Small Ring (4.3 to 4.9 meters)' },
  { value: 'Standard Ring (4.9 to 6.1 meters)', label: 'Standard Ring (4.9 to 6.1 meters)' },
  { value: 'Large Ring (6.1 to 7.3 meters)', label: 'Large Ring (6.1 to 7.3 meters)' }
];
const BoxingPadding = [
  { value: 'Thin Padding', label: 'Thin Padding' },
  { value: 'Standard Padding', label: 'Standard Padding' },
  { value: 'Thick Padding', label: 'Thick Padding' }
];
const BoxingClothing = [
  { value: 'Boxing Shorts', label: 'Boxing Shorts' },
  { value: 'Boxing Trunks', label: 'Boxing Trunks' },
  { value: 'Boxing Robes', label: 'Boxing Robes' },
  { value: 'Boxing T-Shirts', label: 'Boxing T-Shirts' },
  { value: 'Boxing Tank Tops', label: 'Boxing Tank Tops' },
  { value: 'Boxing Hoodies', label: 'Boxing Hoodies' },
  { value: 'Boxing Socks', label: 'Boxing Socks' },
  { value: 'Boxing Handwraps', label: 'Boxing Handwraps' },
  { value: 'Boxing Gloves', label: 'Boxing Gloves' }
];
const BoxingBrand = [
  { value: 'Everlast', label: 'Everlast' },
  { value: 'TITLE Boxing', label: 'TITLE Boxing' },
  { value: 'Ringside', label: 'Ringside' },
  { value: 'Venum', label: 'Venum' },
  { value: 'Hayabusa', label: 'Hayabusa' },
  { value: 'Cleto Reyes', label: 'Cleto Reyes' },
  { value: 'Twins Special', label: 'Twins Special' },
  { value: 'Rival Boxing', label: 'Rival Boxing' },
  { value: 'Adidas Boxing', label: 'Adidas Boxing' },
  { value: 'Lonsdale', label: 'Lonsdale' }
];
const BoxingOther = [
  { value: 'Punching Ball', label: 'Punching Ball' },
  { value: 'Punching Bag', label: 'Punching Bag' },
  { value: 'Jumping Rope', label: 'Jumping Rope' }
];

function Boxings({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Ring Dimensions"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="ringDimensions"
          options={BoxingRing}
          value={initiallistingsData.ringDimensions}
          onChange={(options) => handleSelectChange("ringDimensions", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Padding"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="padding"
          options={BoxingPadding}
          value={initiallistingsData.padding}
          onChange={(options) => handleSelectChange("padding", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Boxing Clothing"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="clothing"
          options={BoxingClothing}
          value={initiallistingsData.clothing}
          onChange={(options) => handleSelectChange("clothing", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Brand Name"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="brand"
          options={BoxingBrand}
          value={initiallistingsData.brand}
          onChange={(option) => handleSelectChange("brand", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Other Equipment"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="otherEquipment"
          options={BoxingOther}
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

Boxings.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Boxings.defaultProps = {
  initialState: {


    ringDimensions: '',
    padding: '',
    clothing: [],
    brand: '',
    otherEquipment: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Boxings;
