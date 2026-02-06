import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import type { LocationSearchResult } from "../stores";

interface GeocodingResponse {
  results: LocationSearchResult[];
}

const searchLocation = async (query: string): Promise<LocationSearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query,
  )}&count=5&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search for location");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results;
};

export const useLocationSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 300);
  const lastSuccessfulResultsRef = useRef<LocationSearchResult[] | undefined>(
    undefined,
  );

  const queryResult = useQuery({
    queryKey: ["locationSearch", debouncedQuery],
    queryFn: () => searchLocation(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    placeholderData: (previousData) => {
      // Use previous data if available, otherwise use last successful results
      // This keeps results visible when query key changes
      return previousData ?? lastSuccessfulResultsRef.current;
    },
  });

  // Update ref when we get successful results
  useEffect(() => {
    if (
      queryResult.data &&
      queryResult.isSuccess &&
      queryResult.data.length > 0
    ) {
      lastSuccessfulResultsRef.current = queryResult.data;
    }
  }, [queryResult.data, queryResult.isSuccess]);

  return queryResult;
};
