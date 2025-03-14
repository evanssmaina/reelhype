import { Suspense } from 'react';

import type { Metadata } from 'next';

import { getSearchResults, getTrendingAll } from '@/server/tmdb';
import { type SearchParams } from 'nuqs/server';

import { SearchResults } from '@/components/search/search-results';
import { SearchSkeleton } from '@/components/search/search-skeleton';
import { searchParams, searchParamsCache } from '@/components/searchParams';

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParamsCache.parse(searchParams);
  const trendingAll = getTrendingAll();
  const searchResults = getSearchResults({ query: q, page });
  return (
    <div className="w-full">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults
          trendingAllPromise={trendingAll as any}
          searchResultsPromise={searchResults}
        />
      </Suspense>
    </div>
  );
}
