/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import Pricing from "admin/listing/all/create-listing/components/Pricing";
import Address from "components/Address";
import CustomFileInput from "admin/listing/all/create-listing/components/CustomFileInput";
import SoftEditor from "components/MDEditor";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DateRange from "components/DateRange";
import dayjs from 'dayjs';

import CrudService from "services/cruds-service";

// NewProduct page components
import FormField from "admin/components/FormField";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


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
  updateBoatsData,
  updateCamionsData,
  updateCaravansData,
  updateCarsData,
  updateEnginsData,
  updateMotosData,
  updateScootersData,
  updateTaxiaeroportsData,
  updateTransportationsData,
  updateVelosData
) {
  switch (category) {
    case 'billiards':
      return <Billiards onDataChange={updateBilliardsData} />;
    case 'boxings':
      return <Boxings onDataChange={updateBoxingsData} />;
    case 'divings':
      return <Divings onDataChange={updateDivingsData} />;
    case 'footballs':
      return <Footballs onDataChange={updateFootballsData} />;
    case 'golfs':
      return <Golfs onDataChange={updateGolfsData} />;
    case 'huntings':
      return <Huntings onDataChange={updateHuntingsData} />;
    case 'musculations':
      return <Musculations onDataChange={updateMusculationsData} />;
    case 'surfs':
      return <Surfs onDataChange={updateSurfsData} />;
    case 'tennis':
      return <Tennis onDataChange={updateTennisData} />;
    case 'audios':
      return <Audios onDataChange={updateAudiosData} />;
    case 'cameras':
      return <Cameras onDataChange={updateCamerasData} />;
    case 'chargers':
      return <Chargers onDataChange={updateChargersData} />;
    case 'drones':
      return <Drones onDataChange={updateDronesData} />;
    case 'gamings':
      return <Gamings onDataChange={updateGamingsData} />;
    case 'laptops':
      return <Laptops onDataChange={updateLaptopsData} />;
    case 'lightings':
      return <Lightings onDataChange={updateLightingsData} />;
    case 'printers':
      return <Printers onDataChange={updatePrintersData} />;
    case 'routers':
      return <Routers onDataChange={updateRoutersData} />;
    case 'tablettes':
      return <Tablettes onDataChange={updateTablettesData} />;
    case 'eclairages':
      return <Eclairages onDataChange={updateEclairagesData} />;
    case 'mobiliers':
      return <Mobiliers onDataChange={updateMobiliersData} />;
    case 'photographies':
      return <Photographies onDataChange={updatePhotographiesData} />;
    case 'sonorisations':
      return <Sonorisations onDataChange={updateSonorisationsData} />;
    case 'tentes':
      return <Tentes onDataChange={updateTentesData} />;
    case 'clothes':
      return <Clothes onDataChange={updateClothesData} />;
    case 'jewelrys':
      return <Jewelrys onDataChange={updateJewelrysData} />;
    case 'apartments':
      return <Apartments onDataChange={updateApartmentsData} />;
    case 'bureauxs':
      return <Bureauxs onDataChange={updateBureauxsData} />;
    case 'magasins':
      return <Magasins onDataChange={updateMagasinsData} />;
    case 'maisons':
      return <Maisons onDataChange={updateMaisonsData} />;
    case 'riads':
      return <Riads onDataChange={updateRiadsData} />;
    case 'terrains':
      return <Terrains onDataChange={updateTerrainsData} />;
    case 'villas':
      return <Villas onDataChange={updateVillasData} />;
    case 'activities':
      return <Activities onDataChange={updateActivitiesData} />;
    case 'livres':
      return <Livres onDataChange={updateLivresData} />;
    case 'musicals':
      return <Musicals onDataChange={updateMusicalsData} />;
    case 'furnitures':
      return <Furnitures onDataChange={updateFurnituresData} />;
    case 'houseappliances':
      return <Houseappliances onDataChange={updateHouseappliancesData} />;
    case 'electricaltools':
      return <Electricaltools onDataChange={updateElectricaltoolsData} />;
    case 'ladders':
      return <Ladders onDataChange={updateLaddersData} />;
    case 'mechanicaltools':
      return <Mechanicaltools onDataChange={updateMechanicaltoolsData} />;
    case 'powertools':
      return <Powertools onDataChange={updatePowertoolsData} />;
    case 'pressurewashers':
      return <Pressurewashers onDataChange={updatePressurewashersData} />;
    case 'services':
      return <Services onDataChange={updateServicesData} />;
    case 'boats':
      return <Boats onDataChange={updateBoatsData} />;
    case 'camions':
      return <Camions onDataChange={updateCamionsData} />;
    case 'caravans':
      return <Caravans onDataChange={updateCaravansData} />;
    case 'cars':
      return <Cars onDataChange={updateCarsData} />;
    case 'engins':
      return <Engins onDataChange={updateEnginsData} />;
    case 'motos':
      return <Motos onDataChange={updateMotosData} />;
    case 'scooters':
      return <Scooters onDataChange={updateScootersData} />;
    case 'taxiaeroports':
      return <Taxiaeroports onDataChange={updateTaxiaeroportsData} />;
    case 'transportations':
      return <Transportations onDataChange={updateTransportationsData} />;
    case 'velos':
      return <Velos onDataChange={updateVelosData} />;
    default:
      return null;
  }
}




function CreateListing() {
  const { t } = useTranslation();

  const navigate = useNavigate();






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
      language: '',
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
      responseTime: '',
      package: '',
      revisions: [],
      level: '',
      ordersQueue: '',
      jobsCompleted: '',
      repeatHireRate: '',
      education: '',
      onTime: [],
      deliveryTime: '',
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
    currency: "dh", // Default currency
    phone: "",
    
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, 'year')]);

  const handlePricingChange = (e) => {
    setPricing({ ...pricing, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setPricing({ ...pricing, [name]: value });
  };


  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };


  const changeTitleHandler = (e) => {
    setTitle({ ...title, text: e.target.value });
  };

 
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
  };












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
  















  const submitHandler = async (e) => {
    e.preventDefault();

    if (title.text.trim().length < 1) {
      setTitle({ ...title, error: true, textError: "The Title name is required" });
      return;
    }

  

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags < 1) {
      setDescError(true);
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


    selectedFiles.forEach((file, index) => {
      formData.append(`data[attributes][images][${index}]`, file);
    });





    switch (selectedCategory) {
      case 'billiards':
        Object.keys(billiardsData).forEach(key => {
          formData.append(`data[attributes][billiards][${key}]`, billiardsData[key]);
        });
        break;
      case 'boxings':
        Object.keys(boxingsData).forEach(key => {
          formData.append(`data[attributes][boxings][${key}]`, boxingsData[key]);
        });
        break;
      // Add cases for other categories with their respective data objects
      case 'divings':
        Object.keys(divingsData).forEach(key => {
          formData.append(`data[attributes][divings][${key}]`, divingsData[key]);
        });
        break;
      case 'footballs':
        Object.keys(footballsData).forEach(key => {
          formData.append(`data[attributes][footballs][${key}]`, footballsData[key]);
        });
        break;
      case 'golfs':
        Object.keys(golfsData).forEach(key => {
          formData.append(`data[attributes][golfs][${key}]`, golfsData[key]);
        });
        break;
      case 'huntings':
        Object.keys(huntingsData).forEach(key => {
          formData.append(`data[attributes][huntings][${key}]`, huntingsData[key]);
        });
        break;
      case 'musculations':
        Object.keys(musculationsData).forEach(key => {
          formData.append(`data[attributes][musculations][${key}]`, musculationsData[key]);
        });
        break;
      case 'surfs':
        Object.keys(surfsData).forEach(key => {
          formData.append(`data[attributes][surfs][${key}]`, surfsData[key]);
        });
        break;
      case 'tennis':
        Object.keys(tennisData).forEach(key => {
          formData.append(`data[attributes][tennis][${key}]`, tennisData[key]);
        });
        break;
      case 'audios':
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
      case 'gamings':
        Object.keys(gamingsData).forEach(key => {
          formData.append(`data[attributes][gamings][${key}]`, gamingsData[key]);
        });
        break;
      case 'laptops':
        Object.keys(laptopsData).forEach(key => {
          formData.append(`data[attributes][laptops][${key}]`, laptopsData[key]);
        });
        break;
      case 'lightings':
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
      case 'tablettes':
        Object.keys(tablettesData).forEach(key => {
          formData.append(`data[attributes][tablettes][${key}]`, tablettesData[key]);
        });
        break;
      case 'eclairages':
        Object.keys(eclairagesData).forEach(key => {
          formData.append(`data[attributes][eclairages][${key}]`, eclairagesData[key]);
        });
        break;
      case 'mobiliers':
        Object.keys(mobiliersData).forEach(key => {
          formData.append(`data[attributes][mobiliers][${key}]`, mobiliersData[key]);
        });
        break;
      case 'photographies':
        Object.keys(photographiesData).forEach(key => {
          formData.append(`data[attributes][photographies][${key}]`, photographiesData[key]);
        });
        break;
      case 'sonorisations':
        Object.keys(sonorisationsData).forEach(key => {
          formData.append(`data[attributes][sonorisations][${key}]`, sonorisationsData[key]);
        });
        break;
      case 'tentes':
        Object.keys(tentesData).forEach(key => {
          formData.append(`data[attributes][tentes][${key}]`, tentesData[key]);
        });
        break;
      case 'clothes':
        Object.keys(clothesData).forEach(key => {
          formData.append(`data[attributes][clothes][${key}]`, clothesData[key]);
        });
        break;
      case 'jewelrys':
        Object.keys(jewelrysData).forEach(key => {
          formData.append(`data[attributes][jewelrys][${key}]`, jewelrysData[key]);
        });
        break;
      case 'apartments':
        Object.keys(apartmentsData).forEach(key => {
          formData.append(`data[attributes][apartments][${key}]`, apartmentsData[key]);
        });
        break;
      case 'bureauxs':
        Object.keys(bureauxsData).forEach(key => {
          formData.append(`data[attributes][bureauxs][${key}]`, bureauxsData[key]);
        });
        break;
      case 'magasins':
        Object.keys(magasinsData).forEach(key => {
          formData.append(`data[attributes][magasins][${key}]`, magasinsData[key]);
        });
        break;
      case 'maisons':
        Object.keys(maisonsData).forEach(key => {
          formData.append(`data[attributes][maisons][${key}]`, maisonsData[key]);
        });
        break;
      case 'riads':
        Object.keys(riadsData).forEach(key => {
          formData.append(`data[attributes][riads][${key}]`, riadsData[key]);
        });
        break;
      case 'terrains':
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
      case 'livres':
        Object.keys(livresData).forEach(key => {
          formData.append(`data[attributes][livres][${key}]`, livresData[key]);
        });
        break;
      case 'musicals':
        Object.keys(musicalsData).forEach(key => {
          formData.append(`data[attributes][musicals][${key}]`, musicalsData[key]);
        });
        break;
      case 'furnitures':
        Object.keys(furnituresData).forEach(key => {
          formData.append(`data[attributes][furnitures][${key}]`, furnituresData[key]);
        });
        break;
      case 'houseappliances':
        Object.keys(houseappliancesData).forEach(key => {
          formData.append(`data[attributes][houseappliances][${key}]`, houseappliancesData[key]);
        });
        break;
      case 'electricaltools':
        Object.keys(electricaltoolsData).forEach(key => {
          formData.append(`data[attributes][electricaltools][${key}]`, electricaltoolsData[key]);
        });
        break;
      case 'ladders':
        Object.keys(laddersData).forEach(key => {
          formData.append(`data[attributes][ladders][${key}]`, laddersData[key]);
        });
        break;
      case 'mechanicaltools':
        Object.keys(mechanicaltoolsData).forEach(key => {
          formData.append(`data[attributes][mechanicaltools][${key}]`, mechanicaltoolsData[key]);
        });
        break;
      case 'powertools':
        Object.keys(powertoolsData).forEach(key => {
          formData.append(`data[attributes][powertools][${key}]`, powertoolsData[key]);
        });
        break;
      case 'pressurewashers':
        Object.keys(pressurewashersData).forEach(key => {
          formData.append(`data[attributes][pressurewashers][${key}]`, pressurewashersData[key]);
        });
        break;
      case 'services':
        Object.keys(servicesData).forEach(key => {
          formData.append(`data[attributes][services][${key}]`, servicesData[key]);
        });
        break;
      case 'boats':
        Object.keys(boatsData).forEach(key => {
          formData.append(`data[attributes][boats][${key}]`, boatsData[key]);
        });
        break;
      case 'camions':
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
      case 'motos':
        Object.keys(motosData).forEach(key => {
          formData.append(`data[attributes][motos][${key}]`, motosData[key]);
        });
        break;
      case 'scooters':
        Object.keys(scootersData).forEach(key => {
          formData.append(`data[attributes][scooters][${key}]`, scootersData[key]);
        });
        break;
      case 'taxiaeroports':
        Object.keys(taxiaeroportsData).forEach(key => {
          formData.append(`data[attributes][taxiaeroports][${key}]`, taxiaeroportsData[key]);
        });
        break;
      case 'transportations':
        Object.keys(transportationsData).forEach(key => {
          formData.append(`data[attributes][transportations][${key}]`, transportationsData[key]);
        });
        break;
      case 'velos':
        Object.keys(velosData).forEach(key => {
          formData.append(`data[attributes][velos][${key}]`, velosData[key]);
        });
        break;
      default:
        break;
    }
















    try {
      await CrudService.createListing(formData);
      navigate("/listing/all", {
        state: { value: true, text: "The Listing was successfully created" },
      });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <DashboardLayout>
      <SoftBox mt={1} mb={10} component="form" method="POST" onSubmit={submitHandler}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={20}>
            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
              <SoftBox p={3}>
                
                <SoftBox >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} mt={1}>
                      <SoftBox mb={3}>
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                            Category
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect

                          placeholder="Select Category"
                          options={[
                            
                            { value: "boats", label: "boats", icon: BoatsIcon },
                            { value: "camions", label: "camions", icon: CamionsIcon },
                            { value: "caravans", label: "caravans", icon: CaravansIcon },
                            { value: "cars", label: "cars", icon: CarsIcon },
                            { value: "engins", label: "engins", icon: EnginsIcon },
                            { value: "motos", label: "motos", icon: MotosIcon },
                            { value: "scooters", label: "scooters", icon: ScootersIcon },
                            { value: "taxiaeroports", label: "taxiaeroports", icon: TaxiaeroportsIcon },
                            { value: "transportations", label: "transportations", icon: TransportationsIcon },
                            { value: "velos", label: "velos", icon: VelosIcon },
                            { value: "apartments", label: "apartments", icon: ApartmentsIcon },
                            { value: "bureauxs", label: "bureauxs", icon: BureauxsIcon },
                            { value: "magasins", label: "magasins", icon: MagasinsIcon },
                            { value: "maisons", label: "maisons", icon: MaisonsIcon },
                            { value: "riads", label: "riads", icon: RiadsIcon },
                            { value: "terrains", label: "terrains", icon: TerrainsIcon },
                            { value: "villas", label: "villas", icon: VillasIcon },
                            { value: "services", label: "services", icon: ServicesIcon },
                            { value: "audios", label: "audios", icon: AudiosIcon },
                            { value: "cameras", label: "cameras", icon: CamerasIcon },
                            { value: "chargers", label: "chargers", icon: ChargersIcon },
                            { value: "drones", label: "drones", icon: DronesIcon },
                            { value: "gamings", label: "gamings", icon: GamingsIcon },
                            { value: "laptops", label: "laptops", icon: LaptopsIcon },
                            { value: "lightings", label: "lightings", icon: LightingsIcon },
                            { value: "printers", label: "printers", icon: PrintersIcon },
                            { value: "routers", label: "routers", icon: RoutersIcon },
                            { value: "tablettes", label: "tablettes", icon: TablettesIcon },
                            { value: "electricaltools", label: "electricaltools", icon: ElectricaltoolsIcon },
                            { value: "ladders", label: "ladders", icon: LaddersIcon },
                            { value: "mechanicaltools", label: "mechanicaltools", icon: MechanicaltoolsIcon },
                            { value: "powertools", label: "powertools", icon: PowertoolsIcon },
                            { value: "pressurewashers", label: "pressurewashers", icon: PressurewashersIcon },
                            { value: "billiards", label: "billiards", icon: BilliardsIcon },
                            { value: "boxings", label: "boxings", icon: BoxingsIcon },
                            { value: "divings", label: "divings", icon: DivingsIcon },
                            { value: "footballs", label: "footballs", icon: FootballsIcon },
                            { value: "golfs", label: "golfs", icon: GolfsIcon },
                            { value: "huntings", label: "huntings", icon: HuntingsIcon },
                            { value: "musculations", label: "musculations", icon: MusculationsIcon },
                            { value: "surfs", label: "surfs", icon: SurfsIcon },
                            { value: "tennis", label: "tennis", icon: TennisIcon },
                            { value: "clothes", label: "clothes", icon: ClothesIcon },
                            { value: "jewelrys", label: "jewelrys", icon: JewelrysIcon },
                            { value: "activities", label: "activities", icon: ActivitiesIcon },
                            { value: "livres", label: "livres", icon: LivresIcon },
                            { value: "musicals", label: "musicals", icon: MusicalsIcon },
                            { value: "furnitures", label: "furnitures", icon: FurnituresIcon },
                            { value: "houseappliances", label: "houseappliances", icon: HouseappliancesIcon },
                            { value: "eclairages", label: "eclairages", icon: EclairagesIcon },
                            { value: "mobiliers", label: "mobiliers", icon: MobiliersIcon },
                            { value: "photographies", label: "photographies", icon: PhotographiesIcon },
                            { value: "sonorisations", label: "sonorisations", icon: SonorisationsIcon },
                            { value: "tentes", label: "tentes", icon: TentesIcon }
                          ]}




                          onChange={handleCategoryChange}
                        />
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
                        Description&nbsp;&nbsp;
                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} onChange={setDescription} />
                    {descError && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        The Collection description is required
                      </SoftTypography>
                    )}
                  </SoftBox>
                </SoftBox>
                <SoftBox mt={8}>
                  
                    
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                              Availability
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox mt={2}>
                          <DateRange value={dateRange} onChange={setDateRange} />
                        </SoftBox>
                  
                </SoftBox>
              </SoftBox>
            </Card>




            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>


              <SoftBox p={3}>

                  


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
                      updateBoatsData,
                      updateCamionsData,
                      updateCaravansData,
                      updateCarsData,
                      updateEnginsData,
                      updateMotosData,
                      updateScootersData,
                      updateTaxiaeroportsData,
                      updateTransportationsData,
                      updateVelosData
                    )}






              </SoftBox>
            </Card>





            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
              <SoftBox p={3}>

                

                <SoftBox >
                  
                  <CustomFileInput onFilesChange={handleFilesChange} />
                </SoftBox>
              </SoftBox>
            </Card>


            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
              <SoftBox p={3}>

               

                <Address address={address} onAddressChange={handleAddressChange} />
              </SoftBox>
            </Card>
            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
              <SoftBox p={3}>
                <Pricing pricing={pricing} onPricingChange={handlePricingChange}  onSelectChange={handleSelectChange} />
              </SoftBox>
            </Card>
          </Grid>
          <SoftBox   display="flex" justifyContent="center" alignItems="center">
            <SoftButton sx={{ py: 1.5 }}  variant="gradient" color="info" size="small" type="submit">
              Save
            </SoftButton>
          </SoftBox>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreateListing;
