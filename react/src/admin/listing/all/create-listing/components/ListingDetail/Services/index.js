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
const icon1 = `${imagePath}/categoryicons/services/language.svg`;
const icon2 = `${imagePath}/categoryicons/services/experience.svg`;
const icon3 = `${imagePath}/categoryicons/services/response_time.svg`;
const icon4 = `${imagePath}/categoryicons/services/package.svg`;
const icon5 = `${imagePath}/categoryicons/services/revisions.svg`;
const icon6 = `${imagePath}/categoryicons/services/level.svg`;
const icon7 = `${imagePath}/categoryicons/services/orders_queue.svg`;
const icon8 = `${imagePath}/categoryicons/services/jobs_completed.svg`;
const icon9 = `${imagePath}/categoryicons/services/repeat_hire_rate.svg`;
const icon10 = `${imagePath}/categoryicons/services/education.svg`;
const icon11 = `${imagePath}/categoryicons/services/on_time.svg`;
const icon12 = `${imagePath}/categoryicons/services/delivery_time.svg`;
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
  { value: 'Rental Manager', label: 'Rental Manager' },
  
  { value: 'Compliance Officer', label: 'Compliance Officer' },
  { value: 'Training Coordinator', label: 'Training Coordinator' }
];


const ServicesType = [
  { value: 'Electrician', label: 'Electrician' },
  { value: 'Plumber', label: 'Plumber' },
  { value: 'Carpenter', label: 'Carpenter' },
  { value: 'House Painter', label: 'House Painter' },
  { value: 'Mechanic', label: 'Mechanic' },
  { value: 'Construction Worker', label: 'Construction Worker' },
  { value: 'Landscaper', label: 'Landscaper' },
  { value: 'Gardener', label: 'Gardener' },
  { value: 'Handyman', label: 'Handyman' },
  { value: 'Roofing Services', label: 'Roofing Services' },
  { value: 'Mason', label: 'Mason' },
  { value: 'Cleaning Services', label: 'Cleaning Services' },
  { value: 'Pest Control', label: 'Pest Control' },
  { value: 'HVAC Technician', label: 'HVAC Technician' },
  { value: 'Mover', label: 'Mover' },
  { value: 'Interior Designer', label: 'Interior Designer' },
  { value: 'Window Installation', label: 'Window Installation' },
  { value: 'Flooring Installer', label: 'Flooring Installer' },
  { value: 'Locksmith', label: 'Locksmith' },
  { value: 'Security', label: 'Security' },
  { value: 'Personal Trainer', label: 'Personal Trainer' },
  { value: 'Auto Mechanic', label: 'Auto Mechanic' },
  { value: 'Tailor', label: 'Tailor' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Catering Services', label: 'Catering Services' },
  { value: 'Event Planner', label: 'Event Planner' },
  { value: 'Personal Driver', label: 'Personal Driver' },
  
  { value: 'Security Guard', label: 'Security Guard' },
  { value: 'Nanny', label: 'Nanny' },
];


const ServicesLanguages = [
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

const ServicesExperience = [
  { value: '0 - 1 year', label: '0 - 1 year' },
  { value: '1 - 2 years', label: '1 - 2 years' },
  { value: '2 - 3 year', label: '2 - 3 year' },
  { value: '3 - 4 years', label: '3 - 4 years' },
  { value: '4 - 5 years', label: '4 - 5 years' },

  { value: '5+ years', label: '5+ years' }
];



const ServicesDeliveryTime = [
  { value: 'Express 24H', label: 'Express 24H' },
  { value: 'Up to 3 days', label: 'Up to 3 days' },
  { value: 'Up to 7 days', label: 'Up to 7 days' },
  { value: 'Anytime', label: 'Anytime' }
];







const ServicesEducation = [
  { value: 'Bachelor degree', label: 'Bachelor degree' },
  { value: 'Master degree', label: 'Master degree' },
  { value: 'Associate degree', label: 'Associate degree' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certification', label: 'Certification' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Professional License', label: 'Professional License' },
  { value: 'High School Diploma', label: 'High School Diploma' },
  { value: 'GED (General Educational Development)', label: 'GED (General Educational Development)' }
];


function Services({ onDataChange, initialState, isOpen }) {

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
        title="Service Type"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="type"
          options={ServicesType}
          value={initiallistingsData.type}
          onChange={(option) => handleSelectChange("type", option.value)}
        />
      </CollapseList>


      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Languages"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="languages"
          options={ServicesLanguages}
          value={initiallistingsData.languages}
          onChange={(options) => handleSelectChange("languages", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Experience"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="experience"
          options={ServicesExperience}
          value={initiallistingsData.experience}
          onChange={(option) => handleSelectChange("experience", option.value)}
        />
      </CollapseList>


      

     
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Education"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="education"
          options={ServicesEducation}
          value={initiallistingsData.education}
          onChange={(option) => handleSelectChange("education", option.value)}
        />
      </CollapseList>

     
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Delivery Time"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="deliveryTime"
          options={ServicesDeliveryTime}
          value={initiallistingsData.deliveryTime}
          onChange={(option) => handleSelectChange("deliveryTime", option.value)}
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

Services.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Services.defaultProps = {
  initialState: {


    languages: [],
    experience: '',
    responseTime: '',
    package: '',
    revisions: [],
    level: '',
    ordersQueue: '',
    jobsCompleted: '',
    repeatHireRate: '',
    education: '',
    onTime: [],
    deliveryTime: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Services;
