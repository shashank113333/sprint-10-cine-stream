"use client";

import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'cine_stream_favorites';

const initialState = {
  items: [],
  isHydrated: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.items.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(movie);
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch (e) {
          console.error('LocalStorage save error:', e);
        }
      }
    },
    hydrateFavorites: (state) => {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            state.items = JSON.parse(saved);
          }
        } catch (e) {
          console.error('Hydration error:', e);
        }
      }
      state.isHydrated = true;
    },
  },
});

export const { toggleFavorite, hydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;