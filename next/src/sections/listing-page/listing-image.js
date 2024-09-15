'use client';

import { useState, useEffect, useCallback, useMemo  } from "react";
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import CrudService from 'src/services/cruds-service';
import { useQuery } from '@tanstack/react-query';

import Image from 'src/components/image';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightbox } from 'src/components/lightbox';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const StyledThumbnailsContainer = styled('div')(({ length, theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  '& .slick-slide': {
    lineHeight: 0,
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),

  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),

  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),

  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),

  ...(length > 3 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

export default function ListingImage({ images, params }) {



  const [slides, setSlides] = useState(
    images.map((slide) => ({
      src: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_LARGE}${slide}`,
    }))
  );

  const mdUp = useResponsive('up', 'md');





  return (
    <>
      {mdUp ? (





        <Container
        maxWidth={false}
        sx={{
          overflow: 'hidden',
          paddingLeft: { lg: '80px' },
          paddingRight: { lg: '80px' },
        }}
        >

            <CustomBreadcrumbs
              links={[
                { name: 'Home', href: '/' },
                { name: params.category, href: paths.travel.tour },
                { name: params.url },
              ]}
              sx={{ mt: 1, mb: 3 }}
            />


            <Box
              sx={{
                gap: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                },
                mb: { xs: 5, md: 5 },
              }}
            >
              <PhotoItem photo={slides[0].src} params={params} id={0} />

              <Box
                sx={{
                  gap: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  position: 'relative',
                }}
              >
                {slides.slice(1, 4).map((slide, index) => (
                  <PhotoItem
                    key={slide.src}
                    params={params}
                    photo={slide.src}
                    id={index + 1}
                    />
                ))}

                {slides.length > 5 && (
                  <Box
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                    }}

                  >
                    <PhotoItem
                      key={slides[4].src}
                      params={params}
                      photo={slides[4].src}
                      id={5}
                      />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h4" color="white">
                        +{slides.length - 5}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>

        </Container>


      ) : (
        <CarouselThumbnail data={slides}  params={params} />
      )}


    </>
  );
}

ListingImage.propTypes = {
  images: PropTypes.array.isRequired,

  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

// ----------------------------------------------------------------------

function PhotoItem({ photo,  id , params }) {


  const isMdUp = useResponsive('up', 'md');



  const [fetchedImages, setFetchedImages] = useState([]);
  const [isLightboxOpened, setIsLightboxOpened] = useState(false);
  const [imageToOpen, setImageToOpen] = useState(null);
  const [slides, setSlides] = useState([]);
  const lightbox = useLightbox(slides);

  useEffect(() => {
    if (isLightboxOpened) {

      // Attempt to open the lightbox immediately on the first click
      lightbox.onOpen('');
      lightbox.setSelected(imageToOpen);

      if (fetchedImages.length === 0) {
        console.log("Fetching images...");

        CrudService.getListingpic(params.category, params.url)
          .then((listingpicData) => {
            console.log("Fetched images:", listingpicData);

            const dataImages = listingpicData.images.map((image) => ({
              src: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_XLARGE}${image}`,
            }));

            setFetchedImages(dataImages);
            setSlides(dataImages);

            console.log("Set fetched images and slides:", { dataImages });

            if (imageToOpen !== null) {
              const selectedIndex = imageToOpen;
              if (selectedIndex >= 0 && selectedIndex < dataImages.length) {
                lightbox.setSlides(dataImages);
                lightbox.setSelected(selectedIndex);
                lightbox.onOpen(dataImages[selectedIndex].src);
                console.log("Opened lightbox with fetched image:", dataImages[selectedIndex].src);
              } else {
                console.warn('Image to open not found in fetched images.');
              }
            }
          })
          .catch((error) => {
            console.error('Failed to fetch listing:', error);
          })
          .finally(() => {
            console.log("Resetting states after fetching images.");
            setIsLightboxOpened(false);
            setImageToOpen(null);
          });
      } else {
        console.log("Using already fetched images.");
        setSlides(fetchedImages);
        lightbox.setSelected(imageToOpen);

        if (imageToOpen !== null) {
          const selectedIndex = imageToOpen;
          if (selectedIndex >= 0 && selectedIndex < fetchedImages.length) {
            lightbox.setSlides(fetchedImages);
            lightbox.setSelected(selectedIndex);
            lightbox.onOpen(fetchedImages[selectedIndex].src);
            console.log("Opened lightbox with already fetched image:", fetchedImages[selectedIndex].src);
          } else {
            console.warn('Image to open not found in fetched images.');
          }
        }

        console.log("Resetting states after opening lightbox with fetched images.");
        setIsLightboxOpened(false);
        setImageToOpen(null);
      }
    }
  }, [isLightboxOpened, params.category, params.url, lightbox, imageToOpen, fetchedImages]);

  const handleImageClick = () => {
    console.log("Clicked item ID:", id);
    setImageToOpen(id);
    setIsLightboxOpened(true);
  };

  const handleLightboxClose = () => {
    lightbox.onClose();
    lightbox.setSelected(-1); //
  };


  return (
    <m.div
      whileHover="hover"
      variants={{
        hover: { opacity: 0.8 },
      }}
      transition={varTranHover()}
    >
      <Image
        alt="photo"
        src={photo}
        ratio={isMdUp ? '4/3' : '1/1'}
        onClick={handleImageClick}
        sx={{ borderRadius: { xs: 0, md: 2 }, cursor: 'pointer' }}
      />

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={handleLightboxClose}
      />
    </m.div>
  );
}

PhotoItem.propTypes = {

  id: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,

  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,

};

// ----------------------------------------------------------------------


function CarouselThumbnail({ data , params }) {
  const carouselLarge = useCarousel({
    rtl: false,
    draggable: false,
    adaptiveHeight: true,
  });

  const carouselThumb = useCarousel({
    rtl: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: data.length > 3 ? 3 : data.length,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  const renderLargeImg = (
    <Box
      sx={{
        mb: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Carousel
        {...carouselLarge.carouselSettings}
        asNavFor={carouselThumb.nav}
        ref={carouselLarge.carouselRef}
      >
        {data.map((item, index) => (
          <PhotoItem
            key={item.src}
            photo={item.src}
            params={params}
            id={index}
          />
          ))}
      </Carousel>

      <CarouselArrowIndex
        index={carouselLarge.currentIndex}
        total={data.length}
        onNext={carouselThumb.onNext}
        onPrev={carouselThumb.onPrev}
      />
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={data.length}>
      <Carousel
        {...carouselThumb.carouselSettings}
        asNavFor={carouselLarge.nav}
        ref={carouselThumb.carouselRef}
      >
        {data.map((item, index) => (
          <Box key={item.src} sx={{ px: 0.5 }}>
            <Avatar
              variant="rounded"
              alt={item.title}
              src={item.src}
              sx={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                opacity: 0.48,
                cursor: 'pointer',
                ...(carouselLarge.currentIndex === index && {
                  opacity: 1,
                  border: (theme) => `solid 2.5px ${theme.palette.primary.main}`,
                }),
              }}
            />
          </Box>
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <Box
      sx={{
        '& .slick-slide': {
          float: (theme) => (theme.direction === 'rtl' ? 'right' : 'left'),
        },
      }}
    >
      {renderLargeImg}
      {renderThumbnails}
    </Box>
  );
}


CarouselThumbnail.propTypes = {
  data: PropTypes.array.isRequired,

  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
