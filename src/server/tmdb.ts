import {
  Movies,
  SearchResults,
  TVShows,
  TrendingAll,
} from '@/types/tmdb-types';

import { fetchTMDBData } from '@/lib/tmdb';

async function getTrendingMovies() {
  const data: Movies = await fetchTMDBData(
    '/trending/movie/day?language=en-US'
  );
  const movies = data.results.map((movie) => ({
    ...movie,
    poster_path: movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : null,
    backdrop_path: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
  }));

  return { movies };
}

async function getTrendingTvShows() {
  const data: TVShows = await fetchTMDBData('/trending/tv/day?language=en-US');
  const tvShows = data.results.map((tv) => ({
    ...tv,
    poster_path: tv.poster_path
      ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
      : null,
    backdrop_path: tv.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
      : null,
  }));

  return { tvShows };
}

async function getTrendingAll() {
  const data: TrendingAll = await fetchTMDBData(
    '/trending/all/day?language=en-US'
  );

  const trendingAll = data.results.map((trending) => ({
    ...trending,
    poster_path: trending.poster_path
      ? `https://image.tmdb.org/t/p/original${trending.poster_path}`
      : null,
    backdrop_path: trending.backdrop_path
      ? `https://image.tmdb.org/t/p/original${trending.backdrop_path}`
      : null,
  }));

  return {
    trendingAll,
  };
}

async function getSearchResults({
  query,
  page,
  include_adult = false,
  language = 'en-US',
}: {
  query: string;
  page: number;
  include_adult?: boolean;
  language?: string;
}) {
  const data: SearchResults = await fetchTMDBData(
    `/search/multi?include_adult=${include_adult}&language=${language}&page=${page}&query=${encodeURIComponent(
      query
    )}`
  );

  const results = data.results.map((item) => ({
    ...item,
    poster_path: item.poster_path
      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
      : null,
    backdrop_path: item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : null,
    profile_path: item.profile_path
      ? `https://image.tmdb.org/t/p/original${item.profile_path}`
      : null,
  }));

  const searchResults = {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results,
  };

  return { searchResults };
}

export {
  getTrendingMovies,
  getTrendingTvShows,
  getTrendingAll,
  getSearchResults,
};
