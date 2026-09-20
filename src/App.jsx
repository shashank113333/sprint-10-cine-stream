import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar favoritesCount={favoritesCount} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#080a0e',
          padding: '28px 20px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <p style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>
          CINE<span style={{ color: '#ff4d4f' }}>STREAM</span> — Media Discovery SPA
        </p>
        <p style={{ color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '4px' }}>
          Engineered with ❤️ by <strong>Shashank</strong> • Sprint 08 Deliverable
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
          Optimized with IntersectionObserver Infinite Scroll, 500ms Debouncing & Gemini AI
        </p>
      </footer>
    </div>
  );
}