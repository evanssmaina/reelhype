import { Inter, Urbanist } from 'next/font/google';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
  preload: true,
});

const urbanist = Urbanist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-urbanist',
  preload: true,
});

export { inter, urbanist };
