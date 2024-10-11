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
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const Benefits = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const Requirements = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];



const ServicesLanguages = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Swedish', label: 'Swedish' },
  { value: 'Hebrew', label: 'Hebrew' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Norwegian', label: 'Norwegian' },
  { value: 'Danish', label: 'Danish' }
];

const ServicesExperience = [
  { value: '0 - 1 year', label: '0 - 1 year' },
  { value: '1 - 2 years', label: '1 - 2 years' },
  { value: '3+ years', label: '3+ years' }
];

const ServicesEmploymentType = [
  { value: '1 - 2 hours', label: '1 - 2 hours' },
  { value: '4 - 6 hours', label: '4 - 6 hours' },
  { value: '24 hours', label: '24 hours' },
  { value: '2 business days', label: '2 business days' }
];




const ServicesSkills = [
  { value: 'Standard Package: Includes 2 rounds of revisions', label: 'Standard Package: Includes 2 rounds of revisions' },
  { value: 'Premium Package: Includes 3 rounds of revisions', label: 'Premium Package: Includes 3 rounds of revisions' },
  { value: 'Unlimited Revisions: Contact us for details on our unlimited revision option', label: 'Unlimited Revisions: Contact us for details on our unlimited revision option' }
];

const ServicesSalary = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' }
];









const ServicesResponsibilities = [
  { value: 'Consistently Meeting Deadlines', label: 'Consistently Meeting Deadlines' },
  { value: 'Timely Results, Every Time', label: 'Timely Results, Every Time' },
  { value: 'Meeting Deadlines', label: 'Meeting Deadlines' }
];

function Jobs({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Employment Type"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="employmentType"
          options={ServicesEmploymentType}
          value={initiallistingsData.employmentType}
          onChange={(option) => handleSelectChange("employmentType", option.value)}
        />
      </CollapseList>

      

      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Skills"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="skills"
          options={ServicesSkills}
          value={initiallistingsData.skills}
          onChange={(options) => handleSelectChange("skills", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Salary"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="salary"
          options={ServicesSalary}
          value={initiallistingsData.salary}
          onChange={(option) => handleSelectChange("salary", option.value)}
        />
      </CollapseList>

      
     
      
     
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Responsibilities"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <MultSelect
          name="responsibilities"
          options={ServicesResponsibilities}
          value={initiallistingsData.responsibilities}
          onChange={(options) => handleSelectChange("responsibilities", options)}
        />
      </CollapseList>



      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Benefits"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="benefits"
          options={Benefits}
          value={initiallistingsData.benefits}
          onChange={(options) => handleSelectChange("benefits", options)}
        />
      </CollapseList>




      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Requirements"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="requirements"
          options={Requirements}
          value={initiallistingsData.requirements}
          onChange={(options) => handleSelectChange("requirements", options)}
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

Jobs.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Jobs.defaultProps = {
  initialState: {


    languages: [],
    experience: '',
    employmentType: '',
    
    skills: [],
    salary: '',
    
    
    benefits: [],

      
    requirements: [],
    
    responsibilities: [],
    
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Jobs;
