'use client';

import { useState, useEffect, useCallback  } from "react";
import CrudService from "src/services/cruds-service";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import ServiceSearch from 'src/sections/components/services/filters/services-search';
import Iconify from 'src/components/iconify';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


import EcommerceFilters from 'src/sections/store/product/filters/ecommerce-filters';
import BusinessList from '../components/business/list/business-list';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
];


export default function BusinessListView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const [business, setBusiness] = useState([]);
  const [sort, setSort] = useState('latest');

  const fetchListings = async (search) => {
    try {
      const response = await CrudService.getSearchBusinessListings(search);
      console.log('Listings fetched:', response.data);



      setBusiness(response.data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getBusiness();

        console.log('Listings fetched:', response.data);

        setBusiness(response.data);
      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);



  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
  }, []);


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

        onSearch={fetchListings}
        sx={{
          color: { md: 'common.white' },
          bgcolor: (theme) => ({
            xs: 'background.neutral',
            md: theme.palette.common.white, // Adjusted as `alpha` was not defined
          }),
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"

        sx={{ pb: 4 , }}

      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{ display: { md: 'none' } }}
        >
          Filters
        </Button>

        <Stack/>

        <Stack
          direction={{
            xs: 'column-reverse',
            md: 'row',
          }}

        >



            <Stack direction="row" alignItems="center" justifyContent="space-between" >


              <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
                <Select value={sort} onChange={handleChangeSort}>
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>


        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <EcommerceFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <BusinessList businesses={business} loading={loading.value} />
        </Box>
      </Stack>
    </Container>
  );
}
