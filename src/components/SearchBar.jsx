"use client";

import { Search, X } from 'lucide-react';

export const SearchBar = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder = 'Search movies (e.g. Batman)...' 
}) => {
  return (
    <div style={{ maxWidth: '650px', margin: '0 auto 32px', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#141922',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          padding: '8px 12px',
        }}
      >
        <Search size={18} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />

        <input
          type="text"
          id="movie-search-input"
          name="search"
          aria-label="Search movies or TV shows"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            minWidth: 0, 
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '0.92rem',
            outline: 'none',
          }}
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search input"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginLeft: '6px',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};