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
const icon1 = `${imagePath}/categoryicons/magasins/property_type.svg`;
const icon2 = `${imagePath}/categoryicons/magasins/surface.svg`;
const icon3 = `${imagePath}/categoryicons/magasins/capacity.svg`;
const icon4 = `${imagePath}/categoryicons/magasins/office_number.svg`;
const icon5 = `${imagePath}/categoryicons/magasins/individual_offices.svg`;
const icon6 = `${imagePath}/categoryicons/magasins/number_of_floors.svg`;
const icon7 = `${imagePath}/categoryicons/magasins/garage.svg`;
const icon8 = `${imagePath}/categoryicons/magasins/approved_uses.svg`;
const icon9 = `${imagePath}/categoryicons/magasins/total_facility_size.svg`;
const icon10 = `${imagePath}/categoryicons/magasins/operating_days.svg`;
const icon11 = `${imagePath}/categoryicons/magasins/lighting.svg`;
const icon12 = `${imagePath}/categoryicons/magasins/facilities.svg`;
const icon13 = `${imagePath}/categoryicons/magasins/amenities.svg`;
const icon14 = `${imagePath}/categoryicons/magasins/transports.svg`;
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
  icon30
};


const MoreDetails = [
  { value: 'Flexible Lease Terms', label: 'Flexible Lease Terms' },
  { value: 'Renovation Opportunities', label: 'Renovation Opportunities' },
  { value: 'Short-Term Rentals Available', label: 'Short-Term Rentals Available' },
  { value: 'Shared Spaces', label: 'Shared Spaces' },
  { value: 'Security Deposit Requirements', label: 'Security Deposit Requirements' },
  { value: 'Utilities Included', label: 'Utilities Included' },
  { value: 'Accessibility Features', label: 'Accessibility Features' },
  { value: 'Maintenance Services Included', label: 'Maintenance Services Included' },
  { value: 'Parking Availability', label: 'Parking Availability' },
  { value: 'Zoning Compliance', label: 'Zoning Compliance' },
  { value: 'Insurance Requirements', label: 'Insurance Requirements' },
  { value: 'Signage Opportunities', label: 'Signage Opportunities' },
  { value: 'Common Area Maintenance', label: 'Common Area Maintenance' }
];


const MagasinsPropertyType = [
  { value: 'Shops', label: 'Shops' },
  { value: 'Commercial Spaces', label: 'Commercial Spaces' },
  { value: 'Industrial Premises', label: 'Industrial Premises' }
];
const MagasinsSurfaceArea = [
  { value: 'Small (Under 100 sq meters)', label: 'Small (Under 100 sq meters)' },
  { value: 'Medium (100 - 500 sq meters)', label: 'Medium (100 - 500 sq meters)' },
  { value: 'Large (500 - 1,000 sq meters)', label: 'Large (500 - 1,000 sq meters)' },
  { value: 'Extra Large (Over 1,000 sq meters)', label: 'Extra Large (Over 1,000 sq meters)' }
];
const MagasinsCapacity = [
  { value: 'Small Capacity (Up to 10 occupants)', label: 'Small Capacity (Up to 10 occupants)' },
  { value: 'Medium Capacity (10 - 50 occupants)', label: 'Medium Capacity (10 - 50 occupants)' },
  { value: 'Large Capacity (50 - 100 occupants)', label: 'Large Capacity (50 - 100 occupants)' },
  { value: 'Extra Large Capacity (Over 100 occupants)', label: 'Extra Large Capacity (Over 100 occupants)' }
];
const MagasinsOfficesNumber = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const MagasinsIndividualOffices = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];
const MagasinsNumberOfFloors = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' }
];
const MagasinsGarage = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3+', label: '3+' }
];
const MagasinsApprovedUses = [
  { value: 'Retail Sales', label: 'Retail Sales' },
  { value: 'Office Space', label: 'Office Space' },
  { value: 'Restaurant or Food Service', label: 'Restaurant or Food Service' },
  { value: 'Manufacturing or Production', label: 'Manufacturing or Production' },
  { value: 'Warehouse or Distribution', label: 'Warehouse or Distribution' },
  { value: 'Medical or Healthcare', label: 'Medical or Healthcare' },
  { value: 'Education or Training', label: 'Education or Training' },
  { value: 'Recreation or Entertainment', label: 'Recreation or Entertainment' },
  { value: 'Mixed Use', label: 'Mixed Use' }
];
const MagasinsTotalFacilitySize = [
  { value: 'Small (Under 1,000 sq meters)', label: 'Small (Under 1,000 sq meters)' },
  { value: 'Medium (1,000 - 5,000 sq meters)', label: 'Medium (1,000 - 5,000 sq meters)' },
  { value: 'Large (5,000 - 10,000 sq meters)', label: 'Large (5,000 - 10,000 sq meters)' },
  { value: 'Extra Large (Over 10,000 sq meters)', label: 'Extra Large (Over 10,000 sq meters)' }
];
const MagasinsOperatingDays = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
];
const MagasinsLighting = [
  { value: 'Natural Light', label: 'Natural Light' },
  { value: 'LED Lighting', label: 'LED Lighting' },
  { value: 'Fluorescent Lighting', label: 'Fluorescent Lighting' }
];
const MagasinsTransports = [
  { value: 'Public Transportation Access', label: 'Public Transportation Access' },
  { value: 'Accessibility for Trucks or Delivery Vehicles', label: 'Accessibility for Trucks or Delivery Vehicles' },
  { value: 'Pedestrian Access', label: 'Pedestrian Access' },
  { value: 'Nearby Highways or Major Roads', label: 'Nearby Highways or Major Roads' },
  { value: 'Shuttle or Transportation Services', label: 'Shuttle or Transportation Services' }
];
const MagasinsFacilities = [
  { value: 'Dock-high doors', label: 'Dock-high doors' },
  { value: 'Storage space', label: 'Storage space' },
  { value: 'Sales area', label: 'Sales area' },
  { value: 'Ground level doors', label: 'Ground level doors' },
  { value: 'Elevator', label: 'Elevator' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Heating', label: 'Heating' },
  { value: 'Air conditioning', label: 'Air conditioning' },
  { value: 'Office space', label: 'Office space' },
  { value: 'Security camera', label: 'Security camera' },
  { value: 'Overnight parking', label: 'Overnight parking' },
  { value: 'Open space', label: 'Open space' },
  { value: 'Racked space', label: 'Racked space' }
];
const MagasinsAmenities = [
  { value: 'Internet', label: 'Internet' },
  { value: 'Water & drains', label: 'Water & drains' },
  { value: 'Reception', label: 'Reception' },
  { value: 'Telephone wiring', label: 'Telephone wiring' }
];

function Magasins({ onDataChange, initialState, isOpen }) {

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
        title="Property Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="propertyType"
          options={MagasinsPropertyType}
          value={initiallistingsData.propertyType}
          onChange={(option) => handleSelectChange("propertyType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Surface Area"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        

          <FormField
            
            type="text"
            name="surfaceArea"
            placeholder="Enter Surface Area"
            value={initiallistingsData.surfaceArea}
            onChange={(e) => handleSelectChange("surfaceArea", e.target.value)}
          />




      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Capacity"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        

          <FormField
            
            type="text"
            name="capacity"
            placeholder="Enter capacity"
            value={initiallistingsData.capacity}
            onChange={(e) => handleSelectChange("capacity", e.target.value)}
          />



      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Office Number"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="officeNumber"
          options={MagasinsOfficesNumber}
          value={initiallistingsData.officeNumber}
          onChange={(option) => handleSelectChange("officeNumber", option.value)}
        />






      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Individual Offices"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="individualOffices"
          options={MagasinsIndividualOffices}
          value={initiallistingsData.individualOffices}
          onChange={(option) => handleSelectChange("individualOffices", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Number of Floors"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="numberOfFloors"
          options={MagasinsNumberOfFloors}
          value={initiallistingsData.numberOfFloors}
          onChange={(option) => handleSelectChange("numberOfFloors", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Garage"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="garage"
          options={MagasinsGarage}
          value={initiallistingsData.garage}
          onChange={(option) => handleSelectChange("garage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Approved Uses"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <MultSelect
          name="approvedUses"
          options={MagasinsApprovedUses}
          value={initiallistingsData.approvedUses}
          onChange={(options) => handleSelectChange("approvedUses", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Total Facility Size"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <MultSelect
          name="totalFacilitySize"
          options={MagasinsTotalFacilitySize}
          value={initiallistingsData.totalFacilitySize}
          onChange={(options) => handleSelectChange("totalFacilitySize", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Operating Days"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <MultSelect
          name="operatingDays"
          options={MagasinsOperatingDays}
          value={initiallistingsData.operatingDays}
          onChange={(options) => handleSelectChange("operatingDays", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Lighting"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        




          <FormField
            
            type="text"
            name="lighting"
            placeholder="Enter lighting"
            value={initiallistingsData.lighting}
            onChange={(e) => handleSelectChange("lighting", e.target.value)}
          />


      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Transports"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <MultSelect
          name="transports"
          options={MagasinsTransports}
          value={initiallistingsData.transports}
          onChange={(options) => handleSelectChange("transports", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Facilities"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <MultSelect
          name="facilities"
          options={MagasinsFacilities}
          value={initiallistingsData.facilities}
          onChange={(options) => handleSelectChange("facilities", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Amenities"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <MultSelect
          name="amenities"
          options={MagasinsAmenities}
          value={initiallistingsData.amenities}
          onChange={(options) => handleSelectChange("amenities", options)}
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

Magasins.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Magasins.defaultProps = {
  initialState: {

    propertyType: '',
    surfaceArea: '',
    capacity: '',
    officeNumber: '',
    individualOffices: '',
    numberOfFloors: '',
    garage: '',
    approvedUses: [],
    totalFacilitySize: [],
    operatingDays: [],
    lighting: '',
    transports: [],
    facilities: [],
    amenities: [],
    moreDetails: [],


    
  },
  isOpen: false,
};

export default Magasins;
