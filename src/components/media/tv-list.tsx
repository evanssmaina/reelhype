'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import type { TVShows } from '@/types/tmdb-types';
import { motion } from 'framer-motion';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel';

export default function TVList({ tvShows }: { tvShows: TVShows[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className="">
      <Carousel className="w-full">
        <CarouselContent className="">
          {tvShows.map((tvShow, index) => (
            <CarouselItem
              key={tvShow.id}
              className={` ${isDesktop ? 'basis-1/5' : 'basis-1/2'}`}
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div transition={{ duration: 0.2 }}>
                  <LinkComponent href={`/watch/tv/${tvShow.id}`}>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                      alt={tvShow.name}
                      width={200}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </LinkComponent>
                </motion.div>
                <motion.p
                  className="mt-2 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {tvShow.name}
                </motion.p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          className="absolute -bottom-12 left-auto right-0 top-auto w-full justify-end gap-2"
          classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
          alwaysShow
        />
      </Carousel>
    </section>
  );
}
