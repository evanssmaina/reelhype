'use client';

import Link from 'next/link';

import { CardBody } from '@nextui-org/react';
import { Card } from '@nextui-org/react';

import ImageComponent from '../shared/image';

export function SearchResultCard({
  result,
}: {
  result: SearchResultCardProps;
}) {
  return (
    <Link
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
            <p className="text-sm text-foreground/60">{result.media_type}</p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

interface SearchResultCardProps {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  adult?: boolean;
  original_language?: string;
  overview?: string;
  popularity?: number;

  // Movie & TV Show specific fields
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];

  // Person specific fields
  profile_path?: string | null;
  known_for?: {
    id: number;
    media_type: 'movie' | 'tv';
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    genre_ids?: number[];
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
  }[];
}
