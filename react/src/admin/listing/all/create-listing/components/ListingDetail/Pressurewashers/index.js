import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";
 
import PropTypes from "prop-types";


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/pressurewashers/condition.svg`;
const icon2 = `${imagePath}/categoryicons/pressurewashers/connection_type.svg`;
const icon3 = `${imagePath}/categoryicons/pressurewashers/cord_length.svg`;
const icon4 = `${imagePath}/categoryicons/pressurewashers/dimensions.svg`;
const icon5 = `${imagePath}/categoryicons/pressurewashers/engine_power.svg`;
const icon6 = `${imagePath}/categoryicons/pressurewashers/hose_length.svg`;
const icon7 = `${imagePath}/categoryicons/pressurewashers/max_working_temperature.svg`;
const icon8 = `${imagePath}/categoryicons/pressurewashers/maximum_flow_rate.svg`;
const icon9 = `${imagePath}/categoryicons/pressurewashers/portability.svg`;
const icon10 = `${imagePath}/categoryicons/pressurewashers/power_source.svg`;
const icon11 = `${imagePath}/categoryicons/pressurewashers/specification_met.svg`;
const icon12 = `${imagePath}/categoryicons/pressurewashers/weight.svg`;
const icon13 = `${imagePath}/categoryicons/pressurewashers/inlet_connection_type.svg`;
const icon14 = `${imagePath}/categoryicons/pressurewashers/outlet_cnnection_size.svg`;
const icon15 = `${imagePath}/categoryicons/pressurewashers/power_output.svg`;
const icon16 = `${imagePath}/categoryicons/pressurewashers/tool_type.svg`;
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


const PressurewashersTooltype = [
  { value: 'Spray Nozzle', label: 'Spray Nozzle' },
  { value: 'Extension Wand', label: 'Extension Wand' },
  { value: 'Surface Cleaner', label: 'Surface Cleaner' },
  { value: 'Turbo Nozzle', label: 'Turbo Nozzle' },
  { value: 'Gutter Cleaner', label: 'Gutter Cleaner' },
  { value: 'Foam Cannon', label: 'Foam Cannon' },
  { value: 'Rotating Brushes', label: 'Rotating Brushes' },
  { value: 'Extension Hose', label: 'Extension Hose' },
  { value: 'Detergent Tank', label: 'Detergent Tank' },
  { value: 'Sandblasting Kit', label: 'Sandblasting Kit' }
];

const PressurewashersCondition = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Used', label: 'Used' },
  { value: 'Good', label: 'Good' },
  { value: 'Excellent', label: 'Excellent' }
];

const PressurewashersPowersource = [
  { value: 'Cordless', label: 'Cordless' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Petrol', label: 'Petrol' }
];

const PressurewashersPoweroutput = [
  { value: '2500 PSI', label: '2500 PSI' },
  { value: '3000 PSI', label: '3000 PSI' },
  { value: '3500 PSI', label: '3500 PSI' },
  { value: '4000 PSI', label: '4000 PSI' },
  { value: '4500 PSI', label: '4500 PSI' },
  { value: '5000 PSI', label: '5000 PSI' },
  { value: '5500 PSI', label: '5500 PSI' },
  { value: '6000 PSI', label: '6000 PSI' }
];

const PressurewashersEnginepower = [
  { value: '5 HP', label: '5 HP' },
  { value: '6.5 HP', label: '6.5 HP' },
  { value: '7 HP', label: '7 HP' },
  { value: '8 HP', label: '8 HP' },
  { value: '9 HP', label: '9 HP' },
  { value: '10 HP', label: '10 HP' },
  { value: '11 HP', label: '11 HP' },
  { value: '12 HP', label: '12 HP' },
  { value: '13 HP', label: '13 HP' },
  { value: '14 HP', label: '14 HP' }
];

const PressurewashersHoselength = [
  { value: '6.1 m', label: '6.1 m' },
  { value: '7.6 m', label: '7.6 m' },
  { value: '9.1 m', label: '9.1 m' },
  { value: '10.7 m', label: '10.7 m' },
  { value: '12.2 m', label: '12.2 m' },
  { value: '15.2 m', label: '15.2 m' },
  { value: '22.9 m', label: '22.9 m' },
  { value: '30.5 m', label: '30.5 m' }
];

const PressurewashersCordlength = [
  { value: '5 m', label: '5 m' },
  { value: '7 m', label: '7 m' },
  { value: '10 m', label: '10 m' },
  { value: '15 m', label: '15 m' },
  { value: '20 m', label: '20 m' },
  { value: '25 m', label: '25 m' },
  { value: '30 m', label: '30 m' },
  { value: '50 m', label: '50 m' }
];

const PressurewashersWeight = [
  { value: '10-15 kg', label: '10-15 kg' },
  { value: '15-20 kg', label: '15-20 kg' },
  { value: '20-25 kg', label: '20-25 kg' },
  { value: '25-30 kg', label: '25-30 kg' },
  { value: '30-35 kg', label: '30-35 kg' },
  { value: '35-40 kg', label: '35-40 kg' },
  { value: '40-45 kg', label: '40-45 kg' },
  { value: '45-50 kg', label: '45-50 kg' }
];

const PressurewashersMaximumflowrate = [
  { value: '1.5 GPM', label: '1.5 GPM' },
  { value: '2.0 GPM', label: '2.0 GPM' },
  { value: '2.5 GPM', label: '2.5 GPM' },
  { value: '3.0 GPM', label: '3.0 GPM' },
  { value: '3.5 GPM', label: '3.5 GPM' },
  { value: '4.0 GPM', label: '4.0 GPM' },
  { value: '4.5 GPM', label: '4.5 GPM' },
  { value: '5.0 GPM', label: '5.0 GPM' },
  { value: '5.5 GPM', label: '5.5 GPM' },
  { value: '6.0 GPM', label: '6.0 GPM' }
];

const PressurewashersSpecificationmet = [
  { value: 'ETL Listed', label: 'ETL Listed' },
  { value: 'UL Listed', label: 'UL Listed' },
  { value: 'CSA Certified', label: 'CSA Certified' },
  { value: 'EPA Compliant', label: 'EPA Compliant' },
  { value: 'CARB Compliant', label: 'CARB Compliant' },
  { value: 'ISO 9001 Certified', label: 'ISO 9001 Certified' },
  { value: 'ANSI/ISEA Compliant', label: 'ANSI/ISEA Compliant' },
  { value: 'CE Certified', label: 'CE Certified' },
  { value: 'RoHS Compliant', label: 'RoHS Compliant' },
  { value: 'OSHA Compliant', label: 'OSHA Compliant' }
];

const PressurewashersInletconnectiontype = [
  { value: 'Threaded Inlet', label: 'Threaded Inlet' },
  { value: 'Quick-Connect Inlet', label: 'Quick-Connect Inlet' },
  { value: 'Bayonet Inlet', label: 'Bayonet Inlet' },
  { value: 'Twist-On Inlet', label: 'Twist-On Inlet' },
  { value: 'Camlock Inlet', label: 'Camlock Inlet' },
  { value: 'Snap-In Inlet', label: 'Snap-In Inlet' },
  { value: 'Push-to-Connect Inlet', label: 'Push-to-Connect Inlet' },
  { value: 'Hose Barb Inlet', label: 'Hose Barb Inlet' },
  { value: 'Compression Inlet', label: 'Compression Inlet' },
  { value: 'Flanged Inlet', label: 'Flanged Inlet' }
];

const PressurewashersOutletconnectionsize = [
  { value: '1/4 inch', label: '1/4 inch' },
  { value: '3/8 inch', label: '3/8 inch' },
  { value: '1/2 inch', label: '1/2 inch' },
  { value: '5/8 inch', label: '5/8 inch' },
  { value: '3/4 inch', label: '3/4 inch' }
];

const PressurewashersMaxworkingtemperature = [
  { value: '40°C', label: '40°C' },
  { value: '50°C', label: '50°C' },
  { value: '60°C', label: '60°C' },
  { value: '70°C', label: '70°C' },
  { value: '80°C', label: '80°C' },
  { value: '90°C', label: '90°C' },
  { value: '100°C', label: '100°C' }
];

const PressurewashersConnectiontype = [
  { value: 'Threaded', label: 'Threaded' },
  { value: 'Quick-Connect', label: 'Quick-Connect' },
  { value: 'Bayonet', label: 'Bayonet' },
  { value: 'Twist-On', label: 'Twist-On' },
  { value: 'Camlock', label: 'Camlock' },
  { value: 'Snap-In', label: 'Snap-In' },
  { value: 'Push-to-Connect', label: 'Push-to-Connect' },
  { value: 'Hose Barb', label: 'Hose Barb' },
  { value: 'Compression', label: 'Compression' },
  { value: 'Flanged', label: 'Flanged' }
];

function Pressurewashers({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
  const [collapse7, setCollapse7] = useState(isOpen);
  const [collapse8, setCollapse8] = useState(isOpen);
  const [collapse9, setCollapse9] = useState(isOpen);
  const [collapse10, setCollapse10] = useState(isOpen);
  const [collapse11, setCollapse11] = useState(isOpen);
  const [collapse12, setCollapse12] = useState(isOpen);
  const [collapse13, setCollapse13] = useState(isOpen);
  const [collapse14, setCollapse14] = useState(isOpen);
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
        image={<img src={icon16} style={{ width: '40px' }} />}
        title="Tool Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="toolType"
          options={PressurewashersTooltype}
          value={initiallistingsData.toolType}
          onChange={(option) => handleSelectChange("toolType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="condition"
          options={PressurewashersCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Power Source"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="powerSource"
          options={PressurewashersPowersource}
          value={initiallistingsData.powerSource}
          onChange={(option) => handleSelectChange("powerSource", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: '40px' }} />}
        title="Power Output"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="powerOutput"
          options={PressurewashersPoweroutput}
          value={initiallistingsData.powerOutput}
          onChange={(option) => handleSelectChange("powerOutput", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Engine Power"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="enginePower"
          options={PressurewashersEnginepower}
          value={initiallistingsData.enginePower}
          onChange={(option) => handleSelectChange("enginePower", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Hose Length"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="hoseLength"
          options={PressurewashersHoselength}
          value={initiallistingsData.hoseLength}
          onChange={(option) => handleSelectChange("hoseLength", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Cord Length"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="cordLength"
          options={PressurewashersCordlength}
          value={initiallistingsData.cordLength}
          onChange={(option) => handleSelectChange("cordLength", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Weight"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="weight"
          options={PressurewashersWeight}
          value={initiallistingsData.weight}
          onChange={(option) => handleSelectChange("weight", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Maximum Flow Rate"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="maximumFlowRate"
          options={PressurewashersMaximumflowrate}
          value={initiallistingsData.maximumFlowRate}
          onChange={(options) => handleSelectChange("maximumFlowRate", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Specification Met"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <MultSelect
          name="specificationMet"
          options={PressurewashersSpecificationmet}
          value={initiallistingsData.specificationMet}
          onChange={(options) => handleSelectChange("specificationMet", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Inlet Connection Type"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <MultSelect
          name="inletConnectionType"
          options={PressurewashersInletconnectiontype}
          value={initiallistingsData.inletConnectionType}
          onChange={(options) => handleSelectChange("inletConnectionType", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Outlet Connection Size"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="outletConnectionSize"
          options={PressurewashersOutletconnectionsize}
          value={initiallistingsData.outletConnectionSize}
          onChange={(option) => handleSelectChange("outletConnectionSize", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Max. Working Temperature"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <OneSelect
          name="maxWorkingTemperature"
          options={PressurewashersMaxworkingtemperature}
          value={initiallistingsData.maxWorkingTemperature}
          onChange={(option) => handleSelectChange("maxWorkingTemperature", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Connection Type"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <OneSelect
          name="connectionType"
          options={PressurewashersConnectiontype}
          value={initiallistingsData.connectionType}
          onChange={(option) => handleSelectChange("connectionType", option.value)}
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

Pressurewashers.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Pressurewashers.defaultProps = {
  initialState: {

    toolType: '',
    condition: '',
    powerSource: '',
    powerOutput: '',
    enginePower: '',
    hoseLength: '',
    cordLength: '',
    weight: '',
    maximumFlowRate: [],
    specificationMet: [],
    inletConnectionType: [],
    outletConnectionSize: '',
    maxWorkingTemperature: '',
    connectionType: '',
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Pressurewashers;