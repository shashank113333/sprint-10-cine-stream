"use client";

import { useState } from 'react';
import { Play, X, Film, ExternalLink } from 'lucide-react';

export const MoviePlayerModal = ({ movieTitle, movieYear }) => {
  const [isOpen, setIsOpen] = useState(false);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movieTitle} ${movieYear} official trailer`
  )}`;

  return (
    <>
      <div style={{ marginTop: '20px', marginBottom: '24px' }}>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#e50914',
            color: '#ffffff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(229, 9, 20, 0.45)',
            transition: 'all 0.2s ease',
          }}
        >
          <Play size={20} fill="#ffffff" />
          <span>Watch Trailer & Stream</span>
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              backgroundColor: '#141922',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: '#0c0f14',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                <Film size={20} color="#e50914" />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>
                  Streaming Player: {movieTitle} ({movieYear})
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                type="button"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                padding: '40px 24px',
                textAlign: 'center',
                backgroundColor: '#0c0f14',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '340px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(229, 9, 20, 0.15)',
                  border: '2px solid #e50914',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Play size={36} color="#e50914" fill="#e50914" style={{ marginLeft: '4px' }} />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Ready to Stream: {movieTitle}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '520px', marginBottom: '28px' }}>
                Click below to launch the full high-definition official trailer and stream options in a new browser player window.
              </p>

              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#e50914',
                  color: '#ffffff',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(229, 9, 20, 0.5)',
                }}
              >
                <span>Launch Official Stream Player</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
