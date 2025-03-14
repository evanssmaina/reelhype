'use client';

import { use, useCallback, useMemo } from 'react';
import { Suspense } from 'react';

import type { SearchResults, TrendingAll } from '@/types/tmdb-types';
import { Pagination } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/searchParams';
import { AnimatedGroup } from '@/components/ui/animated-group';

import { SearchResultCard } from './search-result-card';
import { SearchSkeleton } from './search-skeleton';

interface SearchResultsProps {
  trendingAll: TrendingAll | null;
  searchResults: SearchResults | null;
  query: string;
  page: number;
}

export function SearchResults({
  searchResults,
  trendingAll,
  query,
  page,
}: SearchResultsProps) {
  const [_, setQueryParams] = useQueryStates(searchParams, { shallow: false });

  const handlePageChange = useCallback(
    (newPage: number) => {
      setQueryParams({ q: query, page: newPage - 1 });
    },
    [query, setQueryParams]
  );

  const totalPages = useMemo(() => {
    if (!searchResults) return 0;
    return Math.min(searchResults.total_pages, 500);
  }, [searchResults]);

  return (
    <div>
      {query ? (
        <>
          {searchResults ? (
            <div className="flex flex-col gap-8">
              <Suspense fallback={<SearchSkeleton />}>
                <AnimatedGroup
                  preset="slide"
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                  {searchResults?.results.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </AnimatedGroup>
              </Suspense>

              <div className="flex justify-center">
                <Pagination
                  total={totalPages}
                  page={page + 1}
                  variant="light"
                  showControls
                  onChange={handlePageChange}
                  classNames={{
                    wrapper: 'gap-2',
                    item: 'w-8 h-8',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </>
      ) : (
        <AnimatedGroup
          preset="slide"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {trendingAll?.results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </AnimatedGroup>
      )}
    </div>
  );
}
