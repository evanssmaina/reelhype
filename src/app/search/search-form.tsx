'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Input } from '@nextui-org/react';

import { SearchIcon } from '@/components/ui/search';

interface SearchFormProps {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams();
    if (value) {
      params.set('q', value);
      params.set('page', '1');
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-4xl font-bold">Search</h1>
      <div className="w-full max-w-xl">
        <Input
          value={searchQuery}
          onValueChange={handleSearch}
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
