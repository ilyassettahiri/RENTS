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
const icon1 = `${imagePath}/categoryicons/velos/condition.svg`;
const icon2 = `${imagePath}/categoryicons/velos/fork.svg`;
const icon3 = `${imagePath}/categoryicons/velos/gear.svg`;
const icon4 = `${imagePath}/categoryicons/velos/helmet.svg`;
const icon5 = `${imagePath}/categoryicons/velos/seatpost.svg`;
const icon6 = `${imagePath}/categoryicons/velos/storage.svg`;
const icon7 = `${imagePath}/categoryicons/velos/bike_type.svg`;
const icon30 = `${imagePath}/categoryicons/cars/more_details.svg`;

export {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon30
};


const MoreDetails = [
  { value: 'Helmet Included', label: 'Helmet Included' },
  { value: 'Lock Included', label: 'Lock Included' },
  { value: 'Lights Included', label: 'Lights Included' },
  { value: 'Bell Included', label: 'Bell Included' },
  { value: 'Bike Repair Kit', label: 'Bike Repair Kit' },
  { value: 'Child Seat Available', label: 'Child Seat Available' },
  { value: 'Tubeless Tires', label: 'Tubeless Tires' },
  { value: 'Reflective Strips', label: 'Reflective Strips' },
  { value: 'Adjustable Handlebar Height', label: 'Adjustable Handlebar Height' },
  { value: 'Water Bottle Holder', label: 'Water Bottle Holder' },
  { value: 'Mudguards', label: 'Mudguards' },
  { value: 'Fenders', label: 'Fenders' },
  { value: 'Kickstand', label: 'Kickstand' },
  { value: 'Carrier Rack', label: 'Carrier Rack' },
  { value: 'Puncture Repair Kit', label: 'Puncture Repair Kit' }
];


const BikeType = [
  { value: 'Mountain Bike', label: 'Mountain Bike' },
  { value: 'Road Bike', label: 'Road Bike' },
  { value: 'Hybrid Bike', label: 'Hybrid Bike' },
  { value: 'Cruiser Bike', label: 'Cruiser Bike' },
  { value: 'BMX Bike', label: 'BMX Bike' },
  { value: 'Folding Bike', label: 'Folding Bike' },
  { value: 'Electric Bike (E-Bike)', label: 'Electric Bike (E-Bike)' },
  { value: 'Gravel Bike', label: 'Gravel Bike' },
  { value: 'Cyclocross Bike', label: 'Cyclocross Bike' },
  { value: 'Touring Bike', label: 'Touring Bike' },
  { value: 'Commuter Bike', label: 'Commuter Bike' },
  { value: 'Fat Bike', label: 'Fat Bike' },
  { value: 'Recumbent Bike', label: 'Recumbent Bike' },
  { value: 'Tandem Bike', label: 'Tandem Bike' },
  { value: 'Track Bike', label: 'Track Bike' },
  { value: 'Kids Bike', label: 'Kids Bike' }
];

const BikeSeatpost = [
  { value: 'Aluminum Seatpost', label: 'Aluminum Seatpost' },
  { value: 'Carbon Fiber Seatpost', label: 'Carbon Fiber Seatpost' },
  { value: 'Steel Seatpost', label: 'Steel Seatpost' },
  { value: 'Suspension Seatpost', label: 'Suspension Seatpost' },
  { value: 'Adjustable Seatpost', label: 'Adjustable Seatpost' },
  { value: 'Dropper Seatpost', label: 'Dropper Seatpost' }
];

const BikeCondition = [
  { value: 'Brand New', label: 'Brand New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Very Good', label: 'Very Good' },
  { value: 'Good', label: 'Good' },
  { value: 'Poor', label: 'Poor' }
];

const BikeStorage = [
  { value: 'Rear Rack', label: 'Rear Rack' },
  { value: 'Panniers', label: 'Panniers' },
  { value: 'Handlebar Bag', label: 'Handlebar Bag' },
  { value: 'Saddle Bag', label: 'Saddle Bag' },
  { value: 'Frame Bag', label: 'Frame Bag' },
  { value: 'Bikepacking Bags', label: 'Bikepacking Bags' },
  { value: 'Trunk Bag', label: 'Trunk Bag' },
  { value: 'Basket', label: 'Basket' },
  { value: 'Cargo Trailer', label: 'Cargo Trailer' }
];

const BikeFork = [
  { value: 'Rigid Fork', label: 'Rigid Fork' },
  { value: 'Suspension Fork', label: 'Suspension Fork' },
  { value: 'Carbon Fiber Fork', label: 'Carbon Fiber Fork' },
  { value: 'Steel Fork', label: 'Steel Fork' },
  { value: 'Aluminum Fork', label: 'Aluminum Fork' },
  { value: 'Tapered Fork', label: 'Tapered Fork' }
];

const BikeGear = [
  { value: 'Single-Speed', label: 'Single-Speed' },
  { value: 'Fixed Gear', label: 'Fixed Gear' },
  { value: '3-Speed', label: '3-Speed' },
  { value: '7-Speed', label: '7-Speed' },
  { value: '8-Speed', label: '8-Speed' },
  { value: '9-Speed', label: '9-Speed' },
  { value: '10-Speed', label: '10-Speed' },
  { value: '11-Speed', label: '11-Speed' },
  { value: '12-Speed', label: '12-Speed' },
  { value: 'Shimano', label: 'Shimano' },
  { value: 'SRAM', label: 'SRAM' },
  { value: 'Campagnolo', label: 'Campagnolo' },
  { value: 'Internal Gear Hub', label: 'Internal Gear Hub' }
];

function Velos({ onDataChange, initialState, isOpen }) {

  const [initiallistingsData, setInitiallistingsData] = useState(initialState);
  
  const [collapse1, setCollapse1] = useState(isOpen);
  const [collapse2, setCollapse2] = useState(isOpen);
  const [collapse3, setCollapse3] = useState(isOpen);
  const [collapse4, setCollapse4] = useState(isOpen);
  const [collapse5, setCollapse5] = useState(isOpen);
  const [collapse6, setCollapse6] = useState(isOpen);
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
        image={<img src={icon7} style={{ width: '40px' }} />}
        title="Bike Type"
        open={collapse1}
        onClick={() => setCollapse1(!collapse1)}
      >
        <OneSelect
          name="bikeType"
          options={BikeType}
          value={initiallistingsData.bikeType}
          onChange={(option) => handleSelectChange("bikeType", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon5} style={{ width: '40px' }} />}
        title="Seatpost"
        open={collapse2}
        onClick={() => setCollapse2(!collapse2)}
      >
        <OneSelect
          name="seatpost"
          options={BikeSeatpost}
          value={initiallistingsData.seatpost}
          onChange={(option) => handleSelectChange("seatpost", option.value)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon1} style={{ width: '40px' }} />}
        title="Condition"
        open={collapse3}
        onClick={() => setCollapse3(!collapse3)}
      >
        <MultSelect
          name="condition"
          options={BikeCondition}
          value={initiallistingsData.condition}
          onChange={(options) => handleSelectChange("condition", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon6} style={{ width: '40px' }} />}
        title="Storage"
        open={collapse4}
        onClick={() => setCollapse4(!collapse4)}
      >
        <MultSelect
          name="storage"
          options={BikeStorage}
          value={initiallistingsData.storage}
          onChange={(options) => handleSelectChange("storage", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon2} style={{ width: '40px' }} />}
        title="Fork"
        open={collapse5}
        onClick={() => setCollapse5(!collapse5)}
      >
        <MultSelect
          name="fork"
          options={BikeFork}
          value={initiallistingsData.fork}
          onChange={(options) => handleSelectChange("fork", options)}
        />
      </CollapseList>
      <CollapseList
        image={<img src={icon3} style={{ width: '40px' }} />}
        title="Gear"
        open={collapse6}
        onClick={() => setCollapse6(!collapse6)}
      >
        <MultSelect
          name="gear"
          options={BikeGear}
          value={initiallistingsData.gear}
          onChange={(options) => handleSelectChange("gear", options)}
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



Velos.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
};

Velos.defaultProps = {
  initialState: {


    bikeType: '',
    seatpost: '',
    condition: [],
    storage: [],
    fork: [],
    gear: [],
    moreDetails: [],

    
  },
  isOpen: false,
};




export default Velos;
