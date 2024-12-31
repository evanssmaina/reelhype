'use client';

import { useState } from 'react';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CastSectionProps {
  cast: any[];
  crew?: any[];
}

export default function CastSection({ cast, crew = [] }: CastSectionProps) {
  const [selectedTab, setSelectedTab] = useState('cast');

  // Sort cast by order and limit to top 20 for better performance
  const mainCast = [...cast]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 20);

  // Group crew by department and sort by popularity
  const mainCrew = [...crew]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  const renderPerson = (person: any, role?: string) => (
    <LinkComponent
      key={`${person.id}-${role || person.character}`}
      href={`/person/${person.id}`}
      className="w-[160px] shrink-0"
    >
      <div className="group space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-full">
          {person.profile_path ? (
            <ImageComponent
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              width={200}
              height={200}
              className="h-full w-[160px] shrink-0 grow-0 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>
        <div className="space-y-1 text-center">
          <h3 className="line-clamp-1 font-medium transition-colors group-hover:text-primary">
            {person.name}
          </h3>
          {(person.character || role) && (
            <p className="line-clamp-1 text-sm text-foreground/60">
              {person.character || person.job}
            </p>
          )}
          {person.known_for_department && (
            <p className="text-xs text-foreground/40">
              {person.known_for_department}
            </p>
          )}
        </div>
      </div>
    </LinkComponent>
  );

  return (
    <Card className="backdrop-blur-sm backdrop-filter">
      <CardBody>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          aria-label="Cast and Crew"
        >
          <Tab
            key="cast"
            title={
              <div className="flex items-center gap-2">
                <span>Cast</span>
                <span className="rounded-full bg-default-100 px-2 py-1 text-xs">
                  {mainCast.length}
                </span>
              </div>
            }
          >
            <ScrollArea className="pb-4">
              <AnimatedGroup preset="slide" className="flex gap-4 py-4">
                {mainCast.map((member) => renderPerson(member))}
              </AnimatedGroup>
            </ScrollArea>
          </Tab>
          {crew.length > 0 && (
            <Tab
              key="crew"
              title={
                <div className="flex items-center gap-2">
                  <span>Crew</span>
                  <span className="rounded-full bg-default-100 px-2 py-1 text-xs">
                    {mainCrew.length}
                  </span>
                </div>
              }
            >
              <ScrollArea className="pb-4">
                <AnimatedGroup preset="slide" className="flex gap-4 py-4">
                  {mainCrew.map((member) => renderPerson(member, member.job))}
                </AnimatedGroup>
              </ScrollArea>
            </Tab>
          )}
        </Tabs>
      </CardBody>
    </Card>
  );
}
