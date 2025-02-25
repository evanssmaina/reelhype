import { createLoader, parseAsIndex, parseAsString } from 'nuqs/server';

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParams = {
  query: parseAsString.withDefault(''),
  page: parseAsIndex.withDefault(0),
};

export const loadSearchParams = createLoader(searchParams);
