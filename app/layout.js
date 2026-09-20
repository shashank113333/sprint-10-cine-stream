import './globals.css';
import { Navbar } from '@/src/components/Navbar';
import { ReduxProvider } from '@/src/store/Providers';

export const metadata = {
  metadataBase: new URL('https://sprint-10-cine-stream.vercel.app'),
  title: {
    default: 'Cine-Stream | Next.js 15 Redux Movie Discovery SPA',
    template: '%s | Cine-Stream',
  },
  description: 'Engineered with Next.js 15 App Router, Redux Toolkit, and Server-Side Rendering.',
  keywords: ['Movies', 'Next.js 15', 'Cine-Stream', 'Redux Toolkit', 'SSR', 'TMDB'],
  authors: [{ name: 'Shashank Vishwakarma' }],
  creator: 'Shashank Vishwakarma',
  publisher: 'Cine-Stream',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sprint-10-cine-stream.vercel.app',
    title: 'Cine-Stream | Redux Movie Discovery SPA',
    description: 'Explore trending movies, filter by genre and rating, and manage your favorites with Redux Toolkit.',
    siteName: 'Cine-Stream',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cine-Stream | Redux Movie Discovery SPA',
    description: 'Explore trending movies, filter by genre and rating, and manage your favorites with Redux Toolkit.',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <footer
              style={{
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(5, 7, 13, 0.9)',
                padding: '24px 20px',
                textAlign: 'center',
                marginTop: '40px',
              }}
            >
              <p style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '4px' }}>
                CINE<span style={{ color: '#e50914' }}>STREAM</span> — Next.js 15 Redux Architecture
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                Engineered by <strong style={{ color: '#ffffff' }}>Shashank Vishwakarma</strong>
              </p>
            </footer>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}