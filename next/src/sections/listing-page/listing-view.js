"use client";

import { useState, useEffect, useCallback, useMemo  } from "react";
import PropTypes from 'prop-types';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import Review from 'src/sections/review/review';
import ListingSummary from 'src/sections/listing-page/listing-summary';
import CrudService from 'src/services/cruds-service';
import StorePopularProducts from 'src/sections/store/landing/store-popular-products';
import ListingsCarousel from 'src/sections/home/listings-carousel';
import Map from 'src/components/map';
import MarkdownSkeleton from 'src/components/markdown/markdown-skeleton';

import ListingHeaderSkeleton from 'src/sections/listing-page/listing-header-skeleton';

import ListingImageSkeleton from 'src/sections/listing-page/listing-image-skeleton';
import ListingFormSkeleton from 'src/sections/listing-page/listing-form-skeleton';

import ListingHeader from './listing-header';



import ListingImage from './listing-image';

import ListingForm from './listing-form';


export default function ListingView({ params }) {
  const router = useRouter();
  const { category, url } = params;

  const { t } = useTranslation();


  const mdUp = useResponsive('up', 'md');

  const [favorites, setFavorites] = useState([]);




  const { data: listingData, isLoading: isListingLoading, error: listingError } = useQuery({
    queryKey: ['listing', category, url],
    queryFn: () => CrudService.getListingsFront(category, url),
    onError: (error) => {
      console.error('Failed to fetch listing:', error);
    },
  });


  useEffect(() => {
    if (listingData) {
      console.log('Listing Data:', listingData);
    }
  }, [listingData]);

  useEffect(() => {
    if (listingData?.favorites) {
      setFavorites(listingData.favorites);
    }
  }, [listingData]);



  const memoizedListingData = useMemo(() => {
    const listings = listingData?.data?.attributes?.recentListingsElJadida || [];
    const specifications = listingData?.data?.attributes?.specifications || [];
    const listingEmpty = !isListingLoading && !listings.length;

    return {
      listings,
      specifications,
      favorites: listingData?.favorites || [],
      listingLoading: isListingLoading,
      listingError,
      listingFetching: false, // Assuming there's no need for fetching state
      listingEmpty,
    };
  }, [listingData, isListingLoading, listingError]);







  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);





  return (


    <>




          {isListingLoading ? (
            <ListingImageSkeleton />
          ) : (
              <ListingImage images={listingData?.data?.attributes?.images || []}  params={params}/>
          )}
        <Container
          maxWidth={false}
          sx={{
            overflow: 'hidden',
            paddingLeft: { lg: '80px' },
            paddingRight: { lg: '80px' },
          }}
        >

          <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, }, }}>



              {mdUp && (

                <Grid xs={12} md={5} lg={4}>


                    {isListingLoading ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={listingData?.data} />
                    )}
                </Grid>

              )}


            <Grid xs={12} md={7} lg={8}>




                {isListingLoading ? (
                  <ListingHeaderSkeleton />
                ) : (

                  <ListingHeader
                  tour={listingData?.data}
                  seller={listingData?.data?.attributes?.seller}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />


                )}


              <Divider sx={{ borderStyle: 'dashed', my: 5 }} />



                {isListingLoading ? (
                  <MarkdownSkeleton />
                ) : (

                  <ListingSummary
                    specifications={memoizedListingData.specifications}
                    description={listingData?.data?.attributes?.description}
                    category={listingData?.data?.attributes?.category}
                  />


                )}



            </Grid>
          </Grid>




          <Stack spacing={3} sx={{ my: 6 }}>


            {listingData && ( <Map offices={listingData?.data} sx={{ borderRadius: 2 }} />)}
          </Stack>




            {!mdUp && (

                <Box sx={{ my: 5 }}>



                    {isListingLoading ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={listingData?.data} />
                    )}
                </Box>

            )}


          <Divider sx={{ my: 10 }} />

                {listingData && (
                  <Review
                    category={category}
                    url={url}
                    reviews={listingData?.data?.attributes?.reviewslistings}
                    seller={listingData?.data?.attributes?.seller}
                  />
                )}




          <Divider sx={{ my: 10 }} />


                {listingData && (

                <ListingsCarousel tours={listingData?.data?.attributes?.sellerlistings} title={t('Other listings from this store')} />

                )}


                {listingData && (

                  <ListingsCarousel tours={listingData?.data?.attributes?.recentlistings} title={t('Recommendedforyou')} />

                )}



                {listingData && (
                  <StorePopularProducts
                    recentListingsCasablanca={listingData?.data?.attributes?.recentlistingscasablanca}
                    recentListingsMarrakech={listingData?.data?.attributes?.recentlistingsmarrakech}
                    recentListingsTanger={listingData?.data?.attributes?.recentlistingstanger}
                    recentListingsRabat={listingData?.data?.attributes?.recentlistingsrabat}
                    recentListingsFes={listingData?.data?.attributes?.recentlistingsfes}
                    recentListingsAgadir={listingData?.data?.attributes?.recentlistingsagadir}
                    recentListingsMeknes={listingData?.data?.attributes?.recentlistingsmeknes}
                    recentListingsOujda={listingData?.data?.attributes?.recentlistingsojuda}
                    recentListingsKenitra={listingData?.data?.attributes?.recentlistingskenitra}
                    recentListingsTetouan={listingData?.data?.attributes?.recentlistingstetouan}
                  />
                )}
        </Container>


    </>
  );
}

ListingView.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
