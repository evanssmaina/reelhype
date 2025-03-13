import type { Metadata } from 'next';

import { getSearchResults, getTrendingMovies } from '@/server/tmdb';
import { SearchParams } from 'nuqs';

import { searchParamsCache } from '@/components/searchParams';

import { SearchUI } from './search-ui';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParamsCache.parse(searchParams);
  const [trendingMovies, searchResults] = await Promise.all([
    getTrendingMovies(),
    getSearchResults({ query: q, page }),
  ]);

  const { movies } = trendingMovies;
  const { searchResults: results } = searchResults;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium">Search</h1>
      </div>

      <SearchUI searchResults={results} trendingMovies={movies} />
    </main>
  );
}
