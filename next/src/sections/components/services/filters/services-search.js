import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

export default function ServiceSearch({ onSearch, colorr, categories, keywordCategoryMap }) {
  const mdUp = useResponsive('up', 'md');
  const mobileOpen = useBoolean();
  const [searchs, setSearchs] = useState(defaultValues);

  const mobileColorr = useResponsive('down', 'sm') ? 'black' : colorr;

  const { t } = useTranslation();



  const handleChangeKeyword = useCallback((newValue) => {
    const mappedCategory = keywordCategoryMap[newValue] || ''; // Get the mapped category or default to empty
    setSearchs((prevSearchs) => ({
      ...prevSearchs,
      searchKeyword: newValue,
      searchCategories: mappedCategory, // Update the category based on the selected suggestion
    }));
  }, [keywordCategoryMap]);



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

    mobileOpen.onFalse();

  };

  const renderSearchs = (
    <>
      <Grid container spacing={2.5} alignItems="center" >
        <Grid item xs={12} md={5}>
          <SearchKeyword searchKeyword={searchs.searchKeyword}
          onChangeKeyword={handleChangeKeyword} colorr={mobileColorr}
          keywordCategoryMap={keywordCategoryMap}
          mobileOpen={mobileOpen}
          placeholder={t('searchPlaceholder')}
          onSearch={onSearch}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchCategories searchCategories={searchs.searchCategories}
          onChangeCategory={handleChangeCategory}
          categories={categories} colorr={mobileColorr} placeholder={t('categoryPlaceholder')}
          icon="carbon:inventory-management"/>
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchCategories searchCategories={searchs.searchLocation}
          onChangeCategory={handleChangeLocation} categories={cities}
          colorr={mobileColorr} placeholder={t('cityPlaceholder')}
          icon="carbon:location"/>
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  keywordCategoryMap: PropTypes.object.isRequired,

};





const cities = [
  { value: 'casablanca', label: 'Casablanca' },
  { value: 'marrakech', label: 'Marrakech' },
  { value: 'fes', label: 'Fes' },
  { value: 'sale', label: 'Sale' },
  { value: 'tangier', label: 'Tangier' },
  { value: 'rabat', label: 'Rabat' },
  { value: 'meknes', label: 'Meknes' },
  { value: 'oujda', label: 'Oujda' },
  { value: 'kenitra', label: 'Kenitra' },
  { value: 'agadir', label: 'Agadir' },
  { value: 'tetouan', label: 'Tetouan' },
  { value: 'safi', label: 'Safi' },
  { value: 'temara', label: 'Temara' },
  { value: 'inzegan', label: 'Inzegan' },
  { value: 'mohammedia', label: 'Mohammedia' },
  { value: 'laayoune', label: 'Laayoune' },
  { value: 'khouribga', label: 'Khouribga' },
  { value: 'beni-mellal', label: 'Beni Mellal' },
  { value: 'el-jadida', label: 'El Jadida' },
  { value: 'taza', label: 'Taza' },
  { value: 'ait-melloul', label: 'Ait Melloul' },
  { value: 'nador', label: 'Nador' },
  { value: 'settat', label: 'Settat' },
  { value: 'ksar-el-kbir', label: 'Ksar El Kbir' },
  { value: 'larache', label: 'Larache' },
  { value: 'khemisset', label: 'Khemisset' },
  { value: 'guelmim', label: 'Guelmim' },
  { value: 'berrechid', label: 'Berrechid' },
  { value: 'wad-zam', label: 'Wad Zam' },
  { value: 'fikih-ben-saleh', label: 'Fkih Ben Saleh' },
  { value: 'taourirt', label: 'Taourirt' },
  { value: 'berkane', label: 'Berkane' },
  { value: 'sidi-slimane', label: 'Sidi Slimane' },
  { value: 'errachidia', label: 'Errachidia' },
  { value: 'sidi-kacem', label: 'Sidi Kacem' },
  { value: 'khenifra', label: 'Khenifra' },
  { value: 'tifelt', label: 'Tifelt' },
  { value: 'taghazout', label: 'Taghazout' },
  { value: 'essaouira', label: 'Essaouira' },
  { value: 'taroudant', label: 'Taroudant' },
  { value: 'el-kelaa-des-sraghna', label: 'El Kelaa des Sraghna' },
  { value: 'oulad-teima', label: 'Oulad Teima' },
  { value: 'youssoufia', label: 'Youssoufia' },
  { value: 'sefrou', label: 'Sefrou' },
  { value: 'ben-guerir', label: 'Ben Guerir' },
  { value: 'tan-tan', label: 'Tan-Tan' },
  { value: 'ouazzane', label: 'Ouazzane' },
  { value: 'guercif', label: 'Guercif' },
  { value: 'dakhla', label: 'Dakhla' },
  { value: 'hoceima', label: 'Hoceima' },
  { value: 'fnideq', label: 'Fnideq' },
  { value: 'ouarzazate', label: 'Ouarzazate' },
  { value: 'tiznit', label: 'Tiznit' },
  { value: 'suq-sebt-oulad-nama', label: 'Suq Sebt Oulad Nama' },
  { value: 'azrou', label: 'Azrou' },
  { value: 'lahraouyine', label: 'Lahraouyine' },
  { value: 'ben-slimane', label: 'Ben Slimane' },
  { value: 'midelt', label: 'Midelt' },
  { value: 'jerada', label: 'Jerada' },
  { value: 'skhirat', label: 'Skhirat' },
  { value: 'souk-larbaa', label: 'Souk Larbaa' },
  { value: 'ain-harrouda', label: 'Ain Harrouda' },
  { value: 'boujad', label: 'Boujad' },
  { value: 'kasbat-tadla', label: 'Kasbat Tadla' },
  { value: 'sidi-bennour', label: 'Sidi Bennour' },
  { value: 'martil', label: 'Martil' },
  { value: 'lqliaa', label: 'Lqliaa' },
  { value: 'cape-bojador', label: 'Cape Bojador' },
  { value: 'azemmour', label: 'Azemmour' },
  { value: 'mdiq', label: 'Mdiq' },
  { value: 'tinghir', label: 'Tinghir' },
  { value: 'al-aaroui', label: 'Al Aaroui' },
  { value: 'chefchaouen', label: 'Chefchaouen' },
  { value: 'mrirt', label: 'MRirt' },
  { value: 'zagora', label: 'Zagora' },
  { value: 'el-aioun-sidi-mellouk', label: 'El Aioun Sidi Mellouk' },
  { value: 'lamkansa', label: 'Lamkansa' },
  { value: 'smara', label: 'Smara' },
  { value: 'taounate', label: 'Taounate' },
  { value: 'bin-ansar', label: 'Bin Anşār' },
  { value: 'sidi-yahya-el-gharb', label: 'Sidi Yahya El Gharb' },
  { value: 'zaio', label: 'Zaio' },
  { value: 'amalou-ighriben', label: 'Amalou Ighriben' },
  { value: 'asilah', label: 'Asilah' },
  { value: 'azilal', label: 'Azilal' },
  { value: 'mechra-bel-ksiri', label: 'Mechra Bel Ksiri' },
  { value: 'el-hajeb', label: 'El Hajeb' },
  { value: 'bouznika', label: 'Bouznika' },
  { value: 'imzouren', label: 'Imzouren' },
  { value: 'tahla', label: 'Tahla' },
  { value: 'bouizazarene-ihaddadene', label: 'Bouizazarene Ihaddadene' },
  { value: 'ain-el-aouda', label: 'Ain El Aouda' },
  { value: 'bouarfa', label: 'Bouarfa' },
  { value: 'arfoud', label: 'Arfoud' },
  { value: 'demnate', label: 'Demnate' },
  { value: 'sidi-slimane-echcharraa', label: 'Sidi Slimane Echcharraa' },
  { value: 'zaouiat-cheikh', label: 'Zaouiat Cheikh' },
  { value: 'ain-taoujdate', label: 'Ain Taoujdate' },
  { value: 'echemmaia', label: 'Echemmaia' },
  { value: 'aourir', label: 'Aourir' },
  { value: 'sabaa-aiyoun', label: 'Sabaa Aiyoun' },
  { value: 'oulad-ayad', label: 'Oulad Ayad' },
  { value: 'ben-ahmed', label: 'Ben Ahmed' },
  { value: 'tabounte', label: 'Tabounte' },
  { value: 'jorf-el-melha', label: 'Jorf El Melha' },
  { value: 'missour', label: 'Missour' },
  { value: 'laattaouia', label: 'Laattaouia' },
  { value: 'er-rich', label: 'Er-Rich' },
  { value: 'segangan', label: 'Segangan' },
  { value: 'rissani', label: 'Rissani' },
  { value: 'sidi-taibi', label: 'Sidi Taibi' },
  { value: 'sidi-ifni', label: 'Sidi Ifni' },
  { value: 'ait-ourir', label: 'Ait Ourir' },
  { value: 'ahfir', label: 'Ahfir' },
  { value: 'el-ksiba', label: 'El Ksiba' },
  { value: 'el-gara', label: 'El Gara' },
  { value: 'drarga', label: 'Drarga' },
  { value: 'imintanoute', label: 'Imintanoute' },
  { value: 'goulmima', label: 'Goulmima' },
  { value: 'karia-ba-mohamed', label: 'Karia Ba Mohamed' },
  { value: 'mehdya', label: 'Mehdya' },
  { value: 'el-borouj', label: 'El Borouj' },
  { value: 'bouhdila', label: 'Bouhdila' },
  { value: 'chichaoua', label: 'Chichaoua' },
  { value: 'bni-bouayach', label: 'Bni Bouayach' },
  { value: 'oulad-berhil', label: 'Oulad Berhil' },
  { value: 'jmaat-shaim', label: 'Jmaat Shaim' },
  { value: 'bir-jdid', label: 'Bir Jdid' },
  { value: 'tata', label: 'Tata' },
  { value: 'boujniba', label: 'Boujniba' },
  { value: 'temsia', label: 'Temsia' },
  { value: 'mediouna', label: 'Mediouna' },
  { value: 'kalaat-m-gouna', label: 'Kalaat M Gouna' },
  { value: 'sebt-gzoula', label: 'Sebt Gzoula' },
  { value: 'outat-el-haj', label: 'Outat El Haj' },
  { value: 'imouzzer-kandar', label: 'Imouzzer Kandar' },
  { value: 'ain-bni-mathar', label: 'Ain Bni Mathar' },
  { value: 'bouskoura', label: 'Bouskoura' },
  { value: 'agourai', label: 'Agourai' },
  { value: 'midar', label: 'Midar' },
  { value: 'lalla-mimouna', label: 'Lalla Mimouna' },
  { value: 'ribat-el-kheir', label: 'Ribat El Kheir' },
  { value: 'moulay-driss-zerhoun', label: 'Moulay Driss Zerhoun' },
  { value: 'figuig', label: 'Figuig' },
  { value: 'boumia', label: 'Boumia' },
  { value: 'tamallalt', label: 'Tamallalt' },
  { value: 'nouaceur', label: 'Nouaceur' },
  { value: 'rommani', label: 'Rommani' },
  { value: 'jorf', label: 'Jorf' },
  { value: 'ifran', label: 'Ifran' },
  { value: 'bouizakarn', label: 'Bouizakarn' },
  { value: 'oulad-mbarek', label: 'Oulad Mbarek' },
  { value: 'afourar', label: 'Afourar' },
  { value: 'zmamra', label: 'Zmamra' },
  { value: 'ait-ishaq', label: 'Ait Ishaq' },
  { value: 'tit-mellil', label: 'Tit Mellil' },
  { value: 'assa', label: 'Assa' },
  { value: 'bhalil', label: 'Bhalil' },
  { value: 'targuist', label: 'Targuist' },
  { value: 'beni-yakhlef', label: 'Beni Yakhlef' },
  { value: 'el-menzel', label: 'El Menzel' },
  { value: 'aguelmous', label: 'Aguelmous' },
  { value: 'sid-lmokhtar', label: 'Sid LMokhtar' },
  { value: 'boumalne-dades', label: 'Boumalne Dades' },
  { value: 'farkhana', label: 'Farkhana' },
  { value: 'oulad-abbou', label: 'Oulad Abbou' },
  { value: 'amizmiz', label: 'Amizmiz' },
  { value: 'boulanouare', label: 'Boulanouare' },
  { value: 'ben-taieb', label: 'Ben Taieb' },
  { value: 'ouled-frej', label: 'Ouled Frej' },
  { value: 'driouch', label: 'Driouch' },
  { value: 'deroua', label: 'Deroua' },
  { value: 'hattane', label: 'Hattane' },
  { value: 'el-marsa', label: 'El Marsa' },
  { value: 'tamanar', label: 'Tamanar' },
  { value: 'ait-iaaza', label: 'Ait Iaaza' },
  { value: 'sidi-allal-el-bahraoui', label: 'Sidi Allal El Bahraoui' },
  { value: 'dar-ould-zidouh', label: 'Dar Ould Zidouh' },
  { value: 'sid-zouine', label: 'Sid Zouine' },
  { value: 'boudnib', label: 'Boudnib' },
  { value: 'foum-zguid', label: 'Foum Zguid' },
  { value: 'tissa', label: 'Tissa' },
  { value: 'jaadar', label: 'Jaadar' },
  { value: 'oulmes', label: 'Oulmes' },
  { value: 'bouknadel', label: 'Bouknadel' },
  { value: 'harhoura', label: 'Harhoura' },
  { value: 'el-guerdan', label: 'El Guerdan' },
  { value: 'selouane', label: 'Selouane' },
  { value: 'maaziz', label: 'Maaziz' },
  { value: 'oulad-mrah', label: 'Oulad MRah' },
  { value: 'loudaya', label: 'Loudaya' },
  { value: 'massa', label: 'Massa' },
  { value: 'aklim', label: 'Aklim' },
  { value: 'ouaouizert', label: 'Ouaouizert' },
  { value: 'bni-drar', label: 'Bni Drar' },
  { value: 'el-kbab', label: 'El Kbab' },
  { value: 'oued-amlil', label: 'Oued Amlil' },
  { value: 'sidi-rahel-chatai', label: 'Sidi Rahel Chatai' },
  { value: 'guigou', label: 'Guigou' },
  { value: 'agdz', label: 'Agdz' },
  { value: 'khnichet', label: 'Khnichet' },
  { value: 'karia', label: 'Karia' },
  { value: 'sidi-ahmed', label: 'Sidi Ahmed' },
  { value: 'zag', label: 'Zag' },
  { value: 'oulad-yaich', label: 'Oulad Yaich' },
  { value: 'tinjdad', label: 'Tinjdad' },
  { value: 'ouad-laou', label: 'Ouad Laou' },
  { value: 'tighassaline', label: 'Tighassaline' },
  { value: 'tounfit', label: 'Tounfit' },
  { value: 'bni-tadjite', label: 'Bni Tadjite' },
  { value: 'bouanane', label: 'Bouanane' },
  { value: 'oulad-hriz-sahel', label: 'Oulad Hriz Sahel' },
  { value: 'talsint', label: 'Talsint' },
  { value: 'taghjijt', label: 'Taghjijt' },
  { value: 'boulemane', label: 'Boulemane' },
  { value: 'zirara', label: 'Zirara' },
  { value: 'taouima', label: 'Taouima' },
  { value: 'tahannaout', label: 'Tahannaout' },
  { value: 'bradia', label: 'Bradia' },
  { value: 'moulay-abdallah', label: 'Moulay Abdallah' },
  { value: 'sidi-rahal', label: 'Sidi Rahal' },
  { value: 'tameslouht', label: 'Tameslouht' },
  { value: 'aghbala', label: 'Aghbala' },
  { value: 'el-ouatia', label: 'El Ouatia' },
  { value: 'tendrara', label: 'Tendrara' },
  { value: 'taznakht', label: 'Taznakht' },
  { value: 'fam-el-hisn', label: 'Fam El Hisn' },
  { value: 'akka', label: 'Akka' },
  { value: 'dar-gueddari', label: 'Dar Gueddari' },
  { value: 'itzer', label: 'Itzer' },
  { value: 'taliouine', label: 'Taliouine' },
  { value: 'oualidia', label: 'Oualidia' },
  { value: 'aoulouz', label: 'Aoulouz' },
  { value: 'moulay-bousselham', label: 'Moulay Bousselham' },
  { value: 'tarfaya', label: 'Tarfaya' },
  { value: 'ghafsai', label: 'Ghafsai' },
  { value: 'foum-jamaa', label: 'Foum Jamaa' },
  { value: 'ain-leuh', label: 'Ain Leuh' },
  { value: 'moulay-bouazza', label: 'Moulay Bouazza' },
  { value: 'kariat-arkmane', label: 'Kariat Arkmane' },
  { value: 'kehf-nsour', label: 'Kehf Nsour' },
  { value: 'sidi-bou-othmane', label: 'Sidi Bou Othmane' },
  { value: 'oulad-tayeb', label: 'Oulad Tayeb' },
  { value: 'had-kourt', label: 'Had Kourt' },
  { value: 'bab-berrad', label: 'Bab Berrad' },
  { value: 'loulad', label: 'Loulad' },
  { value: 'zaida', label: 'Zaida' },
  { value: 'tafrawt', label: 'Tafrawt' },
  { value: 'khemis-sahel', label: 'Khemis Sahel' },
  { value: 'ait-baha', label: 'Ait Baha' },
  { value: 'biougra', label: 'Biougra' },
  { value: 'dar-bni-karrich', label: 'Dar Bni Karrich' },
  { value: 'el-hanchane', label: 'El Hanchane' },
  { value: 'sidi-jaber', label: 'Sidi Jaber' },
  { value: 'irherm', label: 'Irherm' },
  { value: 'debdou', label: 'Debdou' },
  { value: 'ras-kebdana', label: 'Ras Kebdana' },
  { value: 'laaounate', label: 'Laaounate' },
  { value: 'hadj-kaddour', label: 'Hadj Kaddour' },
  { value: 'skhour-rhamna', label: 'Skhour Rhamna' },
  { value: 'bzou', label: 'Bzou' },
  { value: 'ain-cheggag', label: 'Ain Cheggag' },
  { value: 'bouderbala', label: 'Bouderbala' },
  { value: 'sidi-smail', label: 'Sidi Smail' },
  { value: 'oulad-zbair', label: 'Oulad Zbair' },
  { value: 'bni-chiker', label: 'Bni Chiker' },
  { value: 'lakhsas', label: 'Lakhsas' },
  { value: 'talmest', label: 'Talmest' },
  { value: 'aknoul', label: 'Aknoul' },
  { value: 'tiztoutine', label: 'Tiztoutine' },
  { value: 'bab-taza', label: 'Bab Taza' },
  { value: 'imouzzer-marmoucha', label: 'Imouzzer Marmoucha' },
  { value: 'gourrama', label: 'Gourrama' },
  { value: 'ajdir', label: 'Ajdir' },
  { value: 'mhaya', label: 'Mhaya' },
  { value: 'oulad-ghadbane', label: 'Oulad Ghadbane' },
  { value: 'zrarda', label: 'Zrarda' },
  { value: 'zoumi', label: 'Zoumi' },
  { value: 'ain-karma', label: 'Ain Karma' },
  { value: 'thar-essouk', label: 'Thar Essouk' },
  { value: 'lagouira', label: 'Lagouira' },
  { value: 'ras-el-ain', label: 'Ras El Ain' },
  { value: 'sidi-ali-ben-hamdouche', label: 'Sidi Ali Ben Hamdouche' },
  { value: 'sebt-jahjouh', label: 'Sebt Jahjouh' },
  { value: 'tiddas', label: 'Tiddas' },
  { value: 'zaouiat-bougrin', label: 'Zaouiat Bougrin' },
  { value: 'tafersit', label: 'Tafersit' },
  { value: 'touissit', label: 'Touissit' },
  { value: 'saidia', label: 'Saidia' },
  { value: 'lalla-takerkoust', label: 'Lalla Takerkoust' },
  { value: 'skhinate', label: 'Skhinate' },
  { value: 'moulay-brahim', label: 'Moulay Brahim' },
  { value: 'soualem', label: 'Soualem' },
  { value: 'gueznaia', label: 'Gueznaia' },
  { value: 'moulay-yacoub', label: 'Moulay Yacoub' },
  { value: 'sidi-allal-tazi', label: 'Sidi Allal Tazi' },
  { value: 'laakarta', label: 'Laakarta' },
  { value: 'alnif', label: 'Alnif' },
  { value: 'dar-el-kebdani', label: 'Dar El Kebdani' },
  { value: 'jebha', label: 'Jebha' },
  { value: 'ain-erreggada', label: 'Ain Erreggada' },
  { value: 'sidi-addi', label: 'Sidi Addi' },
  { value: 'skoura', label: 'Skoura' },
  { value: 'smimou', label: 'Smimou' },
  { value: 'ain-jemaa', label: 'Ain Jemaa' },
  { value: 'timahdite', label: 'Timahdite' },
  { value: 'ait-daoud', label: 'Ait Daoud' },
  { value: 'souk-el-had', label: 'Souk El Had' },
  { value: 'had-bouhssoussen', label: 'Had Bouhssoussen' },
  { value: 'oulad-said', label: 'Oulad Said' },
  { value: 'arbaoua', label: 'Arbaoua' },
  { value: 'ain-dorij', label: 'Ain Dorij' },
  { value: 'madagh', label: 'Madagh' },
  { value: 'tighza', label: 'Tighza' },
  { value: 'matmata', label: 'Matmata' },
  { value: 'kerouna', label: 'Kerouna' },
  { value: 'kassita', label: 'Kassita' },
  { value: 'bni-hadifa', label: 'Bni Hadifa' },
  { value: 'oued-el-heimar', label: 'Oued El Heimar' },
  { value: 'kerrouchen', label: 'Kerrouchen' },
  { value: 'tainaste', label: 'Tainaste' },
  { value: 'guisser', label: 'Guisser' },
  { value: 'sidi-boubker', label: 'Sidi Boubker' },
  { value: 'tamassint', label: 'Tamassint' },
  { value: 'assahrij', label: 'Assahrij' },
  { value: 'aghbalou-nssardane', label: 'Aghbalou Nssardane' },
  { value: 'tizi-ouasli', label: 'Tizi Ouasli' },
  { value: 'moqrisset', label: 'Moqrisset' },
  { value: 'sebt-lamaarif', label: 'Sebt Lamaarif' },
  { value: 'issaguen', label: 'Issaguen' },
  { value: 'bouguedra', label: 'Bouguedra' },
  { value: 'brikcha', label: 'Brikcha' },
  { value: 'ighoud', label: 'Ighoud' },
  { value: 'ajdir-taza', label: 'Ajdir, Taza' },
  { value: 'oulad-amrane', label: 'Oulad Amrane' },
  { value: 'kettara', label: 'Kettara' },
  { value: 'aoufous', label: 'Aoufous' },
  { value: 'tafetachte', label: 'Tafetachte' },
  { value: 'naima', label: 'Naima' },
  { value: 'tnin-sidi-lyamani', label: 'Tnin Sidi Lyamani' },
  { value: 'karia', label: 'Karia' },
  { value: 'nzalat-bni-amar', label: 'NZalat Bni Amar' },
  { value: 'ahrara', label: 'Ahrara' },
  { value: 'sidi-abdallah-ghiat', label: 'Sidi Abdallah Ghiat' },
  { value: 'sidi-bouzid', label: 'Sidi Bouzid' },
  { value: 'ounagha', label: 'Ounagha' }
];

