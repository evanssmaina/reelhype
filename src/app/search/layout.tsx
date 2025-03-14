import { Search } from '../../components/search/search';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium">Search</h1>
        <Search />
      </div>
      {children}
    </main>
  );
}
