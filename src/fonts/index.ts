import { Inter, Urbanist } from 'next/font/google';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

const urbanist = Urbanist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export { inter, urbanist };
