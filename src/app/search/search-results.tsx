'use client';

import { SearchResults as SearchResultsTypes } from '@/types/tmdb-types';
import { Card, CardBody, Pagination } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import { AnimatedGroup } from '@/components/ui/animated-group';

interface SearchResultsProps {
  results: SearchResultsTypes;
  query: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SearchResults({
  results,
  query,
  currentPage,
  onPageChange,
}: SearchResultsProps) {
  if (!results) {
    return (
      <div className="text-center text-gray-500">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AnimatedGroup
        preset="slide"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {results?.results.map((result) => {
          return (
            <LinkComponent
              key={result.id}
              href={
                result.media_type === 'person'
                  ? `/person/${result.id}`
                  : `/watch/${result.media_type}/${result.id}`
              }
            >
              <Card className="group h-full overflow-hidden">
                <CardBody className="p-0">
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    {result.poster_path || result.profile_path ? (
                      <ImageComponent
                        src={
                          result.media_type === 'person'
                            ? (result.profile_path ?? '')
                            : (result.poster_path ?? '')
                        }
                        alt={result.title || result.name || ''}
                        width={500}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/10">
                        <span className="text-lg">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {result.title || result.name || ''}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {result.media_type}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </LinkComponent>
          );
        })}
      </AnimatedGroup>

      <div className="flex justify-center">
        <Pagination
          total={Math.min(results.total_pages, 500)}
          page={currentPage}
          variant="light"
          showControls
          onChange={onPageChange}
          classNames={{
            wrapper: 'gap-2',
            item: 'w-8 h-8',
          }}
        />
      </div>
    </div>
  );
}
