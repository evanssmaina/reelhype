'use client';

import { useTransition } from 'react';

import type {
  Movies,
  SearchResults as SearchResultsTypes,
} from '@/types/tmdb-types';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/searchParams';

import SearchForm from './search-form';
import SearchResults from './search-results';
import { TrendingMovies } from './trending-movies';

export function SearchWrapper({
  searchResults,
  trendingMovies,
}: {
  q: string | null;
  page: number;
  searchResults: SearchResultsTypes;
  trendingMovies: Movies['results'][number][];
}) {
  const [{ q, page }, setQueryParams] = useQueryStates(searchParams, {
    shallow: false,
    throttleMs: 1000,
  });

  if (!searchResults) {
    return (
      <div className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  const handleSearch = (searchQuery: string) => {
    setQueryParams({ q: searchQuery, page: 0 });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams({ q, page: newPage });
  };

  return (
    <div className="flex flex-col gap-8">
      <SearchForm query={q} onSearch={handleSearch} />

      {q ? (
        <SearchResults
          results={searchResults}
          query={q}
          onPageChange={handlePageChange}
          currentPage={page}
        />
      ) : (
        <TrendingMovies results={trendingMovies} />
      )}
    </div>
  );
}
