import { fetchMovieDetails } from '@/src/api/tmdb';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Film } from 'lucide-react';
import { MoviePlayerModal } from '@/src/components/MoviePlayerModal';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

  if (!movie) {
    return {
      title: 'Movie Not Found | Cine-Stream',
      description: 'The requested movie details could not be found.',
    };
  }

  return {
    title: `${movie.title} (${movie.year}) | Cine-Stream`,
    description: movie.plot !== 'N/A' ? movie.plot : `Explore details, ratings, and cast for ${movie.title} on Cine-Stream.`,
    openGraph: {
      title: `${movie.title} | Cine-Stream`,
      description: movie.plot,
      images: movie.poster_path ? [movie.poster_path] : [],
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

  if (!movie) {
    return (
      <div className="main-viewport" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#ff4d4f' }}>Movie Not Found</h2>
        <p style={{ color: '#94a3b8', margin: '16px 0 24px' }}>Could not fetch details for ID: {id}</p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#e50914',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="main-viewport">
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#94a3b8',
          fontSize: '0.9rem',
          marginBottom: '28px',
          fontWeight: 600,
        }}
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          backgroundColor: '#141922',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '2/3' }}>
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="fallback-poster">
              <Film size={48} />
              <span>{movie.title}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span
              style={{
                backgroundColor: 'rgba(229, 9, 20, 0.2)',
                color: '#ff4d4f',
                border: '1px solid rgba(229, 9, 20, 0.4)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              {movie.rated !== 'N/A' ? movie.rated : 'PG-13'}
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {movie.runtime}
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
            {movie.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={20} fill="#f59e0b" />
              <span style={{ fontSize: '1.2rem' }}>{movie.imdbRating}</span>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/ 10 IMDb</span>
            </div>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{movie.year}</span>
          </div>

          <MoviePlayerModal movieTitle={movie.title} movieYear={movie.year} />

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
              Synopsis
            </h4>
            <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: '1.6' }}>{movie.plot}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Genre</span>
              <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.92rem' }}>{movie.genre}</span>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Director</span>
              <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.92rem' }}>{movie.director}</span>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>Cast</span>
              <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.92rem' }}>{movie.actors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
