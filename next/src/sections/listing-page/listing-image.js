'use client';

import { useState, useEffect, useCallback } from "react";
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useQuery } from '@tanstack/react-query';
import CrudService from 'src/services/cruds-service';

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
  const slides = images.map((slide) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_LARGE}${slide}`,
  }));

  const mdUp = useResponsive('up', 'md');

  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [fetchLightboxData, setFetchLightboxData] = useState(false); // Control when to fetch

  // Fetch images only when an image is clicked to open the lightbox
  const { data: listingpicData, isLoading: isListingpicLoading, error: listingpicError } = useQuery({
    queryKey: ['listingpic', params.category, params.url],
    queryFn: () => CrudService.getListingpic(params.category, params.url),
    enabled: fetchLightboxData,  // Fetch only when this state is true
    onSuccess: (data) => {
      const fetchedSlides = data.map((img) => ({
        src: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_LARGE}${img}`,
      }));
      setLightboxSlides(fetchedSlides);  // Set the fetched images for Lightbox
      setFetchLightboxData(false); // Reset to prevent refetch on every click
    },
    onError: (error) => {
      console.error('Failed to fetch listing:', error);
    },
  });

  const lightbox = useLightbox(lightboxSlides);

  const handleImageClick = (src) => {
    setFetchLightboxData(true);  // Trigger data fetching
    lightbox.onOpen(src);        // Open the lightbox with the selected image
  };

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
            <PhotoItem photo={slides[0]?.src} onOpenLightbox={() => handleImageClick(slides[0]?.src)} />

            <Box
              sx={{
                gap: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                position: 'relative',
              }}
            >
              {slides.slice(1, 4).map((slide) => (
                <PhotoItem
                  key={slide.src}
                  photo={slide.src}
                  onOpenLightbox={() => handleImageClick(slide.src)}
                />
              ))}

              {slides.length > 5 && (
                <Box
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(slides[4].src)}
                >
                  <PhotoItem
                    key={slides[4].src}
                    photo={slides[4].src}
                    onOpenLightbox={() => handleImageClick(slides[4].src)}
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
        <CarouselThumbnail data={slides} lightbox={lightbox} />
      )}

      {/* Update the Lightbox component to use lightboxSlides */}
      <Lightbox
        index={lightbox.selected}
        slides={lightboxSlides} // Use lightboxSlides instead of slides
        open={lightbox.open}
        close={lightbox.onClose}
      />
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

function PhotoItem({ photo, onOpenLightbox }) {
  const isMdUp = useResponsive('up', 'md');
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
        onClick={onOpenLightbox}
        sx={{ borderRadius: { xs: 0, md: 2 }, cursor: 'pointer' }}
      />
    </m.div>
  );
}

PhotoItem.propTypes = {
  onOpenLightbox: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

function CarouselThumbnail({ data, lightbox }) {
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
        {data.map((item) => (
          <PhotoItem key={item.src} photo={item.src} onOpenLightbox={() => lightbox.onOpen(item.src)} />
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
  lightbox: PropTypes.object.isRequired,
};
