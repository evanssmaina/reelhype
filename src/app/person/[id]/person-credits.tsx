'use client';

import { useState } from 'react';

import { Tab, Tabs } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import { AnimatedGroup } from '@/components/ui/animated-group';

interface PersonCreditsProps {
  credits: any;
}

export default function PersonCredits({ credits }: PersonCreditsProps) {
  const [selectedTab, setSelectedTab] = useState('cast');

  // Sort credits by popularity
  const castCredits = [...(credits.cast || [])].sort(
    (a, b) => b.popularity - a.popularity
  );
  const crewCredits = [...(credits.crew || [])].sort(
    (a, b) => b.popularity - a.popularity
  );

  const renderMedia = (media: any) => {
    const title = media.title || media.name;
    const releaseDate = media.release_date || media.first_air_date;
    const mediaType = media.media_type;
    const role = media.character || media.job;

    return (
      <LinkComponent
        key={`${media.id}-${mediaType}`}
        href={`/watch/${mediaType}/${media.id}`}
      >
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-background/50 transition-colors hover:bg-accent/50">
          <div className="relative aspect-[2/3] overflow-hidden">
            {media.poster_path ? (
              <ImageComponent
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
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
          <div className="flex flex-1 flex-col gap-1 p-4">
            <h3 className="line-clamp-1 font-semibold">{title}</h3>
            {role && (
              <p className="line-clamp-1 text-sm text-foreground/60">
                as {role}
              </p>
            )}
            {releaseDate && (
              <p className="text-sm text-foreground/60">
                {new Date(releaseDate).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </LinkComponent>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        aria-label="Credits"
      >
        <Tab key="cast" title={`Acting (${castCredits.length})`}>
          <AnimatedGroup
            preset="slide"
            className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {castCredits.map(renderMedia)}
          </AnimatedGroup>
        </Tab>
        <Tab key="crew" title={`Crew (${crewCredits.length})`}>
          <AnimatedGroup
            preset="slide"
            className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {crewCredits.map(renderMedia)}
          </AnimatedGroup>
        </Tab>
      </Tabs>
    </div>
  );
}
