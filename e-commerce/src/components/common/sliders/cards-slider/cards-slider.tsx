import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

import { sliderSettings } from './slider-settings';
import ArrowControlButton from './arrow-control-button';
import CardsSliderSkeleton from './cards-slider-skeleton';

interface CardsSliderProps {
  children: React.ReactNode[];
}

function CardsSlider(props: CardsSliderProps) {
  const { children } = props;
  const slidesToShow = sliderSettings.slidesToShow;

  const totalChildren = React.Children.count(children);
  const shouldShowControls = totalChildren > slidesToShow;
  const shouldShowDots = totalChildren > slidesToShow;
  const isEmptyList = totalChildren === 0;

  return (
    <Box position="relative" width="100%">
      {!isEmptyList ? (
        <Slider
          {...sliderSettings}
          prevArrow={
            <ArrowControlButton direction="left" onClick={() => {}} visible={shouldShowControls} />
          }
          nextArrow={
            <ArrowControlButton direction="right" onClick={() => {}} visible={shouldShowControls} />
          }
          dots={shouldShowDots}
        >
          {children}
        </Slider>
      ) : (
        <CardsSliderSkeleton />
      )}
    </Box>
  );
}

export default CardsSlider;
