import { Suspense } from 'react';

import type { Metadata } from 'next';

import { SearchResults } from '@/components/search/search-results';
import { SearchSkeleton } from '@/components/search/search-skeleton';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page',
};

export default async function SearchPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
