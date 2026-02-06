import { useWeatherStore, type Location } from "../stores";
import { useLocationSearch } from "./useLocationSearch";
import { useSearchResults } from "./useSearchResults";

export interface UseSearchStateReturn {
  query: string;
  setSearchQuery: (query: string) => void;
  results: ReturnType<typeof useLocationSearch>["data"];
  loading: boolean;
  success: boolean;
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

export const useSearchState = (): UseSearchStateReturn => {
  const { searchQuery, selectedLocation, setSearchQuery, setSelectedLocation } =
    useWeatherStore();

  const {
    data: searchResults,
    isLoading: searchLoading,
    isSuccess: searchSuccess,
  } = useLocationSearch(searchQuery);

  const displayedSearchResults = useSearchResults(
    searchResults,
    searchQuery,
    selectedLocation,
  );

  return {
    query: searchQuery,
    setSearchQuery,
    results: displayedSearchResults,
    loading: searchLoading,
    success: searchSuccess,
    selectedLocation,
    setSelectedLocation,
  };
};
