import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';

interface VideoPlayer {
  title?: string;
  src: string;
}

export default function VideoPlayer({ src, title }: VideoPlayer) {
  return (
    <MediaPlayer title={title} autoPlay={true} src={src} playsInline>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
