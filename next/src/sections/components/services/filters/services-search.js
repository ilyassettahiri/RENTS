'use client';


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

export default function ServiceSearch({ onSearch, colorr, categories, keywordCategoryMap,  sx }) {
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
    return <Box>

              {renderSearchs}

          </Box>;
  }

  return (
    <>
      <Box  sx={{  display: { xs: 'block', md: 'none' }}}>
        <Button sx={{ py: 1.5,...sx}} fullWidth color="primary" variant="contained" startIcon={<Iconify icon="carbon:search" width={26} />} onClick={mobileOpen.onTrue}>
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

  sx: PropTypes.object,


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
  { value: 'ouarzazate', label: 'Ouarzazate' },
  { value: 'zagora', label: 'Zagora' },
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
  { value: 'hoceima', label: 'Hoceima' }
];
