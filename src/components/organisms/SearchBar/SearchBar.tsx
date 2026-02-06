import { useRef, useState, useEffect } from "react";
import { useSearchState } from "../../../hooks";
import { SearchInput } from "../../molecules";
import { SearchResultItem } from "../../molecules";
import { Button, SearchingState } from "../../atoms";
import {
  isActivelySearching,
  shouldShowResults,
  shouldShowNoResults,
  formatLocationDetails,
} from "../../../utils";
import type { Location, LocationSearchResult } from "../../../stores";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  results: LocationSearchResult[] | null | undefined;
  loading: boolean;
  success: boolean;
  selectedLocationName: string | null;
  onLocationSelect: (location: Location) => void;
}

const createLocationSelectHandler =
  (onLocationSelect: SearchBarProps["onLocationSelect"]) =>
  (result: LocationSearchResult) =>
  (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const { latitude, longitude, name, country, admin1 } = result;
    onLocationSelect({ latitude, longitude, name, country, admin1 });
  };

export const SearchBarView = ({
  query,
  onChange,
  onSearch,
  results,
  loading,
  success,
  selectedLocationName,
  onLocationSelect,
  isFocused,
  onFocus,
  onBlur,
  resultsContainerRef,
}: SearchBarProps & {
  onSearch?: () => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  resultsContainerRef: React.RefObject<HTMLUListElement | null>;
}) => {
  const isSearching = isActivelySearching(query, selectedLocationName);
  const showResults = shouldShowResults(
    isFocused,
    isSearching,
    results,
    query,
    selectedLocationName,
  );
  const showNoResults = shouldShowNoResults(
    isFocused,
    isSearching,
    loading,
    success,
    query,
    results,
    selectedLocationName,
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.inputContainer}>
          <SearchInput
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus
          />

          {loading && query && isFocused && <SearchingState />}

          {showResults && results && (
            <ul ref={resultsContainerRef} className={styles.searchResults}>
              {results.map((result: LocationSearchResult) => (
                <SearchResultItem
                  key={result.id}
                  name={result.name}
                  details={formatLocationDetails(result.admin1, result.country)}
                  onMouseDown={createLocationSelectHandler(onLocationSelect)(
                    result,
                  )}
                />
              ))}
            </ul>
          )}
        </div>

        <Button onClick={onSearch}>Search</Button>
      </div>

      {showNoResults && (
        <div className={styles.noResults}>No search result found!</div>
      )}
    </div>
  );
};

export const SearchBar = () => {
  const {
    query: searchQuery,
    setSearchQuery,
    results: searchResults,
    loading: searchLoading,
    success: searchSuccess,
    selectedLocation,
    setSelectedLocation,
  } = useSearchState();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const resultsContainerRef = useRef<HTMLUListElement | null>(null);

  // Sync input value with search query when a location is selected externally
  useEffect(() => {
    if (selectedLocation?.name && searchQuery === selectedLocation.name) {
      setInputValue(searchQuery);
    }
  }, [searchQuery, selectedLocation?.name]);

  const handleChange = (value: string) => {
    setInputValue(value);
    if (value.trim().length > 0 && !isFocused) {
      setIsFocused(true);
    }
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length > 0) {
      setSearchQuery(trimmedValue);
      setIsFocused(true);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget;

    if (
      relatedTarget instanceof Node &&
      resultsContainerRef.current?.contains(relatedTarget)
    ) {
      return;
    }

    setIsFocused(false);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setInputValue(location.name);
    setSearchQuery(location.name);
    setIsFocused(false); // Hide results after selection
  };

  return (
    <SearchBarView
      query={inputValue}
      onChange={handleChange}
      onSearch={handleSearch}
      results={searchResults ?? null}
      loading={searchLoading}
      success={searchSuccess}
      selectedLocationName={selectedLocation?.name ?? null}
      onLocationSelect={handleLocationSelect}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      resultsContainerRef={resultsContainerRef}
    />
  );
};
