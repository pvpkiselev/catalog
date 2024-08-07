import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, MobileStepper, Button, CardMedia } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { BORDER_RADIUS_M } from '@/helpers/constants';
import { cleanUrl } from '@/utils/clean-url';
import placeholderImage from '@public/images/placeholder-image.jpg';

interface ImageSliderProps {
  images: string[];
}

function ImageSlider(props: ImageSliderProps) {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const { images } = props;

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const imagesUrls: (string | undefined)[] = images.map((image) => cleanUrl(image));

  const maxSteps = images.length;
  const image = imagesUrls[activeStep] || placeholderImage;
  const alt = `Image ${activeStep + 1}`;
  const minSliderLength = 2;
  const isNotSlider = maxSteps < minSliderLength;
  const isNextDisabled = activeStep === maxSteps - 1;
  const isBackDisabled = activeStep === 0;

  return (
    <Box
      width="100%"
      maxHeight="100%"
      sx={{
        position: 'relative',
        '&:hover .stepper': {
          opacity: 1,
        },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          alt={alt}
          image={image}
          sx={{
            borderRadius: BORDER_RADIUS_M,
            width: '100%',
            maxHeight: '100%',
            aspectRatio: '3/2',
          }}
        />
      </Box>
      {!isNotSlider && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            color: 'white',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            '& .MuiMobileStepper-dot': {
              backgroundColor: 'gray',
            },
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: 'white',
            },
            transition: 'opacity 0.3s',
            padding: 0,
          }}
          className="stepper"
          nextButton={
            <Button
              size="small"
              color="inherit"
              onClick={handleNext}
              disabled={isNextDisabled}
              sx={{ height: '100%', color: 'white' }}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              color="inherit"
              onClick={handleBack}
              disabled={isBackDisabled}
              sx={{ height: '100%', color: 'white' }}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      )}
    </Box>
  );
}

export default ImageSlider;
