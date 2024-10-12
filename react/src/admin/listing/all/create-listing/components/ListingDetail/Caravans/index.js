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
const icon1 = `${imagePath}/categoryicons/caravans/c.svg`;
const icon2 = `${imagePath}/categoryicons/caravans/camera.svg`;
const icon3 = `${imagePath}/categoryicons/caravans/fuel.svg`;
const icon4 = `${imagePath}/categoryicons/caravans/furniture.svg`;
const icon5 = `${imagePath}/categoryicons/caravans/gearbox.svg`;
const icon6 = `${imagePath}/categoryicons/caravans/kitchen_equipment.svg`;
const icon7 = `${imagePath}/categoryicons/caravans/minimum_age.svg`;
const icon8 = `${imagePath}/categoryicons/caravans/toilet.svg`;
const icon9 = `${imagePath}/categoryicons/caravans/accessories.svg`;
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
  icon9,
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' },
  { value: 'Air Conditioning', label: 'Air Conditioning' },
  { value: 'Heating System', label: 'Heating System' },
  { value: 'Solar Power System', label: 'Solar Power System' },
  { value: 'Water Tank', label: 'Water Tank' },
  { value: 'Sewer System', label: 'Sewer System' },
  { value: 'Shower', label: 'Shower' },
  { value: 'Propane System', label: 'Propane System' },
  { value: 'Satellite TV', label: 'Satellite TV' },
  { value: 'Awning', label: 'Awning' },
  { value: 'Wi-Fi Booster', label: 'Wi-Fi Booster' },
  { value: 'Sound System', label: 'Sound System' }
];


const CaravanGearbox = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' }
];

const CaravanFuelType = [
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' }
];

const CaravanKitchenEquipment = [
  { value: 'Stove', label: 'Stove' },
  { value: 'Oven', label: 'Oven' },
  { value: 'Microwave', label: 'Microwave' },
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Sink', label: 'Sink' }
];

const CaravanToilet = [
  { value: 'Flush toilet', label: 'Flush toilet' },
  { value: 'Cassette toilet', label: 'Cassette toilet' },
  { value: 'Composting toilet', label: 'Composting toilet' }
];

const CaravanFurniture = [
  { value: 'Tables', label: 'Tables' },
  { value: 'Chairs', label: 'Chairs' },
  { value: 'Sofas', label: 'Sofas' },
  { value: 'Beds', label: 'Beds' },
  { value: 'Cabinets', label: 'Cabinets' },
  { value: 'Blinds', label: 'Blinds' }
];

const CaravanAccessories = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Camera', label: 'Camera' },
  { value: 'TV', label: 'TV' },
  { value: 'Mosquito Net', label: 'Mosquito Net' },
  { value: 'Bicycle Rack', label: 'Bicycle Rack' },
  { value: 'Towbar', label: 'Towbar' },
  { value: 'Solar Panel', label: 'Solar Panel' },
  { value: 'Awning', label: 'Awning' }
];

function Caravans({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Gearbox"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="gearbox"
          options={CaravanGearbox}
          value={initiallistingsData.gearbox}
          onChange={(option) => handleSelectChange("gearbox", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Fuel Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="fuelType"
          options={CaravanFuelType}
          value={initiallistingsData.fuelType}
          onChange={(option) => handleSelectChange("fuelType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Kitchen Equipment"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="kitchenEquipment"
          options={CaravanKitchenEquipment}
          value={initiallistingsData.kitchenEquipment}
          onChange={(options) => handleSelectChange("kitchenEquipment", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Toilet"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="toilet"
          options={CaravanToilet}
          value={initiallistingsData.toilet}
          onChange={(option) => handleSelectChange("toilet", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Furniture"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="furniture"
          options={CaravanFurniture}
          value={initiallistingsData.furniture}
          onChange={(options) => handleSelectChange("furniture", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Accessories"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="accessories"
          options={CaravanAccessories}
          value={initiallistingsData.accessories}
          onChange={(options) => handleSelectChange("accessories", options)}
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

Caravans.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Caravans.defaultProps = {
  initialState: {


    gearbox: '',
    fuelType: '',
    kitchenEquipment: [],
    toilet: '',
    furniture: [],
    accessories: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Caravans;
