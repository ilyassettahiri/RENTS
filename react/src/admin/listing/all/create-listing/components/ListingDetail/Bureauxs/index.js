import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import CollapseList from "admin/components/CollapseList";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import OneSelect from "admin/components/OneSelect";
import MultSelect from "admin/components/MultSelect";

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/bureauxs/amenities.svg`;
const icon2 = `${imagePath}/categoryicons/bureauxs/bail_type.svg`;
const icon3 = `${imagePath}/categoryicons/bureauxs/bathrooms.svg`;
const icon4 = `${imagePath}/categoryicons/bureauxs/building_size.svg`;
const icon5 = `${imagePath}/categoryicons/bureauxs/capacity.svg`;
const icon6 = `${imagePath}/categoryicons/bureauxs/conference_room.svg`;
const icon7 = `${imagePath}/categoryicons/bureauxs/facilities.svg`;
const icon8 = `${imagePath}/categoryicons/bureauxs/floor.svg`;
const icon9 = `${imagePath}/categoryicons/bureauxs/lighting.svg`;
const icon10 = `${imagePath}/categoryicons/bureauxs/office_taxes.svg`;
const icon11 = `${imagePath}/categoryicons/bureauxs/private_offices.svg`;
const icon12 = `${imagePath}/categoryicons/bureauxs/property_type.svg`;
const icon13 = `${imagePath}/categoryicons/bureauxs/security.svg`;
const icon14 = `${imagePath}/categoryicons/bureauxs/security_deposit.svg`;
const icon15 = `${imagePath}/categoryicons/bureauxs/services.svg`;
const icon16 = `${imagePath}/categoryicons/bureauxs/soil_type.svg`;
const icon17 = `${imagePath}/categoryicons/bureauxs/surface.svg`;
const icon18 = `${imagePath}/categoryicons/bureauxs/year_built.svg`;
const icon19 = `${imagePath}/categoryicons/bureauxs/year_renovated.svg`;
const icon20 = `${imagePath}/categoryicons/bureauxs/year_renovated.svg`;
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
  icon14,
  icon15,
  icon16,
  icon17,
  icon18,
  icon19,
  icon20,
  icon30
};


const MoreDetails = [
  { value: 'GPS', label: 'GPS' },
  { value: 'Speed Regulator', label: 'Speed Regulator' },
  { value: 'Rearview Camera', label: 'Rearview Camera' },
  { value: 'Board Computer', label: 'Board Computer' }
];


const BureauxPropertyType = [
  { value: 'Office', label: 'Office' },
  { value: 'Workspace', label: 'Workspace' }
];
const BureauxSecurity = [
  { value: 'Alarm Systems', label: 'Alarm Systems' },
  { value: 'Surveillance Cameras (CCTV)', label: 'Surveillance Cameras (CCTV)' },
  { value: 'Access Control Systems', label: 'Access Control Systems' },
  { value: 'Security Guards', label: 'Security Guards' },
  { value: 'Fire Detection', label: 'Fire Detection' }
];
const BureauxSoilType = [
  { value: 'carpet', label: 'Carpet' },
  { value: 'hardwood', label: 'Hardwood' },
  { value: 'laminate', label: 'Laminate' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'tile', label: 'Tile' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'linoleum', label: 'Linoleum' },
  { value: 'rubber', label: 'Rubber' }
];
const BureauxParking = [
  { value: 'Free', label: 'Free' },
  { value: 'Paid', label: 'Paid' }
];
const BureauxBathrooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const BureauxConferenceRoom = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const BureauxBuildingSize = [
  { value: 'small', label: 'Small (under 100 sq meters)' },
  { value: 'medium', label: 'Medium (100 - 500 sq meters)' },
  { value: 'large', label: 'Large (500 - 1,000 sq meters)' },
  { value: 'extra large', label: 'Extra Large (over 1,000 sq meters)' }
];
const BureauxLighting = [
  { value: 'Natural Light', label: 'Natural Light' },
  { value: 'LED Lighting', label: 'LED Lighting' },
  { value: 'Fluorescent Lighting', label: 'Fluorescent Lighting' }
];
const BureauxCapacity = [
  { value: 'small capacity', label: 'Small Capacity (Up to 10 occupants)' },
  { value: 'medium capacity', label: 'Medium Capacity (10 - 50 occupants)' },
  { value: 'large capacity', label: 'Large Capacity (50 - 100 occupants)' },
  { value: 'extra large capacity', label: 'Extra Large Capacity (Over 100 occupants)' }
];
const BureauxBailType = [
  { value: 'Short-Term Lease', label: 'Short-Term Lease' },
  { value: 'Long-Term Lease', label: 'Long-Term Lease' }
];
const BureauxSecurityDeposit = [
  { value: 'Standard Security Deposit', label: 'Standard Security Deposit' },
  { value: 'Negotiable Security Deposit', label: 'Negotiable Security Deposit' },
  { value: 'No Security Deposit', label: 'No Security Deposit' }
];
const BureauxOfficeTaxes = [
  { value: 'Occupancy Taxes', label: 'Occupancy Taxes' },
  { value: 'Value Added Tax (VAT)', label: 'Value Added Tax (VAT)' }
];
const BureauxFacilities = [
  { value: 'terrace', label: 'Terrace' },
  { value: 'smoking_room', label: 'Smoking room' },
  { value: 'metro_subway', label: 'Metro/subway' },
  { value: 'bus_line', label: 'Bus line' },
  { value: 'air_conditioning', label: 'Air conditioning' },
  { value: 'heating_system', label: 'Heating system' },
  { value: 'reception', label: 'Reception' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'shared_office_space', label: 'Shared office space' },
  { value: 'private_workspace', label: 'Private workspace' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'elevator', label: 'Elevator' },
  { value: 'plan', label: 'Plan' }
];
const BureauxAmenities = [
  { value: 'Virtual office packages', label: 'Virtual office packages' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Telephone', label: 'Telephone' },
  { value: 'Wiring', label: 'Wiring' }
];
const BureauxServices = [
  { value: 'Doorkeeper', label: 'Doorkeeper' },
  { value: 'Administrative support', label: 'Administrative support' }
];

function Bureauxs({ onDataChange, initialState, isOpen }) {

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
  const [collapse13, setCollapse13] = useState(isOpen);
  const [collapse14, setCollapse14] = useState(isOpen);
  const [collapse15, setCollapse15] = useState(isOpen);
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
        image={<img src={icon12} style={{ width: "40px" }} />}
        title="Property Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="propertyType"
          options={BureauxPropertyType}
          value={initiallistingsData.propertyType}
          onChange={(option) => handleSelectChange("propertyType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: "40px" }} />}
        title="Security"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <MultSelect
          name="security"
          options={BureauxSecurity}
          value={initiallistingsData.security}
          onChange={(options) => handleSelectChange("security", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon16} style={{ width: "40px" }} />}
        title="Soil Type"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="soilType"
          options={BureauxSoilType}
          value={initiallistingsData.soilType}
          onChange={(options) => handleSelectChange("soilType", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon20} style={{ width: "40px" }} />}
        title="Parking"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="parking"
          options={BureauxParking}
          value={initiallistingsData.parking}
          onChange={(option) => handleSelectChange("parking", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: "40px" }} />}
        title="Bathrooms"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="bathrooms"
          options={BureauxBathrooms}
          value={initiallistingsData.bathrooms}
          onChange={(option) => handleSelectChange("bathrooms", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: "40px" }} />}
        title="Conference Room"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="conferenceRoom"
          options={BureauxConferenceRoom}
          value={initiallistingsData.conferenceRoom}
          onChange={(option) => handleSelectChange("conferenceRoom", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: "40px" }} />}
        title="Building Size"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="buildingSize"
          options={BureauxBuildingSize}
          value={initiallistingsData.buildingSize}
          onChange={(option) => handleSelectChange("buildingSize", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: "40px" }} />}
        title="Lighting"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="lighting"
          options={BureauxLighting}
          value={initiallistingsData.lighting}
          onChange={(option) => handleSelectChange("lighting", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: "40px" }} />}
        title="Capacity"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="capacity"
          options={BureauxCapacity}
          value={initiallistingsData.capacity}
          onChange={(option) => handleSelectChange("capacity", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: "40px" }} />}
        title="Bail Type"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="bailType"
          options={BureauxBailType}
          value={initiallistingsData.bailType}
          onChange={(option) => handleSelectChange("bailType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: "40px" }} />}
        title="Security Deposit"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="securityDeposit"
          options={BureauxSecurityDeposit}
          value={initiallistingsData.securityDeposit}
          onChange={(option) => handleSelectChange("securityDeposit", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: "40px" }} />}
        title="Office Taxes"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="officeTaxes"
          options={BureauxOfficeTaxes}
          value={initiallistingsData.officeTaxes}
          onChange={(option) => handleSelectChange("officeTaxes", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: "40px" }} />}
        title="Facilities"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <MultSelect
          name="facilities"
          options={BureauxFacilities}
          value={initiallistingsData.facilities}
          onChange={(options) => handleSelectChange("facilities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: "40px" }} />}
        title="Amenities"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <MultSelect
          name="amenities"
          options={BureauxAmenities}
          value={initiallistingsData.amenities}
          onChange={(options) => handleSelectChange("amenities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: "40px" }} />}
        title="Services"
        open={collapse15}
        onClick={() => setCollapse15(!collapse15)}
      >
        <MultSelect
          name="services"
          options={BureauxServices}
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

Bureauxs.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Bureauxs.defaultProps = {
  initialState: {


    propertyType: '',
    security: [],
    soilType: [],
    parking: '',
    bathrooms: '',
    conferenceRoom: '',
    buildingSize: '',
    lighting: '',
    capacity: '',
    bailType: '',
    securityDeposit: '',
    officeTaxes: '',
    facilities: [],
    amenities: [],
    services: [],
    moreDetails: [],

    
  },
  isOpen: false,
};

export default Bureauxs;
