import { selectCategories, selectCurrentCategoryId } from '@/store/filters/filtersSelectors';
import { changedCategoryId } from '@/store/filters/filtersSlice';
import { getCategoriesThunk } from '@/store/filters/filtersThunks';
import { useAppDispatch, useAppSelector } from '@/store/redux';

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
