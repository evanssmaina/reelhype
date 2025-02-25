'use client';

interface SearchFormProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function SearchForm({ query, onSearch }: SearchFormProps) {
  return (
    <div className="w-full">
      <input
        value={query}
        onChange={({ target }) => onSearch(target.value)}
        placeholder="Search for movies, TV shows, people..."
        className="h-[60px] w-full rounded-2xl border border-gray-600 px-4 transition-all duration-300 focus:border-primary"
      />
    </div>
  );
}
