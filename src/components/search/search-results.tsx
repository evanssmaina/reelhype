'use client';

import { use, useCallback, useMemo } from 'react';
import { Suspense } from 'react';

import { getSearchResults } from '@/server/tmdb';
import { getTrendingAll } from '@/server/tmdb';
import type { SearchResults, TrendingAll } from '@/types/tmdb-types';
import { Pagination } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/searchParams';
import { AnimatedGroup } from '@/components/ui/animated-group';

import { SearchResultCard } from './search-result-card';
import { SearchSkeleton } from './search-skeleton';

interface SearchResultsProps {
  trendingAllPromise: Promise<TrendingAll>;
  searchResultsPromise: Promise<SearchResults>;
}

export function SearchResults({
  searchResultsPromise,
  trendingAllPromise,
}: SearchResultsProps) {
  const [{ q, page }, setQueryParams] = useQueryStates(searchParams, {
    shallow: false,
  });

  const searchResults = use(searchResultsPromise);
  const trendingAll = use(trendingAllPromise);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const simpPage = newPage - 1;
      setQueryParams({ q, page: simpPage });
    },
    [q]
  );

  const totalPages = useMemo(
    () => Math.min(searchResults.total_pages, 500),
    [searchResults.total_pages]
  );

  return (
    <div>
      {q ? (
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
              No results found for "{q}"
            </div>
          )}
        </>
      ) : (
        <Suspense fallback={<SearchSkeleton />}>
          <AnimatedGroup
            preset="slide"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {trendingAll?.results.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </AnimatedGroup>
        </Suspense>
      )}
    </div>
  );
}
