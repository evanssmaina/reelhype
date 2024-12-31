'use client';

import { VideoDetails } from '@/types/tmdb-types';
import { Card, CardBody } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface VideoListProps {
  videos: VideoDetails['results'];
  onVideoSelect: (video: VideoDetails['results'][0]) => void;
  currentVideoId?: string;
}

export default function VideoList({
  videos,
  onVideoSelect,
  currentVideoId,
}: VideoListProps) {
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            isPressable
            onPress={() => onVideoSelect(video)}
            className={cn(
              'w-full border transition-colors hover:bg-accent/50',
              currentVideoId === video.id
                ? 'border-primary bg-primary/10'
                : 'border-border/50 bg-background/50'
            )}
          >
            <CardBody className="flex flex-row items-center gap-3 p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="flex w-full flex-col gap-1">
                <h3 className="line-clamp-1 font-medium">{video.name}</h3>
                <p className="line-clamp-1 text-sm text-foreground/60">
                  {video.type} •{' '}
                  {new Date(video.published_at).toLocaleDateString()}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
