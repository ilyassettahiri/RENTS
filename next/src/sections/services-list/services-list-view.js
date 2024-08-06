'use client';

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';
import CrudService from 'src/services/cruds-service';
import ServiceSearch from 'src/sections/components/services/filters/services-search';

import ServiceList from '../components/services/list/services-list';

// ----------------------------------------------------------------------

export default function ServicesListView() {
  const loading = useBoolean(true);
  const [favorites, setFavorites] = useState([]);
  const [services, setServices] = useState([]);
  const [initialListings, setInitialListings] = useState([]); // Store the initial listings fetched

  const fetchListings = async (searchs) => {
    try {
      const response = await CrudService.getSearchServiceListings(searchs);
      console.log('Listings fetched:', response.data);

      const servicesData = response.data.map((item) => ({
        id: item.id,
        title: item.attributes.title,
        price: item.attributes.price,
        city: item.attributes.city,
        category: item.attributes.category,
        createdAt: item.attributes.created_at,
        picture: item.attributes.picture,
        url: item.attributes.url || '#', // Ensure URL is always defined
        favorited: response.favorites.includes(item.id),
      }));

      setServices(servicesData);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getSerice();

        const servicesData = response.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          price: item.attributes.price,
          city: item.attributes.city,
          category: item.attributes.category,
          createdAt: item.attributes.created_at,
          picture: item.attributes.picture,
          url: item.attributes.url || '#', // Ensure URL is always defined
          favorited: response.favorites.includes(item.id),
        }));

        setServices(servicesData);
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
    <Container
      maxWidth={false}
      sx={{
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
            md: theme.palette.common.white,
          }),
        }}
      />

      <ServiceList jobs={services} loading={loading.value} />
    </Container>
  );
}
