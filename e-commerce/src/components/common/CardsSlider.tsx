import React from 'react';
import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface CardsSliderProps {
  children: React.ReactNode[];
}

interface ArrowControlButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
}

const ArrowControlButton = (props: ArrowControlButtonProps) => {
  const { direction, onClick, visible } = props;
  const isLeft = direction === 'left';

  if (!visible) return null;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '-48px',
        [isLeft ? 'left' : 'right']: 0,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLeft ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
  );
};

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  centerPadding: '0',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  prevArrow: null,
  nextArrow: null,
};

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
