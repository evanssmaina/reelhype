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
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `https://mpesaflow.com/cdn-cgi/image/${params.join(',')}/${src}`;
}
