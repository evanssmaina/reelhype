import { NextResponse } from 'next/server';

import { fetchTMDBData } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const showId = searchParams.get('showId');
  const seasonNumber = searchParams.get('seasonNumber');

  if (!showId || !seasonNumber) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const videos = await fetchTMDBData(
      `/tv/${showId}/season/${seasonNumber}/videos?language=en-US`
    );
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching season videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
