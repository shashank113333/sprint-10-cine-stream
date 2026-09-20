"use client";

import { useState } from 'react';
import { Sparkles, Loader2, Film } from 'lucide-react';
import { getMovieFromMood } from '../api/gemini';

const EXAMPLE_MOODS = [
  'Feeling sad but want high-octane action',
  'Mind-bending sci-fi with space exploration',
  'Feel-good comedy to cheer me up',
  'Late night psychological thriller',
];

export const MoodMatcher = ({ onMovieDiscovered }) => {
  const [moodInput, setMoodInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastSuggested, setLastSuggested] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!moodInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setLastSuggested(null);

    try {
      const movieTitle = await getMovieFromMood(moodInput.trim());
      setLastSuggested(movieTitle);
      if (onMovieDiscovered) {
        onMovieDiscovered(movieTitle);
      }
    } catch (err) {
      console.error('Mood Matcher error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '750px',
        margin: '0 auto 36px',
        background: 'linear-gradient(135deg, rgba(20, 25, 34, 0.95), rgba(40, 20, 60, 0.95))',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>AI Mood Matcher</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Describe your vibe or feelings — Google Gemini will recommend the exact film.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <input
          type="text"
          value={moodInput}
          onChange={(e) => setMoodInput(e.target.value)}
          placeholder="e.g. I am feeling sad but want an action movie..."
          disabled={isProcessing}
          style={{
            flex: 1,
            backgroundColor: '#0c0f14',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={isProcessing || !moodInput.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 600,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing || !moodInput.trim() ? 0.6 : 1,
          }}
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Find by Vibe</span>
            </>
          )}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Try asking:</span>
        {EXAMPLE_MOODS.map((pill, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setMoodInput(pill)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '4px 12px',
              color: '#94a3b8',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            {pill}
          </button>
        ))}
      </div>

      {lastSuggested && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#4ade80',
            fontSize: '0.85rem',
          }}
        >
          <Film size={16} />
          <span>
            ✨ Gemini AI Curated For Your Mood: <strong>"{lastSuggested}"</strong>
          </span>
        </div>
      )}
    </div>
  );
};