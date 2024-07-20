import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CollapseList from "admin/components/CollapseList";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/transportations/alcohol_friendly.svg`;
const icon2 = `${imagePath}/categoryicons/transportations/bluetooth.svg`;
const icon3 = `${imagePath}/categoryicons/transportations/car_air_conditioner.svg`;
const icon4 = `${imagePath}/categoryicons/transportations/car_condition.svg`;
const icon5 = `${imagePath}/categoryicons/transportations/duration.svg`;
const icon6 = `${imagePath}/categoryicons/transportations/food_allowed.svg`;
const icon7 = `${imagePath}/categoryicons/transportations/luggage.svg`;
const icon8 = `${imagePath}/categoryicons/transportations/passengers.svg`;
const icon9 = `${imagePath}/categoryicons/transportations/transmission.svg`;
const icon10 = `${imagePath}/categoryicons/transportations/tv.svg`;
const icon11 = `${imagePath}/categoryicons/transportations/usb.svg`;
const icon12 = `${imagePath}/categoryicons/transportations/wheelchair_accessible.svg`;
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


const PersonalTransportationPassengers = [
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8+', label: '8+' }
];

const PersonalTransportationLuggage = [
  { value: '2 Suitcases + 2 Carry-On Bags', label: '2 Suitcases + 2 Carry-On Bags' },
  { value: '4 Suitcases', label: '4 Suitcases' },
  { value: '6 Pieces of Luggage', label: '6 Pieces of Luggage' }
];

const PersonalTransportationCondition = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' }
];

const PersonalTransportationDuration = [
  { value: 'Hourly', label: 'Hourly' },
  { value: 'Daily', label: 'Daily' },
  { value: 'one-way trip', label: 'one-way trip' }
];

const PersonalTransportationGearbox = [
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' }
];

function Transportations({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Passengers"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="passengers"
          options={PersonalTransportationPassengers}
          value={initiallistingsData.passengers}
          onChange={(option) => handleSelectChange("passengers", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Luggage"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="luggage"
          options={PersonalTransportationLuggage}
          value={initiallistingsData.luggage}
          onChange={(option) => handleSelectChange("luggage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="condition"
          options={PersonalTransportationCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Duration"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="duration"
          options={PersonalTransportationDuration}
          value={initiallistingsData.duration}
          onChange={(options) => handleSelectChange("duration", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Gearbox"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="gearbox"
          options={PersonalTransportationGearbox}
          value={initiallistingsData.gearbox}
          onChange={(option) => handleSelectChange("gearbox", option.value)}
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



Transportations.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Transportations.defaultProps = {
  initialState: {


    passengers: '',
    luggage: '',
    condition: '',
    duration: [],
    gearbox: '',
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Transportations;
