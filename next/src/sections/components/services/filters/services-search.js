import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import SearchKeyword from './search-keyword';
import SearchLocation from './search-location';
import SearchCategories from './search-categories';


// ----------------------------------------------------------------------

const defaultValues = {
  searchKeyword: '',
  searchCategories: '',
  searchLocation: '',
};

export default function ServiceSearch({ onSearch, colorr, categories }) {
  const mdUp = useResponsive('up', 'md');
  const mobileOpen = useBoolean();
  const [searchs, setSearchs] = useState(defaultValues);

  const mobileColorr = useResponsive('down', 'sm') ? 'black' : colorr;




  const handleChangeKeyword = useCallback((newValue) => {
    setSearchs((prevSearchs) => ({ ...prevSearchs, searchKeyword: newValue }));
  }, []);

  const handleChangeCategory = useCallback((newValue) => {
    setSearchs((prevSearchs) => ({ ...prevSearchs, searchCategories: newValue }));
  }, []);

  const handleChangeLocation = useCallback((newValue) => {
    setSearchs((prevSearchs) => ({ ...prevSearchs, searchLocation: newValue }));
  }, []);

  const onSubmit = () => {
    // Only include non-empty Searchs
    const nonEmptySearchs = Object.keys(searchs).reduce((acc, key) => {
      if (searchs[key]) {
        acc[key] = searchs[key];
      }
      return acc;
    }, {});

    onSearch(nonEmptySearchs);
  };

  const renderSearchs = (
    <>
      <Grid container spacing={2.5} alignItems="center" >
        <Grid item xs={12} md={5}>
          <SearchKeyword searchKeyword={searchs.searchKeyword} onChangeKeyword={handleChangeKeyword} colorr={mobileColorr}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchCategories searchCategories={searchs.searchCategories} onChangeCategory={handleChangeCategory} categories={categories} colorr={mobileColorr} placeholder="category" icon="carbon:inventory-management"/>
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchCategories searchCategories={searchs.searchLocation} onChangeCategory={handleChangeLocation} categories={cities} colorr={mobileColorr} placeholder="city" icon="carbon:location"/>
        </Grid>
        {mdUp && (
          <Grid item xs={12} md={1}>
            <Button size="large" variant="contained" color="primary" onClick={onSubmit} sx={{ minWidth: { md: 48 },py: 4, px:4 }}>
              <Iconify icon="carbon:search" width={28} />

            </Button>
          </Grid>
        )}
      </Grid>

      {!mdUp && (
        <Button size="large" variant="contained" color="primary" startIcon={<Iconify icon="carbon:search" />} sx={{ mt: 2.5 }} onClick={onSubmit}>
          Search
        </Button>
      )}
    </>
  );

  if (mdUp) {
    return <Box sx={{ py: 5 }}>

              {renderSearchs}

          </Box>;
  }

  return (
    <>
      <Box  sx={{ py: 3, px: 5,  mt: { xs: -15}, mb: { xs: 5}, display: { xs: 'block', md: 'none' }, }}>
        <Button sx={{ py: 1.5, }} fullWidth color="primary" variant="contained" startIcon={<Iconify icon="carbon:search" width={20} />} onClick={mobileOpen.onTrue}>
          Search
        </Button>

      </Box>
      <Drawer
        anchor="right"
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: { pt: 5, px: 3, width: 320 },
        }}
      >
        {renderSearchs}
      </Drawer>
    </>
  );
}
ServiceSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  colorr: PropTypes.string,
  categories: PropTypes.array.isRequired, // Adding categories as a required prop

};





const cities = [
  'Casablanca',
  'Marrakech',
  'Fes',
  'Sale',
  'Marrakesh',
  'Tangier',
  'Rabat',
  'Meknes',
  'Oujda',
  'Kenitra',
  'Agadir',
  'Tetouan',
  'Safi',
  'Temara',
  'Inzegan',
  'Mohammedia',
  'Laayoune',
  'Khouribga',
  'Beni Mellal',
  'El Jadida',
  'Taza',
  'Ait Melloul',
  'Nador',
  'Settat',
  'Ksar El Kbir',
  'Larache',
  'Khemisset',
  'Guelmim',
  'Berrechid',
  'Wad Zam',
  'Fkih Ben Saleh',
  'Taourirt',
  'Berkane',
  'Sidi Slimane',
  'Errachidia',
  'Sidi Kacem',
  'Khenifra',
  'Tifelt',
  'Essaouira',
  'Taroudant',
  'El Kelaa des Sraghna',
  'Oulad Teima',
  'Youssoufia',
  'Sefrou',
  'Ben Guerir',
  'Tan-Tan',
  'Ouazzane',
  'Guercif',
  'Dakhla',
  'Hoceima',
  'Fnideq',
  'Ouarzazate',
  'Tiznit',
  'Suq Sebt Oulad Nama',
  'Azrou',
  'Lahraouyine',
  'Ben Slimane',
  'Midelt',
  'Jerada',
  'Skhirat',
  'Souk Larbaa',
  'Ain Harrouda',
  'Boujad',
  'Kasbat Tadla',
  'Sidi Bennour',
  'Martil',
  'Lqliaa',
  'Cape Bojador',
  'Azemmour',
  'Mdiq',
  'Tinghir',
  'Al Aaroui',
  'Chefchaouen',
  'MRirt',
  'Zagora',
  'El Aioun Sidi Mellouk',
  'Lamkansa',
  'Smara',
  'Taounate',
  'Bin Anşār',
  'Sidi Yahya El Gharb',
  'Zaio',
  'Amalou Ighriben',
  'Asilah',
  'Azilal',
  'Mechra Bel Ksiri',
  'El Hajeb',
  'Bouznika',
  'Imzouren',
  'Tahla',
  'Bouizazarene Ihaddadene',
  'Ain El Aouda',
  'Bouarfa',
  'Arfoud',
  'Demnate',
  'Sidi Slimane Echcharraa',
  'Zaouiat Cheikh',
  'Ain Taoujdate',
  'Echemmaia',
  'Aourir',
  'Sabaa Aiyoun',
  'Oulad Ayad',
  'Ben Ahmed',
  'Tabounte',
  'Jorf El Melha',
  'Missour',
  'Laattaouia',
  'Er-Rich',
  'Segangan',
  'Rissani',
  'Sidi Taibi',
  'Sidi Ifni',
  'Ait Ourir',
  'Ahfir',
  'El Ksiba',
  'El Gara',
  'Drarga',
  'Imintanoute',
  'Goulmima',
  'Karia Ba Mohamed',
  'Mehdya',
  'El Borouj',
  'Bouhdila',
  'Chichaoua',
  'Bni Bouayach',
  'Oulad Berhil',
  'Jmaat Shaim',
  'Bir Jdid',
  'Tata',
  'Boujniba',
  'Temsia',
  'Mediouna',
  'Kalaat M Gouna',
  'Sebt Gzoula',
  'Outat El Haj',
  'Imouzzer Kandar',
  'Ain Bni Mathar',
  'Bouskoura',
  'Agourai',
  'Midar',
  'Lalla Mimouna',
  'Ribat El Kheir',
  'Moulay Driss Zerhoun',
  'Figuig',
  'Boumia',
  'Tamallalt',
  'Nouaceur',
  'Rommani',
  'Jorf',
  'Ifran',
  'Bouizakarn',
  'Oulad Mbarek',
  'Afourar',
  'Zmamra',
  'Ait Ishaq',
  'Tit Mellil',
  'Assa',
  'Bhalil',
  'Targuist',
  'Beni Yakhlef',
  'El Menzel',
  'Aguelmous',
  'Sid LMokhtar',
  'Boumalne Dades',
  'Farkhana',
  'Oulad Abbou',
  'Amizmiz',
  'Boulanouare',
  'Ben Taieb',
  'Ouled Frej',
  'Driouch',
  'Deroua',
  'Hattane',
  'El Marsa',
  'Tamanar',
  'Ait Iaaza',
  'Sidi Allal El Bahraoui',
  'Dar Ould Zidouh',
  'Sid Zouine',
  'Boudnib',
  'Foum Zguid',
  'Tissa',
  'Jaadar',
  'Oulmes',
  'Bouknadel',
  'Harhoura',
  'El Guerdan',
  'Selouane',
  'Maaziz',
  'Oulad MRah',
  'Loudaya',
  'Massa',
  'Aklim',
  'Ouaouizert',
  'Bni Drar',
  'El Kbab',
  'Oued Amlil',
  'Sidi Rahel Chatai',
  'Guigou',
  'Agdz',
  'Khnichet',
  'Karia',
  'Sidi Ahmed',
  'Zag',
  'Oulad Yaich',
  'Tinjdad',
  'Ouad Laou',
  'Tighassaline',
  'Tounfit',
  'Bni Tadjite',
  'Bouanane',
  'Oulad Hriz Sahel',
  'Talsint',
  'Taghjijt',
  'Boulemane',
  'Zirara',
  'Taouima',
  'Tahannaout',
  'Bradia',
  'Moulay Abdallah',
  'Sidi Rahal',
  'Tameslouht',
  'Aghbala',
  'El Ouatia',
  'Tendrara',
  'Taznakht',
  'Fam El Hisn',
  'Akka',
  'Dar Gueddari',
  'Itzer',
  'Taliouine',
  'Oualidia',
  'Aoulouz',
  'Moulay Bousselham',
  'Tarfaya',
  'Ghafsai',
  'Foum Jamaa',
  'Ain Leuh',
  'Moulay Bouazza',
  'Kariat Arkmane',
  'Kehf Nsour',
  'Sidi Bou Othmane',
  'Oulad Tayeb',
  'Had Kourt',
  'Bab Berrad',
  'Loulad',
  'Zaida',
  'Tafrawt',
  'Khemis Sahel',
  'Ait Baha',
  'Biougra',
  'Dar Bni Karrich',
  'El Hanchane',
  'Sidi Jaber',
  'Irherm',
  'Debdou',
  'Ras Kebdana',
  'Laaounate',
  'Hadj Kaddour',
  'Skhour Rhamna',
  'Bzou',
  'Ain Cheggag',
  'Bouderbala',
  'Sidi Smail',
  'Oulad Zbair',
  'Bni Chiker',
  'Lakhsas',
  'Talmest',
  'Aknoul',
  'Tiztoutine',
  'Bab Taza',
  'Imouzzer Marmoucha',
  'Gourrama',
  'Ajdir',
  'Mhaya',
  'Oulad Ghadbane',
  'Zrarda',
  'Zoumi',
  'Ain Karma',
  'Thar Essouk',
  'Lagouira',
  'Ras El Ain',
  'Sidi Ali Ben Hamdouche',
  'Sebt Jahjouh',
  'Tiddas',
  'Zaouiat Bougrin',
  'Tafersit',
  'Touissit',
  'Saidia',
  'Lalla Takerkoust',
  'Skhinate',
  'Moulay Brahim',
  'Soualem',
  'Gueznaia',
  'Moulay Yacoub',
  'Sidi Allal Tazi',
  'Laakarta',
  'Alnif',
  'Dar El Kebdani',
  'Jebha',
  'Ain Erreggada',
  'Sidi Addi',
  'Skoura',
  'Smimou',
  'Ain Jemaa',
  'Timahdite',
  'Ait Daoud',
  'Souk El Had',
  'Had Bouhssoussen',
  'Oulad Said',
  'Arbaoua',
  'Ain Dorij',
  'Madagh',
  'Tighza',
  'Matmata',
  'Kerouna',
  'Kassita',
  'Bni Hadifa',
  'Oued El Heimar',
  'Kerrouchen',
  'Tainaste',
  'Guisser',
  'Sidi Boubker',
  'Tamassint',
  'Assahrij',
  'Aghbalou Nssardane',
  'Tizi Ouasli',
  'Moqrisset',
  'Sebt Lamaarif',
  'Issaguen',
  'Bouguedra',
  'Brikcha',
  'Ighoud',
  'Ajdir, Taza',
  'Oulad Amrane',
  'Kettara',
  'Aoufous',
  'Tafetachte',
  'Naima',
  'Tnin Sidi Lyamani',
  'Karia',
  'NZalat Bni Amar',
  'Ahrara',
  'Sidi Abdallah Ghiat',
  'Sidi Bouzid',
  'Ounagha'
];

