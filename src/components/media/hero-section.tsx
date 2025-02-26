'use client';

import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';

import ImageComponent from '@/components/shared/image';
import LinkComponent from '@/components/shared/link';

type HeroSectionProps = {
  backdropPath: string;
  title: string;
  overview: string;
  releaseDate: string;
  mediaType: string;
  id: number;
};

export function HeroSection({
  backdropPath,
  title,
  overview,
  releaseDate,
  mediaType,
  id,
}: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[60vh] w-full lg:h-[90vh]"
    >
      <div className="absolute inset-0 h-full w-full">
        <ImageComponent
          src={backdropPath}
          alt="Backdrop"
          width={1920}
          height={1080}
          className="h-[60vh] object-cover brightness-75 lg:h-[90vh]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
            >
              {mediaType}
            </motion.span>
            {releaseDate && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground"
              >
                {new Date(releaseDate).getFullYear()}
              </motion.span>
            )}
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 line-clamp-3 max-w-2xl text-lg text-gray-300"
          >
            {overview}
          </motion.p>
          <LinkComponent href={`/watch/${mediaType}/${id}`}>
            <Button className="mt-4 rounded-full bg-white text-black hover:bg-white/90">
              Watch Trailer
            </Button>
          </LinkComponent>
        </div>
      </motion.div>
    </motion.div>
  );
}
