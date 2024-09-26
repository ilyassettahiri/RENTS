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
const icon1 = `${imagePath}/categoryicons/divings/brand.svg`;
const icon2 = `${imagePath}/categoryicons/divings/clothing.svg`;
const icon3 = `${imagePath}/categoryicons/divings/equipment.svg`;
const icon4 = `${imagePath}/categoryicons/divings/material.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const DivingBrand = [
  { value: 'Scubapro', label: 'Scubapro' },
  { value: 'Mares', label: 'Mares' },
  { value: 'Cressi', label: 'Cressi' },
  { value: 'Aqua Lung', label: 'Aqua Lung' },
  { value: 'Apeks', label: 'Apeks' },
  { value: 'Oceanic', label: 'Oceanic' },
  { value: 'Hollis', label: 'Hollis' },
  { value: 'Atomic Aquatics', label: 'Atomic Aquatics' },
  { value: 'Suunto', label: 'Suunto' },
  { value: 'Zeagle', label: 'Zeagle' },
  { value: 'TUSA', label: 'TUSA' },
  { value: 'Sherwood', label: 'Sherwood' },
  { value: 'Seac Sub', label: 'Seac Sub' },
  { value: 'Fourth Element', label: 'Fourth Element' },
  { value: 'DUI', label: 'DUI' }
];

const DivingMaterial = [
  { value: 'Neoprene', label: 'Neoprene' },
  { value: 'Nylon', label: 'Nylon' },
  { value: 'Stainless Steel', label: 'Stainless Steel' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Silicone', label: 'Silicone' },
  { value: 'PVC', label: 'PVC' },
  { value: 'Thermoplastic Polyurethane', label: 'Thermoplastic Polyurethane' },
  { value: 'Titanium', label: 'Titanium' },
  { value: 'Latex', label: 'Latex' },
  { value: 'Carbon Fiber', label: 'Carbon Fiber' }
];

const DivingOther = [
  { value: 'Hoods', label: 'Hoods' },
  { value: 'Socks and Boots', label: 'Socks and Boots' },
  { value: 'Wetsuits', label: 'Wetsuits' },
  { value: 'Gloves', label: 'Gloves' },
  { value: 'Rash guards', label: 'Rash guards' },
  { value: 'Bags', label: 'Bags' },
  { value: 'Shorties', label: 'Shorties' },
  { value: 'Masks', label: 'Masks' },
  { value: 'Vests', label: 'Vests' },
  { value: 'Dive Lights', label: 'Dive Lights' },
  { value: 'Diving Fins', label: 'Diving Fins' },
  { value: 'Diving Snorkels', label: 'Diving Snorkels' },
  { value: 'Diving Regulators', label: 'Diving Regulators' }
];

function Divings({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
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
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Brand Name"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="brandName"
          options={DivingBrand}
          value={initiallistingsData.brandName}
          onChange={(option) => handleSelectChange("brandName", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Material"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="material"
          options={DivingMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Other Equipment"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="otherEquipment"
          options={DivingOther}
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

Divings.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Divings.defaultProps = {
  initialState: {


    brandName: '',
    material: '',
    otherEquipment: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Divings;
