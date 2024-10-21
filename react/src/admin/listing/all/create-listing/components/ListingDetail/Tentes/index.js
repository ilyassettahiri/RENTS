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
  { value: 'Waterproof', label: 'Waterproof' },
  { value: 'UV resistant', label: 'UV Resistant' },
  { value: 'Fire retardant', label: 'Fire Retardant' },
  { value: 'Easy setup and takedown', label: 'Easy Setup and Takedown' },
  { value: 'Custom sizes available', label: 'Custom Sizes Available' },
  { value: 'Heavy-duty construction', label: 'Heavy-Duty Construction' },
  { value: 'Available in multiple colors', label: 'Available in Multiple Colors' },
  { value: 'Accessories included (stakes, ropes)', label: 'Accessories Included (Stakes, Ropes)' },
  { value: 'Optional sidewalls for added privacy', label: 'Optional Sidewalls for Added Privacy' },
  { value: 'Ground stakes and weights available', label: 'Ground Stakes and Weights Available' },
  { value: 'Portable and lightweight', label: 'Portable and Lightweight' },
  { value: 'Ideal for outdoor events', label: 'Ideal for Outdoor Events' },
  { value: 'Custom branding options available', label: 'Custom Branding Options Available' },
  { value: 'Tent lighting options available', label: 'Tent Lighting Options Available' },
  { value: 'Climate control options (heaters, fans)', label: 'Climate Control Options (Heaters, Fans)' },
  { value: 'Variety of styles (e.g., pagoda, marquee)', label: 'Variety of Styles (e.g., Pagoda, Marquee)' }
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
        




          <FormField
            
            type="text"
            name="material"
            placeholder="Enter material"
            value={initiallistingsData.material}
            onChange={(e) => handleSelectChange("material", e.target.value)}
          />



      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Style"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        


          <FormField
            
            type="text"
            name="style"
            placeholder="Enter style"
            value={initiallistingsData.style}
            onChange={(e) => handleSelectChange("style", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Fabric"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        

          <FormField
            
            type="text"
            name="fabric"
            placeholder="Enter fabric"
            value={initiallistingsData.fabric}
            onChange={(e) => handleSelectChange("fabric", e.target.value)}
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
