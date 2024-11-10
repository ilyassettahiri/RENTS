import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    order: '1',
    subheader: 'Vehicule',
    items: [
      { value: 'boats', title: 'Boats',  },
      { value: 'trucks', title: 'Trucks',  },
      { value: 'caravans', title: 'Caravans',  },
      { value: 'cars', title: 'Cars',  },
      { value: 'engins', title: 'Engins',  },
      { value: 'motorcycles', title: 'Motorcycles',  },
      { value: 'scooters', title: 'Scooters',  },
      { value: 'airport-taxis', title: 'Airport Taxis',  },
      { value: 'transportation', title: 'Transportation',  },
      { value: 'bicycles', title: 'Bicycles',  },
    ],
  },
  {
    order: '2',
    subheader: 'Immobilier',
    items: [
      { value: 'apartments', title: 'Apartments',  },
      { value: 'offices', title: 'Offices',  },
      { value: 'shops', title: 'Shops',  },
      { value: 'houses', title: 'Houses',  },
      { value: 'riads', title: 'Riads',  },
      { value: 'lands', title: 'Lands',  },
      { value: 'villas', title: 'Villas',  },
    ],
  },
  {
    order: '3',
    subheader: 'Electronic',
    items: [
      { value: 'audio', title: 'Audio',  },
      { value: 'cameras', title: 'Cameras',  },
      { value: 'chargers', title: 'Chargers',  },
      { value: 'drones', title: 'Drones',  },
      { value: 'gaming', title: 'Gaming',  },
      { value: 'laptops', title: 'Laptops',  },
      { value: 'lighting', title: 'Lighting',  },
      { value: 'printers', title: 'Printers',  },
      { value: 'routers', title: 'Routers',  },
      { value: 'tablets', title: 'Tablets',  },
    ],
  },
  {
    order: '4',
    subheader: 'MaterielProfessionnel',
    items: [
      { value: 'electrical-tools', title: 'Electrical Tools',  },
      { value: 'ladders', title: 'Ladders',  },
      { value: 'mechanical-tools', title: 'Mechanical Tools',  },
      { value: 'power-tools', title: 'Power Tools',  },
      { value: 'pressure-washers', title: 'Pressure Washers',  },
    ],
  },
  {
    order: '5',
    subheader: 'BienetreSport',
    items: [
      { value: 'billiard', title: 'Billiard',  },
      { value: 'boxing', title: 'Boxing',  },
      { value: 'diving', title: 'Diving',  },
      { value: 'football', title: 'Football',  },
      { value: 'golf', title: 'Golf',  },
      { value: 'hunting', title: 'Hunting',  },
      { value: 'gym', title: 'Gym',  },
      { value: 'surf', title: 'Surf',  },
      { value: 'tennis', title: 'Tennis',  },
    ],
  },
  {
    order: '6',
    subheader: 'EquipementpourEvenements',
    items: [
      { value: 'eclairage', title: 'Eclairage',  },
      { value: 'mobilier', title: 'Mobilier',  },
      { value: 'photography', title: 'Photography',  },
      { value: 'sound-systems', title: 'Sound Systems',  },
      { value: 'tents', title: 'Tents',  },
    ],
  },
  {
    order: '7',
    subheader: 'LoisirsetDivertissements',
    items: [
      { value: 'activities', title: 'Activities',  },
      { value: 'books', title: 'Books',  },
      { value: 'musical', title: 'Musical',  },
    ],
  },
  {
    order: '8',
    subheader: 'Habillement',
    items: [
      { value: 'clothes', title: 'Clothes',  },
      { value: 'jewelry', title: 'Jewelry',  },
    ],
  },
  {
    order: '9',
    subheader: 'MaisonetetJardin',
    items: [
      { value: 'furniture', title: 'Furniture',  },
      { value: 'home-appliances', title: 'Home Appliances',  },
    ],
  },
];

export const navConfig = (lang = 'en') => {
  const langPaths = paths(lang);

  // Map pageLinks to include language prefix
  const localizedPageLinks = pageLinks.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      path: `/${lang}${item.path || '/'}`, // Prefix with language
    })),
  }));

  return [
    { title: 'Home', path: langPaths.home },
    { title: 'Services', path: langPaths.career.jobs },
    { title: 'Jobs', path: langPaths.job.jobbs },
    { title: 'Business', path: langPaths.eLearning.courses },
    {
      title: 'Categories',
      path: `/${lang}${paths.pages}`,
      children: localizedPageLinks, // Use the localized page links with prefixed paths
    },
  ];
};
