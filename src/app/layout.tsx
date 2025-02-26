import type { Metadata } from 'next';

import { inter, urbanist } from '@/fonts';
import Providers from '@/providers/providers';

import AnimationWrapper from '@/components/animation/animation-wrapper';
import MobileNav from '@/components/layout/mobile-nav';
import SideNav from '@/components/layout/side-nav';
import TopMobileNav from '@/components/layout/top-mobile-nav';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - reelhype',
    default: 'reelhype – Movies Deserve More Than Just a Rating',
  },
  description:
    'reelhype is where movie and TV lovers come to spill the tea, drop hot takes, and argue over whether that plot twist actually made sense. Watch trailers, review films, and chat with AI that actually gets your taste in movies.',
  keywords: [
    'Movie reviews',
    'TV show discussions',
    'Film debates',
    'Trailer reactions',
    'AI movie chat',
    'Movie ratings',
    'Film community',
    'reelhype',
  ],
  metadataBase: new URL('https://reelhype.space'),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://reelhype.space',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          urbanist.variable,
          'min-h-screen antialiased'
        )}
      >
        <Providers>
          <AnimationWrapper>
            <TopMobileNav />
            <SideNav />
            <div className="z-10 w-full pl-0 lg:pl-20">{children}</div>
            <MobileNav />
          </AnimationWrapper>
        </Providers>
      </body>
    </html>
  );
}
