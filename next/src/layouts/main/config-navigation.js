import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    order: '1',
    subheader: 'Vehicule',
    items: [
      { value: 'boats', title: 'Boats', path: paths.travel.termcondition },
      { value: 'trucks', title: 'Trucks', path: paths.travel.privacy },
      { value: 'caravans', title: 'Caravans', path: paths.travel.termcondition },
      { value: 'cars', title: 'Cars', path: paths.travel.privacy },
      { value: 'engins', title: 'Engins', path: paths.travel.termcondition },
      { value: 'motorcycles', title: 'Motorcycles', path: paths.travel.privacy },
      { value: 'scooters', title: 'Scooters', path: paths.travel.termcondition },
      { value: 'airport-taxis', title: 'Airport Taxis', path: paths.travel.privacy },
      { value: 'transportation', title: 'Transportation', path: paths.travel.termcondition },
      { value: 'bicycles', title: 'Bicycles', path: paths.travel.privacy },
    ],
  },
  {
    order: '2',
    subheader: 'Immobilier',
    items: [
      { value: 'apartments', title: 'Apartments', path: paths.travel.about },
      { value: 'offices', title: 'Offices', path: paths.travel.posts },
      { value: 'shops', title: 'Shops', path: paths.travel.about },
      { value: 'houses', title: 'Houses', path: paths.travel.posts },
      { value: 'riads', title: 'Riads', path: paths.travel.about },
      { value: 'lands', title: 'Lands', path: paths.travel.posts },
      { value: 'villas', title: 'Villas', path: paths.travel.about },
    ],
  },
  {
    order: '3',
    subheader: 'Electronic',
    items: [
      { value: 'audio', title: 'Audio', path: paths.travel.termcondition },
      { value: 'cameras', title: 'Cameras', path: paths.travel.privacy },
      { value: 'chargers', title: 'Chargers', path: paths.travel.termcondition },
      { value: 'drones', title: 'Drones', path: paths.travel.privacy },
      { value: 'gaming', title: 'Gaming', path: paths.travel.termcondition },
      { value: 'laptops', title: 'Laptops', path: paths.travel.privacy },
      { value: 'lighting', title: 'Lighting', path: paths.travel.termcondition },
      { value: 'printers', title: 'Printers', path: paths.travel.privacy },
      { value: 'routers', title: 'Routers', path: paths.travel.termcondition },
      { value: 'tablets', title: 'Tablets', path: paths.travel.privacy },
    ],
  },
  {
    order: '4',
    subheader: 'MaterielProfessionnel',
    items: [
      { value: 'electrical-tools', title: 'Electrical Tools', path: paths.travel.termcondition },
      { value: 'ladders', title: 'Ladders', path: paths.travel.privacy },
      { value: 'mechanical-tools', title: 'Mechanical Tools', path: paths.travel.termcondition },
      { value: 'power-tools', title: 'Power Tools', path: paths.travel.privacy },
      { value: 'pressure-washers', title: 'Pressure Washers', path: paths.travel.privacy },
    ],
  },
  {
    order: '5',
    subheader: 'BienetreSport',
    items: [
      { value: 'billiard', title: 'Billiard', path: paths.support },
      { value: 'boxing', title: 'Boxing', path: paths.travel.contact },
      { value: 'diving', title: 'Diving', path: paths.support },
      { value: 'football', title: 'Football', path: paths.travel.contact },
      { value: 'golf', title: 'Golf', path: paths.support },
      { value: 'hunting', title: 'Hunting', path: paths.travel.contact },
      { value: 'gym', title: 'Gym', path: paths.support },
      { value: 'surf', title: 'Surf', path: paths.travel.contact },
      { value: 'tennis', title: 'Tennis', path: paths.support },
    ],
  },
  {
    order: '6',
    subheader: 'EquipementpourEvenements',
    items: [
      { value: 'eclairage', title: 'Eclairage', path: paths.travel.termcondition },
      { value: 'mobilier', title: 'Mobilier', path: paths.travel.privacy },
      { value: 'photography', title: 'Photography', path: paths.travel.termcondition },
      { value: 'sound-systems', title: 'Sound Systems', path: paths.travel.privacy },
      { value: 'tents', title: 'Tents', path: paths.travel.termcondition },
    ],
  },
  {
    order: '7',
    subheader: 'LoisirsetDivertissements',
    items: [
      { value: 'activities', title: 'Activities', path: paths.travel.termcondition },
      { value: 'books', title: 'Books', path: paths.travel.privacy },
      { value: 'musical', title: 'Musical', path: paths.travel.privacy },
    ],
  },
  {
    order: '8',
    subheader: 'Habillement',
    items: [
      { value: 'clothes', title: 'Clothes', path: paths.travel.termcondition },
      { value: 'jewelry', title: 'Jewelry', path: paths.travel.privacy },
    ],
  },
  {
    order: '9',
    subheader: 'MaisonetetJardin',
    items: [
      { value: 'furniture', title: 'Furniture', path: paths.travel.termcondition },
      { value: 'home-appliances', title: 'Home Appliances', path: paths.travel.privacy },
    ],
  },
];


export const navConfig = [
  { title: 'Home', path: '/' },

  { title: 'Services', path: paths.career.jobs },

  { title: 'Jobs', path: paths.job.jobbs },


  { title: 'Business', path: paths.eLearning.courses },
  {
    title: 'Categories',
    path: paths.pages,
    children: [pageLinks[0], pageLinks[1], pageLinks[2], pageLinks[3], pageLinks[4], pageLinks[5], pageLinks[6], pageLinks[7], pageLinks[8]],
  },




];
