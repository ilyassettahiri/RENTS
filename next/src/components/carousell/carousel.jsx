import PropTypes from 'prop-types';
import { Children, isValidElement } from 'react';
import { useTranslate } from 'src/locales/use-locales';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { carouselClasses } from './classes';
import { CarouselSlide } from './components/carousel-slide';

export const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'axis',
})(({ axis }) => ({
  margin: 'auto',
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'relative',
  ...(axis === 'y' && {
    height: '100%',
  }),
}));

export const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'axis' && prop !== 'slideSpacing',
})(({ axis, slideSpacing }) => ({
  display: 'flex',
  backfaceVisibility: 'hidden',
  ...(axis === 'x' && {
    touchAction: 'pan-y pinch-zoom',
    marginLeft: `calc(${slideSpacing} * -1)`,
  }),
  ...(axis === 'y' && {
    height: '100%',
    flexDirection: 'column',
    touchAction: 'pan-x pinch-zoom',
    marginTop: `calc(${slideSpacing} * -1)`,
  }),
}));

// ----------------------------------------------------------------------

export function Carousel({ carousel, children, sx, slotProps }) {
  const { mainRef, options } = carousel;
  const { i18n } = useTranslate();

  const isRTL = i18n.language === 'ar';


  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '0px';
  const direction = isRTL ? 'rtl' : 'ltr';

  const renderChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const reactChild = child;

      return (
        <CarouselSlide key={reactChild.key} options={carousel.options} sx={slotProps?.slide}>
          {child}
        </CarouselSlide>
      );
    }
    return null;
  });

  return (
    <StyledRoot sx={sx} axis={axis} ref={mainRef} dir={direction} className={carouselClasses.root}>
      <StyledContainer
        component="ul"
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.container}
        sx={{
          ...(carousel.pluginNames?.includes('autoHeight') && {
            alignItems: 'flex-start',
            transition: (theme) =>
              theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }),
          ...slotProps?.container,
        }}
      >
        {renderChildren}
      </StyledContainer>
    </StyledRoot>
  );
}

Carousel.propTypes = {
  carousel: PropTypes.shape({
    mainRef: PropTypes.object.isRequired,
    options: PropTypes.shape({
      axis: PropTypes.string,
      slideSpacing: PropTypes.string,
      direction: PropTypes.string,
      pluginNames: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    pluginNames: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  children: PropTypes.node,
  sx: PropTypes.object,
  slotProps: PropTypes.shape({
    slide: PropTypes.object,
    container: PropTypes.object,
  }),
};
