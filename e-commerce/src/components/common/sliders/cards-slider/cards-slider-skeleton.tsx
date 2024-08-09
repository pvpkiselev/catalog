import { Skeleton, Stack } from '@mui/material';

function CardsSliderSkeleton() {
  return (
    <Stack spacing={2} width="100%" direction="row">
      {Array.from(new Array(5)).map((_, index) => (
        <Stack key={index} width="100%" minWidth="240px">
          <Skeleton variant="rectangular" width="100%" height={250} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </Stack>
      ))}
    </Stack>
  );
}

export default CardsSliderSkeleton;
