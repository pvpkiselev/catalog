import { Grid, Skeleton } from '@mui/material';

function ProductsListSkeleton() {
  return (
    <Grid container spacing={4} wrap="wrap">
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item xs={12} md={6} lg={3} key={index} display="flex" flexDirection="column">
          <Skeleton variant="rectangular" width="100%" height={250} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsListSkeleton;
