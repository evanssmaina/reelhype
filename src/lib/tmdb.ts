'use server';

const TMDB_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTY3NDQ0N2MxOTI1M2FlZWVkYmEzNDVhZDVmNmYyMSIsIm5iZiI6MTcyOTg4MjQwNC4yNDY3MzMsInN1YiI6IjY1ODU1MDNkMDFiMWNhNWY1NzkwMjI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wQ_pcfCNTTb1ALpjlLOWw3DSpUS9k37mRhXWzh0DGo8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDBData(endpoint: string) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 86400, // Cache for 24 hours
        tags: [`tmdb-${endpoint}`],
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
