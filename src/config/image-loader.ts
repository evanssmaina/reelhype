'use client';

interface CloudinaryImageLoader {
  src: string | undefined;
  width: number | undefined;
  quality?: number | undefined;
}

const cloudianryName = 'drshb6sh5';

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryImageLoader) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/${cloudianryName}/image/fetch/${params.join(',')}/${src}`;
}
