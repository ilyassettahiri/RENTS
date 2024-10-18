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
const icon1 = `${imagePath}/categoryicons/golfs/clubs.svg`;
const icon2 = `${imagePath}/categoryicons/golfs/golf.svg`;
const icon3 = `${imagePath}/categoryicons/golfs/golf_cars.svg`;
const icon4 = `${imagePath}/categoryicons/golfs/golf_clothing.svg`;
const icon5 = `${imagePath}/categoryicons/golfs/golf_equipment.svg`;
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
  { value: 'Rangefinder', label: 'Rangefinder' },
  { value: 'Golf Balls Marker', label: 'Golf Balls Marker' },
  { value: 'Divot Tool', label: 'Divot Tool' },
  { value: 'Ball Retriever', label: 'Ball Retriever' },
  { value: 'Golf Umbrella', label: 'Golf Umbrella' },
  { value: 'Towel', label: 'Towel' },
  { value: 'Headcovers', label: 'Headcovers' },
  { value: 'Golf Grip', label: 'Golf Grip' }
];


const GolfClothing = [
  { value: 'Shirts', label: 'Shirts' },
  { value: 'Pants', label: 'Pants' },
  { value: 'Shorts', label: 'Shorts' },
  { value: 'Skirts', label: 'Skirts' },
  { value: 'Sweaters', label: 'Sweaters' },
  { value: 'Jackets', label: 'Jackets' },
  { value: 'Hats', label: 'Hats' },
  { value: 'Visors', label: 'Visors' },
  { value: 'Gloves', label: 'Gloves' },
  { value: 'Socks', label: 'Socks' }
];

const GolfCars = [
  { value: 'Electric Golf Cart', label: 'Electric Golf Cart' },
  { value: 'Gasoline-Powered Golf Cart', label: 'Gasoline-Powered Golf Cart' },
  { value: 'Push Cart', label: 'Push Cart' },
  { value: 'Golf Skate Caddy', label: 'Golf Skate Caddy' },
  { value: 'Golf Bike', label: 'Golf Bike' },
  { value: 'Golf Scooter', label: 'Golf Scooter' },
  { value: 'Golf Segway', label: 'Golf Segway' }
];

const GolfOther = [
  { value: 'Balls', label: 'Balls' },
  { value: 'Tees', label: 'Tees' },
  { value: 'Bags', label: 'Bags' },
  { value: 'Chariot', label: 'Chariot' }
];

function Golfs({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Clothing"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="clothing"
          options={GolfClothing}
          value={initiallistingsData.clothing}
          onChange={(options) => handleSelectChange("clothing", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Cars"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="cars"
          options={GolfCars}
          value={initiallistingsData.cars}
          onChange={(option) => handleSelectChange("cars", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Other Equipment"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="otherEquipment"
          options={GolfOther}
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

Golfs.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Golfs.defaultProps = {
  initialState: {


    clothing: [],
    cars: '',
    otherEquipment: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Golfs;
