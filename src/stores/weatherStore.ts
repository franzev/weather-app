import { create } from "zustand";

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  admin1?: string;
}

export interface LocationSearchResult extends Location {
  id: number;
}

interface WeatherStore {
  searchQuery: string;
  selectedLocation: Location | null;
  selectedDayIndex: number;
  setSearchQuery: (query: string) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedDayIndex: (index: number) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  searchQuery: "",
  selectedLocation: null,
  selectedDayIndex: 0,
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  setSelectedLocation: (location) => {
    set({ selectedLocation: location, selectedDayIndex: 0 });
  },
  setSelectedDayIndex: (index) => {
    set({ selectedDayIndex: index });
  },
}));
