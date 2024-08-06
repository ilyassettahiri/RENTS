import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SearchKeyword({ searchKeyword, onChangeKeyword, sx , colorr }) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    onChangeKeyword(newInputValue);
    setOpen(newInputValue.length > 0);
  };

  const handleChange = (event, value) => {
    onChangeKeyword(value);
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Autocomplete
      ref={autocompleteRef}
      sx={{ width: 1 }}
      options={_jobTitles}
      getOptionLabel={(option) => option}
      value={searchKeyword}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      open={open}

      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          placeholder="Que cherchez vous..."
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="carbon:search" sx={{ color: colorr, mr: 1 }} />
              </InputAdornment>
            ),
            endAdornment: null, // Remove the end adornment (down arrow icon)
            sx: { pb: 1, ...sx ,color: colorr},
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
    />
  );
}

SearchKeyword.propTypes = {
  searchKeyword: PropTypes.string,
  onChangeKeyword: PropTypes.func,
  sx: PropTypes.object,
  colorr: PropTypes.string,

};









export const _jobTitles = [

  'Digital Camera',
  'DSLR Camera',
  'Mirrorless Camera',
  'Action Camera',
  'Security Camera',
  'Camera Lens',
  'Camera Accessories',
  'Camera Tripod',
  'Camera Bag',
  'Camera Flash',
  'Underwater Camera',
  'Compact Camera',
  'Film Camera',
  'Professional Camera',
  'Camera Stabilizer',
  'Camera Battery',
  'Camera Mount',
  'Camera Drone',
  'Camera Strap',
  'Camera Cleaning Kit',



  'Gaming Computer',
  'Laptop Computer',
  'Desktop Computer',
  'Computer Monitor',
  'Computer Keyboard',
  'Computer Mouse',
  'Computer Speakers',
  'Computer Accessories',
  'Computer Case',
  'Computer Memory',
  'Computer Processor',
  'Computer Graphics Card',
  'Computer Hard Drive',
  'Computer Power Supply',
  'Computer Cooling Fan',
  'Computer Networking',
  'Computer Software',
  'Dell Computer',
  'Apple Computer',
  'HP Computer',



  'Studio Lighting',
  'LED Lighting',
  'Stage Lighting',
  'Photography Lighting',
  'Video Lighting',
  'Lighting Kit',
  'Softbox Lighting',
  'Ring Light',
  'Lighting Stand',
  'Lighting Reflector',
  'Lighting Umbrella',
  'Continuous Lighting',
  'Portable Lighting',
  'Lighting Gel',
  'Lighting Modifier',
  'Lighting Diffuser',
  'Lighting Control',
  'Lighting Grid',
  'Lighting Barndoor',
  'Lighting Power Supply',



  'Audio Interface',
  'Audio Mixer',
  'Audio Recorder',
  'Audio Speaker',
  'Audio Amplifier',
  'Audio Cable',
  'Audio Adapter',
  'Audio Software',
  'Audio Microphone',
  'Audio Headphones',
  'Audio Monitors',
  'Audio Equalizer',
  'Audio Processor',
  'Audio Converter',
  'Audio Receiver',
  'Audio Transmitter',
  'Audio System',
  'Audio Equipment',
  'Wireless Audio',
  'Portable Audio',




  'Drone Camera',
  'Drone Accessories',
  'Drone Battery',
  'Drone Propeller',
  'Drone Controller',
  'Drone Gimbal',
  'Drone Case',
  'Drone Charger',
  'Drone Landing Pad',
  'Drone Backpack',
  'Drone Filters',
  'Drone Range Extender',
  'Drone FPV Goggles',
  'Drone Motors',
  'Drone GPS',
  'Drone Kit',
  'Drone Maintenance',
  'DJI Drone',
  'Racing Drone',
  'Professional Drone',



  'WiFi Router',
  'Wireless Router',
  'Gigabit Router',
  'Dual-Band Router',
  'Tri-Band Router',
  'Mesh Router',
  'VPN Router',
  'Gaming Router',
  'Router Antenna',
  'Router Extender',
  'Router Modem Combo',
  'Router Switch',
  'Router Firewall',
  'Router Access Point',
  'Router Setup',
  'Router Configuration',
  'Router Firmware',
  'Router Security',
  'Netgear Router',
  'Linksys Router',



  'Gaming PC',
  'Gaming Laptop',
  'Gaming Monitor',
  'Gaming Chair',
  'Gaming Keyboard',
  'Gaming Mouse',
  'Gaming Headset',
  'Gaming Controller',
  'Gaming Desk',
  'Gaming Accessories',
  'Gaming Setup',
  'Gaming Console',
  'Gaming Streaming',
  'Gaming Community',
  'Gaming News',
  'Gaming Reviews',
  'Gaming Tips',
  'Gaming Forums',
  'Gaming Events',
  'Gaming Competitions',




  'Printer Scanner',
  'Inkjet Printer',
  'Laser Printer',
  'All-in-One Printer',
  'Wireless Printer',
  'Photo Printer',
  'Color Printer',
  'Black and White Printer',
  'Office Printer',
  'Home Printer',
  'Compact Printer',
  'Portable Printer',
  'Printer Paper',
  'Printer Ink',
  'Printer Toner',
  'Printer Cartridges',
  'Printer Maintenance',
  'Printer Setup',
  'Printer Troubleshooting',
  'Printer Reviews',




  'Tablet Android',
  'Tablet iPad',
  'Tablet Samsung',
  'Tablet Apple',
  'Tablet Windows',
  'Tablet with Keyboard',
  'Tablet Stylus',
  'Tablet Pen',
  'Tablet Case',
  'Tablet Cover',
  'Tablet Stand',
  'Tablet Charger',
  'Tablet Dock',
  'Tablet Accessories',
  'Tablet Gaming',
  'Tablet Drawing',
  'Tablet for Kids',
  'Tablet for Students',
  'Tablet Comparison',
  'Best Tablet to Buy',




  'Memory Card Storage Case',
  'USB Flash Drive Organizer',
  'External Hard Drive Case',
  'SD Card Holder',
  'Micro SD Card Storage',
  'Flash Drive Storage Box',
  'Portable Hard Drive Case',
  'Memory Card Wallet',
  'USB Stick Holder',
  'SD Card Organizer',
  'Memory Card Storage Box',
  'USB Flash Drive Case',
  'External SSD Storage',
  'Memory Card Holder',
  'USB Cable Organizer',
  'SD Card Case',
  'Flash Drive Holder',
  'Portable SSD Case',
  'Memory Card Organizer',
  'USB Hub with Storage',



'Spacious villa',
'Luxury villa',
'Modern villa',
'Cozy villa',
'Oceanfront villa',
'Mountain villa',
'Countryside villa',
'Historic villa',
'Mediterranean villa',
'Contemporary villa',
'Secluded villa',
'Renovated villa',
'Villa with pool',
'Villa with garden',
'Villa with terrace',
'Villa with balcony',
'Duplex villa',
'Furnished villa',
'Gated villa',
'Family-friendly villa',

'Spacious house',
'Luxurious house',
'Modern house',
'Cozy house',
'Seaside house',
'Mountain house',
'Rural house',
'Historic house',
'Mediterranean-style house',
'Contemporary house',
'Secluded house',
'Renovated house',
'House with swimming pool',
'House with garden',
'House with terrace',
'House with balcony',
'Duplex house',
'Furnished house',
'Gated house',
'Family-friendly house',




'Luxury apartment',
'Modern apartment',
'Cozy apartment',
'City apartment',
'Waterfront apartment',
'Loft apartment',
'Studio apartment',
'Penthouse apartment',
'Contemporary apartment',
'Furnished apartment',
'Garden apartment',
'Apartment with balcony',
'Apartment with terrace',
'Apartment with view',
'Renovated apartment',
'Spacious apartment',
'Duplex apartment',
'Family-friendly apartment',
'Pet-friendly apartment',




'Luxurious Riad',
'Modern Riad',
'Historic Riad',
'Traditional Riad',
'Renovated Riad',
'Riad with courtyard',
'Riad with terrace',
'Riad with pool',
'Authentic Riad',
'Spacious Riad',
'Contemporary Riad',
'Elegant Riad',
'Family-friendly Riad',
'Romantic Riad',
'Stylish Riad',
'Secluded Riad',



'Compact Sedan',
'Luxury SUV',
'Electric Vehicle',
'Hybrid Car',
'Convertible',
'Sports Car',
'Diesel Truck',
'Minivan',
'Crossover',
'All-Wheel Drive',
'Hatchback',
'Pickup Truck',
'Station Wagon',
'Coupe',
'Plug-in Hybrid',
'Luxury Coupe',
'Off-Road Vehicle',
'Economy Car',
'Certified Pre-Owned',
'Family Sedan',

'Sport Motorcycle',
'Cruiser Motorcycle',
'Touring Motorcycle',
'Adventure Motorcycle',
'Dirt Motorcycle',
'Dual-Sport Motorcycle',
'Cafe Racer Motorcycle',
'Chopper Motorcycle',
'Scooter Motorcycle',
'Standard Motorcycle',
'Naked Motorcycle',
'Retro Motorcycle',
'Bobber Motorcycle',
'Supermoto Motorcycle',
'Enduro Motorcycle',
'Mini Motorcycle',
'Trike Motorcycle',
'Touring Scooter Motorcycle',
'Custom Motorcycle',

'Bike for Sale',
'Used Bike',
'New Bike Models',
'Mountain Bike',
'Road Bike',
'Hybrid Bike',
'Electric Bike',
'Folding Bike',
'BMX Bike',
'Cruiser Bike',
'City Bike',
'Kids Bike',
'Womens Bike',
'Mens Bike',
'Bike Accessories',
'Bike Parts',
'Bike Service',
'Bike Maintenance',


'Airport Taxi Service',
'Aeroplane Taxi',
'Airport Shuttle',
'Taxi Cab',
'Airport Transfer',
'Airport Pickup',
'Taxi Van',
'Private Airport Transfer',
'Aeroplane Shuttle',
'Airport Taxi Booking',
'Airport Taxi Near Me',
'Airport Taxi Fare',
'Airport Taxi Rates',
'Airport Taxi App',
'Airport Taxi Company',
'Luxury Airport Taxi',
'Executive Airport Taxi',

'Electric Scooter',
'Foldable Electric Scooter',
'Electric Scooter for Commuting',
'Electric Scooter for Adults',
'Electric Scooter with Seat',
'Fast Electric Scooter',
'Off-Road Electric Scooter',
'Electric Scooter for Kids',
'Lightweight Electric Scooter',


'Caravan for Sale',
'Used Caravan',
'New Caravan Models',
'Family Caravan',
'Luxury Caravan',
'Off-Road Caravan',
'Caravan Camping',
'Caravan Accessories',
'Caravan Dealership',
'Caravan Rental',
'Caravan Park',
'Caravan Holidays',
'Compact Caravan',
'Towing Caravan',


'Boats for Sale',
'Used Boats',
'New Boat Models',
'Family Boat',
'Luxury Yacht',
'Speedboat',
'Sailing Yacht',
'Fishing Boat',
'Pontoon Boat',
'Cruiser Yacht',
'Catamaran',
'Jet Ski',
'Houseboat',
'Dinghy',
'Inflatable Boat',
'Boat Accessories',
'Boat Dealership',
'Boat Rental',
'Boat Marina',
'Boat Charter',
'Boat Maintenance',

'Truck for Sale',
'Used Truck',
'Pickup Truck',
'Commercial Truck',
'Heavy-Duty Truck',
'Light-Duty Truck',
'Truck Dealership',
'Truck Rental',
'Truck Accessories',
'Truck Parts',
'Truck Service',
'Truck Maintenance',
'Diesel Truck',
'Electric Truck',


'Excavator',
'Crane',
'Bulldozer',
'Dump Truck',
'Concrete Mixer',
'Road Roller',
'Forklift',
'Skid Steer',
'Pile Driver',
'Trencher',

'Diamond Necklace',
'Gold Bracelet',
'Silver Earrings',
'Gemstone Ring',
'Pearl Necklace',
'Designer Jewelry',
'Vintage Jewelry',
'Wedding Rings',
'Fine Jewelry',
'Fashion Jewelry',
'Custom Jewelry',
'Handmade Jewelry',
'Luxury Watches',
'Diamond Stud Earrings',
'Gold Chains',
'Bridal Jewelry',
'Mens Jewelry',
'Childrens Jewelry',
'Jewelry Sets',
'Jewelry Repair',


'Designer Dresses',
'Casual Tops',
'Formal Wear',
'Athletic Apparel',
'Vintage Clothing',
'Designer Jeans',
'Evening Gowns',
'Workout Clothes',
'Swimwear',
'Winter Coats',
'Fashion Accessories',
'Handmade Clothing',
'Outdoor Gear',
'Streetwear',
'Kids Clothing',
'Maternity Wear',
'Plus Size Clothing',
'Mens Fashion',
'Womens Fashion',
'Fashion Trends',

'Bestselling Novels',
'Classic Literature',
'Non-Fiction Books',
'Fantasy Series',
'Science Fiction Books',
'Self-Help Books',
'Biographies',
'Historical Fiction',
'Childrens Books',
'Cookbooks',
'Art Books',
'Travel Guides',
'Poetry Collections',
'Romance Novels',
'Mystery Books',
'Thriller Novels',
'Business Books',
'Educational Textbooks',
'Graphic Novels',
'Rare Books',

'Refrigerator',
'Washing Machine',
'Dishwasher',
'Microwave Oven',
'Cooktop',
'Oven',
'Air Conditioner',
'Vacuum Cleaner',
'Blender',
'Coffee Maker',
'Toaster',
'Electric Kettle',
'Food Processor',
'Juicer',
'Rice Cooker',
'Slow Cooker',
'Air Fryer',
'Steam Iron',
'Hair Dryer',
'Robot Vacuum',

'Sofa',
'Dining Table',
'Bed Frame',
'Wardrobe',
'Coffee Table',
'Bookshelf',
'Desk',
'Dresser',
'Armchair',
'TV Stand',
'Nightstand',
'Couch',
'Sectional Sofa',
'Console Table',
'Bar Stools',
'Outdoor Furniture',
'Bean Bag Chair',
'Office Chair',
'Recliner Chair',
'Folding Table',


'Portable Pressure Washer',
'High Pressure Washer',
'Pressure Washer Hose',
'Pressure Washer Accessories',
'Pressure Washer Nozzle',
'Pressure Washer Pump',
'Pressure Washer Wand',
'Commercial Pressure Washer',
'Residential Pressure Washer',
'Pressure Washer Soap',
'Pressure Washer Surface Cleaner',
'Pressure Washer Brush',
'Pressure Washer Extension Wand',
'Pressure Washer Gun',
'Pressure Washer Attachment',
'Pressure Washer Parts',
'Pressure Washer Maintenance',
'Pressure Washer Reviews',





'Extension Ladder',
'Step Ladder',
'Telescoping Ladder',
'Folding Ladder',
'Aluminum Ladder',
'Wooden Ladder',
'Multi-Position Ladder',
'Ladder Safety',
'Little Giant Ladder',
'Fiberglass Ladder',
'Ladder Stabilizer',
'Ladder Hooks',
'Ladder Platform',
'Telescopic Ladder',
'Ladder Accessories',
'Ladder Work Platform',
'Ladder Dolly',
'Attic Ladder',
'Warehouse Ladder',
'Paint Ladder',




'Multimeter',
'Wire Stripper',
'Circuit Tester',
'Voltage Tester',
'Digital Caliper',
'Cable Cutter',
'Crimping Tool',
'Insulation Tester',
'Wire Crimper',
'Wire Terminal Crimper',
'Electrician Tool Kit',
'Power Drill',
'Electric Screwdriver',
'Wire Tracer',
'Fish Tape',
'Conduit Bender',
'Cable Puller',
'Voltage Detector',
'Outlet Tester',
'Electrical Tape',




'Socket Wrench',
'Impact Wrench',
'Torque Wrench',
'Adjustable Wrench',
'Pipe Wrench',
'Combination Wrench Set',
'Ratchet Set',
'Screwdriver Set',
'Pliers Set',
'Hammer',
'Mallet',
'Chisel Set',
'Hand Saw',
'Hacksaw',
'Utility Knife',
'Measuring Tape',
'Level Tool',
'Angle Grinder',
'Bench Vise',
'Toolbox',




'Power Drill',
'Impact Driver',
'Circular Saw',
'Reciprocating Saw',
'Jigsaw',
'Angle Grinder',
'Rotary Tool',
'Belt Sander',
'Random Orbital Sander',
'Table Saw',
'Miter Saw',
'Scroll Saw',
'Band Saw',
'Router',
'Planer',
'Heat Gun',
'Nail Gun',
'Staple Gun',
'Power Screwdriver',
'Power Tool Combo Kit',








'Acoustic Guitar',
'Electric Guitar',
'Violin',
'Piano',
'Drum Set',
'Flute',
'Saxophone',
'Trumpet',
'Bass Guitar',
'Cello',
'Clarinet',
'Keyboard',
'Ukulele',
'Banjo',
'Harp',
'Mandolin',
'Accordion',
'Digital Piano',
'Synthesizer',
'Djembe',








'Commercial development land',
'Agricultural land parcel',
'Industrial plot',
'Farmland',
'Ranch property',
'Orchard land',
'Livestock farm',
'Dairy farm property',
'Crop farming land',
'Organic farming',
'Farm with barn',
'Farmhouse with land',
'Farm with pond',
'Fruit farm property',
'Vegetable farmt',
'Secluded farm',






'Modern office space',
'Corporate office',
'Shared office',
'Co-working space',
'Executive office suite',
'Open-plan office',
'Serviced office',
'Flexible workspace',
'Professional office',
'Tech office space',
'Creative workspace',
'Office with meeting rooms',
'Virtual office',
'Office with amenities',
'Executive suite',
'Startup office',
'Remote workspace',
'Small office space',
'Large office floor',
'Private office',



'Retail store',
'Commercial shop',
'Industrial warehouse',
'Warehouse with office space',
'Business premises',
'Commercial building',
'Storefront space',
'Shopping center unit',
'Industrial unit',
'Commercial showroom',
'Factory space',
'Industrial park unit',
'Warehouse distribution center',
'Retail outlet',
'Industrial workshop',
'Business park premises',
'Corner shop',
'High street store',
'Commercial complex',
'Industrial estate unit',



'Surfboard',
'Wetsuit',
'Surf lessons',
'Surf shop',
'Surf spot',
'Surf camp',
'Surf competition',
'Surf gear',
'Surf accessories',
'Surfboard rental',
'Surfing instructor',
'Surfboard repair',
'Surfing equipment',
'Surfing apparel',
'Surf vacation',
'Surfboard brands',
'Surfing event',
'Surfing culture',
'Surfing destinations',


'Treadmill',
'Elliptical machine',
'Stationary bike',
'Weight bench',
'Dumbbells',
'Barbell set',
'Kettlebell',
'Resistance bands',
'Rowing machine',
'Smith machine',
'Leg press machine',
'Cable machine',
'Pull-up bar',
'Exercise ball',
'Yoga mat',
'Fitness tracker',
'Weightlifting gloves',
'Foam roller',
'Exercise bike',
'Home gym equipment',



'Diving gear',
'Scuba diving',
'Dive shop',
'Diving lessons',
'Dive equipment',
'Dive resort',
'Snorkeling gear',
'Diving certification',
'Underwater photography',
'Dive destinations',
'Dive trips',
'Liveaboard diving',
'Dive instructor',
'Dive center',
'Dive master',
'Diving mask',
'Wetsuit diving',
'Diving adventure',
'Diving excursions',




'Boxing gloves',
'Boxing bag',
'Boxing training',
'Boxing gym',
'Boxing equipment',
'Boxing ring',
'Boxing coach',
'Boxing clothes',
'Boxing workout',
'Boxing shoes',
'Boxing classes',
'Boxing ring',
'Boxing event',
'Boxing fitness',
'Boxing gear',
'Boxing club',
'Boxing camp',
'Boxing session',
'Boxing drills',
'Boxing competition',



'Tennis racket',
'Tennis balls',
'Tennis shoes',
'Tennis court',
'Tennis lessons',
'Tennis club',
'Tennis coach',
'Tennis match',
'Tennis tournament',
'Tennis gear',
'Tennis training',
'Tennis academy',
'Tennis drills',
'Tennis practice',
'Tennis doubles',
'Tennis singles',
'Tennis technique',
'Tennis fitness',
'Tennis equipment',
'Tennis court reservation',



'Football boots',
'Football jersey',
'Football training',
'Football stadium',
'Football club',
'Football academy',
'Football coach',
'Football equipment',

'Volleyball net',
'Volleyball ball',
'Volleyball court',
'Volleyball training',
'Volleyball club',
'Volleyball equipment',
'Volleyball spikes',
'Beach volleyball',
'Indoor volleyball',
'Volleyball academy',
'Volleyball camp',
'Basketball hoop',
'Basketball ball',
'Basketball court',
'Basketball game',
'Basketball match',
'Basketball training',
'Basketball club',
'Basketball equipment',
'Basketball shoes',
'Basketball jersey',
'Basketball camp',













'Golf clubs',
'Golf balls',
'Golf course',
'Golf lessons',
'Golf club',
'Golf equipment',
'Golf bag',
'Golf shoes',
'Golf tournament',
'Golf swing',
'Golf pro',
'Golf training',
'Golf coach',
'Golf course reservation',
'Golf practice',
'Golf tee times',
'Golf cart',
'Golf apparel',
'Golf gloves',
'Golf accessories',



'Billiards table',
'Billiards cue',
'Billiards balls',
'Billiards room',
'Billiards club',
'Billiards accessories',
'Billiards tournament',
'Billiards game',
'Billiards lessons',
'Billiards cue stick',
'Billiards chalk',
'Billiards rack',
'Billiards cue case',
'Billiards gloves',
'Billiards league',
'Billiards competition',
'Billiards equipment',
'Billiards hall',





'Hunting rifle',
'Hunting gear',
'Hunting boots',
'Hunting knife',
'Hunting clothes',
'Hunting accessories',
'Hunting blind',
'Hunting stand',
'Hunting dog',
'Hunting binoculars',
'Hunting scope',
'Hunting ammunition',
'Hunting camp',
'Hunting lodge',
'Hunting club',
'Hunting trip',








  'Phone Charger',
  'Wireless Charger',
  'Laptop Charger',
  'USB Charger',
  'Car Charger',
  'Portable Charger',
  'Fast Charger',
  'Charging Station',
  'Wall Charger',
  'Multi-port Charger',
  'Qi Charger',
  'Travel Charger',
  'Battery Charger',
  'Apple Charger',
  'Micro USB Charger',
  'USB C Charger',
  'Solar Charger',
  'Power Bank Charger',
  'Induction Charger',
  'Universal Charger',




];
