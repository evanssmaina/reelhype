import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

const TMDB_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTY3NDQ0N2MxOTI1M2FlZWVkYmEzNDVhZDVmNmYyMSIsIm5iZiI6MTcyOTg4MjQwNC4yNDY3MzMsInN1YiI6IjY1ODU1MDNkMDFiMWNhNWY1NzkwMjI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wQ_pcfCNTTb1ALpjlLOWw3DSpUS9k37mRhXWzh0DGo8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDBData(endpoint: string) {
  'use cache';
  try {
    cacheTag(`tmdb-${endpoint}`);
    cacheLife('tmdbDaily');
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching TMDB data:', error);
    throw error;
  }
}
