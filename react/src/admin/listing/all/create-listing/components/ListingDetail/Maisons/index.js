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
import { Incrementer } from 'admin/components/Quantity/Incrementer';
import FormField from "admin/components/FormFieldCollap";

import MultSelect from "admin/components/MultSelect";
 


const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/maisons/amenities.svg`;
const icon2 = `${imagePath}/categoryicons/maisons/bathrooms.svg`;
const icon3 = `${imagePath}/categoryicons/maisons/bedrooms.svg`;
const icon4 = `${imagePath}/categoryicons/maisons/facilities.svg`;
const icon5 = `${imagePath}/categoryicons/maisons/floors.svg`;
const icon6 = `${imagePath}/categoryicons/maisons/houses.svg`;
const icon7 = `${imagePath}/categoryicons/maisons/living_room.svg`;
const icon8 = `${imagePath}/categoryicons/maisons/rooms.svg`;
const icon9 = `${imagePath}/categoryicons/maisons/security_system.svg`;
const icon10 = `${imagePath}/categoryicons/maisons/surface.svg`;
const icon11 = `${imagePath}/categoryicons/maisons/year_of_construction.svg`;
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
  { value: 'Pet-Friendly Options', label: 'Pet-Friendly Options' },
  { value: 'Furnished or Unfurnished', label: 'Furnished or Unfurnished' },
  { value: 'Utilities Included', label: 'Utilities Included' },
  { value: 'Private Outdoor Space', label: 'Private Outdoor Space' },
  { value: 'Parking Availability', label: 'Parking Availability' },
  { value: 'Lease Duration Options', label: 'Lease Duration Options' },
  { value: 'Homeowner Association Rules', label: 'Homeowner Association Rules' },
  { value: 'Neighborhood Amenities', label: 'Neighborhood Amenities' },
  { value: 'Proximity to Public Transport', label: 'Proximity to Public Transport' },
  { value: 'Local Schools and Hospitals', label: 'Local Schools and Hospitals' },
  { value: 'Landlord Contact Information', label: 'Landlord Contact Information' },
  { value: 'Emergency Maintenance Services', label: 'Emergency Maintenance Services' },
  { value: 'Background Check Requirements', label: 'Background Check Requirements' },
  { value: 'Security Deposit Amount', label: 'Security Deposit Amount' }
];



const HousesSecuritySystem = [
  { value: 'Alarm Systems', label: 'Alarm Systems' },
  { value: 'Surveillance Cameras (CCTV)', label: 'Surveillance Cameras (CCTV)' },
  { value: 'Access Control Systems', label: 'Access Control Systems' },
  { value: 'Motion Sensor Lights', label: 'Motion Sensor Lights' },
  { value: 'Security Guards', label: 'Security Guards' },
  { value: 'Fire Detection', label: 'Fire Detection' },
  { value: 'Smart Home Security Systems', label: 'Smart Home Security Systems' }
];
const HousesRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const HousesLivingRooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const HousesBedrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const HousesBathrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const HousesFloors = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3+', label: '3+' }
];
const HousesAmenities = [
  { value: 'Air Conditioning', label: 'Air Conditioning' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'TV', label: 'TV' },
  { value: 'Heating', label: 'Heating' },
  { value: 'Dishwasher', label: 'Dishwasher' },
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Microwave', label: 'Microwave' },
  { value: 'Washing Machine', label: 'Washing Machine' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Ground Floor', label: 'Ground Floor' }
];
const HousesFacilities = [
  { value: 'Equipped Kitchen', label: 'Equipped Kitchen' },
  { value: 'Balcony', label: 'Balcony' },
  { value: 'Pool', label: 'Pool' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Terrace', label: 'Terrace' },
  { value: 'Hammam', label: 'Hammam' },
  { value: 'Garage', label: 'Garage' }
];

function Maisons({ onDataChange, initialState, isOpen }) {

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
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Security System"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <MultSelect
          name="securitySystem"
          options={HousesSecuritySystem}
          value={initiallistingsData.securitySystem}
          onChange={(options) => handleSelectChange("securitySystem", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Rooms"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="rooms"
          options={HousesRooms}
          value={initiallistingsData.rooms}
          onChange={(option) => handleSelectChange("rooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Living Rooms"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="livingRooms"
          options={HousesLivingRooms}
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
          options={HousesBedrooms}
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
          options={HousesBathrooms}
          value={initiallistingsData.bathrooms}
          onChange={(option) => handleSelectChange("bathrooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Floors"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="floors"
          options={HousesFloors}
          value={initiallistingsData.floors}
          onChange={(option) => handleSelectChange("floors", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Amenities"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <MultSelect
          name="amenities"
          options={HousesAmenities}
          value={initiallistingsData.amenities}
          onChange={(options) => handleSelectChange("amenities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Facilities"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="facilities"
          options={HousesFacilities}
          value={initiallistingsData.facilities}
          onChange={(options) => handleSelectChange("facilities", options)}
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

Maisons.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Maisons.defaultProps = {
  initialState: {


    securitySystem: [],
    rooms: '',
    livingRooms: '',
    bedrooms: '',
    bathrooms: '',
    floors: '',
    amenities: [],
    facilities: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Maisons;
