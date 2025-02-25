'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import type { SearchResults as SearchResultsTypes } from '@/types/tmdb-types';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/searchParams';

import SearchForm from './search-form';
import SearchResults from './search-results';

export function SearchWrapper({
  searchResults,
}: {
  searchResults: SearchResultsTypes;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useQueryState('q', searchParams.query);
  const [page, setPage] = useQueryState('page', searchParams.page);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on new search
    router.push(`/search?q=${value}&page=1`);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8">
      <SearchForm initialQuery={searchQuery || ''} onSearch={handleSearch} />
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
        <SearchResults
          results={searchResults}
          query={searchQuery}
          page={Number(page)}
        />
      </Suspense>
    </div>
  );
}
