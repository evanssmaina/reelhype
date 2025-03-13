'use client';

import { useState } from 'react';

interface SearchFormProps {
  handleSearch: (query: string) => void;
}

export default function SearchForm({ handleSearch }: SearchFormProps) {
  const [searchInputQuery, setSearchInputQuery] = useState('');
  return (
    <div className="w-full">
      <input
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
