'use client';

import { useCallback } from 'react';
import { Suspense } from 'react';

import type {
  Movies,
  SearchResults as SearchResultsTypes,
} from '@/types/tmdb-types';
import { useQueryStates } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

import { searchParams } from '@/components/searchParams';

import SearchForm from './search-form';
import SearchResults from './search-results';
import { TrendingMovies } from './trending-movies';

export function SearchUI({
  searchResults,
  trendingMovies,
}: {
  searchResults: SearchResultsTypes;
  trendingMovies: Movies['results'][number][];
}) {
  const [{ q, page }, setQueryParams] = useQueryStates(searchParams, {
    shallow: false,
  });

  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    setQueryParams({ q: searchQuery, page: 0 });
  }, 500);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setQueryParams({ q, page: newPage });
    },
    [q]
  );

  return (
    <div className="flex flex-col gap-8">
      <SearchForm handleSearch={handleSearch} />

      <Suspense
        fallback={
          <div className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-lg bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}
