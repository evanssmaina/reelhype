'use client';

import { Movies } from '@/types/tmdb-types';
import { CardBody } from '@nextui-org/react';
import { Card } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import { AnimatedGroup } from '@/components/ui/animated-group';

export function TrendingMovies({
  results,
}: {
  results: Movies['results'][number][];
}) {
  return (
    <AnimatedGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {results?.map((result) => {
        return (
          <LinkComponent
            key={result.id}
            href={`/watch/${result.media_type}/${result.id}`}
          >
            <Card className="group h-full overflow-hidden">
              <CardBody className="p-0">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  {result.poster_path ? (
                    <ImageComponent
                      src={result.poster_path ?? ''}
                      alt={result.title || ''}
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
                    {result.title || ''}
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
  );
}
