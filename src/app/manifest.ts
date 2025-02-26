import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'reelhype – Movies Deserve More Than Just a Rating',
    short_name: 'reelhype',
    description:
      'reelhype is where movie and TV lovers come to spill the tea, drop hot takes, and argue over whether that plot twist actually made sense. Watch trailers, review films, and chat with AI that actually gets your taste in movies.',
    start_url: '/',
    display: 'standalone',
    categories: [
      'Movie reviews',
      'TV show discussions',
      'Film debates',
      'Trailer reactions',
      'AI movie chat',
      'Movie ratings',
      'Film community',
      'Reelhype',
    ],
    theme_color: '#171717',
    background_color: '#171717',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/opengraph-image.png',
        type: 'image/png',
        sizes: '1200x630',
      },
    ],
  };
}
