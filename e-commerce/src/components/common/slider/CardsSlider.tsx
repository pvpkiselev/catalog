import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { sliderSettings } from './sliderSettings';
import ArrowControlButton from './ArrowControlButton';

interface CardsSliderProps {
  children: React.ReactNode[];
}

function CardsSlider(props: CardsSliderProps) {
  const { children } = props;
  const slidesToShow = sliderSettings.slidesToShow;

  const totalChildren = React.Children.count(children);
  const shouldShowControls = totalChildren > slidesToShow;
  const shouldShowDots = totalChildren > slidesToShow;

  const processedChildren = React.Children.map(children, (child, index) => {
    if (!child) return null;

    const zeroPadding = 0;
    const defaultPadding = 12;

    const padding = index === 0 || index === totalChildren ? zeroPadding : defaultPadding;

    return <Box paddingLeft={`${padding}px`}>{child}</Box>;
  });

  return (
    <Box position="relative" width="100%">
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
        {processedChildren}
      </Slider>
    </Box>
  );
}

export default CardsSlider;
