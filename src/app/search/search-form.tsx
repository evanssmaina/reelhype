'use client';

import React from 'react';

import { Input } from '@nextui-org/react';

import { SearchIcon } from '@/components/ui/search';

interface SearchFormProps {
  initialQuery: string;
  onSearch: (value: string) => void;
}

export default function SearchForm({
  initialQuery,
  onSearch,
}: SearchFormProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-4xl font-bold">Search</h1>
      <div className="w-full max-w-xl">
        <Input
          value={initialQuery}
          onValueChange={onSearch}
          placeholder="Search for movies, TV shows, people..."
          startContent={<SearchIcon />}
          size="lg"
          classNames={{
            input: 'text-lg',
            inputWrapper: 'h-12',
          }}
        />
      </div>
    </div>
  );
}
