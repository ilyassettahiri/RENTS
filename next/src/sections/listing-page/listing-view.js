'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'src/routes/hooks';

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
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Review from 'src/sections/review/review';
import TourListSimilar from '../components/listings/list/listings-list-similar';
import ListingHeader from './listing-header';
import ListingImage from './listing-image';
import ListingForm from './listing-form';
import ListingSummary from 'src/sections/listing-page/listing-summary';
import CrudService from 'src/services/cruds-service';
import StorePopularProducts from 'src/sections/store/landing/store-popular-products';
import ListingsCarousel from 'src/sections/home/listings-carousel';

import PostSocialsShare from 'src/sections/blog/common/post-socials-share';




import ListingList from '../components/listings/list/listings-list';




export default function ListingView({ params }) {
  const router = useRouter();
  const { category, url } = params;
  const loading = useBoolean(true);

  const [data, setData] = useState(null);

  const [favorites, setFavorites] = useState([]);


  const [recentlistings, setRecentlistings] = useState(null);

  const [specifications, setSpecifications] = useState(null);


  const [socials, setSocials] = useState(null);


  // Initialize state for each city's recent listings
  const [recentListingsCasablanca, setRecentListingsCasablanca] = useState(null);
  const [recentListingsMarrakech, setRecentListingsMarrakech] = useState(null);
  const [recentListingsTanger, setRecentListingsTanger] = useState(null);
  const [recentListingsRabat, setRecentListingsRabat] = useState(null);
  const [recentListingsFes, setRecentListingsFes] = useState(null);
  const [recentListingsAgadir, setRecentListingsAgadir] = useState(null);
  const [recentListingsMeknes, setRecentListingsMeknes] = useState(null);
  const [recentListingsOujda, setRecentListingsOujda] = useState(null);
  const [recentListingsKenitra, setRecentListingsKenitra] = useState(null);
  const [recentListingsTetouan, setRecentListingsTetouan] = useState(null);
  const [recentListingsSale, setRecentListingsSale] = useState(null);
  const [recentListingsTemara, setRecentListingsTemara] = useState(null);
  const [recentListingsSafi, setRecentListingsSafi] = useState(null);
  const [recentListingsMohammedia, setRecentListingsMohammedia] = useState(null);
  const [recentListingsKhouribga, setRecentListingsKhouribga] = useState(null);
  const [recentListingsElJadida, setRecentListingsElJadida] = useState(null);
  const [recentListingsBeniMellal, setRecentListingsBeniMellal] = useState(null);


  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getListingsFront(category, url);



        setData(response.data);

        setRecentlistings(response.data.attributes.recentlistings);

        setSpecifications(response.data.attributes.specifications);

        setFavorites(response.data.attributes.favorites);



        setSocials(response.data.attributes.socials);

        // Update state with the response data for each city
        setRecentListingsCasablanca(response.data.attributes.recentlistingscasablanca);
        setRecentListingsMarrakech(response.data.attributes.recentlistingsmarrakech);
        setRecentListingsTanger(response.data.attributes.recentlistingstanger);
        setRecentListingsRabat(response.data.attributes.recentlistingsrabat);
        setRecentListingsFes(response.data.attributes.recentlistingsfes);
        setRecentListingsAgadir(response.data.attributes.recentlistingsagadir);
        setRecentListingsMeknes(response.data.attributes.recentlistingsmeknes);
        setRecentListingsOujda(response.data.attributes.recentlistingsojuda);
        setRecentListingsKenitra(response.data.attributes.recentlistingskenitra);
        setRecentListingsTetouan(response.data.attributes.recentlistingstetouan);
        setRecentListingsSale(response.data.attributes.recentlistingssale);
        setRecentListingsTemara(response.data.attributes.recentlistingstemara);
        setRecentListingsSafi(response.data.attributes.recentlistingssafi);
        setRecentListingsMohammedia(response.data.attributes.recentlistingsmohammedia);
        setRecentListingsKhouribga(response.data.attributes.recentlistingskhouribga);
        setRecentListingsElJadida(response.data.attributes.recentListingseljadida);
        setRecentListingsBeniMellal(response.data.attributes.recentlistingsbenimellal);


        console.log('jdida:', recentListingsElJadida); // Logging the response



      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    })();
  }, [category, url]);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }


  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          overflow: 'hidden',
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: params.category, href: paths.travel.tour },
            { name: params.url },
          ]}
          sx={{ mt: 3, mb: 5 }}
        />

       {data && <ListingImage images={data.attributes.images} /> }

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
          {data && <ListingForm tour={data} />}
          </Grid>

          <Grid xs={12} md={7} lg={8}>
          {data && <ListingHeader tour={data} seller={data.attributes.seller} />}
            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />



            {data && <ListingSummary specifications={specifications}

              description ={data.attributes.description}

              category ={data.attributes.category}


            />}




            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>


                <PostSocialsShare />



            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 10 }} />

        {data && <Review category={category} url={url} reviews={data.attributes.reviewslistings} seller={data.attributes.seller} />}

      <Divider sx={{ my: 10 }} />





      {data && <ListingsCarousel tours={recentlistings} title="Billiards" />}

      {data && <StorePopularProducts
          recentListingsCasablanca={recentListingsCasablanca}
          recentListingsMarrakech={recentListingsMarrakech}
          recentListingsTanger={recentListingsTanger}
          recentListingsRabat={recentListingsRabat}
          recentListingsFes={recentListingsFes}
          recentListingsAgadir={recentListingsAgadir}
          recentListingsMeknes={recentListingsMeknes}
          recentListingsOujda={recentListingsOujda}
          recentListingsKenitra={recentListingsKenitra}
          recentListingsTetouan={recentListingsTetouan}
          recentListingsSale={recentListingsSale}
          recentListingsTemara={recentListingsTemara}
          recentListingsSafi={recentListingsSafi}
          recentListingsMohammedia={recentListingsMohammedia}
          recentListingsKhouribga={recentListingsKhouribga}
          recentListingsElJadida={recentListingsElJadida}
          recentListingsBeniMellal={recentListingsBeniMellal}
        /> }

      </Container>


    </>
  );
}
