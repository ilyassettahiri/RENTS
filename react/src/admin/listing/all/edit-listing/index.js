/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import Divider from "@mui/material/Divider";
import { ListingDetailsToolbar } from "admin/components/ListingDetailsToolbar/ListingDetailsToolbar";


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftEditor from "components/MDEditor";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DateRange from "components/DateRange";
import dayjs from "dayjs";

// NewProduct page components
import FormField from "admin/components/FormField";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Custom components
import Pricing from "admin/listing/all/create-listing/components/Pricing";
import Address from "components/Address"; // Correct import statement
import CustomFileInput from "admin/listing/all/create-listing/components/EditFileInput";



import CrudService from "services/cruds-service";




import Billiards from 'admin/listing/all/create-listing/components/ListingDetail/Billiards';
import Boxings from 'admin/listing/all/create-listing/components/ListingDetail/Boxings';
import Divings from 'admin/listing/all/create-listing/components/ListingDetail/Divings';
import Footballs from 'admin/listing/all/create-listing/components/ListingDetail/Footballs';
import Golfs from 'admin/listing/all/create-listing/components/ListingDetail/Golfs';
import Huntings from 'admin/listing/all/create-listing/components/ListingDetail/Huntings';
import Musculations from 'admin/listing/all/create-listing/components/ListingDetail/Musculations';
import Surfs from 'admin/listing/all/create-listing/components/ListingDetail/Surfs';
import Tennis from 'admin/listing/all/create-listing/components/ListingDetail/Tennis';

import Audios from 'admin/listing/all/create-listing/components/ListingDetail/Audios';
import Cameras from 'admin/listing/all/create-listing/components/ListingDetail/Cameras';
import Chargers from 'admin/listing/all/create-listing/components/ListingDetail/Chargers';
import Drones from 'admin/listing/all/create-listing/components/ListingDetail/Drones';
import Gamings from 'admin/listing/all/create-listing/components/ListingDetail/Gamings';
import Laptops from 'admin/listing/all/create-listing/components/ListingDetail/Laptops';
import Lightings from 'admin/listing/all/create-listing/components/ListingDetail/Lightings';
import Printers from 'admin/listing/all/create-listing/components/ListingDetail/Printers';
import Routers from 'admin/listing/all/create-listing/components/ListingDetail/Routers';
import Tablettes from 'admin/listing/all/create-listing/components/ListingDetail/Tablettes';

import Eclairages from 'admin/listing/all/create-listing/components/ListingDetail/Eclairages';
import Mobiliers from 'admin/listing/all/create-listing/components/ListingDetail/Mobiliers';
import Photographies from 'admin/listing/all/create-listing/components/ListingDetail/Photographies';
import Sonorisations from 'admin/listing/all/create-listing/components/ListingDetail/Sonorisations';
import Tentes from 'admin/listing/all/create-listing/components/ListingDetail/Tentes';

import Clothes from 'admin/listing/all/create-listing/components/ListingDetail/Clothes';
import Jewelrys from 'admin/listing/all/create-listing/components/ListingDetail/Jewelrys';

import Apartments from 'admin/listing/all/create-listing/components/ListingDetail/Apartments';
import Bureauxs from 'admin/listing/all/create-listing/components/ListingDetail/Bureauxs';
import Magasins from 'admin/listing/all/create-listing/components/ListingDetail/Magasins';
import Maisons from 'admin/listing/all/create-listing/components/ListingDetail/Maisons';
import Riads from 'admin/listing/all/create-listing/components/ListingDetail/Riads';
import Terrains from 'admin/listing/all/create-listing/components/ListingDetail/Terrains';
import Villas from 'admin/listing/all/create-listing/components/ListingDetail/Villas';

import Activities from 'admin/listing/all/create-listing/components/ListingDetail/Activities';
import Livres from 'admin/listing/all/create-listing/components/ListingDetail/Livres';
import Musicals from 'admin/listing/all/create-listing/components/ListingDetail/Musicals';

import Furnitures from 'admin/listing/all/create-listing/components/ListingDetail/Furnitures';
import Houseappliances from 'admin/listing/all/create-listing/components/ListingDetail/Houseappliances';

import Electricaltools from 'admin/listing/all/create-listing/components/ListingDetail/Electricaltools';
import Ladders from 'admin/listing/all/create-listing/components/ListingDetail/Ladders';
import Mechanicaltools from 'admin/listing/all/create-listing/components/ListingDetail/Mechanicaltools';
import Powertools from 'admin/listing/all/create-listing/components/ListingDetail/Powertools';
import Pressurewashers from 'admin/listing/all/create-listing/components/ListingDetail/Pressurewashers';

import Services from 'admin/listing/all/create-listing/components/ListingDetail/Services';
import Jobs from 'admin/listing/all/create-listing/components/ListingDetail/Jobs';

import Boats from 'admin/listing/all/create-listing/components/ListingDetail/Boats';
import Camions from 'admin/listing/all/create-listing/components/ListingDetail/Camions';
import Caravans from 'admin/listing/all/create-listing/components/ListingDetail/Caravans';
import Cars from 'admin/listing/all/create-listing/components/ListingDetail/Cars';
import Engins from 'admin/listing/all/create-listing/components/ListingDetail/Engins';
import Motos from 'admin/listing/all/create-listing/components/ListingDetail/Motos';
import Scooters from 'admin/listing/all/create-listing/components/ListingDetail/Scooters';
import Taxiaeroports from 'admin/listing/all/create-listing/components/ListingDetail/Taxiaeroports';
import Transportations from 'admin/listing/all/create-listing/components/ListingDetail/Transportations';
import Velos from 'admin/listing/all/create-listing/components/ListingDetail/Velos';


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const BilliardsIcon = `${imagePath}/categories/Billiards.svg`;
const BoxingsIcon = `${imagePath}/categories/Boxings.svg`;
const DivingsIcon = `${imagePath}/categories/Divings.svg`;
const FootballsIcon = `${imagePath}/categories/Footballs.svg`;
const GolfsIcon = `${imagePath}/categories/Golfs.svg`;
const HuntingsIcon = `${imagePath}/categories/Huntings.svg`;
const MusculationsIcon = `${imagePath}/categories/Musculations.svg`;
const SurfsIcon = `${imagePath}/categories/Surfs.svg`;
const TennisIcon = `${imagePath}/categories/Tennis.svg`;
const AudiosIcon = `${imagePath}/categories/Audios.svg`;
const CamerasIcon = `${imagePath}/categories/Cameras.svg`;
const ChargersIcon = `${imagePath}/categories/Chargers.svg`;
const DronesIcon = `${imagePath}/categories/Drones.svg`;
const GamingsIcon = `${imagePath}/categories/Gamings.svg`;
const LaptopsIcon = `${imagePath}/categories/Laptops.svg`;
const LightingsIcon = `${imagePath}/categories/Lightings.svg`;
const PrintersIcon = `${imagePath}/categories/Printers.svg`;
const RoutersIcon = `${imagePath}/categories/Routers.svg`;
const TablettesIcon = `${imagePath}/categories/Tablettes.svg`;
const EclairagesIcon = `${imagePath}/categories/Eclairages.svg`;
const MobiliersIcon = `${imagePath}/categories/Mobiliers.svg`;
const PhotographiesIcon = `${imagePath}/categories/Photographies.svg`;
const SonorisationsIcon = `${imagePath}/categories/Sonorisations.svg`;
const TentesIcon = `${imagePath}/categories/Tentes.svg`;
const ClothesIcon = `${imagePath}/categories/Clothes.svg`;
const JewelrysIcon = `${imagePath}/categories/Jewelrys.svg`;
const ApartmentsIcon = `${imagePath}/categories/Apartments.svg`;
const BureauxsIcon = `${imagePath}/categories/Bureauxs.svg`;
const MagasinsIcon = `${imagePath}/categories/Magasins.svg`;
const MaisonsIcon = `${imagePath}/categories/Maisons.svg`;
const RiadsIcon = `${imagePath}/categories/Riads.svg`;
const TerrainsIcon = `${imagePath}/categories/Terrains.svg`;
const VillasIcon = `${imagePath}/categories/Villas.svg`;
const ActivitiesIcon = `${imagePath}/categories/Activities.svg`;
const LivresIcon = `${imagePath}/categories/Livres.svg`;
const MusicalsIcon = `${imagePath}/categories/Musicals.svg`;
const FurnituresIcon = `${imagePath}/categories/Furnitures.svg`;
const HouseappliancesIcon = `${imagePath}/categories/Houseappliances.svg`;
const ElectricaltoolsIcon = `${imagePath}/categories/Electricaltools.svg`;
const LaddersIcon = `${imagePath}/categories/Ladders.svg`;
const MechanicaltoolsIcon = `${imagePath}/categories/Mechanicaltools.svg`;
const PowertoolsIcon = `${imagePath}/categories/Powertools.svg`;
const PressurewashersIcon = `${imagePath}/categories/Pressurewashers.svg`;
const ServicesIcon = `${imagePath}/categories/Services.svg`;
const JobsIcon = `${imagePath}/categories/Jobs.svg`;

const BoatsIcon = `${imagePath}/categories/Boats.svg`;
const CamionsIcon = `${imagePath}/categories/Camions.svg`;
const CaravansIcon = `${imagePath}/categories/Caravans.svg`;
const CarsIcon = `${imagePath}/categories/Cars.svg`;
const EnginsIcon = `${imagePath}/categories/Engins.svg`;
const MotosIcon = `${imagePath}/categories/Motos.svg`;
const ScootersIcon = `${imagePath}/categories/Scooters.svg`;
const TaxiaeroportsIcon = `${imagePath}/categories/Taxiaeroports.svg`;
const TransportationsIcon = `${imagePath}/categories/Transportations.svg`;
const VelosIcon = `${imagePath}/categories/Velos.svg`;

export {
  BilliardsIcon,
  BoxingsIcon,
  DivingsIcon,
  FootballsIcon,
  GolfsIcon,
  HuntingsIcon,
  MusculationsIcon,
  SurfsIcon,
  TennisIcon,
  AudiosIcon,
  CamerasIcon,
  ChargersIcon,
  DronesIcon,
  GamingsIcon,
  LaptopsIcon,
  LightingsIcon,
  PrintersIcon,
  RoutersIcon,
  TablettesIcon,
  EclairagesIcon,
  MobiliersIcon,
  PhotographiesIcon,
  SonorisationsIcon,
  TentesIcon,
  ClothesIcon,
  JewelrysIcon,
  ApartmentsIcon,
  BureauxsIcon,
  MagasinsIcon,
  MaisonsIcon,
  RiadsIcon,
  TerrainsIcon,
  VillasIcon,
  ActivitiesIcon,
  LivresIcon,
  MusicalsIcon,
  FurnituresIcon,
  HouseappliancesIcon,
  ElectricaltoolsIcon,
  LaddersIcon,
  MechanicaltoolsIcon,
  PowertoolsIcon,
  PressurewashersIcon,
  ServicesIcon,
  JobsIcon,

  BoatsIcon,
  CamionsIcon,
  CaravansIcon,
  CarsIcon,
  EnginsIcon,
  MotosIcon,
  ScootersIcon,
  TaxiaeroportsIcon,
  TransportationsIcon,
  VelosIcon
};






function getCategory(
  category,
  updateBilliardsData,
  updateBoxingsData,
  updateDivingsData,
  updateFootballsData,
  updateGolfsData,
  updateHuntingsData,
  updateMusculationsData,
  updateSurfsData,
  updateTennisData,
  updateAudiosData,
  updateCamerasData,
  updateChargersData,
  updateDronesData,
  updateGamingsData,
  updateLaptopsData,
  updateLightingsData,
  updatePrintersData,
  updateRoutersData,
  updateTablettesData,
  updateEclairagesData,
  updateMobiliersData,
  updatePhotographiesData,
  updateSonorisationsData,
  updateTentesData,
  updateClothesData,
  updateJewelrysData,
  updateApartmentsData,
  updateBureauxsData,
  updateMagasinsData,
  updateMaisonsData,
  updateRiadsData,
  updateTerrainsData,
  updateVillasData,
  updateActivitiesData,
  updateLivresData,
  updateMusicalsData,
  updateFurnituresData,
  updateHouseappliancesData,
  updateElectricaltoolsData,
  updateLaddersData,
  updateMechanicaltoolsData,
  updatePowertoolsData,
  updatePressurewashersData,
  updateServicesData,
  updateJobsData,

  updateBoatsData,
  updateCamionsData,
  updateCaravansData,
  updateCarsData,
  updateEnginsData,
  updateMotosData,
  updateScootersData,
  updateTaxiaeroportsData,
  updateTransportationsData,
  updateVelosData,



  billiardsData,
  boxingsData,
  divingsData,
  footballsData,
  golfsData,
  huntingsData,
  musculationsData,
  surfsData,
  tennisData,
  audiosData,
  camerasData,
  chargersData,
  dronesData,
  gamingsData,
  laptopsData,
  lightingsData,
  printersData,
  routersData,
  tablettesData,
  eclairagesData,
  mobiliersData,
  photographiesData,
  sonorisationsData,
  tentesData,
  clothesData,
  jewelrysData,
  apartmentsData,
  bureauxsData,
  magasinsData,
  maisonsData,
  riadsData,
  terrainsData,
  villasData,
  activitiesData,
  livresData,
  musicalsData,
  furnituresData,
  houseappliancesData,
  electricaltoolsData,
  laddersData,
  mechanicaltoolsData,
  powertoolsData,
  pressurewashersData,
  servicesData,
  jobsData,

  boatsData,
  camionsData,
  caravansData,
  carsData,
  enginsData,
  motosData,
  scootersData,
  taxiaeroportsData,
  transportationsData,
  velosData

) {
  switch (category) {
    case 'billiard':
      return <Billiards onDataChange={updateBilliardsData} initialState={billiardsData} isOpen={true}/>;
    case 'boxing':
      return <Boxings onDataChange={updateBoxingsData} initialState={boxingsData} isOpen={true}/>;
    case 'diving':
      return <Divings onDataChange={updateDivingsData} initialState={divingsData} isOpen={true}/>;
    case 'football':
      return <Footballs onDataChange={updateFootballsData} initialState={footballsData} isOpen={true}/>;
    case 'golf':
      return <Golfs onDataChange={updateGolfsData} initialState={golfsData} isOpen={true}/>;
    case 'hunting':
      return <Huntings onDataChange={updateHuntingsData} initialState={huntingsData} isOpen={true}/>;
    case 'gym':
      return <Musculations onDataChange={updateMusculationsData} initialState={musculationsData} isOpen={true}/>;
    case 'surf':
      return <Surfs onDataChange={updateSurfsData} initialState={surfsData} isOpen={true}/>;
    case 'tennis':
      return <Tennis onDataChange={updateTennisData} initialState={tennisData} isOpen={true}/>;
    case 'audio':
      return <Audios onDataChange={updateAudiosData} initialState={audiosData} isOpen={true}/>;
    case 'cameras':
      return <Cameras onDataChange={updateCamerasData} initialState={camerasData} isOpen={true}/>;
    case 'chargers':
      return <Chargers onDataChange={updateChargersData} initialState={chargersData} isOpen={true}/>;
    case 'drones':
      return <Drones onDataChange={updateDronesData} initialState={dronesData} isOpen={true}/>;
    case 'gaming':
      return <Gamings onDataChange={updateGamingsData} initialState={gamingsData} isOpen={true}/>;
    case 'laptops':
      return <Laptops onDataChange={updateLaptopsData} initialState={laptopsData} isOpen={true}/>;
    case 'lighting':
      return <Lightings onDataChange={updateLightingsData} initialState={lightingsData} isOpen={true}/>;
    case 'printers':
      return <Printers onDataChange={updatePrintersData} initialState={printersData} isOpen={true}/>;
    case 'routers':
      return <Routers onDataChange={updateRoutersData} initialState={routersData} isOpen={true}/>;
    case 'tablets':
      return <Tablettes onDataChange={updateTablettesData} initialState={tablettesData} isOpen={true}/>;
    case 'eclairage':
      return <Eclairages onDataChange={updateEclairagesData} initialState={eclairagesData} isOpen={true}/>;
    case 'mobilier':
      return <Mobiliers onDataChange={updateMobiliersData} initialState={mobiliersData} isOpen={true}/>;
    case 'photography':
      return <Photographies onDataChange={updatePhotographiesData} initialState={photographiesData} isOpen={true}/>;
    case 'sound-systems':
      return <Sonorisations onDataChange={updateSonorisationsData} initialState={sonorisationsData} isOpen={true}/>;
    case 'tents':
      return <Tentes onDataChange={updateTentesData} initialState={tentesData} isOpen={true} />;
    case 'clothes':
      return <Clothes onDataChange={updateClothesData} initialState={clothesData} isOpen={true}/>;
    case 'jewelry':
      return <Jewelrys onDataChange={updateJewelrysData} initialState={jewelrysData} isOpen={true}/>;
    case 'apartments':
      return <Apartments onDataChange={updateApartmentsData} initialState={apartmentsData} isOpen={true}/>;
    case 'offices':
      return <Bureauxs onDataChange={updateBureauxsData} initialState={bureauxsData} isOpen={true}/>;
    case 'shops':
      return <Magasins onDataChange={updateMagasinsData} initialState={magasinsData} isOpen={true}/>;
    case 'houses':
      return <Maisons onDataChange={updateMaisonsData} initialState={maisonsData} isOpen={true}/>;
    case 'riads':
      return <Riads onDataChange={updateRiadsData} initialState={riadsData} isOpen={true}/>;
    case 'lands':
      return <Terrains onDataChange={updateTerrainsData} initialState={terrainsData} isOpen={true}/>;
    case 'villas':
      return <Villas onDataChange={updateVillasData} initialState={villasData} isOpen={true}/>;
    case 'activities':
      return <Activities onDataChange={updateActivitiesData} initialState={activitiesData} isOpen={true}/>;
    case 'books':
      return <Livres onDataChange={updateLivresData} initialState={livresData} isOpen={true}/>;
    case 'musical':
      return <Musicals onDataChange={updateMusicalsData} initialState={musicalsData} isOpen={true}/>;
    case 'furniture':
      return <Furnitures onDataChange={updateFurnituresData} initialState={furnituresData} isOpen={true}/>;
    case 'home-appliances':
      return <Houseappliances onDataChange={updateHouseappliancesData} initialState={houseappliancesData} isOpen={true}/>;
    case 'electrical-tools':
      return <Electricaltools onDataChange={updateElectricaltoolsData} initialState={electricaltoolsData} isOpen={true}/>;
    case 'ladders':
      return <Ladders onDataChange={updateLaddersData} initialState={laddersData} isOpen={true}/>;
    case 'mechanical-tools':
      return <Mechanicaltools onDataChange={updateMechanicaltoolsData} initialState={mechanicaltoolsData} isOpen={true}/>;
    case 'power-tools':
      return <Powertools onDataChange={updatePowertoolsData} initialState={powertoolsData} isOpen={true}/>;
    case 'pressure-washers':
      return <Pressurewashers onDataChange={updatePressurewashersData} initialState={pressurewashersData} isOpen={true}/>;
    case 'services':
      return <Services onDataChange={updateServicesData} initialState={servicesData} isOpen={true}/>;

    case 'jobs':
        return <Jobs onDataChange={updateJobsData} initialState={jobsData} isOpen={true}/>;
  
    case 'boats':
      return <Boats onDataChange={updateBoatsData} initialState={boatsData} isOpen={true}/>;
    case 'trucks':
      return <Camions onDataChange={updateCamionsData} initialState={camionsData} isOpen={true}/>;
    case 'caravans':
      return <Caravans onDataChange={updateCaravansData} initialState={caravansData} isOpen={true}/>;
    case 'cars':
      return <Cars onDataChange={updateCarsData} initialState={carsData} isOpen={true}/>;
    case 'engins':
      return <Engins onDataChange={updateEnginsData} initialState={enginsData} isOpen={true}/>;
    case 'motorcycles':
      return <Motos onDataChange={updateMotosData} initialState={motosData} isOpen={true}/>;
    case 'scooters':
      return <Scooters onDataChange={updateScootersData} initialState={scootersData} isOpen={true}/>;
    case 'airport-taxis':
      return <Taxiaeroports onDataChange={updateTaxiaeroportsData} initialState={taxiaeroportsData} isOpen={true}/>;
    case 'transportation':
      return <Transportations onDataChange={updateTransportationsData} initialState={transportationsData} isOpen={true}/>;
    case 'bicycles':
      return <Velos onDataChange={updateVelosData} initialState={velosData} isOpen={true}/>;
    default:
      return null;
  }
  
}






function EditListing() {
  const { t } = useTranslation();



  const navigate = useNavigate();
  const { id } = useParams();


  const clickDeleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
  
    if (!isConfirmed) {
      // If the user cancels, stop the function execution
      return;
    }
  
    try {
      // Send delete request
      await CrudService.deleteListing(id);
      
      // Navigate after successful deletion
      navigate("/listing/create-listing");
    } catch (error) {
      console.error('Failed to delete listing:', error);
      // You can show an error message here if needed
    }
  };
  
  
  const [data, setData] = useState(null);

  const category= data?.category;
  const url= data?.url;


  const clickOpenHandler = (category, url) => {
    const baseUrl = category === 'services' 
      ? `https://rents.ma/service-page/${url}`  // URL for services category
      : category === 'jobs'
      ? `https://rents.ma/job-page/${url}`  // URL for jobs category
      : `https://rents.ma/listing-page/${category}/${url}`;  // Default URL for other categories
  
    window.open(baseUrl, '_blank');  // Open the URL in a new tab
  };
  


  const [billiardsData, setBilliardsData] = useState({
    tableDetails: '',
    condition: '',
    ballsDesign: [],
    bridgeAndStick: [],
    chalk: [],
    otherInformation: [],
    moreDetails: [],

  });


  const [boxingsData, setBoxingsData] = useState({
    ringDimensions: '',
    padding: '',
    clothing: [],
    brand: '',
    otherEquipment: [],
    moreDetails: [],

  });

  const [activitiesData, setActivitiesData] = useState({
    type: '',
    equipment: [],
    ageRequirement: '',
    duration: '',
    language: [],
    cancellation: '',
    safetyEquipment: [],
    monitor: '',
    moreDetails: [],

  });
  
  const [apartmentsData, setApartmentsData] = useState({
    facilities: [],
    service: [],
    kitchen: [],
    securitySystem: [],
    livingRooms: '',
    bathrooms: '',
    rooms: '',
    bedrooms: '',
    moreDetails: [],

  });
  
  const [audiosData, setAudiosData] = useState({
    audioType: '',
    soundQuality: '',
    connectivity: [],
    maxWirelessRange: '',
    batteryLife: '',
    chargingTime: '',
    condition: '',
    compatibility: [],
    moreDetails: [],

  });
  

  const [boatsData, setBoatsData] = useState({
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

  });
  
  const [bureauxsData, setBureauxsData] = useState({
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

  });
  

  const [camerasData, setCamerasData] = useState({
    photoSize: '',
    sensorSize: '',
    imageStabilization: '',
    shutterSpeed: '',
    exposureControl: '',
    imageResolution: '',
    condition: '',
    connectivity: [],
    memory: '',
    lens: '',
    moreDetails: [],

  });
  
  const [camionsData, setCamionsData] = useState({
    type: '',
    fuelType: '',
    condition: '',
    transmission: '',
    insurance: '',
    navigation: '',
    moreDetails: []
  });
  
  const [caravansData, setCaravansData] = useState({
    gearbox: '',
    fuelType: '',
    kitchenEquipment: [],
    toilet: '',
    furniture: [],
    accessories: [],
    moreDetails: [],

  });
  

  const [carsData, setCarsData] = useState({
    transmission: '',
    fuelType: '',
    numberOfDoors: '',
    condition: '',
    seats: '',
    moreDetails: [],


  });
  
  const [chargersData, setChargersData] = useState({
    compatibility: [],
    numberOfPorts: '',
    length: '',
    inputVoltage: '',
    wattage: '',
    condition: '',
    connectorType: '',
    amperage: '',
    moreDetails: [],

  });
  
  const [clothesData, setClothesData] = useState({
    numberOfPieces: '',
    closureType: '',
    strapType: [],
    numberOfPockets: '',
    heelHeight: '',
    condition: '',
    color: '',
    moreDetails: [],

  });
  

  const [divingsData, setDivingsData] = useState({
    brandName: '',
    material: '',
    otherEquipment: [],
    moreDetails: [],

  });
  
  const [dronesData, setDronesData] = useState({
    flightTime: '',
    batteryLife: '',
    condition: '',
    videoResolution: '',
    connectivity: [],
    batteryCapacity: '',
    memory: '',
    imageResolution: '',
    includedComponents: [],
    remoteControl: '',
    maxDistance: '',
    moreDetails: [],

  });

  const [eclairagesData, setEclairagesData] = useState({
    brandName: '',
    size: '',
    voltage: '',
    chandeliers: [],
    lamps: [],
    light: [],
    projectors: [],
    led: [],
    power: '',
    lightSourceType: '',
    lightColor: [],
    lightingMethod: [],
    controller: '',
    other: [],
    moreDetails: [],

  });
  
  const [electricaltoolsData, setElectricaltoolsData] = useState({
    toolType: '',
    condition: '',
    voltage: '',
    amperage: [],
    cordLength: [],
    batteryLife: [],
    display: '',
    frequency: '',
    temperature: [],
    voltageSensingRanges: '',
    detector: '',
    operatingAltitude: '',
    compatible: '',
    bindingAngle: [],
    accessories: '',
    style: '',
    moreDetails: [],

  });

  

  const [enginsData, setEnginsData] = useState({
    type: '',
    mechanicalCondition: '',
    transmissionType: '',
    cabType: '',
    cabCondition: '',
    couplerType: '',
    hydraulicsType: '',
    seats: '',
    moreDetails: [],

  });
  
  const [footballsData, setFootballsData] = useState({
    type: '',
    equipment: [],
    moreDetails: [],

  });
  
  const [furnituresData, setFurnituresData] = useState({
    type: '',
    material: '',
    shape: '',
    cushionThickness: '',
    capacity: '',
    fillMaterial: '',
    condition: '',
    color: [],
    moreDetails: [],

  });
  
  const [gamingsData, setGamingsData] = useState({
    storage: '',
    connectivity: [],
    ports: [],
    onlineServices: '',
    condition: '',
    games: [],
    controller: [],
    moreDetails: [],

  });
  

  const [golfsData, setGolfsData] = useState({
    clothing: [],
    cars: '',
    otherEquipment: [],
    moreDetails: [],

  });

  const [houseappliancesData, setHouseappliancesData] = useState({
    accessLocation: '',
    finishType: '',
    cycleOptions: '',
    inletWater: [],
    installationMethod: '',
    components: [],
    controlType: '',
    certification: '',
    moreDetails: [],

  });

  const [huntingsData, setHuntingsData] = useState({
    bowArrow: '',
    crossbow: '',
    decoy: [],
    gameCall: [],
    binoculars: [],
    clothing: [],
    equipment: [],
    moreDetails: [],

  });

  
  const [jewelrysData, setJewelrysData] = useState({
    type: '',
    material: '',
    occasion: '',
    chainType: '',
    gemType: '',
    color: '',
    closureType: [],
    condition: '',
    moreDetails: [],

  });
      

  const [laddersData, setLaddersData] = useState({
    toolType: '',
    condition: '',
    powerSource: '',
    material: '',
    height: '',
    weight: '',
    numberOfSteps: '',
    loadCapacity: '',
    batteryLife: '',
    style: [],
    wheelSize: '',
    moreDetails: [],

  });

  const [laptopsData, setLaptopsData] = useState({
    ram: '',
    graphicsCard: '',
    operatingSystem: '',
    numberPorts: [],
    batteryLife: '',
    storage: '',
    resolution: '',
    weight: '',
    screenSize: '',
    cpu: '',
    condition: '',
    moreDetails: [],

  });
  
  const [lightingsData, setLightingsData] = useState({
    connectivity: [],
    includedAccessories: [],
    condition: '',
    colorTemperature: [],
    compatibility: [],
    moreDetails: [],

  });


  const [livresData, setLivresData] = useState({
    genre: '',
    type: '',
    language: [],
    format: '',
    duration: [],
    moreDetails: [],

  });


  const [magasinsData, setMagasinsData] = useState({
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

  });

  
  const [maisonsData, setMaisonsData] = useState({
    securitySystem: [],
    rooms: '',
    livingRooms: '',
    bedrooms: '',
    bathrooms: '',
    floors: '',
    amenities: [],
    facilities: [],
    moreDetails: [],

  });
  

  const [mechanicaltoolsData, setMechanicaltoolsData] = useState({
    toolType: '',
    condition: '',
    powerSource: '',
    voltage: '',
    batteryLife: '',
    bladeDiameter: '',
    material: '',
    style: '',
    cuttingWidth: '',
    carburetorType: '',
    moreDetails: [],

  });

  
  const [mobiliersData, setMobiliersData] = useState({
    material: [],
    theme: '',
    plantDecorations: [],
    lightDecorations: [],
    festiveDecorations: '',
    otherEquipment: [],
    moreDetails: [],

  });
  

  const [motosData, setMotosData] = useState({
    condition: '',
    gearbox: '',
    insurance: '',
    power: '',
    speed: '',
    toolkit: '',
    intercom: '',
    moreDetails: [],

  });
  
  
  const [musculationsData, setMusculationsData] = useState({
    brand: [],
    arms: [],
    back: [],
    shoulders: [],
    glutes: [],
    legs: [],
    chest: [],
    abs: [],
    cardio: [],
    other: [],
    moreDetails: [],

  });
  

  const [musicalsData, setMusicalsData] = useState({
    musicType: '',
    material: '',
    style: '',
    finishType: '',
    moreDetails: [],

  });

  
  const [photographiesData, setPhotographiesData] = useState({
    brand: '',
    size: '',
    camera: [],
    sensor: [],
    wideAngle: [],
    lcd: [],
    battery: '',
    otherEquipment: [],
    moreDetails: [],

  });

  
  const [powertoolsData, setPowertoolsData] = useState({
    toolType: '',
    condition: '',
    powerSource: '',
    voltage: '',
    batteryLife: '',
    material: '',
    noiseLevel: '',
    gritNumber: '',
    rotationalSpeed: '',
    bladeMaterial: '',
    surface: '',
    style: '',
    amperage: '',
    moreDetails: [],

  });


  const [pressurewashersData, setPressurewashersData] = useState({
    toolType: '',
    condition: '',
    powerSource: '',
    powerOutput: '',
    enginePower: '',
    hoseLength: '',
    cordLength: '',
    weight: '',
    maximumFlowRate: [],
    specificationMet: [],
    inletConnectionType: [],
    outletConnectionSize: '',
    maxWorkingTemperature: '',
    connectionType: '',
    moreDetails: [],

  });

  
  const [printersData, setPrintersData] = useState({
    printSpeed: '',
    printResolution: [],
    connectivity: [],
    paperSize: [],
    compatibleInk: [],
    condition: '',
    inputSheets: '',
    printMedia: [],
    moreDetails: [],

  });
  


  const [riadsData, setRiadsData] = useState({
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

  });

  
  const [routersData, setRoutersData] = useState({
    gbpsSpeed: '',
    wireless: '',
    frequency: '',
    connectivity: [],
    antennas: '',
    condition: '',
    compatible: [],
    signalCoverage: '',
    moreDetails: [],

  });
  

  const [scootersData, setScootersData] = useState({
    condition: '',
    moreDetails: [],

  });

  
    
  const [servicesData, setServicesData] = useState({
    languages: [],
    experience: '',
    type: '',
    
    education: '',
    
    deliveryTime: '',
    moreDetails: [],

  });


  const [jobsData, setJobsData] = useState({
    languages: [],
    experience: '',
    employmentType: '',
    salary: '',
    skills: [],
    
    responsibilities: '',

    
    benefits: [],

    
    requirements: [],
    
    moreDetails: [],

  });


  const [sonorisationsData, setSonorisationsData] = useState({
    brand: '',
    size: '',
    connectivityTechnology: '',
    fastenerType: '',
    powerSource: '',
    outputPower: '',
    numberOfChannels: '',
    deviceCompatibility: '',
    powerInWatts: '',
    powerType: [],
    battery: [],
    weight: '',
    microphone: [],
    mixageTable: '',
    amplifier: '',
    cablesAndConnectors: [],
    speaker: [],
    moreDetails: [],

  });
  
  const [surfsData, setSurfsData] = useState({
    surfCategory: '',
    surfTypes: '',
    surfingSize: '',
    surfWetsuits: [],
    surfOther: [],
    moreDetails: [],

  });

  const [tablettesData, setTablettesData] = useState({
    operatingSystem: '',
    ram: '',
    storage: '',
    displaySize: '',
    displayResolution: '',
    connectivity: [],
    condition: '',
    moreDetails: [],

  });


  const [taxiaeroportsData, setTaxiaeroportsData] = useState({
    passengers: '',
    luggage: '',
    storage: '',
    moreDetails: [],

  });
  
  const [tennisData, setTennisData] = useState({
    tennisTerrain: '',
    brandName: '',
    clothing: [],
    moreDetails: [],

  });

  
  const [tentesData, setTentesData] = useState({
    material: '',
    style: '',
    fabric: '',
    otherEquipment: [],
    moreDetails: [],

  });
      

  const [terrainsData, setTerrainsData] = useState({
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

  });
  


  const [transportationsData, setTransportationsData] = useState({
    passengers: '',
    luggage: '',
    condition: '',
    duration: [],
    gearbox: '',
    moreDetails: [],

  });
  
  const [velosData, setVelosData] = useState({
    bikeType: '',
    seatpost: '',
    condition: [],
    storage: [],
    fork: [],
    gear: [],
    moreDetails: [],

  });

  
  const [villasData, setVillasData] = useState({
    rooms: '',
    livingRooms: '',
    bedrooms: '',
    bathrooms: '',
    view: '',
    securitySystem: [],
    facilities: [],
    amenities: [],
    services: [],
    moreDetails: [],

  });
  
  
 
  const [ids, setIds] = useState({
    listingid: "",
    
    
  });

  const [title, setTitle] = useState({
    text: "",
    error: false,
    textError: "",
  });



  const [address, setAddress] = useState({
    address: "",
    city: "",
    country: "",
    zip: "",
  });


  const [pricing, setPricing] = useState({
    price: "",
    currency: "", // Default currency
    phone: "",
    
  });
  

  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipError, setZipError] = useState(false);

  const [priceError, setPriceError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);



  const [selectedCategory, setSelectedCategory] = useState('');

  const [categoryError, setCategoryError] = useState(false);


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");



  const [oldFiles, setOldFiles] = useState([]);


  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, 'year')]);

  const handlePricingChange = (e) => {
    


    setPricing((prevPricing) => {
      const newPricing = { ...prevPricing, [e.target.name]: e.target.value };
      
      
      
      return newPricing;
    });

    
      // Remove error when a valid price or phone is entered
      if (e.target.name === "price" && e.target.value.trim().length > 0) {
        setPriceError(false);
      }
      if (e.target.name === "phone" && e.target.value.trim().length > 0) {
        setPhoneError(false);
      }

  };

  const handleSelectChange = (name, value) => {

   

    setPricing((prevPricing) => {
      const newPricing = { ...prevPricing, [name]: value };
      
     
      
      return newPricing;
    });
    
      // Remove error when a valid price or phone is entered
      if (name === "price" && value.trim().length > 0) {
        setPriceError(false);
      }
  };

  const handleAddressChange = (e) => {
    setAddress((prevAddress) => {
      const newAddress = { ...prevAddress, [e.target.name]: e.target.value };
  
      
  
      return newAddress;
    });

          // Remove error when a valid address, city, or zip is entered
          if (e.target.name === "address" && e.target.value.trim().length > 0) {
            setAddressError(false);
          }
          if (e.target.name === "city" && e.target.value.trim().length > 0) {
            setCityError(false);
          }
          if (e.target.name === "zip" && e.target.value.trim().length > 0) {
            setZipError(false);
          }

  };



  const changeTitleHandler = (e) => {
    const newText = e.target.value;
  
    setTitle((prevTitle) => ({
      ...prevTitle,
      text: newText,
      error: newText.trim().length === 0 ? prevTitle.error : false,
      textError: newText.trim().length === 0 ? prevTitle.textError : "",
    }));
  };
  
 
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);


          // Remove error when a valid category is selected
          if (selectedOption.value.trim().length > 0) {
            setCategoryError(false);
          }

  };

  const handleFilesChange = (files) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/tiff", "image/jpg", "image/webp", "image/gif"];
  
    // Extract old (existingFiles as strings) and new files (updatedSelectedFiles as File objects)
    const { existingFiles, updatedSelectedFiles } = files; 
  
    console.log('Existing Files:', existingFiles);
    console.log('Updated Selected Files:', updatedSelectedFiles);
  
    
    // Set the old files (which are paths/URLs)
    setOldFiles(existingFiles); 
  
    // Check if both existingFiles and updatedSelectedFiles are empty
    if ((!existingFiles || existingFiles.length === 0) && (!updatedSelectedFiles || updatedSelectedFiles.length === 0)) {
      setFileError("Please select at least one image.");
      setSelectedFiles([]); // Clear new selected files
      return;
    }
  
    // Check if there are any new files (updatedSelectedFiles)
    if (updatedSelectedFiles && updatedSelectedFiles.length > 0) {
      // Validate new files (File objects)
      for (let i = 0; i < updatedSelectedFiles.length; i++) {
        const file = updatedSelectedFiles[i];

        // Check if file type is acceptable
        if (!acceptedTypes.includes(file.type)) {
          setFileError("Only image files (jpg, png, gif, tiff, webp) are allowed.");
          setSelectedFiles([]); // Clear new selected files if validation fails
          return;
        }
      }
    }
  
    // Clear any existing file errors and update new selected files
    setFileError("");
    setSelectedFiles(updatedSelectedFiles); // Update new selected files (File objects)
  };
  
  

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await CrudService.getListing(id);
        
        const fetchedData = res.data.attributes;
        
        setData(fetchedData);

        // Common fields
        const {
          title,
          description,
          startdate,
          enddate,
          address,
          listingid,
          city,
          country,
          zip,
          status,
          category,
          price,
          currency  ,
          phone  ,
          
          images = [],
        } = fetchedData;
  
        
  
        // Set common data
        setTitle({ text: title, error: false, textError: "" });
        setDescription(description);
        setAddress({ address, city, country, zip });
        setIds({ listingid });
        setDateRange([dayjs(startdate), dayjs(enddate)]);
        setSelectedCategory(category);
        setPricing({ price, currency, phone });
        setSelectedStatus(status);
        setInitialStatus(status);

        setOldFiles(images);
        
  
        // Switch statement to handle category-specific data
        switch (category) {
          case 'billiard': {
            const { billiards } = data;

            setBilliardsData(billiards);
            break;
          }
          case 'boxing': {
            const { boxings } = data;
            setBoxingsData(boxings);
            break;
          }
          case 'diving': {
            const { divings } = data;
            setDivingsData(divings);
            break;
          }
          case 'football': {
            const { footballs } = data;
            setFootballsData(footballs);
            break;
          }
          case 'golf': {
            const { golfs } = data;
            setGolfsData(golfs);
            break;
          }
          case 'hunting': {
            const { huntings } = data;
            setHuntingsData(huntings);
            break;
          }
          case 'gym': {
            const { musculations } = data;
            setMusculationsData(musculations);
            break;
          }
          case 'surf': {
            const { surfs } = data;
            setSurfsData(surfs);
            break;
          }
          case 'tennis': {
            const { tennis } = data;
            setTennisData(tennis);
            break;
          }
          case 'audio': {
            const { audios } = data;
            setAudiosData(audios);
            break;
          }
          case 'cameras': {
            const { cameras } = data;
            setCamerasData(cameras);
            break;
          }
          case 'chargers': {
            const { chargers } = data;
            setChargersData(chargers);
            break;
          }
          case 'drones': {
            const { drones } = data;
            setDronesData(drones);
            break;
          }
          case 'gaming': {
            const { gamings } = data;
            setGamingsData(gamings);
            break;
          }
          case 'laptops': {
            const { laptops } = data;
            setLaptopsData(laptops);
            break;
          }
          case 'lighting': {
            const { lightings } = data;
            setLightingsData(lightings);
            break;
          }
          case 'printers': {
            const { printers } = data;
            setPrintersData(printers);
            break;
          }
          case 'routers': {
            const { routers } = data;
            setRoutersData(routers);
            break;
          }
          case 'tablets': {
            const { tablettes } = data;
            setTablettesData(tablettes);
            break;
          }
          case 'eclairage': {
            const { eclairages } = data;
            setEclairagesData(eclairages);
            break;
          }
          case 'mobilier': {
            const { mobiliers } = data;
            setMobiliersData(mobiliers);
            break;
          }
          case 'photography': {
            const { photographies } = data;
            setPhotographiesData(photographies);
            break;
          }
          case 'sound-systems': {
            const { sonorisations } = data;
            setSonorisationsData(sonorisations);
            break;
          }
          case 'tents': {
            const { tentes } = data;
            setTentesData(tentes);
            break;
          }
          case 'clothes': {
            const { clothes } = data;
            setClothesData(clothes);
            break;
          }
          case 'jewelry': {
            const { jewelrys } = data;
            setJewelrysData(jewelrys);
            break;
          }
          case 'apartments': {
            const { apartments } = data;
            setApartmentsData(apartments);
            break;
          }
          case 'offices': {
            const { bureauxs } = data;
            setBureauxsData(bureauxs);
            break;
          }
          case 'shops': {
            const { magasins } = data;
            setMagasinsData(magasins);
            break;
          }
          case 'houses': {
            const { maisons } = data;
            setMaisonsData(maisons);
            break;
          }
          case 'riads': {
            const { riads } = data;
            setRiadsData(riads);
            break;
          }
          case 'lands': {
            const { terrains } = data;
            setTerrainsData(terrains);
            break;
          }
          case 'villas': {
            const { villas } = data;
            setVillasData(villas);
            break;
          }
          case 'activities': {
            const { activities } = data;
            setActivitiesData(activities);
            break;
          }
          case 'books': {
            const { livres } = data;
            setLivresData(livres);
            break;
          }
          case 'musical': {
            const { musicals } = data;
            setMusicalsData(musicals);
            break;
          }
          case 'furniture': {
            const { furnitures } = data;
            setFurnituresData(furnitures);
            break;
          }
          case 'home-appliances': {
            const { houseappliances } = data;
            setHouseappliancesData(houseappliances);
            break;
          }
          case 'electrical-tools': {
            const { electricaltools } = data;
            setElectricaltoolsData(electricaltools);
            break;
          }
          case 'ladders': {
            const { ladders } = data;
            setLaddersData(ladders);
            break;
          }
          case 'mechanical-tools': {
            const { mechanicaltools } = data;
            setMechanicaltoolsData(mechanicaltools);
            break;
          }
          case 'power-tools': {
            const { powertools } = data;
            setPowertoolsData(powertools);
            break;
          }
          case 'pressure-washers': {
            const { pressurewashers } = data;
            setPressurewashersData(pressurewashers);
            break;
          }
          case 'services': {
            const { services } = data;
            setServicesData(services);
            break;
          }

          case 'jobs': {
            const { jobs } = data;
            setJobsData(jobs);
            break;
          }

          case 'boats': {
            const { boats } = data;
            console.log("Fetched boats:", boats);

            setBoatsData(boats);
            break;
          }
          case 'trucks': {
            const { camions } = data;
            setCamionsData(camions);
            break;
          }
          case 'caravans': {
            const { caravans } = data;
            setCaravansData(caravans);
            break;
          }
          case 'cars': {
            const { cars } = data;
            setCarsData(cars);
            break;
          }
          case 'engins': {
            const { engins } = data;
            setEnginsData(engins);
            break;
          }
          case 'motorcycles': {
            const { motos } = data;
            setMotosData(motos);
            break;
          }
          case 'scooters': {
            const { scooters } = data;
            setScootersData(scooters);
            break;
          }
          case 'airport-taxis': {
            const { taxiaeroports } = data;
            setTaxiaeroportsData(taxiaeroports);
            break;
          }
          case 'transportation': {
            const { transportations } = data;
            setTransportationsData(transportations);
            break;
          }
          case 'bicycles': {
            const { velos } = data;
            setVelosData(velos);
            break;
          }
          default:
            // Handle the case where no matching category is found
            break;
        }
        
  
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);
  
  //console.log("Initial billiardsData:", billiardsData);  // This should log your initial state

  


  const updateBilliardsData = (field, value) => {
    setBilliardsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateBoxingsData = (field, value) => {
    setBoxingsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  // Add update functions for other categories
  const updateDivingsData = (field, value) => {
    setDivingsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateFootballsData = (field, value) => {
    setFootballsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateGolfsData = (field, value) => {
    setGolfsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateHuntingsData = (field, value) => {
    setHuntingsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMusculationsData = (field, value) => {
    setMusculationsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateSurfsData = (field, value) => {
    setSurfsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTennisData = (field, value) => {
    setTennisData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateAudiosData = (field, value) => {
    setAudiosData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateCamerasData = (field, value) => {
    setCamerasData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateChargersData = (field, value) => {
    setChargersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateDronesData = (field, value) => {
    setDronesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateGamingsData = (field, value) => {
    setGamingsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateLaptopsData = (field, value) => {
    setLaptopsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateLightingsData = (field, value) => {
    setLightingsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updatePrintersData = (field, value) => {
    setPrintersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateRoutersData = (field, value) => {
    setRoutersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTablettesData = (field, value) => {
    setTablettesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateEclairagesData = (field, value) => {
    setEclairagesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMobiliersData = (field, value) => {
    setMobiliersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updatePhotographiesData = (field, value) => {
    setPhotographiesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateSonorisationsData = (field, value) => {
    setSonorisationsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTentesData = (field, value) => {
    setTentesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateClothesData = (field, value) => {
    setClothesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateJewelrysData = (field, value) => {
    setJewelrysData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateApartmentsData = (field, value) => {
    setApartmentsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateBureauxsData = (field, value) => {
    setBureauxsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMagasinsData = (field, value) => {
    setMagasinsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMaisonsData = (field, value) => {
    setMaisonsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateRiadsData = (field, value) => {
    setRiadsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTerrainsData = (field, value) => {
    setTerrainsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateVillasData = (field, value) => {
    setVillasData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateActivitiesData = (field, value) => {
    setActivitiesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateLivresData = (field, value) => {
    setLivresData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMusicalsData = (field, value) => {
    setMusicalsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateFurnituresData = (field, value) => {
    setFurnituresData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateHouseappliancesData = (field, value) => {
    setHouseappliancesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateElectricaltoolsData = (field, value) => {
    setElectricaltoolsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateLaddersData = (field, value) => {
    setLaddersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMechanicaltoolsData = (field, value) => {
    setMechanicaltoolsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updatePowertoolsData = (field, value) => {
    setPowertoolsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updatePressurewashersData = (field, value) => {
    setPressurewashersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateServicesData = (field, value) => {
    setServicesData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const updateJobsData = (field, value) => {
    setJobsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateBoatsData = (field, value) => {
    setBoatsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateCamionsData = (field, value) => {
    setCamionsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateCaravansData = (field, value) => {
    setCaravansData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateCarsData = (field, value) => {
    setCarsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateEnginsData = (field, value) => {
    setEnginsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateMotosData = (field, value) => {
    setMotosData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateScootersData = (field, value) => {
    setScootersData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTaxiaeroportsData = (field, value) => {
    setTaxiaeroportsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateTransportationsData = (field, value) => {
    setTransportationsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateVelosData = (field, value) => {
    setVelosData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  

  const [isSubmitting, setIsSubmitting] = useState(false);



  const submitHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);


    if (selectedCategory.trim().length < 1) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false); 
  

    if (title.text.trim().length < 1) {
      setTitle({ ...title, error: true, textError: "The Title name is required" });
      return;
    }

  

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags < 1) {
      setDescError(true);
      return;
    }

    // Validate files
    if ((!selectedFiles || selectedFiles.length === 0) && (!oldFiles || oldFiles.length === 0)) {
      setFileError("Please select at least one image file.");
      return;
    }

  


    // Validate address fields
    if (address.address.trim().length < 1) {
      setAddressError(true);
      return;
    }

    if (address.city.trim().length < 1) {
      setCityError(true);
      return;
    }

    if (address.zip.trim().length < 1) {
      setZipError(true);
      return;
    }

    // Validate pricing fields
    if (pricing.price.trim().length < 1 || isNaN(pricing.price)) {
      setPriceError(true);
      return;
    }

    if (pricing.phone.trim().length < 1) {
      setPhoneError(true);
      return;
    }
    




    const formattedStartDate = dateRange[0].format('YYYY-MM-DD HH:mm:ss');
    const formattedEndDate = dateRange[1].format('YYYY-MM-DD HH:mm:ss');
    

    const formData = new FormData();
    formData.append('data[type]', 'listings');
    formData.append('data[attributes][category]', selectedCategory);
    formData.append('data[attributes][title]', title.text);
    formData.append('data[attributes][description]', description);
    formData.append('data[attributes][startdate]', formattedStartDate);
    formData.append('data[attributes][enddate]', formattedEndDate);
    formData.append('data[attributes][address]', address.address);
    formData.append('data[attributes][city]', address.city);
    formData.append('data[attributes][country]', address.country);
    formData.append('data[attributes][zip]', address.zip);
   
    formData.append('data[attributes][price]', pricing.price);
    formData.append('data[attributes][currency]', pricing.currency);
    formData.append('data[attributes][phone]', pricing.phone);


    




    switch (selectedCategory) {
      case 'billiard':
        Object.keys(billiardsData).forEach(key => {
          formData.append(`data[attributes][billiards][${key}]`, billiardsData[key]);
        });
        break;
      case 'boxing':
        Object.keys(boxingsData).forEach(key => {
          formData.append(`data[attributes][boxings][${key}]`, boxingsData[key]);
        });
        break;
      // Add cases for other categories with their respective data objects
      case 'diving':
        Object.keys(divingsData).forEach(key => {
          formData.append(`data[attributes][divings][${key}]`, divingsData[key]);
        });
        break;
      case 'football':
        Object.keys(footballsData).forEach(key => {
          formData.append(`data[attributes][footballs][${key}]`, footballsData[key]);
        });
        break;
      case 'golf':
        Object.keys(golfsData).forEach(key => {
          formData.append(`data[attributes][golfs][${key}]`, golfsData[key]);
        });
        break;
      case 'hunting':
        Object.keys(huntingsData).forEach(key => {
          formData.append(`data[attributes][huntings][${key}]`, huntingsData[key]);
        });
        break;
      case 'gym':
        Object.keys(musculationsData).forEach(key => {
          formData.append(`data[attributes][musculations][${key}]`, musculationsData[key]);
        });
        break;
      case 'surf':
        Object.keys(surfsData).forEach(key => {
          formData.append(`data[attributes][surfs][${key}]`, surfsData[key]);
        });
        break;
      case 'tennis':
        Object.keys(tennisData).forEach(key => {
          formData.append(`data[attributes][tennis][${key}]`, tennisData[key]);
        });
        break;
      case 'audio':
        Object.keys(audiosData).forEach(key => {
          formData.append(`data[attributes][audios][${key}]`, audiosData[key]);
        });
        break;
      case 'cameras':
        Object.keys(camerasData).forEach(key => {
          formData.append(`data[attributes][cameras][${key}]`, camerasData[key]);
        });
        break;
      case 'chargers':
        Object.keys(chargersData).forEach(key => {
          formData.append(`data[attributes][chargers][${key}]`, chargersData[key]);
        });
        break;
      case 'drones':
        Object.keys(dronesData).forEach(key => {
          formData.append(`data[attributes][drones][${key}]`, dronesData[key]);
        });
        break;
      case 'gaming':
        Object.keys(gamingsData).forEach(key => {
          formData.append(`data[attributes][gamings][${key}]`, gamingsData[key]);
        });
        break;
      case 'laptops':
        Object.keys(laptopsData).forEach(key => {
          formData.append(`data[attributes][laptops][${key}]`, laptopsData[key]);
        });
        break;
      case 'lighting':
        Object.keys(lightingsData).forEach(key => {
          formData.append(`data[attributes][lightings][${key}]`, lightingsData[key]);
        });
        break;
      case 'printers':
        Object.keys(printersData).forEach(key => {
          formData.append(`data[attributes][printers][${key}]`, printersData[key]);
        });
        break;
      case 'routers':
        Object.keys(routersData).forEach(key => {
          formData.append(`data[attributes][routers][${key}]`, routersData[key]);
        });
        break;
      case 'tablets':
        Object.keys(tablettesData).forEach(key => {
          formData.append(`data[attributes][tablettes][${key}]`, tablettesData[key]);
        });
        break;
      case 'eclairage':
        Object.keys(eclairagesData).forEach(key => {
          formData.append(`data[attributes][eclairages][${key}]`, eclairagesData[key]);
        });
        break;
      case 'mobilier':
        Object.keys(mobiliersData).forEach(key => {
          formData.append(`data[attributes][mobiliers][${key}]`, mobiliersData[key]);
        });
        break;
      case 'photography':
        Object.keys(photographiesData).forEach(key => {
          formData.append(`data[attributes][photographies][${key}]`, photographiesData[key]);
        });
        break;
      case 'sound-systems':
        Object.keys(sonorisationsData).forEach(key => {
          formData.append(`data[attributes][sonorisations][${key}]`, sonorisationsData[key]);
        });
        break;
      case 'tents':
        Object.keys(tentesData).forEach(key => {
          formData.append(`data[attributes][tentes][${key}]`, tentesData[key]);
        });
        break;
      case 'clothes':
        Object.keys(clothesData).forEach(key => {
          formData.append(`data[attributes][clothes][${key}]`, clothesData[key]);
        });
        break;
      case 'jewelry':
        Object.keys(jewelrysData).forEach(key => {
          formData.append(`data[attributes][jewelrys][${key}]`, jewelrysData[key]);
        });
        break;
      case 'apartments':
        Object.keys(apartmentsData).forEach(key => {
          formData.append(`data[attributes][apartments][${key}]`, apartmentsData[key]);
        });
        break;
      case 'offices':
        Object.keys(bureauxsData).forEach(key => {
          formData.append(`data[attributes][bureauxs][${key}]`, bureauxsData[key]);
        });
        break;
      case 'shops':
        Object.keys(magasinsData).forEach(key => {
          formData.append(`data[attributes][magasins][${key}]`, magasinsData[key]);
        });
        break;
      case 'houses':
        Object.keys(maisonsData).forEach(key => {
          formData.append(`data[attributes][maisons][${key}]`, maisonsData[key]);
        });
        break;
      case 'riads':
        Object.keys(riadsData).forEach(key => {
          formData.append(`data[attributes][riads][${key}]`, riadsData[key]);
        });
        break;
      case 'lands':
        Object.keys(terrainsData).forEach(key => {
          formData.append(`data[attributes][terrains][${key}]`, terrainsData[key]);
        });
        break;
      case 'villas':
        Object.keys(villasData).forEach(key => {
          formData.append(`data[attributes][villas][${key}]`, villasData[key]);
        });
        break;
      case 'activities':
        Object.keys(activitiesData).forEach(key => {
          formData.append(`data[attributes][activities][${key}]`, activitiesData[key]);
        });
        break;
      case 'books':
        Object.keys(livresData).forEach(key => {
          formData.append(`data[attributes][livres][${key}]`, livresData[key]);
        });
        break;
      case 'musical':
        Object.keys(musicalsData).forEach(key => {
          formData.append(`data[attributes][musicals][${key}]`, musicalsData[key]);
        });
        break;
      case 'furniture':
        Object.keys(furnituresData).forEach(key => {
          formData.append(`data[attributes][furnitures][${key}]`, furnituresData[key]);
        });
        break;
      case 'home-appliances':
        Object.keys(houseappliancesData).forEach(key => {
          formData.append(`data[attributes][houseappliances][${key}]`, houseappliancesData[key]);
        });
        break;
      case 'electrical-tools':
        Object.keys(electricaltoolsData).forEach(key => {
          formData.append(`data[attributes][electricaltools][${key}]`, electricaltoolsData[key]);
        });
        break;
      case 'ladders':
        Object.keys(laddersData).forEach(key => {
          formData.append(`data[attributes][ladders][${key}]`, laddersData[key]);
        });
        break;
      case 'mechanical-tools':
        Object.keys(mechanicaltoolsData).forEach(key => {
          formData.append(`data[attributes][mechanicaltools][${key}]`, mechanicaltoolsData[key]);
        });
        break;
      case 'power-tools':
        Object.keys(powertoolsData).forEach(key => {
          formData.append(`data[attributes][powertools][${key}]`, powertoolsData[key]);
        });
        break;
      case 'pressure-washers':
        Object.keys(pressurewashersData).forEach(key => {
          formData.append(`data[attributes][pressurewashers][${key}]`, pressurewashersData[key]);
        });
        break;
      case 'services':
        Object.keys(servicesData).forEach(key => {
          formData.append(`data[attributes][services][${key}]`, servicesData[key]);
        });
        break;

      case 'jobs':
          Object.keys(jobsData).forEach(key => {
            formData.append(`data[attributes][jobs][${key}]`, jobsData[key]);
          });
          break;
      case 'boats':
        Object.keys(boatsData).forEach(key => {
          formData.append(`data[attributes][boats][${key}]`, boatsData[key]);
        });
        break;
      case 'trucks':
        Object.keys(camionsData).forEach(key => {
          formData.append(`data[attributes][camions][${key}]`, camionsData[key]);
        });
        break;
      case 'caravans':
        Object.keys(caravansData).forEach(key => {
          formData.append(`data[attributes][caravans][${key}]`, caravansData[key]);
        });
        break;
      case 'cars':
        Object.keys(carsData).forEach(key => {
          formData.append(`data[attributes][cars][${key}]`, carsData[key]);
        });
        break;
      case 'engins':
        Object.keys(enginsData).forEach(key => {
          formData.append(`data[attributes][engins][${key}]`, enginsData[key]);
        });
        break;
      case 'motorcycles':
        Object.keys(motosData).forEach(key => {
          formData.append(`data[attributes][motos][${key}]`, motosData[key]);
        });
        break;
      case 'scooters':
        Object.keys(scootersData).forEach(key => {
          formData.append(`data[attributes][scooters][${key}]`, scootersData[key]);
        });
        break;
      case 'airport-taxis':
        Object.keys(taxiaeroportsData).forEach(key => {
          formData.append(`data[attributes][taxiaeroports][${key}]`, taxiaeroportsData[key]);
        });
        break;
      case 'transportation':
        Object.keys(transportationsData).forEach(key => {
          formData.append(`data[attributes][transportations][${key}]`, transportationsData[key]);
        });
        break;
      case 'bicycles':
        Object.keys(velosData).forEach(key => {
          formData.append(`data[attributes][velos][${key}]`, velosData[key]);
        });
        break;
      default:
        break;
    }
















    try {

          let response = null; 

        
          if (selectedFiles && selectedFiles.some(file => file instanceof File)) {
            const formData = new FormData();
        
            // Append only valid files (instances of File)
            selectedFiles.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append(`attachment[${index}]`, file);
                    console.log('Appending file:', file.name);
                }
            });
        
            formData.append('selectedCategory', selectedCategory);
        
            // Send the file upload request only if there are valid files
             response = await CrudService.imageUploadListing(formData);
            
            
          } 
        
      
      
    



        const updatedListing = {
          type: 'listings',
          attributes: {
              category: selectedCategory,
              title: title.text,
              description: description,
              startdate: formattedStartDate,
              enddate: formattedEndDate,
              address: address.address,
              city: address.city,
              country: address.country,
              zip: address.zip,
              price: pricing.price,
              currency: pricing.currency,
              phone: pricing.phone,

              imagePathslarge: null,
              imagePathssmall: null,
              imagePathsxlarge: null,
              thumb: null,
              
              
              oldimagePathslarge: oldFiles, 
              
            ...(selectedCategory === 'billiard' && { billiards: billiardsData }),
            ...(selectedCategory === 'boxing' && { boxings: boxingsData }),
            ...(selectedCategory === 'diving' && { divings: divingsData }),
            ...(selectedCategory === 'football' && { footballs: footballsData }),
            ...(selectedCategory === 'golf' && { golfs: golfsData }),
            ...(selectedCategory === 'hunting' && { huntings: huntingsData }),
            ...(selectedCategory === 'gym' && { musculations: musculationsData }),
            ...(selectedCategory === 'surf' && { surfs: surfsData }),
            ...(selectedCategory === 'tennis' && { tennis: tennisData }),
            ...(selectedCategory === 'audio' && { audios: audiosData }),
            ...(selectedCategory === 'cameras' && { cameras: camerasData }),
            ...(selectedCategory === 'chargers' && { chargers: chargersData }),
            ...(selectedCategory === 'drones' && { drones: dronesData }),
            ...(selectedCategory === 'gaming' && { gamings: gamingsData }),
            ...(selectedCategory === 'laptops' && { laptops: laptopsData }),
            ...(selectedCategory === 'lighting' && { lightings: lightingsData }),
            ...(selectedCategory === 'printers' && { printers: printersData }),
            ...(selectedCategory === 'routers' && { routers: routersData }),
            ...(selectedCategory === 'tablets' && { tablettes: tablettesData }),
            ...(selectedCategory === 'eclairage' && { eclairages: eclairagesData }),
            ...(selectedCategory === 'mobilier' && { mobiliers: mobiliersData }),
            ...(selectedCategory === 'photography' && { photographies: photographiesData }),
            ...(selectedCategory === 'sound-systems' && { sonorisations: sonorisationsData }),
            ...(selectedCategory === 'tents' && { tentes: tentesData }),
            ...(selectedCategory === 'clothes' && { clothes: clothesData }),
            ...(selectedCategory === 'jewelry' && { jewelrys: jewelrysData }),
            ...(selectedCategory === 'apartments' && { apartments: apartmentsData }),
            ...(selectedCategory === 'offices' && { bureauxs: bureauxsData }),
            ...(selectedCategory === 'shops' && { magasins: magasinsData }),
            ...(selectedCategory === 'houses' && { maisons: maisonsData }),
            ...(selectedCategory === 'riads' && { riads: riadsData }),
            ...(selectedCategory === 'lands' && { terrains: terrainsData }),
            ...(selectedCategory === 'villas' && { villas: villasData }),
            ...(selectedCategory === 'activities' && { activities: activitiesData }),
            ...(selectedCategory === 'books' && { livres: livresData }),
            ...(selectedCategory === 'musical' && { musicals: musicalsData }),
            ...(selectedCategory === 'furniture' && { furnitures: furnituresData }),
            ...(selectedCategory === 'home-appliances' && { houseappliances: houseappliancesData }),
            ...(selectedCategory === 'electrical-tools' && { electricaltools: electricaltoolsData }),
            ...(selectedCategory === 'ladders' && { ladders: laddersData }),
            ...(selectedCategory === 'mechanical-tools' && { mechanicaltools: mechanicaltoolsData }),
            ...(selectedCategory === 'power-tools' && { powertools: powertoolsData }),
            ...(selectedCategory === 'pressure-washers' && { pressurewashers: pressurewashersData }),
            ...(selectedCategory === 'services' && { services: servicesData }),
            ...(selectedCategory === 'jobs' && { jobs: jobsData }),

            ...(selectedCategory === 'boats' && { boats: boatsData }),
            ...(selectedCategory === 'trucks' && { camions: camionsData }),
            ...(selectedCategory === 'caravans' && { caravans: caravansData }),
            ...(selectedCategory === 'cars' && { cars: carsData }),
            ...(selectedCategory === 'engins' && { engins: enginsData }),
            ...(selectedCategory === 'motorcycles' && { motos: motosData }),
            ...(selectedCategory === 'scooters' && { scooters: scootersData }),
            ...(selectedCategory === 'airport-taxis' && { taxiaeroports: taxiaeroportsData }),
            ...(selectedCategory === 'transportation' && { transportations: transportationsData }),
            ...(selectedCategory === 'bicycles' && { velos: velosData }),  
          }
        };
        

        if (response) {
          
        
          
            updatedListing.attributes.imagePathslarge = response.imagePathslarge.slice(); // Use slice() to copy the array
          
          
            updatedListing.attributes.imagePathssmall = response.imagePathssmall.slice(); // Use slice() to copy the array
          
          
            updatedListing.attributes.imagePathsxlarge = response.imagePathsxlarge.slice(); // Use slice() to copy the array
          
          
            updatedListing.attributes.thumb = response.thumb; // Assign the thumb value
          
        }
        
        




      await CrudService.updateListing(updatedListing, id);
      navigate("/listing/all", {
        state: { value: true, text: "The Listing was successfully updated" },
      });
    } catch (err) {
      console.error(err);
      // Handle error
    }

    setIsSubmitting(false);

  };








  const [selectedStatus, setSelectedStatus] = useState(data?.attributes?.status || "");
  const [initialStatus, setInitialStatus] = useState(data?.attributes?.status || "");
  
  // Update the selected status and track changes
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus.value);
  };
  
  // Handle the status update when the save button is clicked
  const handleSave = async () => {
    try {
      const payload = { status: selectedStatus };
      const response = await CrudService.updateListingStatus(payload, id);
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          attributes: {
            ...prevData.attributes,
            status: selectedStatus,
          },
        }));
        // Reset the initial status to the newly saved status
        setInitialStatus(selectedStatus);
      }
    } catch (error) {
      console.error(`Error updating reservation status to ${selectedStatus}:`, error);
    }
  };






  return (
    <DashboardLayout>
      <SoftBox my={3} mb={10} c>




        {data && (<ListingDetailsToolbar
            backLink="/reservation/list"
            listingNumber={data?.id}
            createdAt={data?.created_at}
            status={data?.status}
            title="Delete"
            clickAddHandler={clickDeleteHandler}
            
            clickOpenHandler={() => clickOpenHandler(category, url)}

            statusOptions={[
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
          />
        )}



          

          <SoftBox  >


            <Grid container spacing={3}>

                  
                  
                  
                  <Grid item xs={12} lg={8} component="form" method="POST" onSubmit={submitHandler}>



                        <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                          <SoftBox p={2}>
                            <SoftBox>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} mt={1}>
                                  <SoftBox mb={3}>
                                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                      <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                                        Category

                                        <span style={{ color: "red",}}> * </span>

                                      </SoftTypography>
                                    </SoftBox>
                                    <SoftSelect

                                      value={{ value: selectedCategory, label: selectedCategory || "Select Category" }}
                                      options={[
                            
                                        { value: "boats", label: "Boats", icon: BoatsIcon },
                                        { value: "trucks", label: "Trucks", icon: CamionsIcon },
                                        { value: "caravans", label: "Caravans", icon: CaravansIcon },
                                        { value: "cars", label: "Cars", icon: CarsIcon },
                                        { value: "engins", label: "Engins", icon: EnginsIcon },
                                        { value: "motorcycles", label: "Motorcycles", icon: MotosIcon },
                                        { value: "scooters", label: "Scooters", icon: ScootersIcon },
                                        { value: "airport-taxis", label: "Airport Taxis", icon: TaxiaeroportsIcon },
                                        { value: "transportation", label: "Transportation", icon: TransportationsIcon },
                                        { value: "bicycles", label: "Bicycles", icon: VelosIcon },
                                        { value: "apartments", label: "Apartments", icon: ApartmentsIcon },
                                        { value: "offices", label: "Offices", icon: BureauxsIcon },
                                        { value: "shops", label: "Shops", icon: MagasinsIcon },
                                        { value: "houses", label: "Houses", icon: MaisonsIcon },
                                        { value: "riads", label: "Riads", icon: RiadsIcon },
                                        { value: "lands", label: "Lands", icon: TerrainsIcon },
                                        { value: "villas", label: "Villas", icon: VillasIcon },
                                        { value: "services", label: "Services", icon: ServicesIcon },
                                        { value: "jobs", label: "Jobs", icon: JobsIcon },
            
                                        { value: "audio", label: "Audio", icon: AudiosIcon },
                                        { value: "cameras", label: "Cameras", icon: CamerasIcon },
                                        { value: "chargers", label: "Chargers", icon: ChargersIcon },
                                        { value: "drones", label: "Drones", icon: DronesIcon },
                                        { value: "gaming", label: "Gaming", icon: GamingsIcon },
                                        { value: "laptops", label: "Laptops", icon: LaptopsIcon },
                                        { value: "lighting", label: "Lighting", icon: LightingsIcon },
                                        { value: "printers", label: "Printers", icon: PrintersIcon },
                                        { value: "routers", label: "Routers", icon: RoutersIcon },
                                        { value: "tablets", label: "Tablets", icon: TablettesIcon },
                                        { value: "electrical-tools", label: "Electrical Tools", icon: ElectricaltoolsIcon },
                                        { value: "ladders", label: "Ladders", icon: LaddersIcon },
                                        { value: "mechanical-tools", label: "Mechanical Tools", icon: MechanicaltoolsIcon },
                                        { value: "power-tools", label: "Power Tools", icon: PowertoolsIcon },
                                        { value: "pressure-washers", label: "Pressure Washers", icon: PressurewashersIcon },
                                        { value: "billiard", label: "Billiard", icon: BilliardsIcon },
                                        { value: "boxing", label: "Boxing", icon: BoxingsIcon },
                                        { value: "diving", label: "Diving", icon: DivingsIcon },
                                        { value: "football", label: "Football", icon: FootballsIcon },
                                        { value: "golf", label: "Golf", icon: GolfsIcon },
                                        { value: "hunting", label: "Hunting", icon: HuntingsIcon },
                                        { value: "gym", label: "Gym", icon: MusculationsIcon },
                                        { value: "surf", label: "Surf", icon: SurfsIcon },
                                        { value: "tennis", label: "Tennis", icon: TennisIcon },
                                        { value: "clothes", label: "Clothes", icon: ClothesIcon },
                                        { value: "jewelry", label: "Jewelry", icon: JewelrysIcon },
                                        { value: "activities", label: "Activities", icon: ActivitiesIcon },
                                        { value: "books", label: "Books", icon: LivresIcon },
                                        { value: "musical", label: "Musical", icon: MusicalsIcon },
                                        { value: "furniture", label: "Furniture", icon: FurnituresIcon },
                                        { value: "home-appliances", label: "Home Appliances", icon: HouseappliancesIcon },
                                        { value: "eclairage", label: "Eclairage", icon: EclairagesIcon },
                                        { value: "mobilier", label: "Mobilier", icon: MobiliersIcon },
                                        { value: "photography", label: "Photography", icon: PhotographiesIcon },
                                        { value: "sound-systems", label: "Sound Systems", icon: SonorisationsIcon },
                                        { value: "tents", label: "Tents", icon: TentesIcon }
                                      ]}




                                      onChange={handleCategoryChange}

                                      error={categoryError}

                                    />

                                      {categoryError && (
                                        <SoftTypography variant="caption" color="error" fontWeight="light">
                                          Please select a category
                                        </SoftTypography>
                                      )}

                                  </SoftBox>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <SoftBox p={1}>
                                    <FormField
                                      type="text"
                                      placeholder="apartment for rent..."
                                      label="Title"
                                      name="title"
                                      value={title.text}
                                      onChange={changeTitleHandler}
                                      error={title.error}
                                    />
                                    {title.error && (
                                      <SoftTypography variant="caption" color="error" fontWeight="light">
                                        {title.textError}
                                      </SoftTypography>
                                    )}
                                  </SoftBox>
                                </Grid>
                              </Grid>
                            </SoftBox>
                            <SoftBox mt={3}>
                              <SoftBox mt={2}>
                                <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                                    Description 

                                    <span style={{ color: "red",}}> * </span>

                                  </SoftTypography>
                                </SoftBox>
                                <SoftEditor value={description} 


                                    onChange={(value) => {
                                      setDescription(value);

                                      // Remove error when description is not empty
                                      if (value.replace(/(<([^>]+)>)/gi, "").trim().length > 0) {
                                        setDescError(false);
                                      }
                                    }}
                                
                                
                                
                                />
                                {descError && (
                                  <SoftTypography variant="caption" color="error" fontWeight="light">
                                    The Description description is required
                                  </SoftTypography>
                                )}
                              </SoftBox>
                            </SoftBox>
                            <SoftBox mt={8}>
                              
                                
                                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                      <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                                          Availability

                                          <span style={{ color: "red",}}> * </span>

                                      </SoftTypography>
                                    </SoftBox>
                                    <SoftBox mt={2}>
                                      <DateRange value={dateRange} onChange={setDateRange} />
                                    </SoftBox>
                              
                            </SoftBox>
                          </SoftBox>
                        </Card>




                        <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>


                          <SoftBox p={2}>



                                {getCategory(
                                  selectedCategory,
                                  updateBilliardsData,
                                  updateBoxingsData,
                                  updateDivingsData,
                                  updateFootballsData,
                                  updateGolfsData,
                                  updateHuntingsData,
                                  updateMusculationsData,
                                  updateSurfsData,
                                  updateTennisData,
                                  updateAudiosData,
                                  updateCamerasData,
                                  updateChargersData,
                                  updateDronesData,
                                  updateGamingsData,
                                  updateLaptopsData,
                                  updateLightingsData,
                                  updatePrintersData,
                                  updateRoutersData,
                                  updateTablettesData,
                                  updateEclairagesData,
                                  updateMobiliersData,
                                  updatePhotographiesData,
                                  updateSonorisationsData,
                                  updateTentesData,
                                  updateClothesData,
                                  updateJewelrysData,
                                  updateApartmentsData,
                                  updateBureauxsData,
                                  updateMagasinsData,
                                  updateMaisonsData,
                                  updateRiadsData,
                                  updateTerrainsData,
                                  updateVillasData,
                                  updateActivitiesData,
                                  updateLivresData,
                                  updateMusicalsData,
                                  updateFurnituresData,
                                  updateHouseappliancesData,
                                  updateElectricaltoolsData,
                                  updateLaddersData,
                                  updateMechanicaltoolsData,
                                  updatePowertoolsData,
                                  updatePressurewashersData,
                                  updateServicesData,
                                  updateJobsData,

                                  updateBoatsData,
                                  updateCamionsData,
                                  updateCaravansData,
                                  updateCarsData,
                                  updateEnginsData,
                                  updateMotosData,
                                  updateScootersData,
                                  updateTaxiaeroportsData,
                                  updateTransportationsData,
                                  updateVelosData,


                                  billiardsData,
                                  boxingsData,
                                  divingsData,
                                  footballsData,
                                  golfsData,
                                  huntingsData,
                                  musculationsData,
                                  surfsData,
                                  tennisData,
                                  audiosData,
                                  camerasData,
                                  chargersData,
                                  dronesData,
                                  gamingsData,
                                  laptopsData,
                                  lightingsData,
                                  printersData,
                                  routersData,
                                  tablettesData,
                                  eclairagesData,
                                  mobiliersData,
                                  photographiesData,
                                  sonorisationsData,
                                  tentesData,
                                  clothesData,
                                  jewelrysData,
                                  apartmentsData,
                                  bureauxsData,
                                  magasinsData,
                                  maisonsData,
                                  riadsData,
                                  terrainsData,
                                  villasData,
                                  activitiesData,
                                  livresData,
                                  musicalsData,
                                  furnituresData,
                                  houseappliancesData,
                                  electricaltoolsData,
                                  laddersData,
                                  mechanicaltoolsData,
                                  powertoolsData,
                                  pressurewashersData,
                                  servicesData,
                                  jobsData,

                                  boatsData,
                                  camionsData,
                                  caravansData,
                                  carsData,
                                  enginsData,
                                  motosData,
                                  scootersData,
                                  taxiaeroportsData,
                                  transportationsData,
                                  velosData
                                  
                                )}






                          </SoftBox>
                        </Card>





                        <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                          <SoftBox p={2}>


                            <SoftBox >

                              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                                Images 
                                <span style={{ color: "red" }}> * </span>
                                  (JPG, JPEG, PNG, GIF, WEBP, TIFF. Max size: 6MB)
                                  
                              </SoftTypography>
                              
                              <CustomFileInput onFilesChange={handleFilesChange} oldFiles={oldFiles}/>


                              {fileError && (
                                <SoftTypography variant="caption" color="error" fontWeight="light">
                                  {fileError}
                                </SoftTypography>
                              )}



                            </SoftBox>
                          </SoftBox>
                        </Card>


                        <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                          <SoftBox p={2}>


                            <Address address={address} onAddressChange={handleAddressChange} 
                                            addressError={addressError} 
                                            cityError={cityError} 
                                            zipError={zipError} 
                            
                            />
                          </SoftBox>
                        </Card>
                        <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                          <SoftBox p={2}>
                            <Pricing pricing={pricing} onPricingChange={handlePricingChange}  onSelectChange={handleSelectChange} 
                                            priceError={priceError} 
                                            phoneError={phoneError} 
                            
                            />
                          </SoftBox>
                        </Card>




                        <SoftBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                          <SoftButton sx={{ py: 1.5 }}  variant="gradient" color="info" size="small" type="submit">
                            Save
                          </SoftButton>
                        </SoftBox>
                  </Grid>


                  <Grid item xs={12} lg={4}>


                            <Grid item xs={12}>
                              <SoftBox mb={3}>



                                  <Card sx={{ overflow: "visible", mt: 2 }}>
                                    <SoftBox mb={3} sx={{ p: 2 }} >
                                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                        <SoftTypography
                                          component="label"
                                          variant="caption"
                                          fontWeight="bold"
                                          textTransform="capitalize"
                                        >
                                          Status
                                        </SoftTypography>
                                      </SoftBox>
                                      <SoftSelect
                                        
                                        value={{ value: selectedStatus, label: selectedStatus || "Select Status" }}

                                        options={[
                                        
                                          { value: "active", label: "Active" },
                                          { value: "draft", label: "Draft" },
                                          { value: "pending", label: "Pending" },

                                        ]}
                                        onChange={handleStatusChange}
                                      />
                                    </SoftBox>

                                      {/* Only show the save button if the status has changed */}
                                      {selectedStatus !== initialStatus && (
                                        <SoftBox mb={2} display="flex" justifyContent="center">
                                          <SoftButton onClick={handleSave} variant="gradient" color="info" size="small"
                                          
                                          disabled={isSubmitting} // Disable the button when submitting


                                          >
                                                              {isSubmitting ? "Saving..." : "Save"} {/* Optional: show different text */}

                                          </SoftButton>
                                        </SoftBox>
                                      )}


                                  </Card>





                              </SoftBox>
                            </Grid>


                            
                            
                  </Grid>

                  
            </Grid>

          </SoftBox>


      </SoftBox>
    </DashboardLayout>
  );
}

export default EditListing;
