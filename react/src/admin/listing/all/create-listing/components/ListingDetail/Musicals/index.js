import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import MultSelect from "admin/components/MultSelect";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';



const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/musicals/dimensions.svg`;
const icon2 = `${imagePath}/categoryicons/musicals/finish_type.svg`;
const icon3 = `${imagePath}/categoryicons/musicals/material.svg`;
const icon4 = `${imagePath}/categoryicons/musicals/style.svg`;
const icon5 = `${imagePath}/categoryicons/musicals/weight.svg`;
const icon6 = `${imagePath}/categoryicons/musicals/music_type.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon30
};



const MoreDetails = [
  { value: 'Acoustic', label: 'Acoustic' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Portable', label: 'Portable' },
  { value: 'Multi-Functional', label: 'Multi-Functional' },
  { value: 'Built-in Tuner', label: 'Built-in Tuner' },
  { value: 'Recording Capability', label: 'Recording Capability' },
  { value: 'Customizable Sound', label: 'Customizable Sound' },
  { value: 'Adjustable Volume', label: 'Adjustable Volume' },
  { value: 'Bluetooth Connectivity', label: 'Bluetooth Connectivity' },
  { value: 'Headphone Jack', label: 'Headphone Jack' },
  { value: 'LED Display', label: 'LED Display' },
  { value: 'Integrated Metronome', label: 'Integrated Metronome' },
  { value: 'Durable Case Included', label: 'Durable Case Included' },
  { value: 'Warranty', label: 'Warranty' },
  { value: 'User-friendly Interface', label: 'User-friendly Interface' }
];



const MusicalsMusicType = [
  { value: 'Classical', label: 'Classical' },
  { value: 'Jazz', label: 'Jazz' },
  { value: 'Rock', label: 'Rock' },
  { value: 'Pop', label: 'Pop' },
  { value: 'Folk', label: 'Folk' },
  { value: 'Blues', label: 'Blues' },
  { value: 'Country', label: 'Country' },
  { value: 'Electronic', label: 'Electronic' },
  { value: 'Hip-hop', label: 'Hip-hop' },
  { value: 'R&B', label: 'R&B' },
  { value: 'Reggae', label: 'Reggae' },
  { value: 'Other', label: 'Other' }
];

const MusicalsMaterial = [
  { value: 'Wood', label: 'Wood' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Plastic', label: 'Plastic' },
  { value: 'Composite', label: 'Composite' },
  { value: 'Brass', label: 'Brass' },
  { value: 'Steel', label: 'Steel' },
  { value: 'Carbon Fiber', label: 'Carbon Fiber' },
  { value: 'Acrylic', label: 'Acrylic' }
];

const MusicalsStyle = [
  { value: 'Modern', label: 'Modern' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Vintage', label: 'Vintage' },
  { value: 'Retro', label: 'Retro' },
  { value: 'Contemporary', label: 'Contemporary' },
  { value: 'Custom', label: 'Custom' },
  { value: 'Handcrafted', label: 'Handcrafted' },
  { value: 'Artisanal', label: 'Artisanal' }
];

const MusicalsFinishType = [
  { value: 'Glossy', label: 'Glossy' },
  { value: 'Matte', label: 'Matte' },
  { value: 'Satin', label: 'Satin' },
  { value: 'Natural', label: 'Natural' },
  { value: 'Stained', label: 'Stained' },
  { value: 'Painted', label: 'Painted' },
  { value: 'Lacquered', label: 'Lacquered' },
  { value: 'Varnished', label: 'Varnished' },
  { value: 'Oil Finish', label: 'Oil Finish' },
  { value: 'Antique', label: 'Antique' }
];

function Musicals({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Music Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="musicType"
          options={MusicalsMusicType}
          value={initiallistingsData.musicType}
          onChange={(option) => handleSelectChange("musicType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Material"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="material"
          options={MusicalsMaterial}
          value={initiallistingsData.material}
          onChange={(option) => handleSelectChange("material", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Style"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="style"
          options={MusicalsStyle}
          value={initiallistingsData.style}
          onChange={(option) => handleSelectChange("style", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Finish Type"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="finishType"
          options={MusicalsFinishType}
          value={initiallistingsData.finishType}
          onChange={(option) => handleSelectChange("finishType", option.value)}
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

Musicals.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Musicals.defaultProps = {
  initialState: {


    musicType: '',
    material: '',
    style: '',
    finishType: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Musicals;
