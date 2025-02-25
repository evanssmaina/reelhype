'use client';

interface CloudinaryImageLoaderProps {
  src: string | undefined;
  width: number | undefined;
  quality?: number | undefined;
}

export default function CloudinaryImageLoader({
  src,
  width,
  quality,
}: CloudinaryImageLoaderProps) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/drshb6sh5/image/fetch/${params.join(',')}/${src}`;
}
