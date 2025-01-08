'use client';

import { useEffect, useState } from 'react';

import { MovieDetails, TVShowDetails, VideoDetails } from '@/types/tmdb-types';
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from '@nextui-org/react';

import { ScrollArea } from '@/components/ui/scroll-area';

import VideoList from './video-list';
import VideoPlayer from './video-player';

interface VideoSectionProps {
  videos: VideoDetails;
  type: 'movie' | 'tv';
  details: MovieDetails | TVShowDetails;
}

export default function VideoSection({
  videos: initialVideos,
  type,
  details,
}: VideoSectionProps) {
  const [currentVideo, setCurrentVideo] = useState(initialVideos.results[0]);
  const [videos, setVideos] = useState(initialVideos);
  const [selectedSeason, setSelectedSeason] = useState<string>(
    type === 'tv' && 'seasons' in details
      ? details.seasons[0].season_number.toString()
      : '1'
  );
  const videoTypes = [...new Set(videos.results.map((video) => video.type))];

  useEffect(() => {
    if (type === 'tv' && 'seasons' in details) {
      const fetchSeasonVideos = async () => {
        try {
          const response = await fetch(
            `/api/tmdb/season-videos?showId=${details.id}&seasonNumber=${selectedSeason}`
          );
          const seasonVideos = (await response.json()) as VideoDetails;

          if (seasonVideos.results?.length > 0) {
            setVideos(seasonVideos);
            setCurrentVideo(seasonVideos.results[0]);
          } else {
            setVideos(initialVideos);
            setCurrentVideo(initialVideos.results[0]);
          }
        } catch (error) {
          console.error('Error fetching season videos:', error);
          setVideos(initialVideos);
          setCurrentVideo(initialVideos.results[0]);
        }
      };

      fetchSeasonVideos();
    }
  }, [selectedSeason, type, details, initialVideos]);

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
          {type === 'tv' &&
            'seasons' in details &&
            details.seasons.length > 0 && (
              <div className="mb-4">
                <Select
                  label="Season"
                  selectedKeys={[selectedSeason]}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="max-w-xs"
                >
                  {details.seasons.map((season) => (
                    <SelectItem
                      key={season.season_number.toString()}
                      value={season.season_number}
                    >
                      Season {season.season_number}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )}
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
