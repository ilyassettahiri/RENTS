'use client';

import { useState, useEffect, useCallback, useMemo  } from 'react';
import Container from '@mui/material/Container';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';
import { orderBy } from 'src/utils/helper';

import { useBoolean } from 'src/hooks/use-boolean';

import { useQuery } from '@tanstack/react-query';

import { usePathname, useSearchParams} from 'src/routes/hooks';

import CrudService from 'src/services/cruds-service';
import ServiceSearch from 'src/sections/components/services/filters/services-search';
import Stack from '@mui/material/Stack';

import { EmptyContent } from 'src/components/empty-content';

import { ProductSort } from 'src/sections/home/product-sort';
import { ProductSearch } from 'src/sections/home/product-search';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';



import ServiceList from '../components/services/list/services-list';

const keywordCategoryMap = {
  'Digital Camera': 'Cameras',
  'DSLR Camera': 'Cameras',
  'Mirrorless Camera': 'Cameras',
  'Action Camera': 'Cameras',
  'Security Camera': 'Cameras',
  'Camera Lens': 'Cameras',
  'Camera Accessories': 'Cameras',
  'Camera Tripod': 'Cameras',
  'Camera Bag': 'Cameras',
  'Camera Flash': 'Cameras',
  'Underwater Camera': 'Cameras',
  'Compact Camera': 'Cameras',
  'Film Camera': 'Cameras',
  'Professional Camera': 'Cameras',
  'Camera Stabilizer': 'Cameras',
  'Camera Battery': 'Cameras',
  'Camera Mount': 'Cameras',
  'Camera Drone': 'Cameras',
  'Camera Strap': 'Cameras',
  'Camera Cleaning Kit': 'Cameras',

  'Gaming Computer': 'Laptops',
  'Laptop Computer': 'Laptops',
  'Desktop Computer': 'Laptops',
  'Computer Monitor': 'Laptops',
  'Computer Keyboard': 'Laptops',
  'Computer Mouse': 'Laptops',
  'Computer Speakers': 'Laptops',
  'Computer Accessories': 'Laptops',
  'Computer Case': 'Laptops',
  'Computer Memory': 'Laptops',
  'Computer Processor': 'Laptops',
  'Computer Graphics Card': 'Laptops',
  'Computer Hard Drive': 'Laptops',
  'Computer Power Supply': 'Laptops',
  'Computer Cooling Fan': 'Laptops',
  'Computer Networking': 'Laptops',
  'Computer Software': 'Laptops',
  'Dell Computer': 'Laptops',
  'Apple Computer': 'Laptops',
  'HP Computer': 'Laptops',

  'Studio Lighting': 'Eclairages',
  'LED Lighting': 'Eclairages',
  'Stage Lighting': 'Eclairages',
  'Photography Lighting': 'Eclairages',
  'Video Lighting': 'Eclairages',
  'Lighting Kit': 'Eclairages',
  'Softbox Lighting': 'Eclairages',
  'Ring Light': 'Eclairages',
  'Lighting Stand': 'Eclairages',
  'Lighting Reflector': 'Eclairages',
  'Lighting Umbrella': 'Eclairages',
  'Continuous Lighting': 'Eclairages',
  'Portable Lighting': 'Eclairages',
  'Lighting Gel': 'Eclairages',
  'Lighting Modifier': 'Eclairages',
  'Lighting Diffuser': 'Eclairages',
  'Lighting Control': 'Eclairages',
  'Lighting Grid': 'Eclairages',
  'Lighting Barndoor': 'Eclairages',
  'Lighting Power Supply': 'Eclairages',

  'Audio Interface': 'Audios',
  'Audio Mixer': 'Audios',
  'Audio Recorder': 'Audios',
  'Audio Speaker': 'Audios',
  'Audio Amplifier': 'Audios',
  'Audio Cable': 'Audios',
  'Audio Adapter': 'Audios',
  'Audio Software': 'Audios',
  'Audio Microphone': 'Audios',
  'Audio Headphones': 'Audios',
  'Audio Monitors': 'Audios',
  'Audio Equalizer': 'Audios',
  'Audio Processor': 'Audios',
  'Audio Converter': 'Audios',
  'Audio Receiver': 'Audios',
  'Audio Transmitter': 'Audios',
  'Audio System': 'Audios',
  'Audio Equipment': 'Audios',
  'Wireless Audio': 'Audios',
  'Portable Audio': 'Audios',

  'Drone Camera': 'Drones',
  'Drone Accessories': 'Drones',
  'Drone Battery': 'Drones',
  'Drone Propeller': 'Drones',
  'Drone Controller': 'Drones',
  'Drone Gimbal': 'Drones',
  'Drone Case': 'Drones',
  'Drone Charger': 'Drones',
  'Drone Landing Pad': 'Drones',
  'Drone Backpack': 'Drones',
  'Drone Filters': 'Drones',
  'Drone Range Extender': 'Drones',
  'Drone FPV Goggles': 'Drones',
  'Drone Motors': 'Drones',
  'Drone GPS': 'Drones',
  'Drone Kit': 'Drones',
  'Drone Maintenance': 'Drones',
  'DJI Drone': 'Drones',
  'Racing Drone': 'Drones',
  'Professional Drone': 'Drones',

  'WiFi Router': 'Routers',
  'Wireless Router': 'Routers',
  'Gigabit Router': 'Routers',
  'Dual-Band Router': 'Routers',
  'Tri-Band Router': 'Routers',
  'Mesh Router': 'Routers',
  'VPN Router': 'Routers',
  'Gaming Router': 'Routers',
  'Router Antenna': 'Routers',
  'Router Extender': 'Routers',
  'Router Modem Combo': 'Routers',
  'Router Switch': 'Routers',
  'Router Firewall': 'Routers',
  'Router Access Point': 'Routers',
  'Router Setup': 'Routers',
  'Router Configuration': 'Routers',
  'Router Firmware': 'Routers',
  'Router Security': 'Routers',
  'Netgear Router': 'Routers',
  'Linksys Router': 'Routers',

  'Gaming PC': 'Gamings',
  'Gaming Laptop': 'Gamings',
  'Gaming Monitor': 'Gamings',
  'Gaming Chair': 'Gamings',
  'Gaming Keyboard': 'Gamings',
  'Gaming Mouse': 'Gamings',
  'Gaming Headset': 'Gamings',
  'Gaming Controller': 'Gamings',
  'Gaming Desk': 'Gamings',
  'Gaming Accessories': 'Gamings',
  'Gaming Setup': 'Gamings',
  'Gaming Console': 'Gamings',
  'Gaming Streaming': 'Gamings',
  'Gaming Community': 'Gamings',
  'Gaming News': 'Gamings',
  'Gaming Reviews': 'Gamings',
  'Gaming Tips': 'Gamings',
  'Gaming Forums': 'Gamings',
  'Gaming Events': 'Gamings',
  'Gaming Competitions': 'Gamings',

  'Printer Scanner': 'Printers',
  'Inkjet Printer': 'Printers',
  'Laser Printer': 'Printers',
  'All-in-One Printer': 'Printers',
  'Wireless Printer': 'Printers',
  'Photo Printer': 'Printers',
  'Color Printer': 'Printers',
  'Black and White Printer': 'Printers',
  'Office Printer': 'Printers',
  'Home Printer': 'Printers',
  'Compact Printer': 'Printers',
  'Portable Printer': 'Printers',
  'Printer Paper': 'Printers',
  'Printer Ink': 'Printers',
  'Printer Toner': 'Printers',
  'Printer Cartridges': 'Printers',
  'Printer Maintenance': 'Printers',
  'Printer Setup': 'Printers',
  'Printer Troubleshooting': 'Printers',
  'Printer Reviews': 'Printers',

  'Tablet Android': 'Tablettes',
  'Tablet iPad': 'Tablettes',
  'Tablet Samsung': 'Tablettes',
  'Tablet Apple': 'Tablettes',
  'Tablet Windows': 'Tablettes',
  'Tablet with Keyboard': 'Tablettes',
  'Tablet Stylus': 'Tablettes',
  'Tablet Pen': 'Tablettes',
  'Tablet Case': 'Tablettes',
  'Tablet Cover': 'Tablettes',
  'Tablet Stand': 'Tablettes',
  'Tablet Charger': 'Tablettes',
  'Tablet Dock': 'Tablettes',
  'Tablet Accessories': 'Tablettes',
  'Tablet Gaming': 'Tablettes',
  'Tablet Drawing': 'Tablettes',
  'Tablet for Kids': 'Tablettes',
  'Tablet for Students': 'Tablettes',
  'Tablet Comparison': 'Tablettes',
  'Best Tablet to Buy': 'Tablettes',

  'Memory Card Storage Case': 'Memory Cards',
  'USB Flash Drive Organizer': 'Memory Cards',
  'External Hard Drive Case': 'Memory Cards',
  'SD Card Holder': 'Memory Cards',
  'Micro SD Card Storage': 'Memory Cards',
  'Flash Drive Storage Box': 'Memory Cards',
  'Portable Hard Drive Case': 'Memory Cards',
  'Memory Card Wallet': 'Memory Cards',
  'USB Stick Holder': 'Memory Cards',
  'SD Card Organizer': 'Memory Cards',
  'Memory Card Storage Box': 'Memory Cards',
  'USB Flash Drive Case': 'Memory Cards',
  'External SSD Storage': 'Memory Cards',
  'Memory Card Holder': 'Memory Cards',
  'USB Cable Organizer': 'Memory Cards',
  'SD Card Case': 'Memory Cards',
  'Flash Drive Holder': 'Memory Cards',
  'Portable SSD Case': 'Memory Cards',
  'Memory Card Organizer': 'Memory Cards',
  'USB Hub with Storage': 'Memory Cards',

  'Spacious villa': 'Villas',
  'Luxury villa': 'Villas',
  'Modern villa': 'Villas',
  'Cozy villa': 'Villas',
  'Oceanfront villa': 'Villas',
  'Mountain villa': 'Villas',
  'Countryside villa': 'Villas',
  'Historic villa': 'Villas',
  'Mediterranean villa': 'Villas',
  'Contemporary villa': 'Villas',
  'Secluded villa': 'Villas',
  'Renovated villa': 'Villas',
  'Charming villa': 'Villas',
  'Elegant villa': 'Villas',
  'Traditional villa': 'Villas',
  'Spacious villa with pool': 'Villas',
  'Luxury villa with garden': 'Villas',
  'Modern villa with terrace': 'Villas',
  'Cozy villa with fireplace': 'Villas',
  'Oceanfront villa with private beach': 'Villas',


  'Luxury apartment': 'Appartements',
  'Modern apartment': 'Appartements',
  'Cozy apartment': 'Appartements',
  'Studio apartment': 'Appartements',
  'Penthouse apartment': 'Appartements',
  'Furnished apartment': 'Appartements',
  'Loft apartment': 'Appartements',
  'Downtown apartment': 'Appartements',
  'Spacious apartment': 'Appartements',
  'Seafront apartment': 'Appartements',
  'Historic apartment': 'Appartements',
  'Contemporary apartment': 'Appartements',
  'Apartment with balcony': 'Appartements',
  'Apartment with terrace': 'Appartements',
  'Apartment with garden': 'Appartements',
  'Luxury apartment with pool': 'Appartements',
  'Modern apartment with gym': 'Appartements',
  'Cozy apartment with fireplace': 'Appartements',
  'Studio apartment with city view': 'Appartements',
  'Penthouse apartment with private terrace': 'Appartements',



  'Pool table': 'Billiards',
  'Billiard cues': 'Billiards',
  'Billiard balls': 'Billiards',
  'Billiard rack': 'Billiards',
  'Billiard cloth': 'Billiards',
  'Cue chalk': 'Billiards',
  'Cue case': 'Billiards',
  'Billiard light': 'Billiards',
  'Billiard scoreboard': 'Billiards',
  'Billiard accessories': 'Billiards',
  'Billiard table cover': 'Billiards',
  'Billiard brush': 'Billiards',
  'Billiard cue stick': 'Billiards',
  'Billiard cue tip': 'Billiards',
  'Billiard table repair kit': 'Billiards',
  'Billiard game': 'Billiards',
  'Billiard table legs': 'Billiards',
  'Billiard chalk holder': 'Billiards',


  'Outdoor activities': 'Activities',
  'Sports activities': 'Activities',
  'Adventure activities': 'Activities',
  'Fitness activities': 'Activities',
  'Recreational activities': 'Activities',
  'Hiking activities': 'Activities',
  'Cycling activities': 'Activities',
  'Water activities': 'Activities',
  'Team activities': 'Activities',
  'Solo activities': 'Activities',
  'Family activities': 'Activities',
  'Group activities': 'Activities',
  'Camping activities': 'Activities',
  'Travel activities': 'Activities',
  'Cultural activities': 'Activities',
  'Educational activities': 'Activities',
  'Leisure activities': 'Activities',
  'Health activities': 'Activities',
  'Seasonal activities': 'Activities',
  'Winter activities': 'Activities',
  'Summer activities': 'Activities',


  'Cleaning services': 'Services',
  'Plumbing services': 'Services',
  'Electrical services': 'Services',
  'Gardening services': 'Services',
  'Security services': 'Services',
  'Moving services': 'Services',
  'Car repair services': 'Services',
  'Home repair services': 'Services',
  'IT services': 'Services',
  'Consulting services': 'Services',
  'Legal services': 'Services',
  'Financial services': 'Services',
  'Healthcare services': 'Services',
  'Educational services': 'Services',
  'Transportation services': 'Services',
  'Maintenance services': 'Services',
  'Beauty services': 'Services',
  'Personal services': 'Services',
  'Catering services': 'Services',
  'Event planning services': 'Services',
  'Travel services': 'Services',


  'Football equipment': 'Sports',
  'Basketball gear': 'Sports',
  'Tennis equipment': 'Sports',
  'Golf clubs': 'Sports',
  'Baseball gear': 'Sports',
  'Hockey equipment': 'Sports',
  'Cycling gear': 'Sports',
  'Running shoes': 'Sports',
  'Swimming gear': 'Sports',
  'Skiing equipment': 'Sports',
  'Snowboarding gear': 'Sports',
  'Fitness equipment': 'Sports',
  'Yoga mats': 'Sports',
  'Martial arts gear': 'Sports',
  'Gym equipment': 'Sports',
  'Sports accessories': 'Sports',
  'Athletic wear': 'Sports',
  'Sports shoes': 'Sports',
  'Sports training aids': 'Sports',


'Boxing gloves': 'Boxings',
'Boxing bags': 'Boxings',
'Boxing wraps': 'Boxings',
'Boxing headgear': 'Boxings',
'Boxing shorts': 'Boxings',
'Boxing trunks': 'Boxings',
'Boxing mouthguards': 'Boxings',
'Boxing pads': 'Boxings',
'Boxing belts': 'Boxings',
'Boxing punching bags': 'Boxings',
'Boxing gym equipment': 'Boxings',
'Boxing training gear': 'Boxings',
'Boxing shoes': 'Boxings',
'Boxing equipment': 'Boxings',
'Boxing fitness equipment': 'Boxings',
'Boxing accessories': 'Boxings',
'Boxing ring equipment': 'Boxings',
'Boxing training aids': 'Boxings',
'Boxing protective gear': 'Boxings',


'Digital cameras': 'Cameras',
'DSLR cameras': 'Cameras',
'Mirrorless cameras': 'Cameras',
'Action cameras': 'Cameras',
'Camera lenses': 'Cameras',
'Camera tripods': 'Cameras',
'Camera batteries': 'Cameras',
'Camera memory cards': 'Cameras',
'Camera accessories': 'Cameras',
'Camera stabilizers': 'Cameras',
'Camera flashes': 'Cameras',
'Camera filters': 'Cameras',
'Camera cleaning kits': 'Cameras',
'Camera drones': 'Cameras',
'Camera mounts': 'Cameras',
'Camera remote controls': 'Cameras',
'Camera gimbals': 'Cameras',
'Camera cases': 'Cameras',
'Camera straps': 'Cameras',


'Delivery trucks': 'Camions',
'Heavy trucks': 'Camions',
'Flatbed trucks': 'Camions',
'Box trucks': 'Camions',
'Cargo trucks': 'Camions',
'Dump trucks': 'Camions',
'Refrigerated trucks': 'Camions',
'Tow trucks': 'Camions',
'Truck trailers': 'Camions',
'Truck parts': 'Camions',
'Truck accessories': 'Camions',
'Truck maintenance': 'Camions',
'Truck repair services': 'Camions',
'Truck rentals': 'Camions',
'Used trucks': 'Camions',
'New trucks': 'Camions',
'Commercial trucks': 'Camions',
'Truck tires': 'Camions',
'Truck batteries': 'Camions',
'Truck equipment': 'Camions',


'Travel caravans': 'Caravans',
'Luxury caravans': 'Caravans',
'Camper caravans': 'Caravans',
'Caravan accessories': 'Caravans',
'Caravan parts': 'Caravans',
'Caravan rental': 'Caravans',
'Caravan sales': 'Caravans',
'Caravan maintenance': 'Caravans',
'Caravan repair services': 'Caravans',
'Caravan towing': 'Caravans',
'Caravan batteries': 'Caravans',
'Caravan awnings': 'Caravans',
'Caravan covers': 'Caravans',
'Caravan steps': 'Caravans',
'Caravan heating': 'Caravans',
'Caravan cooling': 'Caravans',
'Caravan kitchen equipment': 'Caravans',
'Caravan water systems': 'Caravans',
'Caravan electrical systems': 'Caravans',
'Caravan furniture': 'Caravans',


'Phone chargers': 'Chargers',
'Laptop chargers': 'Chargers',
'Tablet chargers': 'Chargers',
'Battery chargers': 'Chargers',
'Car chargers': 'Chargers',
'Wireless chargers': 'Chargers',
'Portable chargers': 'Chargers',
'USB chargers': 'Chargers',
'Power banks': 'Chargers',
'Fast chargers': 'Chargers',
'Charging cables': 'Chargers',
'Charging docks': 'Chargers',
'Charging stations': 'Chargers',
'AC adapters': 'Chargers',
'DC adapters': 'Chargers',
'Charger accessories': 'Chargers',
'Multi-device chargers': 'Chargers',
'Travel chargers': 'Chargers',
'Charger mounts': 'Chargers',


'Men\'s clothing': 'Clothes',
'Women\'s clothing': 'Clothes',
'Kids\' clothing': 'Clothes',
'Casual wear': 'Clothes',
'Formal wear': 'Clothes',
'Sportswear': 'Clothes',
'Outerwear': 'Clothes',
'Underwear': 'Clothes',
'Activewear': 'Clothes',
'Seasonal clothing': 'Clothes',
'Footwear': 'Clothes',
'Accessories': 'Clothes',
'Shoes': 'Clothes',
'Coats': 'Clothes',
'Jackets': 'Clothes',
'Jeans': 'Clothes',
'T-shirts': 'Clothes',
'Dresses': 'Clothes',
'Skirts': 'Clothes',
'Suits': 'Clothes',
'Blouses': 'Clothes',


'Diving equipment': 'Divings',
'Diving masks': 'Divings',
'Diving wetsuits': 'Divings',
'Diving tanks': 'Divings',
'Diving regulators': 'Divings',
'Diving computers': 'Divings',
'Diving lights': 'Divings',
'Diving accessories': 'Divings',
'Diving knives': 'Divings',
'Diving gear': 'Divings',
'Diving buoyancy aids': 'Divings',
'Diving weight systems': 'Divings',
'Diving underwater cameras': 'Divings',
'Diving gloves': 'Divings',
'Diving hoods': 'Divings',
'Diving snorkels': 'Divings',
'Diving safety equipment': 'Divings',
'Diving fins': 'Divings',
'Diving training': 'Divings',



'Racing drones': 'Drones',
'Professional drones': 'Drones',
'Drone accessories': 'Drones',
'Drone batteries': 'Drones',
'Drone chargers': 'Drones',
'Drone propellers': 'Drones',
'Drone gimbals': 'Drones',
'Drone cases': 'Drones',
'Drone controllers': 'Drones',
'Drone software': 'Drones',
'Drone cameras': 'Drones',
'Drone parts': 'Drones',
'Drone maintenance': 'Drones',
'Drone repair services': 'Drones',
'Drone rentals': 'Drones',
'Drone equipment': 'Drones',
'Drone kits': 'Drones',
'Drone landing gear': 'Drones',
'Drone lights': 'Drones',



'LED lights': 'Eclairages',
'Floor lamps': 'Eclairages',
'Table lamps': 'Eclairages',

'Wall sconces': 'Eclairages',

'Smart lights': 'Eclairages',
'Chandeliers': 'Eclairages',

'Recessed lights': 'Eclairages',
'Spotlights': 'Eclairages',
'Light bulbs': 'Eclairages',
'Lighting accessories': 'Eclairages',
'Lighting control systems': 'Eclairages',

'Decorative lighting': 'Eclairages',
'LED strips': 'Eclairages',
'Floodlights': 'Eclairages',


'Power drills': 'Electricaltools',
'Electric saws': 'Electricaltools',
'Cordless tools': 'Electricaltools',
'Wrenches': 'Electricaltools',
'Electric screwdrivers': 'Electricaltools',
'Multimeters': 'Electricaltools',
'Corded drills': 'Electricaltools',
'Grinders': 'Electricaltools',
'Sanders': 'Electricaltools',
'Electric hammers': 'Electricaltools',
'Electric testers': 'Electricaltools',
'Electric chisels': 'Electricaltools',
'Power tools accessories': 'Electricaltools',
'Drill bits': 'Electricaltools',
'Saw blades': 'Electricaltools',
'Tool batteries': 'Electricaltools',
'Tool chargers': 'Electricaltools',
'Tool cases': 'Electricaltools',


'Heavy machinery': 'Engins',
'Construction equipment': 'Engins',
'Agricultural machinery': 'Engins',
'Industrial engines': 'Engins',
'Generators': 'Engins',
'Engines for vehicles': 'Engins',
'Engine parts': 'Engins',
'Engine maintenance': 'Engins',
'Engine repair services': 'Engins',
'Machinery parts': 'Engins',
'Mechanical tools': 'Engins',
'Engine accessories': 'Engins',
'Power generators': 'Engins',
'Engine diagnostics': 'Engins',
'Engine oil': 'Engins',
'Engine coolants': 'Engins',
'Engine filters': 'Engins',
'Engine mounts': 'Engins',
'Engine belts': 'Engins',
'Engine starters': 'Engins',


'Football gear': 'Footballs',
'Football shoes': 'Footballs',
'Football jerseys': 'Footballs',
'Football shorts': 'Footballs',
'Football socks': 'Footballs',
'Football gloves': 'Footballs',
'Football training equipment': 'Footballs',
'Football goals': 'Footballs',
'Football balls': 'Footballs',
'Football protective gear': 'Footballs',
'Football accessories': 'Footballs',
'Football kits': 'Footballs',
'Football bags': 'Footballs',
'Football coaching tools': 'Footballs',
'Football nets': 'Footballs',
'Football referee gear': 'Footballs',
'Football drills': 'Footballs',

'Football headgear': 'Footballs',
'Football shin guards': 'Footballs',


'Living room furniture': 'Furnitures',

'Dining room furniture': 'Furnitures',
'Outdoor furniture': 'Furnitures',
'Bedroom sets': 'Furnitures',
'Cabinets': 'Furnitures',
'Dressers': 'Furnitures',
'Beds': 'Furnitures',
'Entertainment centers': 'Furnitures',
'Dining tables': 'Furnitures',
'Accent furniture': 'Furnitures',


'Video games': 'Gamings',
'Gaming consoles': 'Gamings',
'Gaming PCs': 'Gamings',
'Gaming laptops': 'Gamings',
'Gaming accessories': 'Gamings',
'Gaming headsets': 'Gamings',
'Gaming keyboards': 'Gamings',
'Gaming mice': 'Gamings',
'Gaming chairs': 'Gamings',
'Gaming monitors': 'Gamings',
'Gaming controllers': 'Gamings',
'Gaming software': 'Gamings',
'Gaming routers': 'Gamings',
'Gaming desks': 'Gamings',
'Gaming hardware': 'Gamings',
'Gaming gear': 'Gamings',
'Gaming setups': 'Gamings',
'VR gaming equipment': 'Gamings',
'Gaming collectibles': 'Gamings',
'Esports equipment': 'Gamings',



'Golf balls': 'Golfs',
'Golf bags': 'Golfs',
'Golf shoes': 'Golfs',
'Golf gloves': 'Golfs',
'Golf tees': 'Golfs',
'Golf carts': 'Golfs',
'Golf apparel': 'Golfs',
'Golf clubs sets': 'Golfs',
'Golf rangefinders': 'Golfs',
'Golf accessories': 'Golfs',
'Golf putters': 'Golfs',
'Golf drivers': 'Golfs',
'Golf wedges': 'Golfs',
'Golf irons': 'Golfs',
'Golf training aids': 'Golfs',
'Golf umbrellas': 'Golfs',
'Golf headcovers': 'Golfs',
'Golf grips': 'Golfs',
'Golf maintenance tools': 'Golfs',


'Refrigerators': 'Houseappliances',
'Washing machines': 'Houseappliances',
'Dryers': 'Houseappliances',
'Microwaves': 'Houseappliances',
'Dishwashers': 'Houseappliances',
'Ovens': 'Houseappliances',
'Stoves': 'Houseappliances',
'Toasters': 'Houseappliances',
'Coffee makers': 'Houseappliances',
'Blenders': 'Houseappliances',
'Vacuum cleaners': 'Houseappliances',
'Air conditioners': 'Houseappliances',
'Heaters': 'Houseappliances',
'Fans': 'Houseappliances',
'Water heaters': 'Houseappliances',
'Dehumidifiers': 'Houseappliances',
'Irons': 'Houseappliances',
'Food processors': 'Houseappliances',
'Garbage disposals': 'Houseappliances',
'Microwave ovens': 'Houseappliances',


'Hunting rifles': 'Huntings',
'Hunting bows': 'Huntings',
'Hunting scopes': 'Huntings',
'Hunting knives': 'Huntings',
'Hunting gear': 'Huntings',
'Hunting accessories': 'Huntings',
'Hunting binoculars': 'Huntings',
'Hunting boots': 'Huntings',
'Hunting clothing': 'Huntings',
'Hunting backpacks': 'Huntings',
'Hunting safety gear': 'Huntings',
'Hunting calls': 'Huntings',
'Hunting blinds': 'Huntings',
'Hunting ammunition': 'Huntings',
'Hunting cameras': 'Huntings',
'Hunting tripods': 'Huntings',
'Hunting shelters': 'Huntings',
'Hunting maps': 'Huntings',
'Hunting targets': 'Huntings',
'Hunting survival gear': 'Huntings',


'Rings': 'Jewelrys',
'Earrings': 'Jewelrys',
'Necklaces': 'Jewelrys',
'Bracelets': 'Jewelrys',
'Watches': 'Jewelrys',
'Brooches': 'Jewelrys',
'Anklets': 'Jewelrys',
'Jewelry sets': 'Jewelrys',
'Jewelry boxes': 'Jewelrys',
'Custom jewelry': 'Jewelrys',
'Gold jewelry': 'Jewelrys',
'Silver jewelry': 'Jewelrys',
'Gemstone jewelry': 'Jewelrys',
'Diamond jewelry': 'Jewelrys',
'Pearl jewelry': 'Jewelrys',
'Vintage jewelry': 'Jewelrys',
'Fashion jewelry': 'Jewelrys',
'Wedding jewelry': 'Jewelrys',
'Engagement rings': 'Jewelrys',
'Men\'s jewelry': 'Jewelrys',


'Step ladders': 'Ladders',
'Extension ladders': 'Ladders',
'Multi-purpose ladders': 'Ladders',
'Roof ladders': 'Ladders',
'Telescoping ladders': 'Ladders',
'Folding ladders': 'Ladders',
'Ladder accessories': 'Ladders',
'Ladder stabilizers': 'Ladders',
'Ladder hooks': 'Ladders',
'Ladder racks': 'Ladders',
'Ladder platforms': 'Ladders',
'Ladder safety gear': 'Ladders',
'Ladder treads': 'Ladders',
'Ladder repair kits': 'Ladders',
'Ladder covers': 'Ladders',
'Industrial ladders': 'Ladders',
'Lightweight ladders': 'Ladders',
'Heavy-duty ladders': 'Ladders',
'Ladder stands': 'Ladders',
'Ladder guards': 'Ladders',



'Business laptops': 'Laptops',
'Convertible laptops': 'Laptops',
'Ultrabooks': 'Laptops',
'Laptop accessories': 'Laptops',
'Laptop bags': 'Laptops',
'Laptop cases': 'Laptops',

'Laptop stands': 'Laptops',
'Laptop cooling pads': 'Laptops',
'Laptop docking stations': 'Laptops',
'Laptop keyboards': 'Laptops',
'Laptop mice': 'Laptops',
'Laptop skins': 'Laptops',
'Laptop batteries': 'Laptops',
'Laptop repair services': 'Laptops',
'Laptop parts': 'Laptops',
'Laptop maintenance': 'Laptops',
'Laptop upgrades': 'Laptops',
'Laptop software': 'Laptops',


'LED bulbs': 'Lightings',

'Ceiling lights': 'Lightings',
'Wall lights': 'Lightings',


'Outdoor lighting': 'Lightings',

'String lights': 'Lightings',
'Lighting fixtures': 'Lightings',
'Lighting controls': 'Lightings',
'Dimmer switches': 'Lightings',
'Smart lighting': 'Lightings',

'Track lighting': 'Lightings',
'Pendant lights': 'Lightings',
'Recessed lighting': 'Lightings',
'Night lights': 'Lightings',
'Flood lights': 'Lightings',


'Fiction books': 'Livres',
'Non-fiction books': 'Livres',
'Children\'s books': 'Livres',
'Textbooks': 'Livres',
'Cookbooks': 'Livres',
'Biographies': 'Livres',
'Self-help books': 'Livres',
'Science books': 'Livres',
'History books': 'Livres',
'Travel books': 'Livres',
'Fantasy books': 'Livres',
'Science fiction books': 'Livres',
'Romance books': 'Livres',
'Mystery books': 'Livres',
'Thriller books': 'Livres',
'Poetry books': 'Livres',
'Graphic novels': 'Livres',
'Comics': 'Livres',
'Children\'s educational books': 'Livres',
'Professional books': 'Livres',


'Grocery stores': 'Magasins',
'Clothing stores': 'Magasins',
'Electronics stores': 'Magasins',
'Furniture stores': 'Magasins',
'Bookstores': 'Magasins',
'Pharmacies': 'Magasins',
'Hardware stores': 'Magasins',
'Sporting goods stores': 'Magasins',
'Jewelry stores': 'Magasins',
'Toy stores': 'Magasins',
'Beauty stores': 'Magasins',
'Home decor stores': 'Magasins',
'Pet stores': 'Magasins',
'Music stores': 'Magasins',
'Kitchenware stores': 'Magasins',
'Office supply stores': 'Magasins',
'Craft stores': 'Magasins',
'Automotive stores': 'Magasins',
'Department stores': 'Magasins',


'Single-family homes': 'Maisons',
'Multi-family homes': 'Maisons',
'Luxury homes': 'Maisons',
'Vacation homes': 'Maisons',
'Historic homes': 'Maisons',
'Modern homes': 'Maisons',
'Modular homes': 'Maisons',
'Tiny homes': 'Maisons',
'Custom homes': 'Maisons',
'Smart homes': 'Maisons',
'Green homes': 'Maisons',
'Home listings': 'Maisons',
'Home rentals': 'Maisons',
'Home sales': 'Maisons',
'Home appraisals': 'Maisons',
'Home inspections': 'Maisons',
'Real estate services': 'Maisons',
'Home improvement': 'Maisons',
'Home decor': 'Maisons',
'Home design': 'Maisons',


'Socket sets': 'Mechanicaltools',
'Pliers': 'Mechanicaltools',
'Hammers': 'Mechanicaltools',
'Screwdrivers': 'Mechanicaltools',
'Cutting tools': 'Mechanicaltools',
'Measuring tools': 'Mechanicaltools',
'Drills': 'Mechanicaltools',
'Vices': 'Mechanicaltools',
'Hand tools': 'Mechanicaltools',
'Tool sets': 'Mechanicaltools',
'Carpentry tools': 'Mechanicaltools',
'Metalworking tools': 'Mechanicaltools',
'Toolboxes': 'Mechanicaltools',
'Tool storage': 'Mechanicaltools',
'Precision tools': 'Mechanicaltools',
'Garden tools': 'Mechanicaltools',
'Workshop tools': 'Mechanicaltools',
'Maintenance tools': 'Mechanicaltools',


'Bedroom furniture': 'Mobiliers',
'Office furniture': 'Mobiliers',

'Storage furniture': 'Mobiliers',
'Sofas': 'Mobiliers',
'Tables': 'Mobiliers',
'Chairs': 'Mobiliers',
'Bookshelves': 'Mobiliers',
'Nightstands': 'Mobiliers',
'Desk chairs': 'Mobiliers',
'Bar stools': 'Mobiliers',


'Motorcycles': 'Motos',
'Motorcycle gear': 'Motos',
'Motorcycle helmets': 'Motos',
'Motorcycle jackets': 'Motos',
'Motorcycle gloves': 'Motos',
'Motorcycle boots': 'Motos',
'Motorcycle accessories': 'Motos',
'Motorcycle parts': 'Motos',
'Motorcycle maintenance': 'Motos',
'Motorcycle repair services': 'Motos',
'Motorcycle insurance': 'Motos',
'Motorcycle covers': 'Motos',
'Motorcycle batteries': 'Motos',
'Motorcycle tools': 'Motos',
'Motorcycle safety gear': 'Motos',
'Motorcycle exhausts': 'Motos',
'Motorcycle tires': 'Motos',
'Motorcycle seats': 'Motos',
'Motorcycle lights': 'Motos',
'Motorcycle storage': 'Motos',


'Weight lifting equipment': 'Musculations',
'Dumbbells': 'Musculations',
'Barbells': 'Musculations',
'Resistance bands': 'Musculations',
'Weight benches': 'Musculations',
'Kettlebells': 'Musculations',
'Power racks': 'Musculations',
'Smith machines': 'Musculations',
'Medicine balls': 'Musculations',
'Bodyweight equipment': 'Musculations',
'Weight plates': 'Musculations',
'Gym mats': 'Musculations',
'Fitness machines': 'Musculations',
'Cardio equipment': 'Musculations',
'Exercise bikes': 'Musculations',
'Treadmills': 'Musculations',
'Rowing machines': 'Musculations',
'Ellipticals': 'Musculations',
'Strength training equipment': 'Musculations',
'Personal training gear': 'Musculations',


'Musical instruments': 'Musicals',
'Guitars': 'Musicals',
'Pianos': 'Musicals',
'Drums': 'Musicals',
'Keyboards': 'Musicals',
'Violins': 'Musicals',
'Trumpets': 'Musicals',
'Saxophones': 'Musicals',
'Microphones': 'Musicals',
'Amplifiers': 'Musicals',
'Music accessories': 'Musicals',
'Sheet music': 'Musicals',
'Music stands': 'Musicals',
'Music theory books': 'Musicals',
'Recording equipment': 'Musicals',
'Music software': 'Musicals',
'Music production tools': 'Musicals',
'DJ equipment': 'Musicals',
'Studio monitors': 'Musicals',
'Musical gear': 'Musicals',


'Camera equipment': 'Photographies',
'Photography accessories': 'Photographies',
'Photo albums': 'Photographies',
'Photography lighting': 'Photographies',
'Tripods': 'Photographies',
'Camera bags': 'Photographies',
'Photo printers': 'Photographies',
'Photo paper': 'Photographies',
'Photo frames': 'Photographies',
'Photography software': 'Photographies',
'Photo editing tools': 'Photographies',
'Photography props': 'Photographies',
'Photography backdrops': 'Photographies',
'Photography studio equipment': 'Photographies',
'Photography workshops': 'Photographies',
'Memory cards': 'Photographies',
'Photography tutorials': 'Photographies',
'Photography equipment': 'Photographies',


'Saws': 'Powertools',
'Rotary tools': 'Powertools',
'Impact drivers': 'Powertools',
'Power tool accessories': 'Powertools',
'Power tool batteries': 'Powertools',
'Power tool chargers': 'Powertools',
'Power tool kits': 'Powertools',
'Power tools for woodworking': 'Powertools',
'Power tools for metalworking': 'Powertools',
'Power tool repair services': 'Powertools',
'Power tools maintenance': 'Powertools',
'Power tool storage': 'Powertools',
'Power tool safety gear': 'Powertools',
'Power tool parts': 'Powertools',
'Power tools for construction': 'Powertools',
'Power tool cleaning tools': 'Powertools',


'Gas pressure washers': 'Pressurewashers',
'Electric pressure washers': 'Pressurewashers',
'Pressure washer accessories': 'Pressurewashers',
'Pressure washer hoses': 'Pressurewashers',
'Pressure washer nozzles': 'Pressurewashers',
'Pressure washer pumps': 'Pressurewashers',
'Pressure washer detergents': 'Pressurewashers',
'Pressure washer parts': 'Pressurewashers',
'Pressure washer repairs': 'Pressurewashers',
'Pressure washer maintenance': 'Pressurewashers',
'Pressure washer carts': 'Pressurewashers',
'Pressure washer attachments': 'Pressurewashers',
'Pressure washer wands': 'Pressurewashers',
'Pressure washer cleaners': 'Pressurewashers',
'Pressure washer safety gear': 'Pressurewashers',
'Pressure washer storage': 'Pressurewashers',
'Pressure washer trailers': 'Pressurewashers',
'Pressure washer extension poles': 'Pressurewashers',
'Pressure washer water filters': 'Pressurewashers',
'Pressure washer brushes': 'Pressurewashers',


'Inkjet printers': 'Printers',
'Laser printers': 'Printers',
'All-in-one printers': 'Printers',
'3D printers': 'Printers',
'Printer cartridges': 'Printers',
'Printer paper': 'Printers',
'Printer accessories': 'Printers',
'Printer scanners': 'Printers',
'Printer copiers': 'Printers',
'Printer maintenance': 'Printers',
'Printer repair services': 'Printers',
'Printer parts': 'Printers',
'Wireless printers': 'Printers',
'Network printers': 'Printers',
'Portable printers': 'Printers',
'Office printers': 'Printers',
'Label printers': 'Printers',
'Printer toners': 'Printers',
'Printer stands': 'Printers',


'Traditional riads': 'Riads',
'Luxury riads': 'Riads',
'Riads for rent': 'Riads',
'Riads for sale': 'Riads',
'Riads in Marrakech': 'Riads',
'Riads with pools': 'Riads',
'Riads with gardens': 'Riads',
'Riads with terraces': 'Riads',
'Riads for events': 'Riads',
'Riads with views': 'Riads',
'Riads with traditional decor': 'Riads',
'Riads with modern amenities': 'Riads',
'Riads for vacation': 'Riads',
'Riads with cultural experiences': 'Riads',
'Riads for short stays': 'Riads',
'Riads with historical significance': 'Riads',
'Riads with high-end furnishings': 'Riads',
'Riads with private spaces': 'Riads',
'Riads with excellent service': 'Riads',
'Riads with central locations': 'Riads',

};

const PRODUCT_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured' },

  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];



const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];



export default function JobsListViewType({ params }) {

  const searchParams = useSearchParams();


  const {city, type } = params;

  const searchKeyword = searchParams.get('searchKeyword');


  const [favorites, setFavorites] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const [searchParamsState, setSearchParamsState] = useState({});





  const { data: initialData, isLoading: isInitialLoading, error: initialError } = useQuery({
    queryKey: ['services', city, type, searchKeyword],
    queryFn: () => CrudService.getSearchJobType(city, type, searchKeyword),
    onError: (error) => {
      console.error('Failed to fetch Home:', error);
    },
  });



  // Query for search results
  const { data: searchData, isLoading: isSearchLoading, isFetching: isSearching, error: searchError } = useQuery({
    queryKey: ['services', debouncedQuery],
    queryFn: () => CrudService.getSearchJobListings(debouncedQuery),
    enabled: !!debouncedQuery, // Only run query if debouncedQuery is not empty
    onError: (error) => {
      console.error('Failed to fetch search results:', error);
    },
  });




  useEffect(() => {
    if (initialData?.favorites) {
      setFavorites(initialData.favorites);
    }
  }, [initialData]);


  useEffect(() => {
    if (searchData?.favorites) {
      setFavorites(searchData.favorites);
    }
  }, [searchData]);





  const services = useMemo(() => searchData?.data || initialData?.data || [], [searchData, initialData]);
  const isLoading = isInitialLoading || isSearching;


  const memoizedValue = useMemo(() => ({
    services,
    favorites,
    servicesLoading: isSearchLoading || isInitialLoading,
    servicesError: searchError || initialError,
    servicesFetching: isLoading,
    servicesEmpty: !isSearchLoading && !(services.length),
  }), [ searchError, isLoading, isInitialLoading, initialError, services, favorites, isSearchLoading]);




  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);












  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('newest');



  const filters = useSetState({
    gender: [],

    rating: '',
    category: 'all',

    priceRange: { start: 0, end: 0 },

  });

  // const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);
  const dataFiltered = applyFilter({ inputData: services, filters: filters.state, sortBy });


  const canReset =
    filters.state.gender.length > 0 ||

    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange.start !== 0 || // Updated check
    filters.state.priceRange.end !== 0;   // Updated check

    const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((params) => {
    setSearchParamsState(params);
  }, []);

  const productsEmpty = !services.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;











  return (
    <Container
      maxWidth={false}
      sx={{
        mt: { xs: 15, md: 0 },

        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >

      <ServiceSearch
        colorr="black"
        onSearch={handleSearch}
        categories={categories}
        keywordCategoryMap={keywordCategoryMap}

        sx={{
          color: { md: 'common.white' },
          bgcolor: (theme) => ({
            xs: 'background.neutral',
            md: theme.palette.common.white,
          }),
        }}
      />


        <Stack direction="row" justifyContent="space-between" sx={{ my: 1, }}>
          <Stack spacing={2.5} >

              <ProductFilters
                filters={filters}
                canReset={canReset}
                open={openFilters.value}
                onOpen={openFilters.onTrue}
                onClose={openFilters.onFalse}
                options={{

                  ratings: PRODUCT_RATING_OPTIONS,
                  genders: PRODUCT_GENDER_OPTIONS,
                  categories: ['all', ...PRODUCT_CATEGORY_OPTIONS],
                }}
              />

          </Stack>

          <Stack alignItems="flex-end" spacing={2.5} >
            <ProductSort  sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />

          </Stack>
        </Stack>



        <Stack direction="row" justifyContent="space-between" >
          <Stack spacing={2.5} sx={{ my: 3 }}>
            {canReset && renderResults}
          </Stack>


        </Stack>




        {!isLoading  && (notFound || productsEmpty) && renderNotFound}








      <ServiceList jobs={dataFiltered} loading={isLoading} favorites={favorites} onFavoriteToggle={handleFavoriteToggle}/>
    </Container>
  );
}

JobsListViewType.propTypes = {
  params: PropTypes.shape({
    type: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};




function applyFilter({ inputData, filters, sortBy }) {
  const { gender, category, priceRange, rating } = filters;

  const min = priceRange.start;
  const max = priceRange.end;




  // Sort by
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, [(item) => new Date(item.attributes.created_at)], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, [(item) => Number(item.attributes.price)], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, [(item) => Number(item.attributes.price)], ['asc']);
  }
  // filters
  if (gender.length) {
    inputData = inputData.filter((product) => product.gender.some((i) => gender.includes(i)));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }


  // Apply price filter based on user input only
  if (min !== 0 || max !== 0) {
    inputData = inputData.filter((product) => {
      const price = Number(product.attributes.price);
      // Filter based on the existence of min and/or max
      return (min === 0 || price >= min) && (max === 0 || price <= max);
    });
  }


  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  }



  return inputData;
}



const categories = [
  { value: 'apartments', label: 'Apartments' },
  { value: 'cars', label: 'Cars' },
  { value: 'offices', label: 'Offices' },
  { value: 'activities', label: 'Activities' },
  { value: 'engins', label: 'Engins' },
  { value: 'lands', label: 'Lands' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'bicycles', label: 'Bicycles' },
  { value: 'villas', label: 'Villas' },
  { value: 'audio', label: 'Audio' },
  { value: 'boats', label: 'Boats' },
  { value: 'boxing', label: 'Boxing' },
  { value: 'cameras', label: 'Cameras' },
  { value: 'trucks', label: 'Trucks' },
  { value: 'caravans', label: 'Caravans' },
  { value: 'chargers', label: 'Chargers' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'diving', label: 'Diving' },
  { value: 'drones', label: 'Drones' },
  { value: 'eclairage', label: 'Eclairage' },
  { value: 'electrical-tools', label: 'Electrical Tools' },
  { value: 'football', label: 'Football' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'golf', label: 'Golf' },
  { value: 'home-appliances', label: 'Home Appliances' },
  { value: 'hunting', label: 'Hunting' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'ladders', label: 'Ladders' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'books', label: 'Books' },
  { value: 'shops', label: 'Shops' },
  { value: 'houses', label: 'Houses' },
  { value: 'mechanical-tools', label: 'Mechanical Tools' },
  { value: 'mobilier', label: 'Mobilier' },
  { value: 'motorcycles', label: 'Motorcycles' },
  { value: 'gym', label: 'Gym' },
  { value: 'musical', label: 'Musical' },
  { value: 'photography', label: 'Photography' },
  { value: 'power-tools', label: 'Power Tools' },
  { value: 'pressure-washers', label: 'Pressure Washers' },
  { value: 'printers', label: 'Printers' },
  { value: 'riads', label: 'Riads' },
  { value: 'routers', label: 'Routers' },
  { value: 'scooters', label: 'Scooters' },
  { value: 'services', label: 'Services' },
  { value: 'sound-systems', label: 'Sound Systems' },
  { value: 'surf', label: 'Surf' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'airport-taxis', label: 'Airport Taxis' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'tents', label: 'Tents' },
  { value: 'billiard', label: 'Billiard' }
];
