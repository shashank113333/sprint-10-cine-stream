import { Loader2, Film } from 'lucide-react';

export default function MovieLoading() {
  return (
    <div className="main-viewport" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(229, 9, 20, 0.15)',
          border: '1px solid rgba(229, 9, 20, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e50914',
          marginBottom: '20px',
          boxShadow: '0 0 30px rgba(229, 9, 20, 0.3)',
        }}
      >
        <Loader2 size={36} className="animate-spin" />
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
        Loading Movie Details...
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        Fetching server-rendered data and metadata from OMDb...
      </p>
    </div>
  );
}
