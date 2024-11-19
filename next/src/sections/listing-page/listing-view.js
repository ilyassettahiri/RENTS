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
import { paths as getPaths } from 'src/routes/paths';
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


export default function ListingView({ params, listingData }) {
  const router = useRouter();
  const { category, url } = params;

  const { t } = useTranslation();


  const mdUp = useResponsive('up', 'md');

  const [favorites, setFavorites] = useState(listingData.favorites || []);

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);









  const memoizedListingData = useMemo(() => {
    const attributes = listingData.data?.attributes || {};
    return {
      images: attributes.images || [],
      specifications: attributes.specifications || [],
      recentListings: attributes.recentlistings || [],
      sellerListings: attributes.sellerlistings || [],
      reviewsListings: attributes.reviewslistings || [],
      description: attributes.description || '',
      seller: attributes.seller || {},

    };
  }, [listingData]);




  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);





  return (


    <>




          {!listingData ? (
            <ListingImageSkeleton />
          ) : (
              <ListingImage images={memoizedListingData.images || []}  params={params}/>
          )}
        <Container
          maxWidth={false}
          sx={{
            overflow: 'hidden',
            paddingLeft: { lg: '50px' },
            paddingRight: { lg: '50px' },
          }}
        >

          <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, }, }}>



              {mdUp && (

                <Grid xs={12} md={5} lg={4}>


                    {!listingData ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={listingData.data} />
                    )}
                </Grid>

              )}


            <Grid xs={12} md={7} lg={8}>




                {!listingData ? (
                  <ListingHeaderSkeleton />
                ) : (

                  <ListingHeader
                  tour={listingData.data}
                  seller={memoizedListingData.seller}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />


                )}


              <Divider sx={{ borderStyle: 'dashed', my: 5 }} />



                {!listingData ? (
                  <MarkdownSkeleton />
                ) : (

                  <ListingSummary
                    specifications={memoizedListingData.specifications}
                    description={memoizedListingData.description}
                    category={category}
                  />


                )}



            </Grid>
          </Grid>




          <Stack spacing={3} sx={{ my: 6 }}>


            {listingData && ( <Map offices={listingData.data} sx={{ borderRadius: 2 }} />)}
          </Stack>




            {!mdUp && (


                <Box sx={{ my: 5 }}>

                  <Divider sx={{ my: 10 }} />


                    {!listingData ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={listingData.data} />
                    )}
                </Box>

            )}


          <Divider sx={{ my: 10 }} />

                {listingData && (
                  <Review
                    category={category}
                    url={url}
                    reviews={memoizedListingData.reviewsListings}
                    seller={memoizedListingData.seller}
                  />
                )}




                <Divider sx={{ my: 10 }} />


                {listingData && (

                <ListingsCarousel tours={memoizedListingData.sellerListings} title={t('Other listings from this store')} />

                )}


                {listingData && (

                  <ListingsCarousel tours={memoizedListingData.recentListings} title={t('Recommendedforyou')} />

                )}


                  <Divider sx={{ my: 10 }} />



                  <StorePopularProducts
                    recentListingsCasablanca={listingData.data.attributes.recentlistingscasablanca}
                    recentListingsMarrakech={listingData.data.attributes.recentlistingsmarrakech}
                    recentListingsTanger={listingData.data.attributes.recentlistingstanger}
                    recentListingsRabat={listingData.data.attributes.recentlistingsrabat}
                    recentListingsFes={listingData.data.attributes.recentlistingsfes}
                    recentListingsAgadir={listingData.data.attributes.recentlistingsagadir}
                    recentListingsMeknes={listingData.data.attributes.recentlistingsmeknes}
                    recentListingsOujda={listingData.data.attributes.recentlistingsojuda}
                    recentListingsKenitra={listingData.data.attributes.recentlistingskenitra}
                    recentListingsTetouan={listingData.data.attributes.recentlistingstetouan}
                  />

        </Container>


    </>
  );
}

ListingView.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  listingData: PropTypes.object,

};
