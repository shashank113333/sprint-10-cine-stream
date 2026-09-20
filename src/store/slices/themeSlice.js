"use client";

import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'cine_stream_theme';

const initialState = {
  currentTheme: 'dark', // Options: 'dark' | 'light' | 'cyberpunk'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, action.payload);
          document.documentElement.setAttribute('data-theme', action.payload);
        } catch (e) {
          console.error('Theme save error:', e);
        }
      }
    },
    hydrateTheme: (state) => {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
          state.currentTheme = saved;
          document.documentElement.setAttribute('data-theme', saved);
        } catch (e) {
          console.error('Theme hydrate error:', e);
        }
      }
    },
  },
});

export const { setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;