'use client';

import { usePathname } from 'next/navigation';

import { Home, Search, User } from 'lucide-react';

import LinkComponent from '@/components/shared/link';

import { cn } from '@/lib/utils';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-background/80 px-20 py-4 backdrop-blur-md md:hidden">
      <LinkComponent href="/">
        <div
          className={cn(
            'flex flex-col items-center gap-1',
            pathname === '/' && 'text-primary'
          )}
        >
          <Home
            className="h-6 w-6"
            fill={pathname === '/' ? 'currentColor' : 'none'}
          />
        </div>
      </LinkComponent>

      <LinkComponent href="/search">
        <div
          className={cn(
            'flex flex-col items-center gap-1',
            pathname === '/search' && 'text-primary'
          )}
        >
          <Search
            className="h-6 w-6"
            fill={pathname === '/search' ? 'currentColor' : 'none'}
          />
        </div>
      </LinkComponent>

      <LinkComponent href="/profile">
        <div
          className={cn(
            'flex flex-col items-center gap-1',
            pathname === '/profile' && 'text-primary'
          )}
        >
          <User
            className="h-6 w-6"
            fill={pathname === '/profile' ? 'currentColor' : 'none'}
          />
        </div>
      </LinkComponent>
    </nav>
  );
}
