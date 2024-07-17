import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/services/services/language.svg`;
const icon2 = `${imagePath}/categoryicons/services/services/experience.svg`;
const icon3 = `${imagePath}/categoryicons/services/services/response_time.svg`;
const icon4 = `${imagePath}/categoryicons/services/services/package.svg`;
const icon5 = `${imagePath}/categoryicons/services/services/revisions.svg`;
const icon6 = `${imagePath}/categoryicons/services/services/level.svg`;
const icon7 = `${imagePath}/categoryicons/services/services/orders_queue.svg`;
const icon8 = `${imagePath}/categoryicons/services/services/jobs_completed.svg`;
const icon9 = `${imagePath}/categoryicons/services/services/repeat_hire_rate.svg`;
const icon10 = `${imagePath}/categoryicons/services/services/education.svg`;
const icon11 = `${imagePath}/categoryicons/services/services/on_time.svg`;
const icon12 = `${imagePath}/categoryicons/services/services/delivery_time.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

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

const ServicesResponseTime = [
  { value: '1 - 2 hours', label: '1 - 2 hours' },
  { value: '4 - 6 hours', label: '4 - 6 hours' },
  { value: '24 hours', label: '24 hours' },
  { value: '2 business days', label: '2 business days' }
];

const ServicesDeliveryTime = [
  { value: 'Express 24H', label: 'Express 24H' },
  { value: 'Up to 3 days', label: 'Up to 3 days' },
  { value: 'Up to 7 days', label: 'Up to 7 days' },
  { value: 'Anytime', label: 'Anytime' }
];

const ServicesPackage = [
  { value: 'Basic', label: 'Basic' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Premium', label: 'Premium' }
];

const ServicesRevisions = [
  { value: 'Standard Package: Includes 2 rounds of revisions', label: 'Standard Package: Includes 2 rounds of revisions' },
  { value: 'Premium Package: Includes 3 rounds of revisions', label: 'Premium Package: Includes 3 rounds of revisions' },
  { value: 'Unlimited Revisions: Contact us for details on our unlimited revision option', label: 'Unlimited Revisions: Contact us for details on our unlimited revision option' }
];

const ServicesLevel = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' }
];

const ServicesOrdersQueue = [
  { value: '1 order', label: '1 order' },
  { value: '2 orders', label: '2 orders' },
  { value: '3 orders', label: '3 orders' },
  { value: 'Up to 6 orders', label: 'Up to 6 orders' }
];

const ServicesJobscompleted = [
  { value: 'Over 10 successful projects completed', label: 'Over 10 successful projects completed' },
  { value: 'With a track record of 50+ completed projects', label: 'With a track record of 50+ completed projects' },
  { value: 'Trusted by 100+ clients worldwide', label: 'Trusted by 100+ clients worldwide' }
];

const ServicesRepeatHireRate = [
  { value: 'Over 40% of our clients choose to work with us again', label: 'Over 40% of our clients choose to work with us again' },
  { value: '2 out of 5 clients return for future projects', label: '2 out of 5 clients return for future projects' },
  { value: '3 out of 5 clients continue to choose us for their projects', label: '3 out of 5 clients continue to choose us for their projects' },
  { value: 'Trusted by 50% of our clients for their ongoing needs', label: 'Trusted by 50% of our clients for their ongoing needs' },
  { value: 'Our commitment to quality is reflected in our 55% repeat hire rate', label: 'Our commitment to quality is reflected in our 55% repeat hire rate' }
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

const ServicesOntime = [
  { value: 'Consistently Meeting Deadlines', label: 'Consistently Meeting Deadlines' },
  { value: 'Timely Results, Every Time', label: 'Timely Results, Every Time' },
  { value: 'Meeting Deadlines', label: 'Meeting Deadlines' }
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
        title="Response Time"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="responseTime"
          options={ServicesResponseTime}
          value={initiallistingsData.responseTime}
          onChange={(option) => handleSelectChange("responseTime", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Package"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="package"
          options={ServicesPackage}
          value={initiallistingsData.package}
          onChange={(option) => handleSelectChange("package", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Revisions"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="revisions"
          options={ServicesRevisions}
          value={initiallistingsData.revisions}
          onChange={(options) => handleSelectChange("revisions", options)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Level"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="level"
          options={ServicesLevel}
          value={initiallistingsData.level}
          onChange={(option) => handleSelectChange("level", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Orders Queue"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="ordersQueue"
          options={ServicesOrdersQueue}
          value={initiallistingsData.ordersQueue}
          onChange={(option) => handleSelectChange("ordersQueue", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Jobs Completed"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="jobsCompleted"
          options={ServicesJobscompleted}
          value={initiallistingsData.jobsCompleted}
          onChange={(option) => handleSelectChange("jobsCompleted", option.value)}
        />
      </CollapseList>

      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Repeat Hire Rate"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="repeatHireRate"
          options={ServicesRepeatHireRate}
          value={initiallistingsData.repeatHireRate}
          onChange={(option) => handleSelectChange("repeatHireRate", option.value)}
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
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="On Time"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <MultSelect
          name="onTime"
          options={ServicesOntime}
          value={initiallistingsData.onTime}
          onChange={(options) => handleSelectChange("onTime", options)}
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
