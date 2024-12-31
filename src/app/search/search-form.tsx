'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { SearchIcon } from '@/components/ui/search';

interface SearchFormProps {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}&page=1`);
    } else {
      router.push('/search');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
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
    </motion.div>
  );
}
