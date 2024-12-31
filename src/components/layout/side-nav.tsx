'use client';

import { usePathname } from 'next/navigation';

import { Home, Menu, Search, User } from 'lucide-react';

import LinkComponent from '@/components/shared/link';
import { ClapIcon } from '@/components/ui/clap';

import { cn } from '@/lib/utils';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 hidden h-screen w-[76px] flex-col items-center justify-between bg-background py-4 md:flex">
      {/* Top - Logo */}
      <div>
        <LinkComponent href="/">
          <ClapIcon />
        </LinkComponent>
      </div>

      {/* Middle - Main Navigation */}
      <div className="flex flex-col items-center gap-4">
        <LinkComponent href="/">
          <div
            className={cn(
              'my-4 flex h-[48px] w-[60px] items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent',
              pathname === '/' && 'bg-accent'
            )}
          >
            <Home
              className="h-6 w-6"
              fill={pathname === '/' ? 'white' : 'none'}
            />
          </div>
        </LinkComponent>
        <LinkComponent href="/search">
          <div
            className={cn(
              'my-4 flex h-[48px] w-[60px] items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent',
              pathname === '/search' && 'bg-accent'
            )}
          >
            <Search
              className="h-6 w-6"
              fill={pathname === '/search' ? 'white' : 'none'}
            />
          </div>
        </LinkComponent>
        <LinkComponent href="/profile">
          <div
            className={cn(
              'my-4 flex h-[48px] w-[60px] items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent',
              pathname === '/profile' && 'bg-accent'
            )}
          >
            <User
              className="h-6 w-6"
              fill={pathname === '/profile' ? 'white' : 'none'}
            />
          </div>
        </LinkComponent>
      </div>

      {/* Bottom - Additional Icons */}
      <div className="flex flex-col items-center gap-4">
        <div className="my-4 flex h-[48px] w-[60px] cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent">
          <Menu className="h-6 w-6" />
        </div>
      </div>
    </nav>
  );
}
