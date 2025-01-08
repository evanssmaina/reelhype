'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import FirstAnimation from './first-animation';

export default function AnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust duration as needed (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FirstAnimation />;
  }

  return <>{children}</>;
}
