'use client';

import { useState } from 'react';

import { useQueryStates } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

import { searchParams } from '@/components/searchParams';

export function Search() {
  const [searchInputQuery, setSearchInputQuery] = useState('');
  const [_, setQueryParams] = useQueryStates(searchParams, {
    shallow: false,
  });

  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    setQueryParams({ q: searchQuery, page: 0 });
  }, 500);

  return (
    <div className="w-full">
      <input
        type="text"
        value={searchInputQuery}
        onChange={({ target }) => {
          setSearchInputQuery(target.value);
          handleSearch(target.value);
        }}
        placeholder="Search for movies, TV shows, people..."
        className="h-[60px] w-full rounded-2xl border border-gray-600 px-4 transition-all duration-300 focus:border-primary"
      />
    </div>
  );
}
