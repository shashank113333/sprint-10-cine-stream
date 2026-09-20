"use client";

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cine_stream_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
    isLoaded,
  };
};