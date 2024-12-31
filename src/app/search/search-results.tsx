import { Suspense } from 'react';

import { Card, CardBody, Pagination } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import { AnimatedGroup } from '@/components/ui/animated-group';

import { fetchTMDBData } from '@/lib/tmdb';

interface SearchResultsProps {
  query: string;
  page: number;
}

async function fetchSearchResults(query: string, page: number) {
  if (!query) return null;

  const data = await fetchTMDBData(
    `/search/multi?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(
      query
    )}`
  );
  return data;
}

function getMediaImage(result: any) {
  if (!result.poster_path && !result.profile_path && !result.backdrop_path) {
    return null;
  }
  return `https://image.tmdb.org/t/p/w500${
    result.poster_path || result.profile_path || result.backdrop_path
  }`;
}

function getMediaTitle(result: any) {
  return result.title || result.name;
}

function getMediaLink(result: any) {
  if (result.media_type === 'person') {
    return `/person/${result.id}`;
  }
  return `/watch/${result.media_type}/${result.id}`;
}

export default async function SearchResults({
  query,
  page,
}: SearchResultsProps) {
  const results = await fetchSearchResults(query, page);

  if (!results || results.results.length === 0) {
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
        {results.results.map((result: any) => {
          const image = getMediaImage(result);
          const title = getMediaTitle(result);
          const link = getMediaLink(result);

          return (
            <LinkComponent key={result.id} href={link}>
              <Card className="group h-full overflow-hidden">
                <CardBody className="p-0">
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    {image ? (
                      <ImageComponent
                        src={image}
                        alt={title}
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
                      {title}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {result.media_type.charAt(0).toUpperCase() +
                        result.media_type.slice(1)}
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
          page={page}
          variant="light"
          showControls
          classNames={{
            wrapper: 'gap-2',
            item: 'w-8 h-8',
          }}
        />
      </div>
    </div>
  );
}
