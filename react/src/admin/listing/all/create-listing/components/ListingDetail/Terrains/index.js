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

import MultSelect from "admin/components/MultSelect";
 

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL || '';

// Define the dynamic paths for each image
const icon1 = `${imagePath}/categoryicons/terrains/property_type.svg`;
const icon2 = `${imagePath}/categoryicons/terrains/property_subtype.svg`;
const icon3 = `${imagePath}/categoryicons/terrains/total_lot_size.svg`;
const icon4 = `${imagePath}/categoryicons/terrains/land_valuation.svg`;
const icon5 = `${imagePath}/categoryicons/terrains/total_rating.svg`;
const icon6 = `${imagePath}/categoryicons/terrains/road_access.svg`;
const icon7 = `${imagePath}/categoryicons/terrains/slope_description.svg`;
const icon8 = `${imagePath}/categoryicons/terrains/property_usage.svg`;
const icon9 = `${imagePath}/categoryicons/terrains/annual_taxes.svg`;
const icon10 = `${imagePath}/categoryicons/terrains/deeded_acres.svg`;
const icon11 = `${imagePath}/categoryicons/terrains/leased_acres.svg`;
const icon12 = `${imagePath}/categoryicons/terrains/elevation.svg`;
const icon13 = `${imagePath}/categoryicons/terrains/vegetation.svg`;
const icon14 = `${imagePath}/categoryicons/terrains/nearby_usage.svg`;
const icon15 = `${imagePath}/categoryicons/terrains/topography.svg`;
const icon16 = `${imagePath}/categoryicons/terrains/zoning.svg`;
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
  icon30
};



const MoreDetails = [
  { value: 'Fenced', label: 'Fenced' },
  { value: 'Cleared', label: 'Cleared' },
  { value: 'Partially cleared', label: 'Partially Cleared' },
  { value: 'Access to water', label: 'Access to Water' },
  { value: 'Near public roads', label: 'Near Public Roads' },
  { value: 'Near power lines', label: 'Near Power Lines' },
  { value: 'Soil quality tested', label: 'Soil Quality Tested' },
  { value: 'Surveyed', label: 'Surveyed' },
  { value: 'Available for farming', label: 'Available for Farming' },
  { value: 'Nearby attractions', label: 'Nearby Attractions' },
  { value: 'Compatible with building', label: 'Compatible with Building' },
  { value: 'Access to utilities', label: 'Access to Utilities' },
  { value: 'Zoning for multiple uses', label: 'Zoning for Multiple Uses' },
  { value: 'Potential for leasing', label: 'Potential for Leasing' },
  { value: 'Good drainage', label: 'Good Drainage' },
  { value: 'Access to public transport', label: 'Access to Public Transport' }
];



const TerrainsPropertyType = [
  { value: 'land', label: 'land' },
  { value: 'farms', label: 'farms' }
];
const TerrainsPropertySubtype = [
  { value: 'agricultural land', label: 'Agricultural Land' },
  { value: 'ranch farm', label: 'Ranch/Farm' },
  { value: 'orchard', label: 'Orchard' },
  { value: 'pasture', label: 'Pasture' },
  { value: 'timberland', label: 'Timberland' },
  { value: 'hunting land', label: 'Hunting Land' },
  { value: 'waterfront land', label: 'Waterfront Land' }
];
const TerrainsTotalLotSize = [
  { value: 'Small (Under 1 hectare or 10,000 square meters)', label: 'Small (Under 1 hectare or 10,000 square meters)' },
  { value: 'Medium (1 - 10 hectares or 10,000 - 100,000 square meters)', label: 'Medium (1 - 10 hectares or 10,000 - 100,000 square meters)' },
  { value: 'Large (10 - 100 hectares or 100,000 - 1,000,000 square meters)', label: 'Large (10 - 100 hectares or 100,000 - 1,000,000 square meters)' },
  { value: 'Extra Large (Over 100 hectares or 1,000,000 square meters)', label: 'Extra Large (Over 100 hectares or 1,000,000 square meters)' }
];
const TerrainsLandValuation = [
  { value: 'Low Valuation', label: 'Low Valuation' },
  { value: 'High Valuation', label: 'High Valuation' }
];
const TerrainsTotalRating = [
  { value: 'Low Rating', label: 'Low Rating' },
  { value: 'Average Rating', label: 'Average Rating' },
  { value: 'High Rating', label: 'High Rating' }
];
const TerrainsRoadAccess = [
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' }
];
const TerrainsSlopeDescription = [
  { value: 'flat', label: 'Flat' },
  { value: 'gentle slope', label: 'Gentle Slope' },
  { value: 'moderate slope', label: 'Moderate Slope' },
  { value: 'steep slope', label: 'Steep Slope' },
  { value: 'varied terrain', label: 'Varied Terrain' }
];
const TerrainsZoning = [
  { value: 'residential zoning', label: 'Residential Zoning' },
  { value: 'agricultural zoning', label: 'Agricultural Zoning' },
  { value: 'commercial zoning', label: 'Commercial Zoning' },
  { value: 'industrial zoning', label: 'Industrial Zoning' },
  { value: 'rural zoning', label: 'Rural Zoning' }
];
const TerrainsPropertyUsage = [
  { value: 'residential', label: 'Residential' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'recreational', label: 'Recreational' },
  { value: 'mixed use', label: 'Mixed-Use' },
  { value: 'conservation', label: 'Conservation' },
  { value: 'special use', label: 'Special Use' }
];
const TerrainsAnnualTaxes = [
  { value: 'low taxes', label: 'Low Taxes' },
  { value: 'average taxes', label: 'Average Taxes' },
  { value: 'high taxes', label: 'High Taxes' }
];
const TerrainsDeededAcres = [
  { value: 'Small (Under 10 acres)', label: 'Small (Under 10 acres)' },
  { value: 'Medium (10 - 50 acres)', label: 'Medium (10 - 50 acres)' },
  { value: 'Large (50 - 100 acres)', label: 'Large (50 - 100 acres)' },
  { value: 'Extra Large (Over 100 acres)', label: 'Extra Large (Over 100 acres)' }
];
const TerrainsLeasedAcres = [
  { value: 'Small (Under 10 acres)', label: 'Small (Under 10 acres)' },
  { value: 'Medium (10 - 50 acres)', label: 'Medium (10 - 50 acres)' },
  { value: 'Large (50 - 100 acres)', label: 'Large (50 - 100 acres)' },
  { value: 'Extra Large (Over 100 acres)', label: 'Extra Large (Over 100 acres)' }
];
const TerrainsElevation = [
  { value: 'low elevation', label: 'Low Elevation' },
  { value: 'moderate elevation', label: 'Moderate Elevation' },
  { value: 'high elevation', label: 'High Elevation' }
];
const TerrainsVegetation = [
  { value: 'grassland', label: 'Grassland' },
  { value: 'forest', label: 'Forest' },
  { value: 'cropland', label: 'Cropland' },
  { value: 'wetland', label: 'Wetland' },
  { value: 'marsh', label: 'Marsh' },
  { value: 'woodland', label: 'Woodland' },
  { value: 'orchard', label: 'Orchard' },
  { value: 'meadow', label: 'Meadow' },
  { value: 'desert scrub', label: 'Desert Scrub' }
];
const TerrainsNearbyUsage = [
  { value: 'residential properties', label: 'Residential Properties' },
  { value: 'commercial properties', label: 'Commercial Properties' },
  { value: 'industrial properties', label: 'Industrial Properties' },
  { value: 'agricultural properties', label: 'Agricultural Properties' },
  { value: 'recreational properties', label: 'Recreational Properties' },
  { value: 'mixed use properties', label: 'Mixed-Use Properties' },
  { value: 'vacant land', label: 'Vacant Land' },
  { value: 'conservation areas', label: 'Conservation Areas' },
  { value: 'transportation infrastructure', label: 'Transportation Infrastructure' },
  { value: 'utility infrastructure', label: 'Utility Infrastructure' }
];
const TerrainsTopography = [
  { value: 'flat terrain', label: 'Flat Terrain' },
  { value: 'rolling hills', label: 'Rolling Hills' },
  { value: 'steep terrain', label: 'Steep Terrain' },
  { value: 'mountainous terrain', label: 'Mountainous Terrain' },
  { value: 'waterfront', label: 'Waterfront' },
  { value: 'valley', label: 'Valley' },
  { value: 'plateau', label: 'Plateau' },
  { value: 'desert', label: 'Desert' },
  { value: 'forested', label: 'Forested' },
  { value: 'agricultural', label: 'Agricultural' }
];

function Terrains({ onDataChange, initialState, isOpen }) {

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
  const [collapse16, setCollapse16] = useState(isOpen);
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
          options={TerrainsPropertyType}
          value={initiallistingsData.propertyType}
          onChange={(option) => handleSelectChange("propertyType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Property Subtype"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="propertySubtype"
          options={TerrainsPropertySubtype}
          value={initiallistingsData.propertySubtype}
          onChange={(option) => handleSelectChange("propertySubtype", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Total Lot Size"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <OneSelect
          name="totalLotSize"
          options={TerrainsTotalLotSize}
          value={initiallistingsData.totalLotSize}
          onChange={(option) => handleSelectChange("totalLotSize", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon4} style={{ width: '40px' }} />}
        title="Land Valuation"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <OneSelect
          name="landValuation"
          options={TerrainsLandValuation}
          value={initiallistingsData.landValuation}
          onChange={(option) => handleSelectChange("landValuation", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Total Rating"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <OneSelect
          name="totalRating"
          options={TerrainsTotalRating}
          value={initiallistingsData.totalRating}
          onChange={(option) => handleSelectChange("totalRating", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Road Access"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <OneSelect
          name="roadAccess"
          options={TerrainsRoadAccess}
          value={initiallistingsData.roadAccess}
          onChange={(option) => handleSelectChange("roadAccess", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Slope Description"
        open={collapse7}
        onClick={() => setCollapse7(!collapse7)}
      >
        <OneSelect
          name="slopeDescription"
          options={TerrainsSlopeDescription}
          value={initiallistingsData.slopeDescription}
          onChange={(option) => handleSelectChange("slopeDescription", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon8} style={{ width: '40px' }} />}
        title="Property Usage"
        open={collapse8}
        onClick={() => setCollapse8(!collapse8)}
      >
        <OneSelect
          name="propertyUsage"
          options={TerrainsPropertyUsage}
          value={initiallistingsData.propertyUsage}
          onChange={(option) => handleSelectChange("propertyUsage", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon9} style={{ width: '40px' }} />}
        title="Annual Taxes"
        open={collapse9}
        onClick={() => setCollapse9(!collapse9)}
      >
        <OneSelect
          name="annualTaxes"
          options={TerrainsAnnualTaxes}
          value={initiallistingsData.annualTaxes}
          onChange={(option) => handleSelectChange("annualTaxes", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon10} style={{ width: '40px' }} />}
        title="Deeded Acres"
        open={collapse10}
        onClick={() => setCollapse10(!collapse10)}
      >
        <OneSelect
          name="deededAcres"
          options={TerrainsDeededAcres}
          value={initiallistingsData.deededAcres}
          onChange={(option) => handleSelectChange("deededAcres", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon11} style={{ width: '40px' }} />}
        title="Leased Acres"
        open={collapse11}
        onClick={() => setCollapse11(!collapse11)}
      >
        <OneSelect
          name="leasedAcres"
          options={TerrainsLeasedAcres}
          value={initiallistingsData.leasedAcres}
          onChange={(option) => handleSelectChange("leasedAcres", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon12} style={{ width: '40px' }} />}
        title="Elevation"
        open={collapse12}
        onClick={() => setCollapse12(!collapse12)}
      >
        <OneSelect
          name="elevation"
          options={TerrainsElevation}
          value={initiallistingsData.elevation}
          onChange={(option) => handleSelectChange("elevation", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon13} style={{ width: '40px' }} />}
        title="Vegetation"
        open={collapse13}
        onClick={() => setCollapse13(!collapse13)}
      >
        <OneSelect
          name="vegetation"
          options={TerrainsVegetation}
          value={initiallistingsData.vegetation}
          onChange={(option) => handleSelectChange("vegetation", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon14} style={{ width: '40px' }} />}
        title="Nearby Usage"
        open={collapse14}
        onClick={() => setCollapse14(!collapse14)}
      >
        <MultSelect
          name="nearbyUsage"
          options={TerrainsNearbyUsage}
          value={initiallistingsData.nearbyUsage}
          onChange={(options) => handleSelectChange("nearbyUsage", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon15} style={{ width: '40px' }} />}
        title="Topography"
        open={collapse15}
        onClick={() => setCollapse15(!collapse15)}
      >
        <MultSelect
          name="topography"
          options={TerrainsTopography}
          value={initiallistingsData.topography}
          onChange={(options) => handleSelectChange("topography", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon16} style={{ width: '40px' }} />}
        title="Zoning"
        open={collapse16}
        onClick={() => setCollapse16(!collapse16)}
      >
        <OneSelect
          name="zoning"
          options={TerrainsZoning}
          value={initiallistingsData.zoning}
          onChange={(option) => handleSelectChange("zoning", option.value)}
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


Terrains.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Terrains.defaultProps = {
  initialState: {


    propertyType: '',
    propertySubtype: '',
    totalLotSize: '',
    landValuation: '',
    totalRating: '',
    roadAccess: '',
    slopeDescription: '',
    propertyUsage: '',
    annualTaxes: '',
    deededAcres: '',
    leasedAcres: '',
    elevation: '',
    vegetation: '',
    nearbyUsage: [],
    topography: [],
    zoning: '',
    moreDetails: [],

    
  },
  isOpen: false,
};



export default Terrains;
