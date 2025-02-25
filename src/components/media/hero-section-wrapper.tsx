'use client';

import { useMemo } from 'react';

import { TrendingAll } from '@/types/tmdb-types';

import { HeroSection } from './hero-section';

interface HeroSectionWrapperProps {
  trendingData: TrendingAll['results'][number][];
}

export default function HeroSectionWrapper({
  trendingData,
}: HeroSectionWrapperProps) {
  const randomBackdrop = useMemo<TrendingAll['results'][number] | null>(() => {
    if (trendingData.length === 0) return null;
    return trendingData[Math.floor(Math.random() * trendingData.length)];
  }, [trendingData]);

  if (!randomBackdrop) return null;

  const backdropPath = randomBackdrop.backdrop_path;
  const releaseDate =
    randomBackdrop.release_date || randomBackdrop.first_air_date;
  const mediaType = randomBackdrop.media_type === 'movie' ? 'movie' : 'tv';

  return (
    <HeroSection
      backdropPath={backdropPath ?? ''}
      title={randomBackdrop.title || randomBackdrop.name || ''}
      overview={randomBackdrop.overview || ''}
      releaseDate={releaseDate ?? ''}
      mediaType={mediaType}
      id={randomBackdrop.id}
    />
  );
}
