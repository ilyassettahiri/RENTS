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

import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/livres/duration.svg`;
const icon2 = `${imagePath}/categoryicons/livres/genre.svg`;
const icon3 = `${imagePath}/categoryicons/livres/language.svg`;
const icon4 = `${imagePath}/categoryicons/livres/format.svg`;
const icon5 = `${imagePath}/categoryicons/livres/type.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon30
};


const MoreDetails = [
  { value: '30-day return policy', label: '30-day return policy' },
  { value: 'Rental period: 1 month', label: 'Rental period: 1 month' },
  { value: 'Late return fee: $1 per day', label: 'Late return fee: $1 per day' },
  { value: 'Condition requirements: Like new', label: 'Condition requirements: Like new' },
  { value: 'Refund only if returned within 7 days', label: 'Refund only if returned within 7 days' },
  { value: 'Exchange available for damaged items', label: 'Exchange available for damaged items' },
  { value: 'Rental extension option available', label: 'Rental extension option available' },
];



const LivresGenre = [
  { value: 'Fiction', label: 'Fiction' },
  { value: 'Non-Fiction', label: 'Non-Fiction' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Science Fiction', label: 'Science Fiction' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Historical Fiction', label: 'Historical Fiction' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' }
];

const LivresType = [
  { value: 'Book', label: 'Book' },
  { value: 'Movie', label: 'Movie' }
];

const LivresLanguage = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Dutch', label: 'Dutch' },
];

const LivresFormat = [
  { value: 'Hardcover', label: 'Hardcover' },
  { value: 'Paperback', label: 'Paperback' },
  { value: 'E-book', label: 'E-book' },
  { value: 'Audiobook', label: 'Audiobook' },
  { value: 'DVD', label: 'DVD' },
  { value: 'Blu-ray', label: 'Blu-ray' },
  { value: 'Streaming', label: 'Streaming' }
];

const LivresDuration = [
  { value: '90 minutes', label: '90 minutes' },
  { value: '2 hours', label: '2 hours' },
  { value: '3 hours', label: '3 hours' },
  { value: '4 hours', label: '4 hours' },
  { value: '5 hours', label: '5 hours' },
  { value: 'Other', label: 'Other' }
];

function Livres({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
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
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Genre"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="genre"
          options={LivresGenre}
          value={initiallistingsData.genre}
          onChange={(option) => handleSelectChange("genre", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="type"
          options={LivresType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Language"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="language"
          options={LivresLanguage}
          value={initiallistingsData.language}
          onChange={(options) => handleSelectChange("language", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Format"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="format"
          options={LivresFormat}
          value={initiallistingsData.format}
          onChange={(option) => handleSelectChange("format", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Duration"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="duration"
          options={LivresDuration}
          value={initiallistingsData.duration}
          onChange={(options) => handleSelectChange("duration", options)}
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

Livres.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Livres.defaultProps = {
  initialState: {

    genre: '',
    type: '',
    language: [],
    format: '',
    duration: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Livres;
