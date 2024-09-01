"use client";

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'src/components/image';

import { fDate } from 'src/utils/format-time';
import { bgGradient } from 'src/theme/css';
import ListingHeader from 'src/sections/listing-page/listing-header';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

export default function ServicesDetailsHero({ job, favorites, onFavoriteToggle, }) {
  const theme = useTheme();

  const [favorite, setFavorite] = useState(job.favorited);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  const images = job.attributes.images.map((url, index) => ({
    id: index,
    title: job.attributes.title,
    coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${url}`, // Ensure the correct URL format
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
           {job && <ListingHeader tour={job} seller={job.attributes.seller} favorites={favorites} onFavoriteToggle={onFavoriteToggle}/>}

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
      }).isRequired, // Added PropTypes validation for seller
    }).isRequired,
  }).isRequired,

  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};




function CarouselBasic3({ data }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: false,
    ...CarouselDots({
      rounded: true,
      sx: { mt: -3 },
    }),
  });

  return (
    <Card
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (

            <Image alt={item.title} src={item.coverUrl} ratio="1/1" />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
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
