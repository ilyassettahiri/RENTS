import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/maisonjardin/furniture/assembly_required.svg`;
const icon2 = `${imagePath}/categoryicons/maisonjardin/furniture/cruise_capacity.svg`;
const icon3 = `${imagePath}/categoryicons/maisonjardin/furniture/color.svg`;
const icon4 = `${imagePath}/categoryicons/maisonjardin/furniture/cushion_thickness.svg`;
const icon5 = `${imagePath}/categoryicons/maisonjardin/furniture/fill_material.svg`;
const icon6 = `${imagePath}/categoryicons/maisonjardin/furniture/material.svg`;
const icon7 = `${imagePath}/categoryicons/maisonjardin/furniture/type.svg`;
const icon8 = `${imagePath}/categoryicons/maisonjardin/furniture/shape.svg`;
const icon9 = `${imagePath}/categoryicons/maisonjardin/furniture/condition.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

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
  { value: 'Board Computer', label: 'Board Computer' }
];


const FurnitureType = [
  { value: '3-Seater', label: '3-Seater' },
  { value: '2-Seater ', label: '2-Seater ' },
  { value: '1-Seater', label: '1-Seater' },
  { value: 'Sofa Sets', label: 'Sofa Sets' },
  { value: 'Recliner', label: 'Recliner' },
  { value: 'L Shape', label: 'L Shape' },
  { value: 'Sofa Cum Bed', label: 'Sofa Cum Bed' },
  { value: 'Centre Tables', label: 'Centre Tables' },
  { value: 'Queen Beds', label: 'Queen Beds' },
  { value: 'Storage Beds', label: 'Storage Beds' },
  { value: 'King Beds', label: 'King Beds' },
  { value: 'Single Beds', label: 'Single Beds' },
  { value: 'Bedside Tables', label: 'Bedside Tables' },
  { value: 'Mattress', label: 'Mattress' },
  { value: 'Wardrobes', label: 'Wardrobes' },
  { value: 'Chest of Drawers', label: 'Chest of Drawers' },
  { value: 'Entertainment Units', label: 'Entertainment Units' },
  { value: 'Dressing Table', label: 'Dressing Table' },
  { value: 'Bookshelves', label: 'Bookshelves' },
  { value: 'Shoe Racks', label: 'Shoe Racks' },
  { value: 'Workstations', label: 'Workstations' },
  { value: 'Study Tables', label: 'Study Tables' },
  { value: 'Office Chairs', label: 'Office Chairs' },
  { value: 'Dining Sets', label: 'Dining Sets' },
  { value: 'Dining Tables', label: 'Dining Tables' },
  { value: 'Dining Chairs', label: 'Dining Chairs' },
  { value: 'Kids Bed', label: 'Kids Bed' },
  { value: 'Kids Crib', label: 'Kids Crib' }
];

const FurnitureMaterial = [
  { value: 'Wood', label: 'Wood' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Leather', label: 'Leather' },
  { value: 'Fabric', label: 'Fabric' },
  { value: 'Wicker/Rattan', label: 'Wicker/Rattan' },
  { value: 'Glass', label: 'Glass' },
  { value: 'Plastic', label: 'Plastic' },
  { value: 'Stone', label: 'Stone' },
  { value: 'Other', label: 'Other' }
];

const FurnitureShape = [
  { value: 'Rectangular', label: 'Rectangular' },
  { value: 'Square', label: 'Square' },
  { value: 'Round', label: 'Round' },
  { value: 'Oval', label: 'Oval' },
  { value: 'Curved', label: 'Curved' },
  { value: 'L-shaped', label: 'L-shaped' },
  { value: 'U-shaped', label: 'U-shaped' },
  { value: 'T-shaped', label: 'T-shaped' },
  { value: 'Geometric', label: 'Geometric' }
];

const FurnitureCushionThickness = [
  { value: '2 inches', label: '2 inches' },
  { value: '3 inches', label: '3 inches' },
  { value: '4 inches', label: '4 inches' },
  { value: '5 inches', label: '5 inches' },
  { value: '6 inches', label: '6 inches' },
  { value: 'Other', label: 'Other' }
];

const FurnitureCapacity = [
  { value: 'Single seater', label: 'Single seater' },
  { value: 'Two-seater', label: 'Two-seater' },
  { value: 'Three-seater', label: 'Three-seater' },
  { value: 'Four-seater', label: 'Four-seater' },
  { value: 'Five-seater', label: 'Five-seater' },
  { value: 'Other', label: 'Other' }
];

const FurnitureFillMaterial = [
  { value: 'Foam', label: 'Foam' },
  { value: 'Down feathers', label: 'Down feathers' },
  { value: 'Polyester fiber', label: 'Polyester fiber' },
  { value: 'Memory foam', label: 'Memory foam' },
  { value: 'Springs', label: 'Springs' },
  { value: 'Cotton', label: 'Cotton' },
  { value: 'Batting', label: 'Batting' }
];

const FurnitureCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like new', label: 'Like new' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'refurbished', label: 'Refurbished' },
  { value: 'Used', label: 'Used' }
];

const FurnitureColor = [
  { value: 'White', label: 'White' },
  { value: 'Black', label: 'Black' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Gray', label: 'Gray' },
  { value: 'Beige', label: 'Beige' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
  { value: 'Red', label: 'Red' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Multi-color', label: 'Multi-color' }
];

function Furnitures({ onDataChange, initialState, isOpen }) {

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
          options={FurnitureType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Material"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="material"
          options={FurnitureMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Shape"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="shape"
          options={FurnitureShape}
          value={initiallistingsData.shape}
          onChange={(option) => handleSelectChange("shape", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Cushion Thickness"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="cushionThickness"
          options={FurnitureCushionThickness}
          value={initiallistingsData.cushionThickness}
          onChange={(option) => handleSelectChange("cushionThickness", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Capacity"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="capacity"
          options={FurnitureCapacity}
          value={initiallistingsData.capacity}
          onChange={(option) => handleSelectChange("capacity", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Fill Material"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="fillMaterial"
          options={FurnitureFillMaterial}
          value={initiallistingsData.fillMaterial}
          onChange={(option) => handleSelectChange("fillMaterial", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="condition"
          options={FurnitureCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Color"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="color"
          options={FurnitureColor}
          value={initiallistingsData.color}
          onChange={(options) => handleSelectChange("color", options)}
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

Furnitures.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Furnitures.defaultProps = {
  initialState: {


    type: '',
    material: '',
    shape: '',
    cushionThickness: '',
    capacity: '',
    fillMaterial: '',
    condition: '',
    color: [],
    moreDetails: [],

    
  },
  isOpen: false,
};


export default Furnitures;