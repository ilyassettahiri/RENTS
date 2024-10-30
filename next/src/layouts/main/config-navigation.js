import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [


  {
    order: '1',
    subheader: 'Vehicule',

    items: [

      { title: 'Boats', path: paths.travel.termcondition },
      { title: 'Trucks', path: paths.travel.privacy },
      { title: 'Caravans', path: paths.travel.termcondition },
      { title: 'Cars', path: paths.travel.privacy },
      { title: 'Engins', path: paths.travel.termcondition },
      { title: 'Motorcycles', path: paths.travel.privacy },
      { title: 'Scooters', path: paths.travel.termcondition },
      { title: 'Airport Taxis', path: paths.travel.privacy },
      { title: 'Transportation', path: paths.travel.termcondition },
      { title: 'Bicycles', path: paths.travel.privacy },


    ],
  },

  {
    order: '2',
    subheader: 'Immobilier',

    items: [

      { title: 'Apartments', path: paths.travel.about },
      { title: 'Offices', path: paths.travel.posts },

      { title: 'Shops', path: paths.travel.about },
      { title: 'Houses', path: paths.travel.posts },
      { title: 'Riads', path: paths.travel.about },
      { title: 'Lands', path: paths.travel.posts },
      { title: 'Villas', path: paths.travel.about },




    ],
  },
  {
    order: '3',
    subheader: 'Electronic',

    items: [




      { title: 'Audio', path: paths.travel.termcondition },
      { title: 'Cameras', path: paths.travel.privacy },
      { title: 'Chargers', path: paths.travel.termcondition },
      { title: 'Drones', path: paths.travel.privacy },
      { title: 'Gaming', path: paths.travel.termcondition },
      { title: 'Laptops', path: paths.travel.privacy },
      { title: 'Lighting', path: paths.travel.termcondition },
      { title: 'Printers', path: paths.travel.privacy },
      { title: 'Routers', path: paths.travel.termcondition },
      { title: 'Tablets', path: paths.travel.privacy },


    ],
  },
  {
    order: '4',
    subheader: 'MaterielProfessionnel',

    items: [

      { title: 'Electrical Tools', path: paths.travel.termcondition },
      { title: 'Ladders', path: paths.travel.privacy },

      { title: 'Mechanical Tools', path: paths.travel.termcondition },
      { title: 'Power Tools', path: paths.travel.privacy },

      { title: 'Pressure Washers', path: paths.travel.privacy },


    ],
  },
  {
    order: '5',
    subheader: 'BienetreSport',

    items: [


    { title: 'Billiard', path: paths.support },
    { title: 'Boxing', path: paths.travel.contact },
    { title: 'Diving', path: paths.support },
    { title: 'Football', path: paths.travel.contact },
    { title: 'Golf', path: paths.support },
    { title: 'Hunting', path: paths.travel.contact },
    { title: 'Gym', path: paths.support },
    { title: 'Surf', path: paths.travel.contact },
    { title: 'Tennis', path: paths.support },


    ],
  },




  {

    order: '6',
    subheader: 'EquipementpourEvenements',

    items: [
      { title: 'Eclairage', path: paths.travel.termcondition },
      { title: 'Mobilier', path: paths.travel.privacy },
      { title: 'Photography', path: paths.travel.termcondition },
      { title: 'Sound Systems', path: paths.travel.privacy },
      { title: 'Tents', path: paths.travel.termcondition },



    ],
  },





  {

    order: '7',
    subheader: 'LoisirsetDivertissements',

    items: [
      { title: 'Activities', path: paths.travel.termcondition },
      { title: 'Books', path: paths.travel.privacy },
      { title: 'Musical', path: paths.travel.privacy },


    ],
  },




  {

    order: '8',
    subheader: 'Habillement',

    items: [
      { title: 'Clothes', path: paths.travel.termcondition },
      { title: 'Jewelry', path: paths.travel.privacy },


    ],
  },



  {

    order: '9',
    subheader: 'MaisonetetJardin',

    items: [
      { title: 'Furniture', path: paths.travel.termcondition },
      { title: 'Home Appliances', path: paths.travel.privacy },


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
