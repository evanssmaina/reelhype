import type { Metadata } from 'next';

import { inter, urbanist } from '@/fonts';
import NextUIProviderWrapper from '@/providers/nextui-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import AnimationWrapper from '@/components/animation/animation-wrapper';
import MobileNav from '@/components/layout/mobile-nav';
import SideNav from '@/components/layout/side-nav';
import TopMobileNav from '@/components/layout/top-mobile-nav';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'REELHYPE',
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
        <NextUIProviderWrapper>
          <AnimationWrapper>
            <NuqsAdapter>
              <TopMobileNav />
              <SideNav />
              <div className="z-10 w-full pl-0 lg:pl-20">{children}</div>
              <MobileNav />
            </NuqsAdapter>
          </AnimationWrapper>
        </NextUIProviderWrapper>
      </body>
    </html>
  );
}
