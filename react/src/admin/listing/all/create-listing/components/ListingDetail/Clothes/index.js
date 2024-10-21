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
const icon1 = `${imagePath}/categoryicons/clothes/condition.svg`;
const icon2 = `${imagePath}/categoryicons/clothes/heel_height.svg`;
const icon3 = `${imagePath}/categoryicons/clothes/size.svg`;
const icon4 = `${imagePath}/categoryicons/clothes/closure_type.svg`;
const icon5 = `${imagePath}/categoryicons/clothes/color.svg`;
const icon7 = `${imagePath}/categoryicons/clothes/number_of_pockets.svg`;
const icon8 = `${imagePath}/categoryicons/clothes/strap_type.svg`;
const icon9 = `${imagePath}/categoryicons/clothes/number_of_pieces.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon7,
  icon8,
  icon9,
  icon30
};



const MoreDetails = [
  { value: 'Breathable Fabric', label: 'Breathable Fabric' },
  { value: 'Moisture-Wicking', label: 'Moisture-Wicking' },
  { value: 'UV Protection', label: 'UV Protection' },
  { value: 'Stretchable Material', label: 'Stretchable Material' },
  { value: 'Reversible', label: 'Reversible' },
  { value: 'Water-Resistant', label: 'Water-Resistant' },
  { value: 'Machine Washable', label: 'Machine Washable' },
  { value: 'Hand Wash Only', label: 'Hand Wash Only' },
  { value: 'Eco-Friendly Materials', label: 'Eco-Friendly Materials' },
  { value: 'Hypoallergenic', label: 'Hypoallergenic' },
  { value: 'Thermal Insulation', label: 'Thermal Insulation' },
  { value: 'Stain-Resistant', label: 'Stain-Resistant' },
  { value: 'Lightweight', label: 'Lightweight' },
  { value: 'Heavyweight', label: 'Heavyweight' },
  { value: 'Limited Edition', label: 'Limited Edition' }
];



const ClothesNumberofPieces = [
  { value: 'Single', label: 'Single' },
  { value: 'Set of 2', label: 'Set of 2' },
  { value: 'Set of 3', label: 'Set of 3' },
  { value: 'Set of 4', label: 'Set of 4' },
  { value: 'Set of 5', label: 'Set of 5' }
];

const ClothesClosureType = [
  { value: 'Button', label: 'Button' },
  { value: 'Zipper', label: 'Zipper' },
  { value: 'Tie', label: 'Tie' },
  { value: 'Velcro', label: 'Velcro' },
  { value: 'Snap', label: 'Snap' },
  { value: 'Hook and Eye', label: 'Hook and Eye' },
  { value: 'Buckle', label: 'Buckle' },
  { value: 'Drawstring', label: 'Drawstring' },
  { value: 'Elastic', label: 'Elastic' },
  { value: 'Magnetic', label: 'Magnetic' },
  { value: 'Lace-up', label: 'Lace-up' },
  { value: 'None', label: 'None' }
];

const ClothesStrapType = [
  { value: 'Single shoulder strap', label: 'Single shoulder strap' },
  { value: 'Double shoulder straps', label: 'Double shoulder straps' },
  { value: 'Crossbody strap', label: 'Crossbody strap' },
  { value: 'Adjustable strap', label: 'Adjustable strap' },
  { value: 'Detachable strap', label: 'Detachable strap' },
  { value: 'Chain strap', label: 'Chain strap' },
  { value: 'Top handle', label: 'Top handle' },
  { value: 'Backpack straps', label: 'Backpack straps' },
  { value: 'Tote handles', label: 'Tote handles' },
  { value: 'No strap', label: 'No strap' }
];

const ClothesNumberofPockets = [
  { value: 'None', label: 'None' },
  { value: 'Single pocket', label: 'Single pocket' },
  { value: 'Two pockets', label: 'Two pockets' },
  { value: 'Three pockets', label: 'Three pockets' },
  { value: 'Four pockets', label: 'Four pockets' },
  { value: 'Five pockets', label: 'Five pockets' }
];

const ClothesHeelHeight = [
  { value: 'Flat', label: 'Flat' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Very High', label: 'Very High' }
];

const ClothesCondition = [
  { value: 'New with Tags', label: 'New with Tags' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Pre-owned', label: 'Pre-owned' },
  { value: 'Good', label: 'Good' }
];

const ClothesColor = [
  { value: 'Black', label: 'Black' },
  { value: 'White', label: 'White' },
  { value: 'Gray', label: 'Gray' },
  { value: 'Navy Blue', label: 'Navy Blue' },
  { value: 'Royal Blue', label: 'Royal Blue' },
  { value: 'Sky Blue', label: 'Sky Blue' },
  { value: 'Baby Blue', label: 'Baby Blue' },
  { value: 'Turquoise', label: 'Turquoise' },
  { value: 'Teal', label: 'Teal' },
  { value: 'Mint Green', label: 'Mint Green' },
  { value: 'Forest Green', label: 'Forest Green' },
  { value: 'Olive Green', label: 'Olive Green' },
  { value: 'Emerald Green', label: 'Emerald Green' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Mustard Yellow', label: 'Mustard Yellow' },
  { value: 'Gold', label: 'Gold' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Coral', label: 'Coral' },
  { value: 'Peach', label: 'Peach' },
  { value: 'Pink', label: 'Pink' },
  { value: 'Fuchsia', label: 'Fuchsia' },
  { value: 'Red', label: 'Red' },
  { value: 'Burgundy', label: 'Burgundy' },
  { value: 'Maroon', label: 'Maroon' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Lavender', label: 'Lavender' },
  { value: 'Violet', label: 'Violet' },
  { value: 'Beige', label: 'Beige' },
  { value: 'Cream', label: 'Cream' },
  { value: 'Tan', label: 'Tan' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Camel', label: 'Camel' },
  { value: 'Charcoal', label: 'Charcoal' },
  { value: 'Silver', label: 'Silver' },
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Bronze', label: 'Bronze' },
  { value: 'Khaki', label: 'Khaki' }
];

function Clothes({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Number of Pieces"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        



          <FormField
            
            type="text"
            name="numberOfPieces"
            placeholder="Enter Number Of Pieces"
            value={initiallistingsData.numberOfPieces}
            onChange={(e) => handleSelectChange("numberOfPieces", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Closure Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        



          <FormField
            
            type="text"
            name="closureType"
            placeholder="Enter Closure Type"
            value={initiallistingsData.closureType}
            onChange={(e) => handleSelectChange("closureType", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Strap Type"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="strapType"
          options={ClothesStrapType}
          value={initiallistingsData.strapType}
          onChange={(options) => handleSelectChange("strapType", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Number of Pockets"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="numberOfPockets"
          options={ClothesNumberofPockets}
          value={initiallistingsData.numberOfPockets}
          onChange={(option) => handleSelectChange("numberOfPockets", option.value)}
        />





      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Heel Height"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        



          <FormField
            
            type="text"
            name="heelHeight"
            placeholder="Enter Heel Height"
            value={initiallistingsData.heelHeight}
            onChange={(e) => handleSelectChange("heelHeight", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="condition"
          options={ClothesCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Color"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        



          <FormField
            
            type="text"
            name="color"
            placeholder="Enter color"
            value={initiallistingsData.color}
            onChange={(e) => handleSelectChange("color", e.target.value)}
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

Clothes.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Clothes.defaultProps = {
  initialState: {


    numberOfPieces: '',
    closureType: '',
    strapType: [],
    numberOfPockets: '',
    heelHeight: '',
    condition: '',
    color: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Clothes;
