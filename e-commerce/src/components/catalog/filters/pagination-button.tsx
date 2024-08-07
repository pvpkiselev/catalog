import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectFiltersStatus } from '@/store/filters/filters-selectors';
import { LoadingButton } from '@mui/lab';
import { PRODUCTS_LIMIT } from '@/helpers/constants';
import { changedLimit } from '@/store/filters/filters-slice';

function PaginationButton() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectFiltersStatus);
  const isPending = status === 'pending';

  const handleOffsetChange = () => {
    dispatch(changedLimit(PRODUCTS_LIMIT));
  };

  return (
    <LoadingButton loading={isPending} variant="contained" onClick={handleOffsetChange} fullWidth>
      Show More
    </LoadingButton>
  );
}

export default PaginationButton;
