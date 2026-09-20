"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, Film } from 'lucide-react';
import { getPosterUrl } from '../api/tmdb';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';

export const MovieCard = ({ movie }) => {
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites?.items || []);
  const movieId = movie?.id || movie?.imdbID;
  const isFavorite = favorites.some((m) => m.id === movieId);

  const posterUrl = getPosterUrl(movie?.poster_path);

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear() || String(movie.release_date).substring(0, 4)
    : 'N/A';

  const rating = typeof movie?.vote_average === 'number'
    ? movie.vote_average.toFixed(1)
    : 'NR';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (movie) {
      dispatch(toggleFavorite(movie));
    }
  };

  if (!movieId) return null;

  return (
    <div className="movie-card">
      <Link
        href={`/movie/${movieId}`}
        prefetch={true}
        aria-label={`View details for ${movie?.title || 'movie'}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}
      >
        <div className="poster-container">
          {posterUrl && !imgError ? (
            <img
              src={posterUrl}
              alt={`${movie?.title || 'Movie'} Official Poster`}
              width="500"
              height="750"
              loading="lazy"
              decoding="async"
              className="movie-poster"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="fallback-poster" aria-label="Poster not available">
              <Film size={36} className="fallback-icon" />
              <span className="fallback-title">{movie?.title}</span>
              <span className="fallback-text">No Poster Available</span>
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            aria-label={isFavorite ? `Remove ${movie?.title} from Favorites` : `Add ${movie?.title} to Favorites`}
            type="button"
          >
            <Heart
              size={20}
              className={`heart-icon ${isFavorite ? 'heart-filled' : ''}`}
            />
          </button>

          <div className="rating-badge" aria-label={`IMDb Rating: ${rating}`}>
            <Star size={13} className="star-icon" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title" title={movie?.title}>
            {movie?.title}
          </h3>
          <div className="movie-meta">
            <span className="movie-year">{releaseYear}</span>
            <span className="media-type-badge">MOVIE</span>
          </div>
        </div>
      </Link>
    </div>
  );
};