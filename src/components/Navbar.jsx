"use client";

import Link from 'next/link';
import { Film, Heart, Palette } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/slices/themeSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites?.items || []);
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'dark');
  const favoritesCount = favorites.length;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" aria-label="Cine-Stream Home Page">
          <Film size={22} color="#e50914" />
          <span className="navbar-logo-text">
            CINE<span style={{ color: '#ff4d4f' }}>STREAM</span>
          </span>
        </Link>

        <nav className="navbar-nav" aria-label="Main Navigation">
          <Link
            href="/"
            aria-label="Discover Movies Home"
            className="nav-link-item"
            style={{ color: '#fff' }}
          >
            Discover
          </Link>

          <Link
            href="/favorites"
            aria-label={`Favorite Movies, ${favoritesCount} saved`}
            className="nav-link-item"
            style={{
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Heart size={15} color="#e50914" fill={favoritesCount > 0 ? '#e50914' : 'none'} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span
                style={{
                  backgroundColor: '#e50914',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  marginLeft: '2px',
                }}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
            <Palette size={16} color="#94a3b8" />
            <select
              value={currentTheme}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              aria-label="Select Application Color Theme"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '6px',
                outline: 'none',
                cursor: 'pointer',
                minHeight: '36px',
              }}
            >
              <option value="dark" style={{ background: '#0f172a' }}>🌙 Dark</option>
              <option value="light" style={{ background: '#0f172a' }}>☀️ Light</option>
              <option value="cyberpunk" style={{ background: '#0f172a' }}>⚡ Cyberpunk</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};