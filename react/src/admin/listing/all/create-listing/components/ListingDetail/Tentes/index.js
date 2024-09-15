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
import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/tentes/brand.svg`;
const icon2 = `${imagePath}/categoryicons/tentes/fabric_type.svg`;
const icon3 = `${imagePath}/categoryicons/tentes/material.svg`;
const icon4 = `${imagePath}/categoryicons/tentes/other_equipment.svg`;
const icon5 = `${imagePath}/categoryicons/tentes/shape.svg`;
const icon6 = `${imagePath}/categoryicons/tentes/size.svg`;
const icon7 = `${imagePath}/categoryicons/tentes/style.svg`;
const icon8 = `${imagePath}/categoryicons/tentes/tentes_et_structures_exterieures.svg`;
const icon9 = `${imagePath}/categoryicons/tentes/weight.svg`;
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
  { value: 'Board Computer', label: 'Board Computer' }
];


const TentesetstructuresMaterial = [
  { value: 'Nylon', label: 'Nylon' },
  { value: 'Polyester', label: 'Polyester' },
  { value: 'Canvas', label: 'Canvas' },
  { value: 'Polyethylene', label: 'Polyethylene' },
  { value: 'PVC', label: 'PVC' },
  { value: 'Mesh', label: 'Mesh' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Fiberglass', label: 'Fiberglass' },
  { value: 'Steel', label: 'Steel' },
  { value: 'Wood', label: 'Wood' }
];
const TentesetstructuresStyle = [
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Minimalist', label: 'Minimalist' },
  { value: 'Rustic', label: 'Rustic' },
  { value: 'Geometric', label: 'Geometric' },
  { value: 'Contemporary', label: 'Contemporary' },
  { value: 'Bohemian', label: 'Bohemian' },
  { value: 'Classic', label: 'Classic' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Eco-friendly', label: 'Eco-friendly' }
];
const TentesetstructuresFabric = [
  { value: 'Nylon', label: 'Nylon' },
  { value: 'Polyester', label: 'Polyester' },
  { value: 'Canvas', label: 'Canvas' },
  { value: 'Polyethylene', label: 'Polyethylene' },
  { value: 'PVC', label: 'PVC' },
  { value: 'Mesh', label: 'Mesh' }
];
const TentesetstructuresOther = [
  { value: 'tent', label: 'tent' },
  { value: 'stand', label: 'stand' },
  { value: 'chair', label: 'chair' },
  { value: 'table', label: 'table' },
  { value: 'cushions', label: 'cushions' },
  { value: 'rug', label: 'rug' },
  { value: 'curtains', label: 'curtains' }
];

function Tentes({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
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
        title="Material"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="material"
          options={TentesetstructuresMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Style"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="style"
          options={TentesetstructuresStyle}
          value={initiallistingsData.style}
          onChange={(option) => handleSelectChange("style", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Fabric"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="fabric"
          options={TentesetstructuresFabric}
          value={initiallistingsData.fabric}
          onChange={(option) => handleSelectChange("fabric", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Other Equipment"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="otherEquipment"
          options={TentesetstructuresOther}
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



Tentes.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Tentes.defaultProps = {
  initialState: {


    material: '',
    style: '',
    fabric: '',
    otherEquipment: [],
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Tentes;
