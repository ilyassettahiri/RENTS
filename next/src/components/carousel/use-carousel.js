'use client';


import { useRef, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslate } from 'src/locales/use-locales';


export default function useCarousel(props) {
  const theme = useTheme();

  const { i18n } = useTranslate();
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(props?.initialSlide || 0);
  const [nav, setNav] = useState(undefined);

  const isRTL = i18n.language === 'ar';

  const isLoopEnabled = props?.loop !== false;

  const totalSlides = props?.totalSlides || 0;

  const carouselSettings = {
    arrows: false,
    dots: !!props?.customPaging,
    rtl: isRTL,
    infinite: isLoopEnabled,  // Enable infinite loop by default; disable if loop is false
    beforeChange: (current, next) => setCurrentIndex(next),
    ...props,
    fade: !!(props?.fade && !isRTL),
  };

  const onSetNav = useCallback(() => {
    if (carouselRef.current) {
      setNav(carouselRef.current);
    }
  }, []);

  const onPrev = useCallback(() => {
    if (carouselRef.current && (isLoopEnabled || currentIndex > 0)) {
      carouselRef.current.slickPrev();
    }
  }, [currentIndex, isLoopEnabled]);

  const onNext = useCallback(() => {
    if (carouselRef.current && (isLoopEnabled || currentIndex < totalSlides - props.slidesToShow)) {
      carouselRef.current.slickNext();
    }
  }, [currentIndex, totalSlides, props.slidesToShow, isLoopEnabled]);

  const onTogo = useCallback((index) => {
    if (carouselRef.current) {
      carouselRef.current.slickGoTo(index);
    }
  }, []);

  return {
    nav,
    carouselRef,
    currentIndex,
    carouselSettings,
    onPrev,
    onNext,
    onTogo,
    onSetNav,
    setNav,
    setCurrentIndex,
    isPrevDisabled: !isLoopEnabled && currentIndex === 0, // Disable "Prev" button if at the first slide and loop is false
    isNextDisabled: !isLoopEnabled && currentIndex >= totalSlides - props.slidesToShow, // Disable "Next" button if at the last slide and loop is false
  };
}
