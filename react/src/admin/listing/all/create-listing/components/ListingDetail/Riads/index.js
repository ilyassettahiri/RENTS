import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/riad/amenities.svg`;
const icon2 = `${imagePath}/categoryicons/riad/bathrooms.svg`;
const icon3 = `${imagePath}/categoryicons/riad/bedrooms.svg`;
const icon4 = `${imagePath}/categoryicons/riad/facilities.svg`;
const icon5 = `${imagePath}/categoryicons/riad/floors.svg`;
const icon6 = `${imagePath}/categoryicons/riad/living_room.svg`;
const icon7 = `${imagePath}/categoryicons/riad/rooms.svg`;
const icon8 = `${imagePath}/categoryicons/riad/security_system.svg`;
const icon9 = `${imagePath}/categoryicons/riad/service.svg`;
const icon10 = `${imagePath}/categoryicons/riad/style_architecture.svg`;
const icon11 = `${imagePath}/categoryicons/riad/surface.svg`;
const icon12 = `${imagePath}/categoryicons/riad/view.svg`;
const icon13 = `${imagePath}/categoryicons/riad/year_of_construction.svg`;
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
  icon13,
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const RiadSecuritySystem = [
  { value: 'Alarm Systems', label: 'Alarm Systems' },
  { value: 'Surveillance Cameras (CCTV)', label: 'Surveillance Cameras (CCTV)' },
  { value: 'Access Control Systems', label: 'Access Control Systems' },
  { value: 'Motion Sensor Lights', label: 'Motion Sensor Lights' },
  { value: 'Security Guards', label: 'Security Guards' },
  { value: 'Fire Detection', label: 'Fire Detection' },
  { value: 'Smart Home Security Systems', label: 'Smart Home Security Systems' }
];
const RiadRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const RiadLivingRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const RiadBedrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const RiadBathrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const RiadView = [
  { value: 'Cityscape', label: 'Cityscape' },
  { value: 'Seaview', label: 'Seaview' },
  { value: 'Mountains', label: 'Countryside' },
  { value: 'Historical Sites', label: 'Historical Sites' },
  { value: 'Garden', label: 'Wildlife' },
  { value: 'Landmarks', label: 'UsedLandmarks' }
];
const RiadFacilities = [
  { value: 'Smoking rooms', label: 'Smoking rooms' },
  { value: 'Equipped kitchen', label: 'Equipped kitchen' },
  { value: 'Balcony', label: 'Balcony' },
  { value: 'Pool', label: 'Pool' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Terrace', label: 'Terrace' },
  { value: 'Barbecue', label: 'Barbecue' },
  { value: 'Entire home', label: 'Entire home' },
  { value: 'Outdoor furniture', label: 'Outdoor furniture' },
  { value: 'Private entrance', label: 'Private entrance' },
  { value: 'Hammam', label: 'Hammam' },
  { value: 'Jacuzzi', label: 'Jacuzzi' },
  { value: 'Gym', label: 'Gym' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Spa', label: 'Spa' },
  { value: 'Airport', label: 'Airport' }
];
const RiadAmenities = [
  { value: 'Air conditioning', label: 'Air conditioning' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'TV', label: 'TV' },
  { value: 'Heating', label: 'Heating' },
  { value: 'Dishwasher', label: 'Dishwasher' },
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Microwave', label: 'Microwave' },
  { value: 'Washing machine', label: 'Washing machine' },
  { value: 'Furniture', label: 'Furniture' }
];
const RiadServices = [
  { value: 'Doorkeeper', label: 'Doorkeeper' },
  { value: 'Housekeeping', label: 'Housekeeping' }
];

function Riads({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Security System"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="securitySystem"
          options={RiadSecuritySystem}
          value={initiallistingsData.securitySystem}
          onChange={(options) => handleSelectChange("securitySystem", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Rooms"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="rooms"
          options={RiadRooms}
          value={initiallistingsData.rooms}
          onChange={(option) => handleSelectChange("rooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Living Rooms"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="livingRooms"
          options={RiadLivingRooms}
          value={initiallistingsData.livingRooms}
          onChange={(option) => handleSelectChange("livingRooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Bedrooms"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="bedrooms"
          options={RiadBedrooms}
          value={initiallistingsData.bedrooms}
          onChange={(option) => handleSelectChange("bedrooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Bathrooms"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="bathrooms"
          options={RiadBathrooms}
          value={initiallistingsData.bathrooms}
          onChange={(option) => handleSelectChange("bathrooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="View"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="view"
          options={RiadView}
          value={initiallistingsData.view}
          onChange={(option) => handleSelectChange("view", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Facilities"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="facilities"
          options={RiadFacilities}
          value={initiallistingsData.facilities}
          onChange={(options) => handleSelectChange("facilities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Amenities"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="amenities"
          options={RiadAmenities}
          value={initiallistingsData.amenities}
          onChange={(options) => handleSelectChange("amenities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Services"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="services"
          options={RiadServices}
          value={initiallistingsData.services}
          onChange={(options) => handleSelectChange("services", options)}
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

Riads.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Riads.defaultProps = {
  initialState: {


    securitySystem: [],
    rooms: '',
    livingRooms: '',
    bedrooms: '',
    bathrooms: '',
    view: '',
    facilities: [],
    amenities: [],
    services: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Riads;
