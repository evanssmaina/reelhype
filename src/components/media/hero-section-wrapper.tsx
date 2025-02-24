'use client';

import { useEffect, useState } from 'react';

import { TrendingAll } from '@/types/tmdb-types';

import { HeroSection } from './hero-section';

interface HeroSectionWrapperProps {
  trendingData: TrendingAll['results'][number][];
}

export default function HeroSectionWrapper({
  trendingData,
}: HeroSectionWrapperProps) {
  const [randomBackdrop, setRandomBackdrop] = useState<any>(null);

  useEffect(() => {
    const selected =
      trendingData[Math.floor(Math.random() * trendingData.length)];
    setRandomBackdrop(selected);
  }, [trendingData]);

  if (!randomBackdrop) return null;

  const backdropPath = `https://image.tmdb.org/t/p/original${randomBackdrop.backdrop_path}`;
  const releaseDate =
    randomBackdrop.release_date || randomBackdrop.first_air_date;
  const mediaType = randomBackdrop.media_type === 'movie' ? 'movie' : 'tv';

  return (
    <HeroSection
      backdropPath={backdropPath}
      title={randomBackdrop.title || randomBackdrop.name}
      overview={randomBackdrop.overview}
      releaseDate={releaseDate}
      mediaType={mediaType}
      id={randomBackdrop.id}
    />
  );
}
