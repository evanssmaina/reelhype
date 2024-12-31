'use client';

import { Menu } from 'lucide-react';

import { ClapIcon } from '@/components/ui/clap';

export default function TopMobileNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md md:hidden">
      <div className="w-8" /> {/* Spacer for centering */}
      <div className="flex items-center">
        <ClapIcon />
      </div>
      <div className="flex items-center">
        <button className="rounded-md p-2 hover:bg-accent">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}
