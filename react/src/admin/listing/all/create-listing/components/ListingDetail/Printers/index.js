import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/printers/compatibility.svg`;
const icon2 = `${imagePath}/categoryicons/printers/condition.svg`;
const icon3 = `${imagePath}/categoryicons/printers/connectivity.svg`;
const icon4 = `${imagePath}/categoryicons/printers/dimensions.svg`;
const icon5 = `${imagePath}/categoryicons/printers/input_sheets.svg`;
const icon6 = `${imagePath}/categoryicons/printers/paper_size.svg`;
const icon7 = `${imagePath}/categoryicons/printers/print_speed.svg`;
const icon8 = `${imagePath}/categoryicons/printers/weight.svg`;
const icon9 = `${imagePath}/categoryicons/printers/print_resolution.svg`;
const icon10 = `${imagePath}/categoryicons/printers/print_speed.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const PrinterPrintSpeed = [
  { value: '10 PPM', label: '10 PPM' },
  { value: '20 PPM', label: '20 PPM' },
  { value: '30 PPM', label: '30 PPM' },
  { value: '40 PPM', label: '40 PPM' },
  { value: '50 PPM', label: '50 PPM' },
  { value: '60 PPM', label: '60 PPM' },
  { value: '70 PPM', label: '70 PPM' },
  { value: '80 PPM', label: '80 PPM' },
  { value: '90 PPM', label: '90 PPM' },
  { value: '100 PPM', label: '100 PPM' }
];

const PrinterPrintResolution = [
  { value: '600 x 600 DPI', label: '600 x 600 DPI' },
  { value: '1200 x 1200 DPI', label: '1200 x 1200 DPI' },
  { value: '2400 x 1200 DPI', label: '2400 x 1200 DPI' },
  { value: '4800 x 1200 DPI', label: '4800 x 1200 DPI' }
];

const PrinterConnectivity = [
  { value: 'Wi-Fi', label: 'Wi-Fi' },
  { value: 'USB', label: 'USB' },
  { value: 'Ethernet', label: 'Ethernet' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'NFC', label: 'NFC' }
];

const PrinterPaperSize = [
  { value: 'A4', label: 'A4' },
  { value: 'Letter', label: 'Letter' },
  { value: 'Legal', label: 'Legal' },
  { value: 'A3', label: 'A3' },
  { value: 'A5', label: 'A5' },
  { value: 'Envelope', label: 'Envelope' },
  { value: 'Custom sizes', label: 'Custom sizes' }
];

const PrinterCompatibleInk = [
  { value: 'Original manufacturer cartridges', label: 'Original manufacturer cartridges' },
  { value: 'Third-party cartridges', label: 'Third-party cartridges' }
];

const PrinterCondition = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' }
];

const PrinterInputSheets = [
  { value: '50 sheets', label: '50 sheets' },
  { value: '100 sheets', label: '100 sheets' },
  { value: '150 sheets', label: '150 sheets' },
  { value: '250 sheets', label: '250 sheets' },
  { value: '500 sheets', label: '500 sheets' },
  { value: '1000+ sheets', label: '1000+ sheets' }
];

const PrinterPrintMedia = [
  { value: 'Plain paper', label: 'Plain paper' },
  { value: 'Glossy photo paper', label: 'Glossy photo paper' },
  { value: 'Matte photo paper', label: 'Matte photo paper' },
  { value: 'Envelopes', label: 'Envelopes' },
  { value: 'Labels', label: 'Labels' },
  { value: 'Transparencies', label: 'Transparencies' },
  { value: 'Cardstock', label: 'Cardstock' },
  { value: 'Brochure paper', label: 'Brochure paper' },
  { value: 'Fabric', label: 'Fabric' },
  { value: 'CDs/DVDs', label: 'CDs/DVDs' }
];

function Printers({ onDataChange, initialState, isOpen }) {

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
        title="Print Speed"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="printSpeed"
          options={PrinterPrintSpeed}
          value={initiallistingsData.printSpeed}
          onChange={(option) => handleSelectChange("printSpeed", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Print Resolution"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="printResolution"
          options={PrinterPrintResolution}
          value={initiallistingsData.printResolution}
          onChange={(options) => handleSelectChange("printResolution", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Connectivity"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="connectivity"
          options={PrinterConnectivity}
          value={initiallistingsData.connectivity}
          onChange={(options) => handleSelectChange("connectivity", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Paper Size"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="paperSize"
          options={PrinterPaperSize}
          value={initiallistingsData.paperSize}
          onChange={(options) => handleSelectChange("paperSize", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Compatible Ink/Toner"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="compatibleInk"
          options={PrinterCompatibleInk}
          value={initiallistingsData.compatibleInk}
          onChange={(options) => handleSelectChange("compatibleInk", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="condition"
          options={PrinterCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Input Sheets"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="inputSheets"
          options={PrinterInputSheets}
          value={initiallistingsData.inputSheets}
          onChange={(option) => handleSelectChange("inputSheets", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Print Media"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="printMedia"
          options={PrinterPrintMedia}
          value={initiallistingsData.printMedia}
          onChange={(options) => handleSelectChange("printMedia", options)}
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

Printers.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Printers.defaultProps = {
  initialState: {

    printSpeed: '',
    printResolution: [],
    connectivity: [],
    paperSize: [],
    compatibleInk: [],
    condition: '',
    inputSheets: '',
    printMedia: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Printers;
