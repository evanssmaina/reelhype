'use client';

import { MovieDetails, TVShowDetails } from '@/types/tmdb-types';
import { Card, CardBody, Chip } from '@nextui-org/react';

import ImageComponent from '@/components/shared/image';

interface MediaDetailsProps {
  details: MovieDetails | TVShowDetails;
  type: 'movie' | 'tv';
}

export default function MediaDetails({ details, type }: MediaDetailsProps) {
  const title =
    type === 'movie'
      ? (details as MovieDetails).title
      : (details as TVShowDetails).name;

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Poster */}

      {/* Details */}
      <div className="w-full md:w-3/4">
        <Card>
          <CardBody>
            <h1 className="mb-4 text-2xl font-bold">{title}</h1>
            <p className="mb-4 text-gray-600">{details.overview}</p>
            <div className="flex flex-wrap gap-2">
              {details.genres.map((genre) => (
                <Chip key={genre.id} color="primary" variant="flat">
                  {genre.name}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
