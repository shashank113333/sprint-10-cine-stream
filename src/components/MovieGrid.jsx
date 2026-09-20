import { MovieCard } from './MovieCard';
import { Film } from 'lucide-react';

export const MovieGrid = ({
  movies = [],
  isLoading = false,
  isFavorite,
  onToggleFavorite,
  emptyMessage = 'No movies found.',
}) => {

  if (isLoading && movies.length === 0) {
    return (
      <div className="movie-grid" aria-busy="true" aria-label="Loading movies">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="movie-card skeleton-card">
            <div className="poster-container skeleton-poster" />
            <div className="movie-info">
              <div className="skeleton-line" style={{ width: '75%', height: '16px', marginBottom: '10px' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '12px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div className="empty-grid-state">
        <div className="empty-icon-box">
          <Film size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">Nothing to Show</h3>
        <p className="empty-subtitle">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.id}-${index}`}
          movie={movie}
          isFavorite={isFavorite ? isFavorite(movie.id) : false}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};