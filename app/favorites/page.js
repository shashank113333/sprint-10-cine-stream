"use client";

import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '@/src/store/slices/favoritesSlice';
import { MovieGrid } from '@/src/components/MovieGrid';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  
  // Redux Store se Favorites list aur Hydration status le rahe hain
  const favorites = useSelector((state) => state.favorites?.items || []);
  const isHydrated = useSelector((state) => state.favorites?.isHydrated);

  const handleToggleFavorite = (movie) => {
    dispatch(toggleFavorite(movie));
  };

  const isFavoriteCheck = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(229, 9, 20, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={22} color="#ff4d4f" fill="#ff4d4f" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Your Favorite Collection</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved in global Redux store
          </p>
        </div>
      </div>

      {!isHydrated ? (
        <p style={{ color: '#94a3b8' }}>Loading collection...</p>
      ) : favorites.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: '#141922',
            borderRadius: '16px',
            border: '1px dashed rgba(255,255,255,0.1)',
          }}
        >
          <Heart size={48} color="#64748b" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Collection is Empty</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
            Click the heart icon on any movie card to add it to your watchlist.
          </p>
          <Link
            href="/"
            style={{
              backgroundColor: '#e50914',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
            }}
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <MovieGrid
          movies={favorites}
          isLoading={false}
          isFavorite={isFavoriteCheck}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}