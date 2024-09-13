"use client";

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import ListingHeader from 'src/sections/listing-page/listing-header';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';
import Lightbox, { useLightbox } from 'src/components/lightbox';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServicesDetailsHero({ job, favorites, onFavoriteToggle }) {
  const theme = useTheme();
  const [favorite, setFavorite] = useState(job.favorited);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  const images = job.attributes.images.map((url, index) => ({
    id: index,
    title: job.attributes.title,
    coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_LARGE}${url}`, // Ensure the correct URL format
  }));

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
      sx={{
        alignItems: 'flex-start',
      }}
    >
      <CarouselBasic3 data={images} />

      <Container>
        <Box>
          {job && (
            <ListingHeader
              tour={job}
              seller={job.attributes.seller}
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

ServicesDetailsHero.propTypes = {
  job: PropTypes.shape({
    favorited: PropTypes.bool,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.string,
      city: PropTypes.string,
      total_views: PropTypes.number,
      deadline: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      seller: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

function CarouselBasic3({ data }) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md'); // Responsive hook for media queries

  // Lightbox setup
  const slides = data.map((slide) => ({
    src: slide.coverUrl,
  }));

  const lightbox = useLightbox(slides);

  const carousel = useCarousel({
    autoplay: false,
    ...CarouselDots({
      rounded: true,
      sx: { mt: -3 },
    }),
  });

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          border: 'none', // Removes the border
          borderRadius: { xs: 0, md: 2 },
          ml: { md: 10 },
        }}
      >
        <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item) => (
              <Box key={item.id} onClick={() => lightbox.onOpen(item.coverUrl)} sx={{ cursor: 'pointer' }}>
                <Image
                  alt={item.title}
                  src={item.coverUrl}
                  ratio={isMdUp ? '4/3' : '1/1'} // Apply 4/3 for large screens, 1/1 for mobile
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Card>

      {/* Lightbox Component */}
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

CarouselBasic3.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      coverUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};
