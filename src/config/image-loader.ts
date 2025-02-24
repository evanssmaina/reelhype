'use client';

interface CloudinaryImageLoader {
  src: string | undefined;
  width: number | undefined;
  quality?: number | undefined;
}

export default function cloudflareLoader({
  src,
  width,
  quality,
}: CloudinaryImageLoader) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/drshb6sh5/image/fetch/${params.join(',')}${src}`;
}
