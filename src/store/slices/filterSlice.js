"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGenre: 'all',
  selectedYear: 'all',
  minRating: 0,
  sortBy: 'popularity.desc',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.selectedGenre = 'all';
      state.selectedYear = 'all';
      state.minRating = 0;
      state.sortBy = 'popularity.desc';
      state.searchQuery = '';
    },
  },
});

export const {
  setGenre,
  setYear,
  setMinRating,
  setSortBy,
  setSearchQuery,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;