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
const icon1 = `${imagePath}/categoryicons/boats/cruise_capacity.svg`;
const icon2 = `${imagePath}/categoryicons/boats/daily_cruising_time.svg`;
const icon3 = `${imagePath}/categoryicons/boats/kitchen_equipment.svg`;
const icon4 = `${imagePath}/categoryicons/boats/length.svg`;
const icon5 = `${imagePath}/categoryicons/boats/number_of_cabins.svg`;
const icon6 = `${imagePath}/categoryicons/boats/security.svg`;
const icon7 = `${imagePath}/categoryicons/boats/shower.svg`;
const icon8 = `${imagePath}/categoryicons/boats/skippered_charter.svg`;
const icon9 = `${imagePath}/categoryicons/boats/navigation.svg`;
const icon10 = `${imagePath}/categoryicons/boats/berths_in_cabin.svg`;
const icon11 = `${imagePath}/categoryicons/boats/boats_type.svg`;
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
  { value: 'Anchor', label: 'Anchor' },
  { value: 'Docking Ropes', label: 'Docking Ropes' },
  { value: 'Boat Cover', label: 'Boat Cover' },
  { value: 'Bimini Top', label: 'Bimini Top' },
  { value: 'Fenders', label: 'Fenders' },
  { value: 'Bilge Pump', label: 'Bilge Pump' },
  { value: 'Navigation Lights', label: 'Navigation Lights' },
  { value: 'VHF Radio', label: 'VHF Radio' },
  { value: 'Marine Speakers', label: 'Marine Speakers' },
  { value: 'Fish Finder', label: 'Fish Finder' },
  { value: 'Boat Ladder', label: 'Boat Ladder' },
  { value: 'Towing Hook', label: 'Towing Hook' },
  { value: 'Swim Platform', label: 'Swim Platform' },
  { value: 'Outboard Motor', label: 'Outboard Motor' },
  { value: 'Depth Finder', label: 'Depth Finder' },
  { value: 'Water Ski Equipment', label: 'Water Ski Equipment' },
  { value: 'Wakeboard Rack', label: 'Wakeboard Rack' },
  { value: 'Fuel Tank', label: 'Fuel Tank' },
  { value: 'Windlass', label: 'Windlass' },
  { value: 'Boat Grill', label: 'Boat Grill' }
];



const BoatsType = [
  { value: 'Sailboat', label: 'Sailboat' },
  { value: 'Motorboat', label: 'Motorboat' },
  { value: 'Yacht', label: 'Yacht' },
  { value: 'Catamaran', label: 'Catamaran' },
  { value: 'Trimaran', label: 'Trimaran' },
  { value: 'Fishing boat', label: 'Fishing boat' },
  { value: 'Speedboat', label: 'Speedboat' },
  { value: 'Houseboat', label: 'Houseboat' },
  { value: 'Pontoon boat', label: 'Pontoon boat' },
  { value: 'Dinghy', label: 'Dinghy' },
  { value: 'Canoe', label: 'Canoe' },
  { value: 'Kayak', label: 'Kayak' }
];

const BoatsCruiseCapacity = [
  { value: '1-3 passengers', label: '1-3 passengers' },
  { value: '3-6 passengers', label: '3-6 passengers' },
  { value: '10+ passengers', label: '10+ passengers' }
];

const BoatsNumberOfCabins = [
  { value: '1 Cabin', label: '1 Cabin' },
  { value: '2 Cabins', label: '2 Cabins' },
  { value: '3+ Cabins', label: '3+ Cabins' }
];

const BoatsBerthsInCabin = [
  { value: '1 berth', label: '1 berth' },
  { value: '2 berths', label: '2 berths' },
  { value: '3+ berths', label: '3+ berths' }
];

const BoatsDailyCruisingTime = [
  { value: '4 hours', label: '4 hours' },
  { value: '6 hours', label: '6 hours' },
  { value: '8 hours', label: '8 hours' }
];

const BoatsLength = [
  { value: '10 meters', label: '10 meters' },
  { value: '12 meters', label: '12 meters' },
  { value: '15 meters+', label: '15 meters+' }
];

const BoatsSecurity = [
  { value: 'Life jackets', label: 'Life jackets' },
  { value: 'Life rafts', label: 'Life rafts' },
  { value: 'Fire extinguishers', label: 'Fire extinguishers' },
  { value: 'First aid kit', label: 'First aid kit' },
  { value: 'Emergency beacon', label: 'Emergency beacon' },
  { value: 'Security camera', label: 'Security camera' }
];

const BoatsNavigation = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Chart plotter', label: 'Chart plotter' },
  { value: 'Radar', label: 'Radar' },
  { value: 'Depth sounder', label: 'Depth sounder' },
  { value: 'Compass', label: 'Compass' }
];

const BoatsKitchenEquipment = [
  { value: 'Stove', label: 'Stove' },
  { value: 'Oven', label: 'Oven' },
  { value: 'Microwave', label: 'Microwave' },
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Freezer', label: 'Freezer' },
  { value: 'Sink', label: 'Sink' },
  { value: 'Dishwasher', label: 'Dishwasher' },
  { value: 'Coffee maker', label: 'Coffee maker' },
  { value: 'Blender', label: 'Blender' },
  { value: 'Toaster', label: 'Toaster' }
];

function Boats({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon11} style={{ width: "40px" }} />}
        title="Boats Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="boatsType"
          options={BoatsType}
          value={initiallistingsData.boatsType}
          onChange={(option) => handleSelectChange("boatsType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Capacity"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="cruiseCapacity"
          options={BoatsCruiseCapacity}
          value={initiallistingsData.cruiseCapacity}
          onChange={(option) => handleSelectChange("cruiseCapacity", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Number of Cabins"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="numberOfCabins"
          options={BoatsNumberOfCabins}
          value={initiallistingsData.numberOfCabins}
          onChange={(option) => handleSelectChange("numberOfCabins", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="Berths in Cabin"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="berthsInCabin"
          options={BoatsBerthsInCabin}
          value={initiallistingsData.berthsInCabin}
          onChange={(option) => handleSelectChange("berthsInCabin", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Daily Cruising Time"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="dailyCruisingTime"
          options={BoatsDailyCruisingTime}
          value={initiallistingsData.dailyCruisingTime}
          onChange={(option) => handleSelectChange("dailyCruisingTime", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Length"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="length"
          options={BoatsLength}
          value={initiallistingsData.length}
          onChange={(option) => handleSelectChange("length", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Security"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="security"
          options={BoatsSecurity}
          value={initiallistingsData.security}
          onChange={(options) => handleSelectChange("security", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Navigation"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="navigation"
          options={BoatsNavigation}
          value={initiallistingsData.navigation}
          onChange={(options) => handleSelectChange("navigation", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Kitchen Equipment"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="kitchenEquipment"
          options={BoatsKitchenEquipment}
          value={initiallistingsData.kitchenEquipment}
          onChange={(options) => handleSelectChange("kitchenEquipment", options)}
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

Boats.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Boats.defaultProps = {
  initialState: {


    boatsType: '',
    cruiseCapacity: '',
    numberOfCabins: '',
    berthsInCabin: '',
    dailyCruisingTime: '',
    length: '',
    security: [],
    navigation: [],
    kitchenEquipment: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Boats;
