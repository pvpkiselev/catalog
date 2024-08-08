import { selectCategories, selectCurrentCategoryId } from '@/store/filters/filters-selectors';
import { changedCategoryId } from '@/store/filters/filters-slice';
import { getCategoriesThunk } from '@/store/filters/filters-thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';

function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategoryId = useAppSelector(selectCurrentCategoryId);

  const getCategories = async () => {
    await dispatch(getCategoriesThunk());
  };

  const changeCategory = (validValue: number | null) => {
    dispatch(changedCategoryId(validValue));
  };

  return { categories, selectedCategoryId, getCategories, changeCategory };
}

export default useCategories;
