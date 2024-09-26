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
const icon1 = `${imagePath}/categoryicons/houseappliances/box_dimensions.svg`;
const icon2 = `${imagePath}/categoryicons/houseappliances/cable_length.svg`;
const icon3 = `${imagePath}/categoryicons/houseappliances/care_instructions.svg`;
const icon4 = `${imagePath}/categoryicons/houseappliances/certification.svg`;
const icon5 = `${imagePath}/categoryicons/houseappliances/control_type.svg`;
const icon6 = `${imagePath}/categoryicons/houseappliances/heat_output.svg`;
const icon7 = `${imagePath}/categoryicons/houseappliances/installation_method.svg`;
const icon8 = `${imagePath}/categoryicons/houseappliances/max_spin_speed.svg`;
const icon9 = `${imagePath}/categoryicons/houseappliances/water_consumption.svg`;
const icon10 = `${imagePath}/categoryicons/houseappliances/wattage.svg`;
const icon11 = `${imagePath}/categoryicons/houseappliances/weight.svg`;
const icon12 = `${imagePath}/categoryicons/houseappliances/acces_location.svg`;
const icon13 = `${imagePath}/categoryicons/houseappliances/components.svg`;
const icon14 = `${imagePath}/categoryicons/houseappliances/cycle_options.svg`;
const icon15 = `${imagePath}/categoryicons/houseappliances/finish_type.svg`;
const icon16 = `${imagePath}/categoryicons/houseappliances/inlet_water.svg`;
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
  icon13,
  icon14,
  icon15,
  icon16,
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const AppliancesAccessLocation = [
  { value: 'Front-load', label: 'Front-load' },
  { value: 'Top-load', label: 'Top-load' },
  { value: 'Side access', label: 'Side access' },
  { value: 'Door-in-door', label: 'Door-in-door' }
];

const AppliancesFinishType = [
  { value: 'Stainless steel', label: 'Stainless steel' },
  { value: 'Black stainless steel', label: 'Black stainless steel' },
  { value: 'White', label: 'White' },
  { value: 'Black', label: 'Black' },
  { value: 'Chrome', label: 'Chrome' },
  { value: 'Matte', label: 'Matte' },
  { value: 'Glossy', label: 'Glossy' },
  { value: 'Other', label: 'Other' }
];

const AppliancesCycleOptions = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Heavy-duty', label: 'Heavy-duty' },
  { value: 'Delicate', label: 'Delicate' },
  { value: 'Quick wash', label: 'Quick wash' },
  { value: 'Steam clean', label: 'Steam clean' },
  { value: 'Sanitize', label: 'Sanitize' },
  { value: 'Eco-friendly', label: 'Eco-friendly' },
  { value: 'Auto dry', label: 'Auto dry' },
  { value: 'Air dry', label: 'Air dry' },
  { value: 'Other', label: 'Other' }
];

const AppliancesInletWater = [
  { value: 'Hot & Cold', label: 'Hot & Cold' },
  { value: 'Cold only', label: 'Cold only' },
  { value: 'Single inlet', label: 'Single inlet' },
  { value: 'Dual inlet', label: 'Dual inlet' }
];

const AppliancesInstallationMethod = [
  { value: 'Freestanding', label: 'Freestanding' },
  { value: 'Built-in', label: 'Built-in' },
  { value: 'Wall-mounted', label: 'Wall-mounted' },
  { value: 'Under-counter', label: 'Under-counter' },
  { value: 'Slide-in', label: 'Slide-in' },
  { value: 'Portable', label: 'Portable' }
];

const AppliancesComponents = [
  { value: 'Power cord', label: 'Power cord' },
  { value: 'Hoses', label: 'Hoses' },
  { value: 'Racks', label: 'Racks' },
  { value: 'Baskets', label: 'Baskets' },
  { value: 'Shelves', label: 'Shelves' },
  { value: 'Filters', label: 'Filters' },
  { value: 'Ice maker', label: 'Ice maker' },
  { value: 'Water dispenser', label: 'Water dispenser' },
  { value: 'Air filter', label: 'Air filter' },
  { value: 'Rollers', label: 'Rollers' },
  { value: 'Cutlery tray', label: 'Cutlery tray' },
  { value: 'Other', label: 'Other' }
];

const AppliancesControlType = [
  { value: 'Mechanical dials', label: 'Mechanical dials' },
  { value: 'Push buttons', label: 'Push buttons' },
  { value: 'Touchscreen', label: 'Touchscreen' },
  { value: 'Digital display', label: 'Digital display' },
  { value: 'Knobs', label: 'Knobs' },
  { value: 'Remote control', label: 'Remote control' },
  { value: 'Smartphone app', label: 'Smartphone app' }
];

const AppliancesCertification = [
  { value: 'Energy Star', label: 'Energy Star' },
  { value: 'UL Listed', label: 'UL Listed' },
  { value: 'CE Certified', label: 'CE Certified' },
  { value: 'NSF Certified', label: 'NSF Certified' },
  { value: 'RoHS Compliant', label: 'RoHS Compliant' },
  { value: 'ADA Compliant', label: 'ADA Compliant' },
  { value: 'Other', label: 'Other' }
];

function Houseappliances({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Access Location"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="accessLocation"
          options={AppliancesAccessLocation}
          value={initiallistingsData.accessLocation}
          onChange={(option) => handleSelectChange("accessLocation", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: '40px' }} />}
        title="Finish Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="finishType"
          options={AppliancesFinishType}
          value={initiallistingsData.finishType}
          onChange={(option) => handleSelectChange("finishType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Cycle Options"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="cycleOptions"
          options={AppliancesCycleOptions}
          value={initiallistingsData.cycleOptions}
          onChange={(option) => handleSelectChange("cycleOptions", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon16} style={{ width: '40px' }} />}
        title="Inlet Water"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="inletWater"
          options={AppliancesInletWater}
          value={initiallistingsData.inletWater}
          onChange={(options) => handleSelectChange("inletWater", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Installation Method"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="installationMethod"
          options={AppliancesInstallationMethod}
          value={initiallistingsData.installationMethod}
          onChange={(option) => handleSelectChange("installationMethod", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Components"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="components"
          options={AppliancesComponents}
          value={initiallistingsData.components}
          onChange={(options) => handleSelectChange("components", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Control Type"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="controlType"
          options={AppliancesControlType}
          value={initiallistingsData.controlType}
          onChange={(option) => handleSelectChange("controlType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Certification"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="certification"
          options={AppliancesCertification}
          value={initiallistingsData.certification}
          onChange={(option) => handleSelectChange("certification", option.value)}
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

Houseappliances.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Houseappliances.defaultProps = {
  initialState: {

    accessLocation: '',
    finishType: '',
    cycleOptions: '',
    inletWater: [],
    installationMethod: '',
    components: [],
    controlType: '',
    certification: '',
    moreDetails: [],


    
  },
  isOpen: false,
};


export default Houseappliances;
