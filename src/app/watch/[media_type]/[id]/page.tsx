import { Suspense } from 'react';

import Image from 'next/image';

import type {
  MovieDetails,
  TVShowDetails,
  VideoDetails,
} from '@/types/tmdb-types';

import CastSection from '@/components/media/cast-section';
import MediaDetails from '@/components/media/media-details';
import VideoSection from '@/components/media/video-section';
import ImageComponent from '@/components/shared/image';

import { fetchTMDBData } from '@/lib/tmdb';

function VideoSectionSkeleton() {
  return (
    <div className="aspect-video w-full animate-pulse rounded-xl bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  );
}

function MediaDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-2/3 animate-pulse rounded-lg bg-muted" />
      <div className="flex flex-wrap gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-6 w-20 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full max-w-3xl animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

function CastSectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[2/3] animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ media_type: string; id: string }>;
}

export default async function MediaPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <div className="relative min-h-screen w-full">
      {resolvedParams.media_type === 'movie' ? (
        <Suspense fallback={<MediaContentSkeleton />}>
          <MovieContent id={resolvedParams.id} />
        </Suspense>
      ) : resolvedParams.media_type === 'tv' ? (
        <Suspense fallback={<MediaContentSkeleton />}>
          <TVContent id={resolvedParams.id} />
        </Suspense>
      ) : (
        <div>Invalid media type</div>
      )}
    </div>
  );
}

function MediaContentSkeleton() {
  return (
    <>
      {/* Backdrop Skeleton */}
      <div className="absolute inset-0 h-full w-full animate-pulse bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content Skeleton */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-col gap-10 px-4 py-8">
        <div className="flex flex-col gap-4">
          <VideoSectionSkeleton />
          <MediaDetailsSkeleton />
        </div>
        <CastSectionSkeleton />
      </div>
    </>
  );
}

async function MovieContent({ id }: { id: string }) {
  const [details, videos, credits] = await Promise.all([
    fetchTMDBData(`/movie/${id}?language=en-US`) as Promise<MovieDetails>,
    fetchTMDBData(
      `/movie/${id}/videos?language=en-US`
    ) as Promise<VideoDetails>,
    fetchTMDBData(`/movie/${id}/credits?language=en-US`),
  ]);

  return (
    <MediaContent
      details={details}
      videos={videos}
      credits={credits}
      type="movie"
    />
  );
}

async function TVContent({ id }: { id: string }) {
  const [details, videos, credits] = await Promise.all([
    fetchTMDBData(`/tv/${id}?language=en-US`) as Promise<TVShowDetails>,
    fetchTMDBData(`/tv/${id}/videos?language=en-US`) as Promise<VideoDetails>,
    fetchTMDBData(`/tv/${id}/credits?language=en-US`),
  ]);

  return (
    <MediaContent
      details={details}
      videos={videos}
      credits={credits}
      type="tv"
    />
  );
}

function MediaContent({
  details,
  videos,
  credits,
  type,
}: {
  details: MovieDetails | TVShowDetails;
  videos: VideoDetails;
  credits: any;
  type: 'movie' | 'tv';
}) {
  const backdropPath = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 h-full w-full">
        <ImageComponent
          src={backdropPath}
          alt="Backdrop"
          width={1920}
          height={1080}
          className="h-screen object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-col gap-10 px-4 py-8">
        {/* Main Content */}
        <div className="flex flex-col gap-4">
          <Suspense fallback={<VideoSectionSkeleton />}>
            <VideoSection videos={videos} />
          </Suspense>
          <Suspense fallback={<MediaDetailsSkeleton />}>
            <MediaDetails details={details} type={type} />
          </Suspense>
        </div>

        {/* Cast Section */}
        <Suspense fallback={<CastSectionSkeleton />}>
          <CastSection cast={credits.cast} crew={credits.crew} />
        </Suspense>
      </div>
    </>
  );
}
