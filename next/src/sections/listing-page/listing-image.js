'use client';

import { useState, useEffect } from "react";
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Image from 'src/components/image';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightbox } from 'src/components/lightbox';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';

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

export default function ListingImage({ images }) {
  const slides = images.map((slide) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${slide}`,
  }));

  const mdUp = useResponsive('up', 'md');

  const lightbox = useLightbox(slides);

  return (
    <>
      {mdUp ? (
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
          <PhotoItem photo={slides[0].src} onOpenLightbox={() => lightbox.onOpen(slides[0].src)} />

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
                onOpenLightbox={() => lightbox.onOpen(slide.src)}
              />
            ))}

            {slides.length > 5 && (
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => lightbox.onOpen(slides[4].src)}
              >
                <PhotoItem
                  key={slides[4].src}
                  photo={slides[4].src}
                  onOpenLightbox={() => lightbox.onOpen(slides[4].src)}
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
      ) : (
        <CarouselThumbnail data={slides} lightbox={lightbox} />
      )}

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ListingImage.propTypes = {
  images: PropTypes.array.isRequired,
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
        sx={{ borderRadius: 2, cursor: 'pointer' }}
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
        borderRadius: 2,
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
