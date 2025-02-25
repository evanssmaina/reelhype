import {
  createLoader,
  createSearchParamsCache,
  parseAsIndex,
  parseAsString,
} from 'nuqs/server';

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParams = {
  q: parseAsString.withDefault(''),
  page: parseAsIndex.withDefault(0),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
