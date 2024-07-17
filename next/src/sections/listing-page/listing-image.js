import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Image from 'src/components/image';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightbox } from 'src/components/lightbox';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ListingImage({ images }) {
  const slides = images.map((slide) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${slide}`,
  }));


  const lightbox = useLightbox(slides);

  return (
    <>
      <Box
        sx={{
          gap: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
          mb: { xs: 5, md: 10 },
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
  images: PropTypes.array,
};

// ----------------------------------------------------------------------

function PhotoItem({ photo, onOpenLightbox }) {
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
        ratio="1/1"
        onClick={onOpenLightbox}
        sx={{ borderRadius: 2, cursor: 'pointer' }}
      />
    </m.div>
  );
}

PhotoItem.propTypes = {
  onOpenLightbox: PropTypes.func,
  photo: PropTypes.string,
};
