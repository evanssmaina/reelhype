import { Suspense } from 'react';

import ImageComponent from '@/components/shared/image';

import { fetchTMDBData } from '@/lib/tmdb';

import PersonCredits from './person-credits';
import PersonDetails from './person-details';

interface PageProps {
  params: {
    id: string;
  };
}

async function fetchPersonData(id: string) {
  const [details, credits, images] = await Promise.all([
    fetchTMDBData(`/person/${id}?language=en-US`),
    fetchTMDBData(`/person/${id}/combined_credits?language=en-US`),
    fetchTMDBData(`/person/${id}/images`),
  ]);

  return { details, credits, images };
}

export default async function PersonPage({ params }: PageProps) {
  const { details, credits, images } = await fetchPersonData(params.id);
  const backdropPath =
    credits.cast?.[0]?.backdrop_path || credits.crew?.[0]?.backdrop_path;

  return (
    <div className="relative min-h-screen w-full">
      {/* Backdrop */}
      {backdropPath && (
        <div className="absolute inset-0 h-full w-full">
          <ImageComponent
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt="Backdrop"
            width={1920}
            height={1080}
            className="h-screen object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-col gap-10 px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px,1fr]">
          <Suspense
            fallback={
              <div className="h-[600px] animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            }
          >
            <PersonDetails details={details} images={images} />
          </Suspense>

          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[2/3] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
                    />
                  ))}
                </div>
              </div>
            }
          >
            <PersonCredits credits={credits} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
