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
import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/musculations/abs.svg`;
const icon2 = `${imagePath}/categoryicons/musculations/arms.svg`;
const icon3 = `${imagePath}/categoryicons/musculations/back.svg`;
const icon4 = `${imagePath}/categoryicons/musculations/brand.svg`;
const icon5 = `${imagePath}/categoryicons/musculations/cardio_machines.svg`;
const icon6 = `${imagePath}/categoryicons/musculations/chest.svg`;
const icon7 = `${imagePath}/categoryicons/musculations/glutes.svg`;
const icon8 = `${imagePath}/categoryicons/musculations/gym_dimensions.svg`;
const icon9 = `${imagePath}/categoryicons/musculations/legs.svg`;
const icon10 = `${imagePath}/categoryicons/musculations/other_equipment.svg`;
const icon11 = `${imagePath}/categoryicons/musculations/shoulders.svg`;
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
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];



const MusculationBrand = [
  { value: 'Life Fitness', label: 'Life Fitness' },
  { value: 'Precor', label: 'Precor' },
  { value: 'Technogym', label: 'Technogym' },
  { value: 'Cybex', label: 'Cybex' },
  { value: 'Hammer Strength', label: 'Hammer Strength' },
  { value: 'Nautilus', label: 'Nautilus' },
  { value: 'Bowflex', label: 'Bowflex' },
  { value: 'NordicTrack', label: 'NordicTrack' },
  { value: 'Rogue Fitness', label: 'Rogue Fitness' },
  { value: 'Matrix Fitness', label: 'Matrix Fitness' },
  { value: 'Body-Solid', label: 'Body-Solid' },
  { value: 'PowerBlock', label: 'PowerBlock' },
  { value: 'Hoist Fitness', label: 'Hoist Fitness' },
  { value: 'Star Trac', label: 'Star Trac' },
  { value: 'ProForm', label: 'ProForm' }
];
const MusculationArms = [
  { value: 'Arm Curl Machine', label: 'Arm Curl Machine' },
  { value: 'Triceps Extension Machine', label: 'Triceps Extension Machine' },
  { value: 'Cable Bicep Curl Machine', label: 'Cable Bicep Curl Machine' },
  { value: 'Barbell Bicep Curl Bench', label: 'Barbell Bicep Curl Bench' },
  { value: 'Preacher Curl Bench', label: 'Preacher Curl Bench' },
  { value: 'Dip Machine', label: 'Dip Machine' },
  { value: 'Reverse Grip Pull-Down Machine', label: 'Reverse Grip Pull-Down Machine' },
  { value: 'Wrist Curl Machine', label: 'Wrist Curl Machine' },
  { value: 'Cable Triceps Pushdown Machine', label: 'Cable Triceps Pushdown Machine' },
  { value: 'Hammer Curl Machine', label: 'Hammer Curl Machine' }
];
const MusculationBack = [
  { value: 'Lat Pulldown Machine', label: 'Lat Pulldown Machine' },
  { value: 'Seated Row Machine', label: 'Seated Row Machine' },
  { value: 'Cable Row Machine', label: 'Cable Row Machine' },
  { value: 'T-Bar Row Machine', label: 'T-Bar Row Machine' },
  { value: 'Pull-Up Bar', label: 'Pull-Up Bar' },
  { value: 'Hyperextension Bench', label: 'Hyperextension Bench' },
  { value: 'Back Extension Machine', label: 'Back Extension Machine' },
  { value: 'Smith Machine ', label: 'Smith Machine' }
];
const MusculationShoulders = [
  { value: 'Shoulder Press Machine', label: 'Shoulder Press Machine' },
  { value: 'Lateral Raise Machine', label: 'Lateral Raise Machine' },
  { value: 'Front Raise Machine', label: 'Front Raise Machine' },
  { value: 'Rear Deltoid Fly Machine', label: 'Rear Deltoid Fly Machine' },
  { value: 'Shoulder Shrug Machine', label: 'Shoulder Shrug Machine' },
  { value: 'Cable Shoulder Press Machine', label: 'Cable Shoulder Press Machine' },
  { value: 'Smith Machine', label: 'Smith Machine' },
  { value: 'Dumbbell Shoulder Press Bench', label: 'Dumbbell Shoulder Press Bench' },
  { value: 'Dumbbell Lateral Raise Bench', label: 'Dumbbell Lateral Raise Bench' }
];
const MusculationGlutes = [
  { value: 'Hip Thrust Machine', label: 'Hip Thrust Machine' },
  { value: 'Glute Kickback Machine', label: 'Glute Kickback Machine' },
  { value: 'Glute Bridge Machine', label: 'Glute Bridge Machine' },
  { value: 'Hip Abduction Machine', label: 'Hip Abduction Machine' },
  { value: 'Cable Pull-Through Machine', label: 'Cable Pull-Through Machine' },
  { value: 'Bulgarian Split Squat Machine', label: 'Bulgarian Split Squat Machine' },
  { value: 'Smith Machine', label: 'Smith Machine' },
  { value: 'Glute-Ham Raise Machine', label: 'Glute-Ham Raise Machine' },
  { value: 'Reverse Hyperextension Machine', label: 'Reverse Hyperextension Machine' }
];
const MusculationLegs = [
  { value: 'Leg Press Machine', label: 'Leg Press Machine' },
  { value: 'Leg Extension Machine', label: 'Leg Extension Machine' },
  { value: 'Leg Curl Machine', label: 'Leg Curl Machine' },
  { value: 'Squat Machine', label: 'Squat Machine' },
  { value: 'Hack Squat Machine', label: 'Hack Squat Machine' },
  { value: 'Smith Machine', label: 'Smith Machine' },
  { value: 'Calf Raise Machine', label: 'Calf Raise Machine' },
  { value: 'Seated Leg Press Machine', label: 'Seated Leg Press Machine' },
  { value: 'Lunges Machine', label: 'Lunges Machine' },
  { value: 'Leg Abduction Machine', label: 'Leg Abduction Machine' }
];
const MusculationChest = [
  { value: 'Chest Press Machine', label: 'Chest Press Machine' },
  { value: 'Pec Deck Machine', label: 'Pec Deck Machine' },
  { value: 'Chest Fly Machine', label: 'Chest Fly Machine' },
  { value: 'Cable Chest Press Machine', label: 'Cable Chest Press Machine' },
  { value: 'Smith Machine', label: 'Smith Machine' },
  { value: 'Chest Press Machine', label: 'Chest Press Machine' },
  { value: 'Push-Up Machine', label: 'Push-Up Machine' },
  { value: 'Bench Press Machine', label: 'Bench Press Machine' },
  { value: 'Chest Dip Machine', label: 'Chest Dip Machine' }
];
const MusculationAbs = [
  { value: 'Ab Crunch Machine', label: 'Ab Crunch Machine' },
  { value: 'Cable Crunch Machine', label: 'Cable Crunch Machine' },
  { value: 'Ab Roller Machine', label: 'Ab Roller Machine' },
  { value: 'Roman Chair', label: 'Roman Chair' },
  { value: 'Decline Bench', label: 'Decline Bench' },
  { value: 'Sit-Up Bench', label: 'Sit-Up Bench' },
  { value: 'Swiss Ball', label: 'Swiss Ball' },
  { value: 'Medicine Ball', label: 'Medicine Ball' }
];
const MusculationCardio = [
  { value: 'Treadmill', label: 'Treadmill' },
  { value: 'Stationary Bike', label: 'Stationary Bike' },
  { value: 'Elliptical Trainer', label: 'Elliptical Trainer' },
  { value: 'Rowing Machine', label: 'Rowing Machine' },
  { value: 'Stair Climber', label: 'Stair Climber' },
  { value: 'Spin Bike', label: 'Spin Bike' },
  { value: 'Air Bike', label: 'Air Bike' },
  { value: 'Cross Trainer', label: 'Cross Trainer' },
  { value: 'Ski Erg Machine', label: 'Ski Erg Machine' }
];
const MusculationOther = [
  { value: 'Dumbbells', label: 'Dumbbells' },
  { value: 'Kettlebells', label: 'Kettlebells' },
  { value: 'Barbell', label: 'Barbell' }
];

function Musculations({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Brand Name"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="brand"
          options={MusculationBrand}
          value={initiallistingsData.brand}
          onChange={(options) => handleSelectChange("brand", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Arms"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="arms"
          options={MusculationArms}
          value={initiallistingsData.arms}
          onChange={(options) => handleSelectChange("arms", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Back"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="back"
          options={MusculationBack}
          value={initiallistingsData.back}
          onChange={(options) => handleSelectChange("back", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Shoulders"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="shoulders"
          options={MusculationShoulders}
          value={initiallistingsData.shoulders}
          onChange={(options) => handleSelectChange("shoulders", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Glutes"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="glutes"
          options={MusculationGlutes}
          value={initiallistingsData.glutes}
          onChange={(options) => handleSelectChange("glutes", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Legs"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="legs"
          options={MusculationLegs}
          value={initiallistingsData.legs}
          onChange={(options) => handleSelectChange("legs", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Chest"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="chest"
          options={MusculationChest}
          value={initiallistingsData.chest}
          onChange={(options) => handleSelectChange("chest", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Abs"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="abs"
          options={MusculationAbs}
          value={initiallistingsData.abs}
          onChange={(options) => handleSelectChange("abs", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Cardio"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="cardio"
          options={MusculationCardio}
          value={initiallistingsData.cardio}
          onChange={(options) => handleSelectChange("cardio", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Musculation Other"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <MultSelect
          name="other"
          options={MusculationOther}
          value={initiallistingsData.other}
          onChange={(options) => handleSelectChange("other", options)}

          

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


Musculations.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Musculations.defaultProps = {
  initialState: {



    brand: [],
    arms: [],
    back: [],
    shoulders: [],
    glutes: [],
    legs: [],
    chest: [],
    abs: [],
    cardio: [],
    other: [],
    moreDetails: [],
    
  },
  isOpen: false,
};

export default Musculations;
