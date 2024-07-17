import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/vehicules/cars/car_air_conditioner.svg`;
const icon2 = `${imagePath}/categoryicons/vehicules/cars/car_condition.svg`;
const icon3 = `${imagePath}/categoryicons/vehicules/cars/car_fuel_type.svg`;
const icon4 = `${imagePath}/categoryicons/vehicules/cars/car_number_of_doors.svg`;
const icon5 = `${imagePath}/categoryicons/vehicules/cars/car_seat.svg`;
const icon6 = `${imagePath}/categoryicons/vehicules/cars/car_transmission.svg`;
const icon30 = `${imagePath}/categoryicons/vehicules/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon30
};


const CarTransmission = [
  { value: 'Manual transmission', label: 'Manual transmission' },
  { value: 'Automatic transmission', label: 'Automatic transmission' }
];

const CarFuelType = [
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' }
];

const CarNumberofDoors = [
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '5', label: '5' }
];

const CarSeats = [
  { value: '1 to 2 passengers', label: '1 to 2 passengers' },
  { value: '3 to 5 passengers', label: '3 to 5 passengers' },
  { value: '6 or more', label: '6 or more' }
];

const CarCondition = [
  { value: 'New', label: 'New' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' }
];

const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];

function Cars({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Transmission"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="transmission"
          options={CarTransmission}
          value={initiallistingsData.transmission}
          onChange={(option) => handleSelectChange("transmission", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Fuel Type"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="fuelType"
          options={CarFuelType}
          value={initiallistingsData.fuelType}
          onChange={(option) => handleSelectChange("fuelType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Number of Doors"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="numberOfDoors"
          options={CarNumberofDoors}
          value={initiallistingsData.numberOfDoors}
          onChange={(option) => handleSelectChange("numberOfDoors", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Seats"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="seats"
          options={CarSeats}
          value={initiallistingsData.seats}
          onChange={(option) => handleSelectChange("seats", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Condition"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="condition"
          options={CarCondition}
          value={initiallistingsData.condition}
          onChange={(option) => handleSelectChange("condition", option.value)}
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

Cars.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Cars.defaultProps = {
  initialState: {

    transmission: '',
    fuelType: '',
    numberOfDoors: '',
    condition: '',
    seats: '',
    moreDetails: [],



    
  },
  isOpen: false,
};

export default Cars;
