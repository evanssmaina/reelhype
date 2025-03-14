import type { Metadata } from 'next';

import { getSearchResults, getTrendingAll } from '@/server/tmdb';
import { type SearchParams } from 'nuqs/server';

import { SearchResults } from '@/components/search/search-results';
import { searchParamsCache } from '@/components/searchParams';

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParamsCache.parse(searchParams);
  const searchResults = q
    ? await getSearchResults({ query: q, page: page || 0 })
    : null;
  const trendingAll = !q ? await getTrendingAll() : null;

  return (
    <SearchResults
      searchResults={searchResults}
      trendingAll={trendingAll as any}
      query={q}
      page={page || 0}
    />
  );
}
