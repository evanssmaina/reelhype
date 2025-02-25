import { getSearchResults } from '@/server/tmdb';
import type { SearchParams } from 'nuqs/server';

import { loadSearchParams } from '@/components/searchParams';

import { SearchWrapper } from './search-wrapper';

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query, page } = await loadSearchParams(searchParams);
  const { searchResults } = await getSearchResults({ query, page });

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8">
      <SearchWrapper searchResults={searchResults} />
    </main>
  );
}
