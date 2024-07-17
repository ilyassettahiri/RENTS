import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/immobilier/appartment/bathrooms.svg`;
const icon2 = `${imagePath}/categoryicons/immobilier/appartment/bedrooms.svg`;
const icon3 = `${imagePath}/categoryicons/immobilier/appartment/facilities.svg`;
const icon4 = `${imagePath}/categoryicons/immobilier/appartment/floors.svg`;
const icon5 = `${imagePath}/categoryicons/immobilier/appartment/kitchen.svg`;
const icon6 = `${imagePath}/categoryicons/immobilier/appartment/living_room.svg`;
const icon7 = `${imagePath}/categoryicons/immobilier/appartment/rooms.svg`;
const icon8 = `${imagePath}/categoryicons/immobilier/appartment/security_system.svg`;
const icon9 = `${imagePath}/categoryicons/immobilier/appartment/service.svg`;
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
  icon30
};



const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const ApartmentFacilities = [
  { value: 'TV', label: 'TV' },
  { value: 'Parking', label: 'Parking' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Heating', label: 'Heating' },
  { value: 'Air Conditioning', label: 'Air Conditioning' },
  { value: 'Pool', label: 'Pool' },
  { value: 'Garden View', label: 'Garden View' },
  { value: 'Terrace', label: 'Terrace' }
];
const ApartmentService = [
  { value: 'Doorkeeper', label: 'Doorkeeper' },
  { value: 'Housekeeping', label: 'Housekeeping' }
];
const ApartmentKitchen = [
  { value: 'Dishwasher', label: 'Dishwasher' },
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Washing Machine', label: 'Washing Machine' }
];
const ApartmentSecuritySystem = [
  { value: 'Alarm Systems', label: 'Alarm Systems' },
  { value: 'Surveillance Cameras (CCTV)', label: 'Surveillance Cameras (CCTV)' },
  { value: 'Smart Home Security Systems', label: 'Smart Home Security Systems' },
  { value: 'Access Control Systems', label: 'Access Control Systems' },
  { value: 'Motion Sensor Lights', label: 'Motion Sensor Lights' },
  { value: 'Security Guards', label: 'Security Guards' },
  { value: 'Fire Detection', label: 'Fire Detection' }
];

const ApartmentLivingRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const ApartmentBathrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const ApartmentRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const ApartmentBedrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];

function Apartments({ onDataChange, initialState, isOpen }) {

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

  return (
    <SoftBox mt={3}>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Facilities"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="facilities"
          options={ApartmentFacilities}
          value={initiallistingsData.facilities}
          onChange={(options) => handleSelectChange("facilities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Service"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="service"
          options={ApartmentService}
          value={initiallistingsData.service}
          onChange={(options) => handleSelectChange("service", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Kitchen"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="kitchen"
          options={ApartmentKitchen}
          value={initiallistingsData.kitchen}
          onChange={(options) => handleSelectChange("kitchen", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: "40px" }} />}
        title="Security System"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="securitySystem"
          options={ApartmentSecuritySystem}
          value={initiallistingsData.securitySystem}
          onChange={(options) => handleSelectChange("securitySystem", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Living Rooms"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="livingRooms"
          options={ApartmentLivingRooms}
          value={initiallistingsData.livingRooms}
          onChange={(option) => handleSelectChange("livingRooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Bathrooms"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="bathrooms"
          options={ApartmentBathrooms}
          value={initiallistingsData.bathrooms}
          onChange={(option) => handleSelectChange("bathrooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Rooms"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="rooms"
          options={ApartmentRooms}
          value={initiallistingsData.rooms}
          onChange={(option) => handleSelectChange("rooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Bedrooms"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="bedrooms"
          options={ApartmentBedrooms}
          value={initiallistingsData.bedrooms}
          onChange={(option) => handleSelectChange("bedrooms", option.value)}
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

Apartments.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Apartments.defaultProps = {
  initialState: {


    facilities: [],
    service: [],
    kitchen: [],
    securitySystem: [],
    livingRooms: '',
    bathrooms: '',
    rooms: '',
    bedrooms: '',
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Apartments;
