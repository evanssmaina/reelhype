'use client';

import { useState } from 'react';

import { VideoDetails } from '@/types/tmdb-types';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import { ScrollArea } from '@/components/ui/scroll-area';

import VideoList from './video-list';
import VideoPlayer from './video-player';

interface VideoSectionProps {
  videos: VideoDetails;
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [currentVideo, setCurrentVideo] = useState(videos.results[0]);
  const videoTypes = [...new Set(videos.results.map((video) => video.type))];

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      {/* Current Video Player */}
      {currentVideo && (
        <div className="relative aspect-video w-full max-w-[1200px] overflow-hidden rounded-lg bg-black/20 backdrop-blur lg:flex-1">
          <VideoPlayer
            title={currentVideo.name}
            src={`https://www.youtube.com/watch?v=${currentVideo.key}`}
          />
        </div>
      )}

      {/* Video List */}
      <Card className="w-full backdrop-blur-sm backdrop-filter lg:w-[300px] xl:w-[550px]">
        <CardBody>
          <Tabs fullWidth aria-label="Video Types">
            {videoTypes.map((videoType) => (
              <Tab key={videoType} title={videoType}>
                <ScrollArea className="h-[400px] lg:aspect-video">
                  <VideoList
                    videos={videos.results.filter(
                      (video) => video.type === videoType
                    )}
                    onVideoSelect={setCurrentVideo}
                    currentVideoId={currentVideo?.id}
                  />
                </ScrollArea>
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
