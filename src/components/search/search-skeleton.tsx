import { Skeleton } from '@/components/ui/skeleton';

export function SearchSkeleton() {
  return (
    <Skeleton className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] rounded-l" />
      ))}
    </Skeleton>
  );
}
