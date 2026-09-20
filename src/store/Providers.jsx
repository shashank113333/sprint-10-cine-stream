"use client";

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { hydrateFavorites } from './slices/favoritesSlice';
import { hydrateTheme } from './slices/themeSlice';

function StoreHydrator({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateFavorites());
    dispatch(hydrateTheme());
  }, [dispatch]);

  return children;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreHydrator>{children}</StoreHydrator>
    </Provider>
  );
}