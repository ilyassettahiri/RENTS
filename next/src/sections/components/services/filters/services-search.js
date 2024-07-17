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

export default function ServiceSearch({ onSearch }) {
  const mdUp = useResponsive('up', 'md');
  const mobileOpen = useBoolean();
  const [searchs, setSearchs] = useState(defaultValues);





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
      <Grid container spacing={2.5} alignItems="center">
        <Grid item xs={12} md={5}>
          <SearchKeyword searchKeyword={searchs.searchKeyword} onChangeKeyword={handleChangeKeyword} />
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchCategories searchCategories={searchs.searchCategories} onChangeCategory={handleChangeCategory} />
        </Grid>
        <Grid item xs={12} md={3}>
          <SearchLocation searchLocation={searchs.searchLocation} onChangeLocation={handleChangeLocation} />
        </Grid>
        {mdUp && (
          <Grid item xs={12} md={1}>
            <Button size="large" variant="contained" color="primary" onClick={onSubmit} sx={{ minWidth: { md: 48 } }}>
              <Iconify icon="carbon:search" width={24} />
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
      <Stack alignItems="flex-end" sx={{ py: 3 }}>
        <Button color="primary" variant="contained" startIcon={<Iconify icon="carbon:search" width={18} />} onClick={mobileOpen.onTrue}>
          Search
        </Button>
      </Stack>
      <Drawer
        anchor="right"
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: { pt: 5, px: 3, width: 280 },
        }}
      >
        {renderSearchs}
      </Drawer>
    </>
  );
}
ServiceSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
