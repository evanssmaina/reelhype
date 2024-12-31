import Image from 'next/image';

import cloudinaryLoader from '@/config/image-loader';

interface ImageComponentProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function ImageComponent({
  src,
  width = 500,
  height,
  alt,
  className,
  priority = false,
  quality = 100,
  fill = false,
  sizes,
  style,
}: ImageComponentProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      fill={fill}
      sizes={sizes}
      style={style}
      loader={cloudinaryLoader}
    />
  );
}
