import { fetchPopularMovies } from '@/src/api/tmdb';
import HomeClient from '@/src/components/HomeClient';

export default async function HomePage() {
  const initialData = await fetchPopularMovies(1);
  const initialMovies = initialData?.results || [];

  return <HomeClient initialMovies={initialMovies} />;
}