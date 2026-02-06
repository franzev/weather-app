import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Units, UnitSystem } from "../utils";

const defaultUnits: Units = {
  system: "metric",
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

interface UnitsStore {
  units: Units;
  setUnitSystem: (system: UnitSystem) => void;
  setTemperatureUnit: (unit: Units["temperature"]) => void;
  setWindUnit: (unit: Units["wind"]) => void;
  setPrecipitationUnit: (unit: Units["precipitation"]) => void;
}

export const useUnitsStore = create<UnitsStore>()(
  persist(
    (set) => ({
      units: defaultUnits,
      setUnitSystem: (system) => {
        if (system === "metric") {
          set({
            units: {
              system: "metric",
              temperature: "celsius",
              wind: "kmh",
              precipitation: "mm",
            },
          });
          return;
        }

        set({
          units: {
            system: "imperial",
            temperature: "fahrenheit",
            wind: "mph",
            precipitation: "in",
          },
        });
      },
      setTemperatureUnit: (unit) =>
        set((state) => ({
          units: { ...state.units, temperature: unit },
        })),
      setWindUnit: (unit) =>
        set((state) => ({
          units: { ...state.units, wind: unit },
        })),
      setPrecipitationUnit: (unit) =>
        set((state) => ({
          units: { ...state.units, precipitation: unit },
        })),
    }),
    {
      name: "weather-app-units",
    }
  )
);
