'use client';

import { useState, useEffect, useCallback } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import ServiceSearch from 'src/sections/components/services/filters/services-search';

import FilterDialog from 'src/sections/components/services/filters/filter-dialog';

import Iconify from 'src/components/iconify';

import BusinessFilters from '../components/business/filters/business-filters';
import BusinessList from '../components/business/list/business-list';

import CrudService from "src/services/cruds-service";

// ----------------------------------------------------------------------

export default function BusinessListView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const [business, setBusiness] = useState([]);

  const [initialListings, setInitialListings] = useState([]); // Store the initial listings fetched




  const fetchListings = async (search) => {
    try {

      const response = await CrudService.getSearchBusinessListings(search);
      console.log('Listings fetched:', response.data);



      const businessData = response.data.map(item => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        city: item.attributes.city,
        createdAt: item.attributes.created_at,
        picture: item.attributes.picture,
        url: item.attributes.url || '#', // Ensure URL is always defined
      }));

      setBusiness(businessData);



    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };




  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getBusiness();
        const businessData = response.data.map(item => ({
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          city: item.attributes.city,
          createdAt: item.attributes.created_at,
          picture: item.attributes.picture,
          url: item.attributes.url || '#', // Ensure URL is always defined
        }));
        console.log('business:', businessData);
        setBusiness(businessData);
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

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >

              <ServiceSearch
                onSearch={fetchListings}
                sx={{
                  color: { md: 'common.white' },
                  bgcolor: (theme) => ({
                    xs: 'background.neutral',
                    md: alpha(theme.palette.common.white, 0.08),
                  }),
                }}
              />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 5 }}
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
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }}>
          <BusinessFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
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
    </>
  );
}
