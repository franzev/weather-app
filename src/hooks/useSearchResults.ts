import { useEffect, useRef, useMemo } from "react";
import type { LocationSearchResult } from "../stores";

export const useSearchResults = (
  searchResults: LocationSearchResult[] | undefined,
  searchQuery: string,
  selectedLocation: { name: string } | null,
): LocationSearchResult[] | undefined => {
  const lastResultsRef = useRef<typeof searchResults>(undefined);

  useEffect(() => {
    if (searchResults?.length) {
      lastResultsRef.current = searchResults;
    }
  }, [searchResults]);

  useEffect(() => {
    if (selectedLocation) {
      lastResultsRef.current = undefined;
    }
  }, [selectedLocation]);

  return useMemo(() => {
    const isQueryMatchingSelected =
      searchQuery.trim() === selectedLocation?.name.trim();

    if (isQueryMatchingSelected) {
      return undefined;
    }

    if (searchResults?.length) {
      return searchResults;
    }

    if (searchQuery.trim().length > 0) {
      return lastResultsRef.current ?? searchResults;
    }

    return searchResults;
  }, [searchResults, searchQuery, selectedLocation]);
};
