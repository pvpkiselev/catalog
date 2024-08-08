import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';
import { selectIsAuth } from '@/store/auth/auth-selectors';
import { selectBasketItems } from '@/store/basket/basket-selectors';
import {
  addedToBasket,
  basketSet,
  checkedOutBasket,
  decreasedItemCount,
  increasedItemCount,
  removedFromBasket,
} from '@/store/basket/basket-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const basketMessages = {
  errors: {
    load: 'Failed to load basket from localStorage:',
    save: 'Failed to save basket to localStorage:',
    must_login: 'You must be logged in to use the basket',
  },
  success: {
    add: 'Product added to basket',
    removed: 'Product removed from basket',
  },
};

function useBasket() {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const loadBasketFromLocalStorage = () => {
      try {
        const storedItems = localStorage.getItem(BASKET_STORAGE_NAME);
        if (storedItems) {
          const items = JSON.parse(storedItems);
          dispatch(basketSet(items));
        }
      } catch (error) {
        console.error(basketMessages.errors.load, error);
        toast.error(basketMessages.errors.load);
      }
    };

    loadBasketFromLocalStorage();
  }, []);

  useEffect(() => {
    const saveBasketToLocalStorage = (items: Product[]) => {
      try {
        if (items.length === 0) {
          localStorage.removeItem(BASKET_STORAGE_NAME);
        } else {
          localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(items));
        }
      } catch (error) {
        console.error(basketMessages.errors.save, error);
        toast.error(basketMessages.errors.save);
      }
    };

    saveBasketToLocalStorage(basketItems);
  }, [basketItems]);

  const addToBasket = (product: Product) => {
    if (!isAuth) {
      toast.error(basketMessages.errors.must_login);
      return;
    }
    toast.success(basketMessages.success.add);
    dispatch(addedToBasket(product));
  };

  const removeFromBasket = (productId: number) => {
    if (!isAuth) {
      toast.error(basketMessages.errors.must_login);
      return;
    }
    toast(basketMessages.success.removed);
    dispatch(removedFromBasket(productId));
  };

  const increaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error(basketMessages.errors.must_login);
      return;
    }
    dispatch(increasedItemCount(productId));
  };

  const decreaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error(basketMessages.errors.must_login);
      return;
    }
    dispatch(decreasedItemCount(productId));
  };

  const isProductInBasket = useCallback(
    (productId: number) => {
      return basketItems.some((item) => item.id === productId);
    },
    [basketItems]
  );

  const checkoutBasket = () => {
    if (!isAuth) {
      toast.error(basketMessages.errors.must_login);
      return;
    }

    dispatch(checkedOutBasket());
  };

  return {
    addToBasket,
    removeFromBasket,
    isProductInBasket,
    increaseItemCount,
    decreaseItemCount,
    checkoutBasket,
    basketItems,
  };
}

export default useBasket;
