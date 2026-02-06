import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useRef } from "react";
import { SearchBarView } from "./SearchBar";
import type { LocationSearchResult } from "../../../stores";

const meta: Meta<typeof SearchBarView> = {
  title: "Organisms/SearchBar",
  component: SearchBarView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSearchResults: LocationSearchResult[] = [
  {
    id: 1,
    name: "New York",
    latitude: 40.7128,
    longitude: -74.006,
    country: "United States",
    admin1: "New York",
  },
  {
    id: 2,
    name: "Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
    country: "United States",
    admin1: "California",
  },
  {
    id: 3,
    name: "Chicago",
    latitude: 41.8781,
    longitude: -87.6298,
    country: "United States",
    admin1: "Illinois",
  },
];

const InteractiveWrapper = (args: Story["args"]) => {
  const [searchQuery, setSearchQuery] = useState(args?.query ?? "");
  const [selectedLocationName, setSelectedLocationName] = useState<
    string | null
  >(args?.selectedLocationName ?? null);
  const [isFocused, setIsFocused] = useState(true);
  const resultsContainerRef = useRef<HTMLUListElement | null>(null);

  return (
    <SearchBarView
      query={searchQuery}
      onChange={setSearchQuery}
      results={args?.results ?? null}
      loading={args?.loading ?? false}
      success={args?.success ?? false}
      selectedLocationName={selectedLocationName}
      onLocationSelect={(location) => {
        setSelectedLocationName(location.name);
        setSearchQuery(location.name);
      }}
      isFocused={isFocused}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      resultsContainerRef={resultsContainerRef}
    />
  );
};

export const Default: Story = {
  args: {
    query: "",
    onChange: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    results: null,
    loading: false,
    success: false,
    selectedLocationName: null,
    onLocationSelect: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  },
  render: InteractiveWrapper,
};

export const WithQuery: Story = {
  args: {
    query: "New",
    results: mockSearchResults,
    loading: false,
    success: true,
    selectedLocationName: null,
  },
  render: InteractiveWrapper,
};

export const Loading: Story = {
  args: {
    query: "New York",
    results: null,
    loading: true,
    success: false,
    selectedLocationName: null,
  },
  render: InteractiveWrapper,
};

export const WithSelectedLocation: Story = {
  args: {
    query: "New York",
    results: mockSearchResults,
    loading: false,
    success: true,
    selectedLocationName: "New York",
  },
  render: InteractiveWrapper,
};

export const NoResults: Story = {
  args: {
    query: "InvalidCityName12345",
    results: [],
    loading: false,
    success: true,
    selectedLocationName: null,
  },
  render: InteractiveWrapper,
};
