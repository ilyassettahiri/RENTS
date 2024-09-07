import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [


  {
    order: '1',
    subheader: 'Vehicule',

    items: [

      { title: 'Boats', path: paths.travel.termcondition },
      { title: 'Camions', path: paths.travel.privacy },
      { title: 'Caravans', path: paths.travel.termcondition },
      { title: 'Cars', path: paths.travel.privacy },
      { title: 'Engins', path: paths.travel.termcondition },
      { title: 'Motos', path: paths.travel.privacy },
      { title: 'Scooters', path: paths.travel.termcondition },
      { title: 'Taxiaeroports', path: paths.travel.privacy },
      { title: 'Transportations', path: paths.travel.termcondition },
      { title: 'Velos', path: paths.travel.privacy },


    ],
  },

  {
    order: '2',
    subheader: 'Immobilier',

    items: [

      { title: 'Apartments', path: paths.travel.about },
      { title: 'Bureauxs', path: paths.travel.posts },

      { title: 'Magasins', path: paths.travel.about },
      { title: 'Maisons', path: paths.travel.posts },
      { title: 'Riads', path: paths.travel.about },
      { title: 'Terrains', path: paths.travel.posts },
      { title: 'Villas', path: paths.travel.about },




    ],
  },
  {
    order: '3',
    subheader: 'Electronic',

    items: [




      { title: 'Audios', path: paths.travel.termcondition },
      { title: 'Cameras', path: paths.travel.privacy },
      { title: 'Chargers', path: paths.travel.termcondition },
      { title: 'Drones', path: paths.travel.privacy },
      { title: 'Gamings', path: paths.travel.termcondition },
      { title: 'Laptops', path: paths.travel.privacy },
      { title: 'Lightings', path: paths.travel.termcondition },
      { title: 'Printers', path: paths.travel.privacy },
      { title: 'Routers', path: paths.travel.termcondition },
      { title: 'Tablettes', path: paths.travel.privacy },


    ],
  },
  {
    order: '4',
    subheader: 'MaterielProfessionnel',

    items: [

      { title: 'Electricaltools', path: paths.travel.termcondition },
      { title: 'Ladders', path: paths.travel.privacy },

      { title: 'Mechanicaltools', path: paths.travel.termcondition },
      { title: 'Powertools', path: paths.travel.privacy },

      { title: 'Pressurewashers', path: paths.travel.privacy },


    ],
  },
  {
    order: '5',
    subheader: 'BienetreSport',

    items: [


    { title: 'Billiards', path: paths.support },
    { title: 'Boxings', path: paths.travel.contact },
    { title: 'Divings', path: paths.support },
    { title: 'Footballs', path: paths.travel.contact },
    { title: 'Golfs', path: paths.support },
    { title: 'Huntings', path: paths.travel.contact },
    { title: 'Musculations', path: paths.support },
    { title: 'Surfs', path: paths.travel.contact },
    { title: 'Tennis', path: paths.support },


    ],
  },




  {

    order: '6',
    subheader: 'EquipementpourEvenements',

    items: [
      { title: 'Eclairages', path: paths.travel.termcondition },
      { title: 'Mobiliers', path: paths.travel.privacy },
      { title: 'Photographies', path: paths.travel.termcondition },
      { title: 'Sonorisations', path: paths.travel.privacy },
      { title: 'Tentes', path: paths.travel.termcondition },



    ],
  },





  {

    order: '7',
    subheader: 'LoisirsetDivertissements',

    items: [
      { title: 'Activities', path: paths.travel.termcondition },
      { title: 'Livres', path: paths.travel.privacy },
      { title: 'Musicals', path: paths.travel.privacy },


    ],
  },




  {

    order: '8',
    subheader: 'Habillement',

    items: [
      { title: 'Clothes', path: paths.travel.termcondition },
      { title: 'Jewelrys', path: paths.travel.privacy },


    ],
  },



  {

    order: '9',
    subheader: 'MaisonetetJardin',

    items: [
      { title: 'Furnitures', path: paths.travel.termcondition },
      { title: 'Houseappliances', path: paths.travel.privacy },


    ],
  },

















];

export const navConfig = [
  { title: 'Home', path: '/' },

  { title: 'Services', path: paths.career.jobs },
  { title: 'Business', path: paths.eLearning.courses },
  {
    title: 'Categories',
    path: paths.pages,
    children: [pageLinks[0], pageLinks[1], pageLinks[2], pageLinks[3], pageLinks[4], pageLinks[5], pageLinks[6], pageLinks[7], pageLinks[8]],
  },




];
