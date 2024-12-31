import Link from 'next/link';

interface LinkComponent {
  children: React.ReactNode;
  href: string;
  prefetch?: boolean;
  isExternal?: boolean;
  className?: string;
}

export default function LinkComponent({
  children,
  href,
  prefetch = true,
  isExternal = false,
  className,
}: LinkComponent) {
  if (isExternal) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={className}>
      {children}
    </Link>
  );
}
