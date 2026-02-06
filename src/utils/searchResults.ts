import type { LocationSearchResult } from "../stores";

export const isActivelySearching = (
  query: string,
  selectedLocationName: string | null,
): boolean => query.trim().length > 0 && query !== selectedLocationName;

export const shouldShowResults = (
  isFocused: boolean,
  isSearching: boolean,
  results: LocationSearchResult[] | null | undefined,
  query: string,
  selectedLocationName: string | null,
): boolean =>
  isFocused &&
  isSearching &&
  Boolean(results?.length) &&
  query !== selectedLocationName;

export const shouldShowNoResults = (
  isFocused: boolean,
  isSearching: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  query: string,
  results: LocationSearchResult[] | null | undefined,
  selectedLocationName: string | null,
): boolean =>
  isFocused &&
  isSearching &&
  !isLoading &&
  isSuccess &&
  Boolean(query) &&
  (results === undefined || results?.length === 0) &&
  query !== selectedLocationName;

export const formatLocationDetails = (
  admin1: string | undefined,
  country: string,
): string => `${admin1 ? `${admin1}, ` : ""}${country}`;
