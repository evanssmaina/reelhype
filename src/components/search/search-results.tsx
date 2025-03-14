'use client';

import { use, useCallback, useMemo } from 'react';

import { getSearchResults } from '@/server/tmdb';
import { getTrendingAll } from '@/server/tmdb';
import { Pagination } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/searchParams';
import { AnimatedGroup } from '@/components/ui/animated-group';

import { SearchResultCard } from './search-result-card';

export function SearchResults() {
  const [{ q, page }, setQueryParams] = useQueryStates(searchParams, {
    shallow: false,
  });

  const { trendingAll } = use(getTrendingAll());
  const { searchResults } = use(getSearchResults({ query: q, page }));

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
              <AnimatedGroup
                preset="slide"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                {searchResults?.results.map((result) => (
                  <SearchResultCard result={result} />
                ))}
              </AnimatedGroup>

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
        <AnimatedGroup
          preset="slide"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {trendingAll?.map((result) => <SearchResultCard result={result} />)}
        </AnimatedGroup>
      )}
    </div>
  );
}
