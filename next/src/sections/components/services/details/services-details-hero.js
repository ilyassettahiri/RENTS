"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import Image from "src/components/image";
import { useQuery } from '@tanstack/react-query';
import Divider from '@mui/material/Divider';

import CrudService from "src/services/cruds-service";
import ListingHeader from "src/sections/listing-page/listing-header";
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from "src/components/carousel";
import Lightbox, { useLightbox } from 'src/components/lightbox';
import { useResponsive } from "src/hooks/use-responsive";



export default function ServicesDetailsHero({ job, favorites, onFavoriteToggle }) {
  const theme = useTheme();
  const [favorite, setFavorite] = useState(job.favorited);



  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  const images = job.attributes.images.map((url, index) => ({
    id: index,
    title: job.attributes.title,
    coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_LARGE}${url}`,
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
        mt: { md: 10 },
      }}
    >
      <CarouselBasic3 data={images} jobUrl={job.attributes.url}/>

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

          <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />

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
      url: PropTypes.string.isRequired,
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




function CarouselBasic3({ data , jobUrl }) {


  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');


  const [slides, setSlides] = useState(
    data.map((slide) => ({
      src: slide.coverUrl,
    }))
  );

  const fetchedImagesRef = useRef(null);
  const [isLightboxOpened, setIsLightboxOpened] = useState(false);
  const [imageToOpen, setImageToOpen] = useState(null);

  const lightbox = useLightbox(data);


  const carousel = useCarousel({
    autoplay: false,
    ...CarouselDots({
      rounded: true,
      sx: { mt: -3 },
    }),
  });




  useEffect(() => {
    if (isLightboxOpened) {
      if (!fetchedImagesRef.current) { // Check if images are already fetched
        CrudService.getServicepic(jobUrl)
          .then((listingpicData) => {
            const dataImages = listingpicData.images.map((image) => ({
              src: `${process.env.NEXT_PUBLIC_IMAGE_LISTING_XLARGE}${image}`,
            }));

            fetchedImagesRef.current = dataImages; // Store fetched images in ref
            setSlides(dataImages);

            if (imageToOpen >= 0 && imageToOpen < dataImages.length) {
              lightbox.onOpen(dataImages[imageToOpen].src);
              lightbox.setSelected(imageToOpen);
            } else {
              console.warn('Image to open not found in fetched images.');
            }
          })
          .catch((error) => {
            console.error('Failed to fetch listing:', error);
          })
          .finally(() => {
            setIsLightboxOpened(false);
            setImageToOpen(null);
          });
      } else {
        // Use already fetched images
        const fetchedImages = fetchedImagesRef.current;
        setSlides(fetchedImages);

        if (imageToOpen >= 0 && imageToOpen < fetchedImages.length) {
          lightbox.onOpen(fetchedImages[imageToOpen].src);
          lightbox.setSelected(imageToOpen);
        } else {
          console.warn('Image to open not found in fetched images.');
        }

        setIsLightboxOpened(false);
        setImageToOpen(null);
      }
    }
  }, [isLightboxOpened, jobUrl, lightbox, imageToOpen]);

  const handleImageClick = (item) => {

    setImageToOpen(item.id);
    setIsLightboxOpened(true);
  };


  const handleLightboxClose = () => {
    lightbox.onClose();
    lightbox.setSelected(-1); //
  };



  return (
    <>
      <Card
        sx={{
          position: 'relative',
          border: 'none',
          borderRadius: { xs: 0, md: 2 },
          ml: { md: 10 },
        }}
      >
        <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item) => (
              <Box key={item.id} onClick={() => handleImageClick(item)} sx={{ cursor: 'pointer' }}>
                <Image
                  alt={item.title}
                  src={item.coverUrl}
                  ratio={isMdUp ? '4/3' : '1/1'}
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
        close={handleLightboxClose}
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

  jobUrl: PropTypes.string.isRequired,
};
