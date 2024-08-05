import { MAX_PRICE, MIN_DISTANCE, MIN_PRICE } from '@/helpers/constants';
import { selectPriceRange } from '@/store/filters/filtersSelectors';
import { changedPriceRange } from '@/store/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';

function PriceRange() {
  const priceRange = useAppSelector(selectPriceRange);
  const dispatch = useAppDispatch();
  const [localRange, setLocalRange] = useState<number[]>(priceRange);

  const handleLocalPriceRangeChange = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    range: number | number[]
  ) => {
    if (Array.isArray(range)) {
      setLocalRange(range);
    }
  };

  const handlePriceRangeChangeCommitted = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    range: number | number[]
  ) => {
    if (Array.isArray(range)) {
      dispatch(changedPriceRange(range));
    }
  };

  return (
    <Box width="100%" pb={10}>
      <Typography variant="h6" pb={3}>
        Price, $
      </Typography>
      <Slider
        getAriaLabel={() => 'Price'}
        value={localRange}
        valueLabelDisplay="auto"
        disableSwap
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={MIN_DISTANCE}
        onChange={handleLocalPriceRangeChange}
        onChangeCommitted={handlePriceRangeChangeCommitted}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">from {localRange[0]}</Typography>
        <Typography variant="body2">to {localRange[1]}</Typography>
      </Box>
    </Box>
  );
}

export default PriceRange;
