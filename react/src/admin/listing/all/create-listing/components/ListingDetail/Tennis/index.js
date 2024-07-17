import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/biensport/tennis/brand.svg`;
const icon2 = `${imagePath}/categoryicons/biensport/tennis/clothing.svg`;
const icon3 = `${imagePath}/categoryicons/biensport/tennis/equipment.svg`;
const icon4 = `${imagePath}/categoryicons/biensport/tennis/tennis_terrain.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

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
        <OneSelect
          name="tennisTerrain"
          options={TennisTerrain}
          value={initiallistingsData.tennisTerrain}
          onChange={(option) => handleSelectChange("tennisTerrain", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Brand Name"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="brandName"
          options={TennisBrand}
          value={initiallistingsData.brandName}
          onChange={(option) => handleSelectChange("brandName", option.value)}
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
