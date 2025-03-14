import { Suspense } from 'react';

import {
  getTrendingAll,
  getTrendingMovies,
  getTrendingTvShows,
} from '@/server/tmdb';

import HeroSectionWrapper from '@/components/media/hero-section-wrapper';
import MovieList from '@/components/media/movie-list';
import TVList from '@/components/media/tv-list';

export default function MoviesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSectionData />
      </Suspense>

      <div className="space-y-12 py-8">
        <section>
          <Suspense fallback={<ContentSkeleton />}>
            <div className="space-y-6">
              <h2 className="ml-0 text-2xl font-bold md:text-3xl lg:ml-8">
                Trending Movies
              </h2>
              <TrendingMovies />
            </div>
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<ContentSkeleton />}>
            <div className="space-y-6">
              <h2 className="ml-0 text-2xl font-bold md:text-3xl lg:ml-8">
                Trending TV Shows
              </h2>
              <TrendingTV />
            </div>
          </Suspense>
        </section>
      </div>
    </main>
  );
}

function HeroSkeleton() {
  return (
    <div className="relative h-[60vh] w-full animate-pulse lg:h-[90vh]">
      <div className="absolute inset-0 bg-muted" />
      <div className="relative z-10 flex h-full flex-col justify-end space-y-4 p-6 md:p-12">
        <div className="h-12 w-2/3 rounded-lg bg-muted-foreground/20 md:h-16" />
        <div className="space-y-2">
          <div className="h-4 w-full max-w-2xl rounded bg-muted-foreground/20" />
          <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </div>
  );
}

async function HeroSectionData() {
  const { results: trendingAll } = await getTrendingAll();
  return <HeroSectionWrapper trendingData={trendingAll} />;
}

async function TrendingMovies() {
  const { movies } = await getTrendingMovies();

  return <MovieList movies={movies} />;
}

async function TrendingTV() {
  const { tvShows } = await getTrendingTvShows();
  return <TVList tvShows={tvShows} />;
}
