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
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/mobilier/brand.svg`;
const icon2 = `${imagePath}/categoryicons/mobilier/equipement_pour_evenements.svg`;
const icon3 = `${imagePath}/categoryicons/mobilier/festive_decorations.svg`;
const icon4 = `${imagePath}/categoryicons/mobilier/light_decorations.svg`;
const icon5 = `${imagePath}/categoryicons/mobilier/material.svg`;
const icon6 = `${imagePath}/categoryicons/mobilier/mobilier_et_decoration.svg`;
const icon7 = `${imagePath}/categoryicons/mobilier/other_equipment.svg`;
const icon8 = `${imagePath}/categoryicons/mobilier/plant_decorations.svg`;
const icon9 = `${imagePath}/categoryicons/mobilier/shape.svg`;
const icon10 = `${imagePath}/categoryicons/mobilier/size.svg`;
const icon11 = `${imagePath}/categoryicons/mobilier/theme.svg`;
const icon12 = `${imagePath}/categoryicons/mobilier/weight.svg`;
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
  icon10,
  icon11,
  icon12,
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const MobilierMaterial = [
  { value: 'Wood', label: 'Wood' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Glass', label: 'Glass' },
  { value: 'Plastic', label: 'Plastic' },
  { value: 'Fabric', label: 'Fabric' },
  { value: 'Leather', label: 'Leather' },
  { value: 'Stone', label: 'Stone' },
  { value: 'Ceramic', label: 'Ceramic' },
  { value: 'Wicker/Rattan', label: 'Wicker/Rattan' },
  { value: 'Bamboo', label: 'Bamboo' },
  { value: 'Concrete', label: 'Concrete' },
  { value: 'Marble', label: 'Marble' },
  { value: 'Resin', label: 'Resin' },
  { value: 'Acrylic', label: 'Acrylic' }
];
const MobilierTheme = [
  { value: 'Modern', label: 'Modern' },
  { value: 'Minimalist', label: 'Minimalist' },
  { value: 'Scandinavian', label: 'Scandinavian' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Rustic', label: 'Rustic' },
  { value: 'Vintage', label: 'Vintage' },
  { value: 'Bohemian', label: 'Bohemian' },
  { value: 'Coastal', label: 'Coastal' },
  { value: 'Mid-Century Modern', label: 'Mid-Century Modern' },
  { value: 'Farmhouse', label: 'Farmhouse' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Art Deco', label: 'Art Deco' },
  { value: 'Tropical', label: 'Tropical' },
  { value: 'Eclectic', label: 'Eclectic' },
  { value: 'Contemporary', label: 'Contemporary' },
  { value: 'Traditional', label: 'Traditional' }
];
const MobilierPlant = [
  { value: 'Potted Plants', label: 'Potted Plants' },
  { value: 'Hanging Plants', label: 'Hanging Plants' },
  { value: 'Terrariums', label: 'Terrariums' },
  { value: 'Plant Stands', label: 'Plant Stands' },
  { value: 'Wall-mounted Planters', label: 'Wall-mounted Planters' },
  { value: 'Vertical Gardens', label: 'Vertical Gardens' },
  { value: 'Succulent Arrangements', label: 'Succulent Arrangements' },
  { value: 'Bonsai Trees', label: 'Bonsai Trees' },
  { value: 'Air Plants', label: 'Air Plants' },
  { value: 'Floral Arrangements', label: 'Floral Arrangements' }
];
const MobilierLight = [
  { value: 'String Lights', label: 'String Lights' },
  { value: 'Fairy Lights', label: 'Fairy Lights' },
  { value: 'LED Rope Lights', label: 'LED Rope Lights' },
  { value: 'Lanterns', label: 'Lanterns' },
  { value: 'Chandeliers', label: 'Chandeliers' },
  { value: 'Pendant Lights', label: 'Pendant Lights' },
  { value: 'Wall Sconces', label: 'Wall Sconces' },
  { value: 'Table Lamps', label: 'Table Lamps' },
  { value: 'Floor Lamps', label: 'Floor Lamps' },
  { value: 'Candle Holders', label: 'Candle Holders' },
  { value: 'Neon Signs', label: 'Neon Signs' },
  { value: 'Light Projectors', label: 'Light Projectors' },
  { value: 'Fiber Optic Lights', label: 'Fiber Optic Lights' },
  { value: 'LED Candles', label: 'LED Candles' }
];
const MobilierFestive = [
  { value: 'Christmas', label: 'Christmas' },
  { value: 'Easter', label: 'Easter' },
  { value: 'Halloween', label: 'Halloween' },
  { value: 'Thanksgiving', label: 'Thanksgiving' },
  { value: 'Valentines Day', label: 'Valentines Day' }
];
const MobilierOther = [
  { value: 'table', label: 'table' },
  { value: 'chairs', label: 'chairs' },
  { value: 'sofa', label: 'sofa' },
  { value: 'rug', label: 'rug' },
  { value: 'curtains', label: 'curtains' },
  { value: 'cushions', label: 'cushions' },
  { value: 'bench', label: 'bench' },
  { value: 'table decorations', label: 'table decorations' }
];

function Mobiliers({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Material"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="material"
          options={MobilierMaterial}
          value={initiallistingsData.material}
          onChange={(options) => handleSelectChange("material", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Theme"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="theme"
          options={MobilierTheme}
          value={initiallistingsData.theme}
          onChange={(option) => handleSelectChange("theme", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Plant Decorations"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="plantDecorations"
          options={MobilierPlant}
          value={initiallistingsData.plantDecorations}
          onChange={(options) => handleSelectChange("plantDecorations", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Light Decorations"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="lightDecorations"
          options={MobilierLight}
          value={initiallistingsData.lightDecorations}
          onChange={(options) => handleSelectChange("lightDecorations", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Festive decorations"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="festiveDecorations"
          options={MobilierFestive}
          value={initiallistingsData.festiveDecorations}
          onChange={(option) => handleSelectChange("festiveDecorations", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Other Equipment"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="otherEquipment"
          options={MobilierOther}
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


Mobiliers.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Mobiliers.defaultProps = {
  initialState: {

    material: [],
    theme: '',
    plantDecorations: [],
    lightDecorations: [],
    festiveDecorations: '',
    otherEquipment: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Mobiliers;
