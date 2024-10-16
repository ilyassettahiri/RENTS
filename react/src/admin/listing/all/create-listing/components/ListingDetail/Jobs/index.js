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
const icon8 = `${imagePath}/categoryicons/services/type_service.svg`;
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

const MoreDetails = [
  { value: 'Remote Work', label: 'Remote Work' },
  { value: 'Flexible Hours', label: 'Flexible Hours' },
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'Part-Time', label: 'Part-Time' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Temporary', label: 'Temporary' },
  { value: 'Contract', label: 'Contract' },
  { value: 'On-Site', label: 'On-Site' }
];

const Benefits = [
  { value: 'Health Insurance', label: 'Health Insurance' },
  { value: 'Retirement Plan', label: 'Retirement Plan' },
  { value: 'Paid Time Off', label: 'Paid Time Off' },
  { value: 'Parental Leave', label: 'Parental Leave' },
  { value: 'Professional Development', label: 'Professional Development' },
  { value: 'Performance Bonuses', label: 'Performance Bonuses' },
  { value: 'Employee Discounts', label: 'Employee Discounts' },
  { value: 'Wellness Programs', label: 'Wellness Programs' },
  { value: 'Work from Home Stipend', label: 'Work from Home Stipend' }
];

const Requirements = [
  { value: 'Bachelors Degree', label: 'Bachelors Degree' },
  { value: 'Masters Degree', label: 'Masters Degree' },
  { value: 'High School Diploma', label: 'High School Diploma' },
  { value: 'Relevant Certifications', label: 'Relevant Certifications' },
  { value: 'Strong Communication Skills', label: 'Strong Communication Skills' },
  { value: 'Teamwork Ability', label: 'Teamwork Ability' },
  { value: 'Problem-Solving Skills', label: 'Problem-Solving Skills' },
  { value: 'Time Management Skills', label: 'Time Management Skills' },
  { value: 'Technical Skills', label: 'Technical Skills' }
];

const ServicesEmploymentType = [
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'Part-Time', label: 'Part-Time' },
  { value: 'Temporary', label: 'Temporary' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Freelance', label: 'Freelance' }
];

const ServicesSkills = [
  { value: 'Communication', label: 'Communication' },
  { value: 'Project Management', label: 'Project Management' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Technical Skills', label: 'Technical Skills' },
  { value: 'Analytical Thinking', label: 'Analytical Thinking' },
  { value: 'Creativity', label: 'Creativity' },
  { value: 'Adaptability', label: 'Adaptability' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Customer Service', label: 'Customer Service' }
];

const ServicesSalary = [
  { value: '$30,000 - $40,000', label: '$30,000 - $40,000' },
  { value: '$40,001 - $50,000', label: '$40,001 - $50,000' },
  { value: '$50,001 - $60,000', label: '$50,001 - $60,000' },
  { value: '$60,001 - $70,000', label: '$60,001 - $70,000' },
  { value: '$70,001 - $80,000', label: '$70,001 - $80,000' },
  { value: '$80,001 - $90,000', label: '$80,001 - $90,000' },
  { value: '$90,001 - $100,000', label: '$90,001 - $100,000' },
  { value: '$100,001+', label: '$100,001+' }
];






const ServicesResponsibilities = [
  { value: 'Develop and implement project plans', label: 'Develop and implement project plans' },
  { value: 'Conduct market research and analysis', label: 'Conduct market research and analysis' },
  { value: 'Collaborate with team members and stakeholders', label: 'Collaborate with team members and stakeholders' },
  { value: 'Prepare reports and presentations', label: 'Prepare reports and presentations' },
  { value: 'Manage budgets and resources', label: 'Manage budgets and resources' },
  { value: 'Provide excellent customer service', label: 'Provide excellent customer service' },
  { value: 'Ensure compliance with company policies', label: 'Ensure compliance with company policies' },
  { value: 'Train and mentor junior staff', label: 'Train and mentor junior staff' },
  { value: 'Analyze data and provide insights', label: 'Analyze data and provide insights' },
  { value: 'Assist in recruitment and hiring processes', label: 'Assist in recruitment and hiring processes' },
  { value: 'Maintain project documentation', label: 'Maintain project documentation' },
  { value: 'Oversee quality assurance and control', label: 'Oversee quality assurance and control' },
  { value: 'Implement marketing strategies', label: 'Implement marketing strategies' }
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
