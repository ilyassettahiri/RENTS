import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';
import FormField from "admin/components/FormFieldCollap";

import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/tennis/brand.svg`;
const icon2 = `${imagePath}/categoryicons/tennis/clothing.svg`;
const icon3 = `${imagePath}/categoryicons/tennis/equipment.svg`;
const icon4 = `${imagePath}/categoryicons/tennis/tennis_terrain.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon30
};


const MoreDetails = [
  { value: 'Racket stringing services', label: 'Racket Stringing Services' },
  { value: 'Ball rental available', label: 'Ball Rental Available' },
  { value: 'Private coaching lessons', label: 'Private Coaching Lessons' },
  { value: 'Group coaching sessions', label: 'Group Coaching Sessions' },
  { value: 'Tennis clinics for beginners', label: 'Tennis Clinics for Beginners' },
  { value: 'Tournaments and competitions', label: 'Tournaments and Competitions' },
  { value: 'Access to practice courts', label: 'Access to Practice Courts' },
  { value: 'Locker room facilities', label: 'Locker Room Facilities' },
  { value: 'Shower facilities', label: 'Shower Facilities' },
  { value: 'Tennis merchandise available', label: 'Tennis Merchandise Available' },
  { value: 'Custom racket fitting', label: 'Custom Racket Fitting' },
  { value: 'Discounts for members', label: 'Discounts for Members' },
  { value: 'Ball machine rental', label: 'Ball Machine Rental' },
  { value: 'Tennis gear sale', label: 'Tennis Gear Sale' },
  { value: 'Kids programs and camps', label: 'Kids Programs and Camps' },
  { value: 'Accessibility features for all', label: 'Accessibility Features for All' }
];



const TennisTerrain = [
  { value: 'Hard Court', label: 'Hard Court' },
  { value: 'Clay Court', label: 'Clay Court' },
  { value: 'Grass Court', label: 'Grass Court' },
  { value: 'Carpet Court', label: 'Carpet Court' },
  { value: 'Artificial Turf Court', label: 'Artificial Turf Court' },
  { value: 'Indoor Court', label: 'Indoor Court' },
  { value: 'Outdoor Court', label: 'Outdoor Court' },
  { value: 'Acrylic Court', label: 'Acrylic Court' },
  { value: 'Rubber Court', label: 'Rubber Court' },
  { value: 'Wood Court', label: 'Wood Court' }
];
const TennisBrand = [
  { value: 'Wilson', label: 'Wilson' },
  { value: 'Babolat', label: 'Babolat' },
  { value: 'Head', label: 'Head' },
  { value: 'Yonex', label: 'Yonex' },
  { value: 'Prince', label: 'Prince' },
  { value: 'Dunlop', label: 'Dunlop' },
  { value: 'Tecnifibre', label: 'Tecnifibre' },
  { value: 'Adidas Tennis', label: 'Adidas Tennis' },
  { value: 'Nike Tennis', label: 'Nike Tennis' },
  { value: 'Asics Tennis', label: 'Asics Tennis' }
];
const TennisClothing = [
  { value: 'Shirts', label: 'Shirts' },
  { value: 'Shorts', label: 'Shorts' },
  { value: 'Skirts', label: 'Skirts' },
  { value: 'Dresses', label: 'Dresses' },
  { value: 'Jackets', label: 'Jackets' },
  { value: 'Pants', label: 'Pants' },
  { value: 'Socks', label: 'Socks' },
  { value: 'Headbands', label: 'Headbands' },
  { value: 'Wristbands', label: 'Wristbands' },
  { value: 'Shoes', label: 'Shoes' }
];

function Tennis({ onDataChange, initialState, isOpen }) {

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
        title="Tennis Terrain"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        


          <FormField
            
            type="text"
            name="tennisTerrain"
            placeholder="Enter Tennis Terrain"
            value={initiallistingsData.tennisTerrain}
            onChange={(e) => handleSelectChange("tennisTerrain", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Brand Name"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        


          <FormField
            
            type="text"
            name="brandName"
            placeholder="Enter Brand Name"
            value={initiallistingsData.brandName}
            onChange={(e) => handleSelectChange("brandName", e.target.value)}
          />



      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Clothing"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="clothing"
          options={TennisClothing}
          value={initiallistingsData.clothing}
          onChange={(options) => handleSelectChange("clothing", options)}
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


Tennis.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Tennis.defaultProps = {
  initialState: {


    tennisTerrain: '',
    brandName: '',
    clothing: [],
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Tennis;
