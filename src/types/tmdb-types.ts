interface Movies {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string | null;
      id: number;
      title: string;
      original_language: string;
      original_title: string;
      overview: string;
      poster_path: string | null;
      media_type: 'movie';
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    },
  ];
  total_pages: number;
  total_results: number;
}

interface TVShows {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string | null;
      id: number;
      name: string;
      original_language: string;
      original_name: string;
      overview: string;
      poster_path: string | null;
      media_type: 'tv';
      genre_ids: number[];
      popularity: number;
      first_air_date: string;
      vote_average: number;
      vote_count: number;
      origin_country: string[];
    },
  ];
  total_pages: number;
  total_results: number;
}

interface TrendingAll {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string | null;
      id: number;
      title?: string;
      name?: string;
      original_language: string;
      original_title?: string;
      original_name?: string;
      overview: string;
      poster_path: string | null;
      media_type: 'movie' | 'tv';
      genre_ids: number[];
      popularity: number;
      release_date?: string;
      first_air_date?: string;
      video?: boolean;
      vote_average: number;
      vote_count: number;
      origin_country?: string[];
    },
  ];
}

interface SearchResults {
  page: number;
  results: {
    id: number;
    media_type: 'movie' | 'tv' | 'person';
    adult?: boolean;
    original_language?: string;
    overview?: string;
    popularity?: number;

    // Movie & TV Show specific fields
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    genre_ids?: number[];
    release_date?: string;
    first_air_date?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];

    // Person specific fields
    profile_path?: string | null;
    known_for?: {
      id: number;
      media_type: 'movie' | 'tv';
      title?: string;
      name?: string;
      original_title?: string;
      original_name?: string;
      backdrop_path?: string | null;
      poster_path?: string | null;
      genre_ids?: number[];
      release_date?: string;
      first_air_date?: string;
      vote_average?: number;
      vote_count?: number;
    }[];
  }[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Record<string, any>;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TVShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  next_episode_to_air: null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface VideoDetails {
  id: number;
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
}

export type {
  Movies,
  TVShows,
  MovieDetails,
  TVShowDetails,
  VideoDetails,
  TrendingAll,
  SearchResults,
};
