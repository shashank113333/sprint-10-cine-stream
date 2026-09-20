import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import filterReducer from './slices/filterSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
  devTools: true,
});