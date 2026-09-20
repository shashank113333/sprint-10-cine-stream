"use client";

import { useSelector, useDispatch } from 'react-redux';
import {
  setGenre,
  setYear,
  setMinRating,
  setSortBy,
  resetFilters,
} from '../store/slices/filterSlice';
import { Filter, RotateCcw, Star, Calendar, Film } from 'lucide-react';

const GENRES = [
  { id: 'all', name: 'All Genres' },
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '18', name: 'Drama' },
  { id: '878', name: 'Sci-Fi' },
  { id: '27', name: 'Horror' },
  { id: '10749', name: 'Romance' },
  { id: '16', name: 'Animation' },
];

const YEARS = ['all', '2024', '2023', '2022', '2021', '2020'];

export const FilterSidebar = () => {
  const dispatch = useDispatch();

  const { selectedGenre, selectedYear, minRating, sortBy } = useSelector(
    (state) => state.filters
  );

  return (
    <aside className="filter-sidebar" aria-label="Movie Filter Controls">
      <div className="filter-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="#e50914" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Filter Movies</h3>
        </div>
        <button
          onClick={() => dispatch(resetFilters())}
          className="reset-btn"
          title="Reset All Filters"
          aria-label="Reset all applied movie filters"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          <Film size={14} /> Genre
        </label>
        <div className="genre-pill-container" role="group" aria-label="Genre Filter Pills">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => dispatch(setGenre(genre.id))}
              aria-pressed={selectedGenre === genre.id}
              aria-label={`Filter by ${genre.name}`}
              className={`genre-pill ${selectedGenre === genre.id ? 'active' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="year-select" className="filter-label">
          <Calendar size={14} /> Release Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => dispatch(setYear(e.target.value))}
          aria-label="Filter movies by Release Year"
          className="filter-select"
        >
          <option value="all">All Years</option>
          {YEARS.filter((y) => y !== 'all').map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="rating-range" className="filter-label">
            <Star size={14} color="#f59e0b" /> Min IMDb Rating
          </label>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>
            {minRating > 0 ? `${minRating}+ ★` : 'Any'}
          </span>
        </div>
        <input
          id="rating-range"
          type="range"
          min="0"
          max="9"
          step="0.5"
          value={minRating}
          onChange={(e) => dispatch(setMinRating(parseFloat(e.target.value)))}
          aria-label="Filter movies by minimum IMDb rating"
          className="rating-slider"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">Sort By</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          aria-label="Sort movies list by criteria"
          className="filter-select"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="release_date.desc">Newest First</option>
        </select>
      </div>
    </aside>
  );
};