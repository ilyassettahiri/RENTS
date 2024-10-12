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
const icon1 = `${imagePath}/categoryicons/jewelrys/chain_type.svg`;
const icon2 = `${imagePath}/categoryicons/jewelrys/condition.svg`;
const icon3 = `${imagePath}/categoryicons/jewelrys/gem_type.svg`;
const icon4 = `${imagePath}/categoryicons/jewelrys/length.svg`;
const icon5 = `${imagePath}/categoryicons/jewelrys/occasion.svg`;
const icon6 = `${imagePath}/categoryicons/jewelrys/weight.svg`;
const icon7 = `${imagePath}/categoryicons/jewelrys/type.svg`;
const icon8 = `${imagePath}/categoryicons/jewelrys/material.svg`;
const icon10 = `${imagePath}/categoryicons/jewelrys/closure_type.svg`;
const icon11 = `${imagePath}/categoryicons/jewelrys/color.svg`;
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
  icon10,
  icon11,
  icon30
};


const MoreDetails = [
  { value: 'Diamond', label: 'Diamond' },
  { value: 'Gold Plated', label: 'Gold Plated' },
  { value: 'Sterling Silver', label: 'Sterling Silver' },
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Handmade', label: 'Handmade' },
  { value: 'Customizable', label: 'Customizable' },
  { value: 'Hypoallergenic', label: 'Hypoallergenic' },
  { value: 'Adjustable', label: 'Adjustable' },
  { value: 'Ethically Sourced', label: 'Ethically Sourced' },
  { value: 'Limited Edition', label: 'Limited Edition' },
  { value: 'Matching Set', label: 'Matching Set' },
  { value: 'Gift-Ready', label: 'Gift-Ready' }
];



const JewelsType = [
  { value: 'Necklace', label: 'Necklace' },
  { value: 'Bracelet', label: 'Bracelet' },
  { value: 'Ring', label: 'Ring' },
  { value: 'Earrings', label: 'Earrings' },
  { value: 'Anklet', label: 'Anklet' },
  { value: 'Brooch', label: 'Brooch' },
  { value: 'Pendant', label: 'Pendant' },
  { value: 'Watch', label: 'Watch' },
  { value: 'Body Jewelry', label: 'Body Jewelry' }
];

const JewelsMaterial = [
  { value: '18kt Tricolor', label: '18kt Tricolor' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Base Metal', label: 'Base Metal' },
  { value: 'Leather', label: 'Leather' },
  { value: 'Mixed', label: 'Mixed' },
  { value: 'Palladium Plated', label: 'Palladium Plated' },
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Rose Gold', label: 'Rose Gold' },
  { value: 'Silver', label: 'Silver' },
  { value: 'White Gold', label: 'White Gold' },
  { value: 'Yellow Gold', label: 'Yellow Gold' },
  { value: 'Other', label: 'Other' }
];

const JewelsOccasion = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Formal', label: 'Formal' },
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Party', label: 'Party' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Everyday Wear', label: 'Everyday Wear' },
  { value: 'Work', label: 'Work' }
];

const JewelsChainType = [
  { value: 'Cable Chain', label: 'Cable Chain' },
  { value: 'Box Chain', label: 'Box Chain' },
  { value: 'Rope Chain', label: 'Rope Chain' },
  { value: 'Snake Chain', label: 'Snake Chain' },
  { value: 'Figaro Chain', label: 'Figaro Chain' },
  { value: 'Rolo Chain', label: 'Rolo Chain' },
  { value: 'Wheat Chain', label: 'Wheat Chain' },
  { value: 'Singapore Chain', label: 'Singapore Chain' },
  { value: 'Curb Chain', label: 'Curb Chain' },
  { value: 'Bead Chain', label: 'Bead Chain' }
];

const JewelsGemType = [
  { value: 'Diamond', label: 'Diamond' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Sapphire', label: 'Sapphire' },
  { value: 'Emerald', label: 'Emerald' },
  { value: 'Amethyst', label: 'Amethyst' },
  { value: 'Topaz', label: 'Topaz' },
  { value: 'Opal', label: 'Opal' },
  { value: 'Garnet', label: 'Garnet' },
  { value: 'Pearl', label: 'Pearl' },
  { value: 'Turquoise', label: 'Turquoise' },
  { value: 'Aquamarine', label: 'Aquamarine' },
  { value: 'Morganite', label: 'Morganite' },
  { value: 'Tanzanite', label: 'Tanzanite' },
  { value: 'Citrine', label: 'Citrine' },
  { value: 'Peridot', label: 'Peridot' },
  { value: 'Other', label: 'Other' }
];

const JewelsColor = [
  { value: 'Gold', label: 'Gold' },
  { value: 'Silver', label: 'Silver' },
  { value: 'Rose Gold', label: 'Rose Gold' },
  { value: 'White Gold', label: 'White Gold' },
  { value: 'Yellow Gold', label: 'Yellow Gold' },
  { value: 'Black', label: 'Black' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Red', label: 'Red' },
  { value: 'Green', label: 'Green' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Pink', label: 'Pink' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Multi-color', label: 'Multi-color' },
  { value: 'Other', label: 'Other' }
];

const JewelsClosureType = [
  { value: 'Lobster Clasp', label: 'Lobster Clasp' },
  { value: 'Spring Ring Clasp', label: 'Spring Ring Clasp' },
  { value: 'Toggle Clasp', label: 'Toggle Clasp' },
  { value: 'Box Clasp', label: 'Box Clasp' },
  { value: 'Hook and Eye Clasp', label: 'Hook and Eye Clasp' },
  { value: 'Magnetic Clasp', label: 'Magnetic Clasp' },
  { value: 'Slide Clasp', label: 'Slide Clasp' },
  { value: 'Barrel Clasp', label: 'Barrel Clasp' },
  { value: 'Push Button Clasp', label: 'Push Button Clasp' },
  { value: 'Other', label: 'Other' }
];

const JewelsCondition = [
  { value: 'New', label: 'New' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Vintage', label: 'Vintage' },
  { value: 'Antique', label: 'Antique' }
];

function Jewelrys({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="type"
          options={JewelsType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Material"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="material"
          options={JewelsMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Occasion"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="occasion"
          options={JewelsOccasion}
          value={initiallistingsData.occasion}
          onChange={(option) => handleSelectChange("occasion", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Chain Type"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="chainType"
          options={JewelsChainType}
          value={initiallistingsData.chainType}
          onChange={(option) => handleSelectChange("chainType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Gem Type"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="gemType"
          options={JewelsGemType}
          value={initiallistingsData.gemType}
          onChange={(option) => handleSelectChange("gemType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Color"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="color"
          options={JewelsColor}
          value={initiallistingsData.color}
          onChange={(option) => handleSelectChange("color", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Closure Type"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="closureType"
          options={JewelsClosureType}
          value={initiallistingsData.closureType}
          onChange={(options) => handleSelectChange("closureType", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="condition"
          options={JewelsCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
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

Jewelrys.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Jewelrys.defaultProps = {
  initialState: {


    type: '',
    material: '',
    occasion: '',
    chainType: '',
    gemType: '',
    color: '',
    closureType: [],
    condition: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Jewelrys;
