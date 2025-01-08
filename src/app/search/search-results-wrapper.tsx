import { Suspense } from 'react';

import { fetchTMDBData } from '@/lib/tmdb';

import SearchResults from './search-results';

interface SearchResultsWrapperProps {
  query: string;
  page: number;
}

async function fetchSearchResults(query: string, page: number) {
  if (!query) return null;

  const data = await fetchTMDBData(
    `/search/multi?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(
      query
    )}`
  );
  return data;
}

export default function SearchResultsWrapper({
  query,
  page,
}: SearchResultsWrapperProps) {
  const data = fetchSearchResults(query, page);

  return (
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
      <SearchResults data={data} query={query} page={page} />
    </Suspense>
  );
}
