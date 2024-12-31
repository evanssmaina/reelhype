import SearchForm from './search-form';
import SearchResultsWrapper from './search-results-wrapper';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const page = Number(resolvedParams.page) || 1;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8">
      <SearchForm initialQuery={query} />

      {/* Results Section */}
      {query && <SearchResultsWrapper query={query} page={page} />}
    </main>
  );
}
