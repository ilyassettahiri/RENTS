import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import { Incrementer } from 'admin/components/Quantity/Incrementer';
import FormField from "admin/components/FormFieldCollap";


import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/activities/age_requirement.svg`;
const icon2 = `${imagePath}/categoryicons/activities/duration.svg`;
const icon3 = `${imagePath}/categoryicons/activities/language.svg`;
const icon4 = `${imagePath}/categoryicons/activities/safety_equipment.svg`;
const icon5 = `${imagePath}/categoryicons/activities/type.svg`;
const icon6 = `${imagePath}/categoryicons/activities/equipment.svg`;
const icon7 = `${imagePath}/categoryicons/activities/cancellation.svg`;
const icon8 = `${imagePath}/categoryicons/activities/monitor.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'Elevation Gain', label: 'Elevation Gain' },
  { value: 'Trail Difficulty', label: 'Trail Difficulty' },
  { value: 'Water Depth', label: 'Water Depth' },
  { value: 'Climbing Grade', label: 'Climbing Grade' },
  { value: 'Wind Speed', label: 'Wind Speed' },
  { value: 'River Rapids Class', label: 'River Rapids Class' },
  { value: 'Wave Height', label: 'Wave Height' },
  { value: 'Snow Depth', label: 'Snow Depth' },
  { value: 'Wildlife Encounters', label: 'Wildlife Encounters' },
  { value: 'Required Fitness Level', label: 'Required Fitness Level' },
  { value: 'Instructor to Participant Ratio', label: 'Instructor to Participant Ratio' },
  { value: 'Gear Rental Available', label: 'Gear Rental Available' },
  { value: 'First Aid Station', label: 'First Aid Station' },
  { value: 'Safety Certification', label: 'Safety Certification' },
  { value: 'Local Permits Required', label: 'Local Permits Required' }
];


const ActivityType = [
  { value: 'Hiking', label: 'Hiking' },
  { value: 'Kayaking', label: 'Kayaking' },
  { value: 'Rock Climbing', label: 'Rock Climbing' },
  { value: 'Zip-lining', label: 'Zip-lining' },
  { value: 'Biking', label: 'Biking' },
  { value: 'Scuba Diving', label: 'Scuba Diving' },
  { value: 'Snorkelling', label: 'Snorkelling' },
  { value: 'Surfing', label: 'Surfing' },
  { value: 'Skiing/Snowboarding', label: 'Skiing/Snowboarding' },
  { value: 'Wildlife Safari', label: 'Wildlife Safari' },
  { value: 'Horseback Riding', label: 'Horseback Riding' },
  { value: 'Paragliding', label: 'Paragliding' },
  { value: 'Hot Air Ballooning', label: 'Hot Air Ballooning' },
  { value: 'White Water Rafting', label: 'White Water Rafting' },
  { value: 'Bungee Jumping', label: 'Bungee Jumping' },
  { value: 'Skydiving', label: 'Skydiving' },
  { value: 'Cooking Class', label: 'Cooking Class' },
  { value: 'Cultural Tour', label: 'Cultural Tour' }
];

const ActivityEquipment = [
  { value: 'Hiking Boots', label: 'Hiking Boots' },
  { value: 'Climbing Harness', label: 'Climbing Harness' },
  { value: 'Helmet', label: 'Helmet' },
  { value: 'Life Jacket', label: 'Life Jacket' },
  { value: 'Kayak/Paddle', label: 'Kayak/Paddle' },
  { value: 'Snorkel Gear', label: 'Snorkel Gear' },
  { value: 'Surfboard', label: 'Surfboard' },
  { value: 'Ski/Snowboard Equipment', label: 'Ski/Snowboard Equipment' },
  { value: 'Binoculars', label: 'Binoculars' },
  { value: 'Camera', label: 'Camera' },
  { value: 'Backpack', label: 'Backpack' },
  { value: 'Tent', label: 'Tent' },
  { value: 'Sleeping Bag', label: 'Sleeping Bag' }
];

const ActivityAgeRequirement = [
  { value: 'No Age Limit', label: 'No Age Limit' },
  { value: 'Children', label: 'Children' },
  { value: 'Adults Only', label: 'Adults Only' },
  { value: 'Senior Citizens', label: 'Senior Citizens' }
];

const ActivityDuration = [
  { value: '4-6 hours', label: '4-6 hours' },
  { value: '8-10 hours', label: '8-10 hours' },
  { value: '24 hours', label: '24 hours' },
  { value: '48 hours', label: '48 hours' }
];

const ActivityLanguage = [
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

const ActivityCancellation = [
  { value: 'Full Refund Available', label: 'Full Refund Available' },
  { value: 'Partial Refund Available', label: 'Partial Refund Available' },
  { value: 'No Refund', label: 'No Refund' }
];

const ActivitySafetyEquipment = [
  { value: 'Life Jackets', label: 'Life Jackets' },
  { value: 'Harnesses', label: 'Harnesses' },
  { value: 'Helmets', label: 'Helmets' },
  { value: 'Ropes', label: 'Ropes' },
  { value: 'First Aid Kit', label: 'First Aid Kit' },
  { value: 'Safety Briefing/Instruction', label: 'Safety Briefing/Instruction' }
];

const ActivityMonitor = [
  { value: 'Certified guide', label: 'Certified guide' },
  { value: 'Experienced instructor', label: 'Experienced instructor' },
  { value: 'Professional tour leader', label: 'Professional tour leader' },
  { value: 'Trained supervisor', label: 'Trained supervisor' },
  { value: 'Licensed monitor', label: 'Licensed monitor' }
];

function Activities({ onDataChange, initialState, isOpen }) {
  
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

  const [duration, setDuration] = useState(0);  // Default to 0 initially


  const handleIncrease = (name) => {
    const newDuration = duration + 1;
    setDuration(newDuration);
    handleSelectChange('duration', `${newDuration} ${name}`);  // Store as "X Hours"
  };
  
  const handleDecrease = (name) => {
    if (duration > 0) {
      const newDuration = duration - 1;
      setDuration(newDuration);
      handleSelectChange('duration', `${newDuration} ${name}`);  // Store as "X Hours"
    }
  };


  return (
    <SoftBox mt={3}>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Activity Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >



       


          <FormField
            
            type="text"
            name="type"
            placeholder="Enter activity type"
            value={initiallistingsData.type}
            onChange={(e) => handleSelectChange("type", e.target.value)}
          />





      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Equipment"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="equipment"
          options={ActivityEquipment}
          value={initiallistingsData.equipment}
          onChange={(options) => handleSelectChange("equipment", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Age Requirement"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="ageRequirement"
          options={ActivityAgeRequirement}
          value={initiallistingsData.ageRequirement}
          onChange={(option) => handleSelectChange("ageRequirement", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Duration"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <Incrementer
          name="hours"

          quantity={duration}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          disabledDecrease={duration <= 0} // Disable decrease if duration is 0
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Language"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >




        <MultSelect
          name="language"
          options={ActivityLanguage}
          value={initiallistingsData.language}
          onChange={(options) => handleSelectChange("language", options)}
        />


      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Cancellation"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="cancellation"
          options={ActivityCancellation}
          value={initiallistingsData.cancellation}
          onChange={(options) => handleSelectChange("cancellation", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Safety Equipment"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="safetyEquipment"
          options={ActivitySafetyEquipment}
          value={initiallistingsData.safetyEquipment}
          onChange={(options) => handleSelectChange("safetyEquipment", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Monitor"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="monitor"
          options={ActivityMonitor}
          value={initiallistingsData.monitor}
          onChange={(option) => handleSelectChange("monitor", option.value)}
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

Activities.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Activities.defaultProps = {
  initialState: {

    type: '',
    equipment: [],
    ageRequirement: '',
    duration: '',
    language: '',
    cancellation: '',
    safetyEquipment: [],
    monitor: '',
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Activities;
