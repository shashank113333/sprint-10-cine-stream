"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import { MovieGrid } from './MovieGrid';
import { SearchBar } from './SearchBar';
import { MoodMatcher } from './MoodMatcher';
import { FilterSidebar } from './FilterSidebar';
import { useDebounce } from '../hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2, Sparkles, Compass } from 'lucide-react';

export default function HomeClient({ initialMovies = [] }) {
  const [activeMode, setActiveMode] = useState('search');
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const sentinelRef = useRef(null);

  const { selectedGenre, selectedYear, minRating, sortBy } = useSelector(
    (state) => state.filters
  );

  const loadData = useCallback(
    async (targetPage, isAppend = false) => {
      if (isAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        let data;
        if (debouncedSearchTerm.trim()) {
          data = await searchMovies(debouncedSearchTerm, targetPage);
        } else {
          data = await fetchPopularMovies(targetPage);
        }

        setTotalPages(data.total_pages || 1);
        setPage(targetPage);

        setMovies((prev) => (isAppend ? [...prev, ...(data.results || [])] : data.results || []));
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearchTerm]
  );

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      loadData(1, false);
    } else if (page === 1 && initialMovies.length > 0) {
      setMovies(initialMovies);
    } else {
      loadData(1, false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && !loadingMore && page < totalPages) {
          loadData(page + 1, true);
        }
      },
      { root: null, rootMargin: '150px', threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loading, loadingMore, page, totalPages, loadData]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        if (selectedGenre !== 'all' && movie.genre_ids) {
          if (!movie.genre_ids.includes(Number(selectedGenre))) return false;
        }
        if (selectedYear !== 'all' && movie.release_date) {
          const yr = String(movie.release_date).substring(0, 4);
          if (yr !== selectedYear) return false;
        }
        if (minRating > 0 && typeof movie.vote_average === 'number') {
          if (movie.vote_average < minRating) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'vote_average.desc') {
          return (b.vote_average || 0) - (a.vote_average || 0);
        }
        if (sortBy === 'release_date.desc') {
          return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        }
        return (b.popularity || 0) - (a.popularity || 0);
      });
  }, [movies, selectedGenre, selectedYear, minRating, sortBy]);

  const handleMovieDiscovered = (movieTitle) => {
    setSearchTerm(movieTitle);
  };

  return (
    <div className="main-viewport">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setActiveMode('search')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeMode === 'search' ? '#e50914' : '#141922',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <Compass size={16} />
          <span>Manual Search</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('ai-mood')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: activeMode === 'ai-mood' ? 'linear-gradient(135deg, #8b5cf6, #c026d3)' : '#141922',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <Sparkles size={16} />
          <span>AI Mood Matcher</span>
        </button>
      </div>

      {activeMode === 'ai-mood' ? (
        <MoodMatcher onMovieDiscovered={handleMovieDiscovered} />
      ) : (
        <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={() => setSearchTerm('')} />
      )}

      <div className="sidebar-layout">
        <FilterSidebar />

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.3rem' }}>
              {debouncedSearchTerm.trim() ? `Results for "${debouncedSearchTerm}"` : 'Trending & Popular Movies'}
            </h2>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
              Showing: {filteredMovies.length} of {movies.length} movies
            </span>
          </div>

          <MovieGrid movies={filteredMovies} isLoading={loading} />
        </div>
      </div>

      <div ref={sentinelRef} style={{ padding: '30px 0', textAlign: 'center' }}>
        {loadingMore && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
            <Loader2 size={20} className="animate-spin" />
            <span>Loading next page into DOM...</span>
          </div>
        )}
        {!loadingMore && page >= totalPages && movies.length > 0 && (
          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
            ✓ You have reached the end of the collection
          </span>
        )}
      </div>
    </div>
  );
}