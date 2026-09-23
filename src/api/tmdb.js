const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY?.trim() || 'df009f39';
const OMDB_BASE_URL = 'https://www.omdbapi.com';

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const GENRE_KEYWORD_MAP = {
  '28': 'Action',
  '35': 'Comedy',
  '18': 'Drama',
  '878': 'Sci-Fi',
  '27': 'Horror',
  '10749': 'Romance',
  '16': 'Animation',
};

export const getPosterUrl = (posterPath) => {
  if (!posterPath || posterPath === 'N/A') return null;
  if (posterPath.startsWith('http')) return posterPath;
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
};

const formatOmdbMovie = (item, genreId = null) => ({
  id: item.imdbID,
  title: item.Title,
  release_date: item.Year,
  poster_path: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
  vote_average: 8.2,
  genre_ids: genreId ? [Number(genreId)] : [28, 35, 18, 878, 27, 10749, 16],
});

const POPULAR_TOPICS = ['Marvel', 'Batman', 'Avengers', 'Spider-Man', 'Action', 'Star Wars', 'Mission'];

export const fetchPopularMovies = async (page = 1, genre = 'all', year = 'all') => {
  try {
    let topic = POPULAR_TOPICS[Math.floor((page - 1) / 4) % POPULAR_TOPICS.length];
    let activeGenreId = null;

    if (genre !== 'all' && GENRE_KEYWORD_MAP[genre]) {
      topic = GENRE_KEYWORD_MAP[genre];
      activeGenreId = genre;
    }

    const subPage = ((page - 1) % 4) + 1;
    let url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(topic)}&page=${subPage}&type=movie`;
    
    if (year !== 'all') {
      url += `&y=${encodeURIComponent(year)}`;
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data && data.Search) {
      return {
        page,
        results: data.Search.map((item) => formatOmdbMovie(item, activeGenreId)),
        total_pages: 100,
      };
    }
  } catch (err) {
    console.error('OMDb fetch error:', err);
  }

  return { page: 1, results: [], total_pages: 1 };
};

export const searchMovies = async (query, page = 1, year = 'all') => {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0, page: 1 };
  }

  try {
    let url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query.trim())}&page=${page}&type=movie`;
    
    if (year !== 'all') {
      url += `&y=${encodeURIComponent(year)}`;
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data && data.Search) {
      const total = parseInt(data.totalResults, 10) || 10;
      return {
        page,
        results: data.Search.map((item) => formatOmdbMovie(item)),
        total_pages: Math.ceil(total / 10),
      };
    }
  } catch (err) {
    console.error('OMDb search error:', err);
  }

  return { results: [], total_pages: 0, page: 1 };
};

export const fetchMovieDetails = async (id) => {
  if (!id || id === 'undefined' || id === 'null') return null;

  try {
    const url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data && data.Response !== 'False') {
      return {
        id: data.imdbID,
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        actors: data.Actors,
        plot: data.Plot,
        poster_path: data.Poster !== 'N/A' ? data.Poster : null,
        imdbRating: data.imdbRating,
        boxOffice: data.BoxOffice,
      };
    }
  } catch (err) {
    console.error('OMDb movie details error:', err);
  }

  return null;
};