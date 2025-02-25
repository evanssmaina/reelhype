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
  title: 'Reelhype',
  description: 'Your ultimate movie and TV show companion',
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
