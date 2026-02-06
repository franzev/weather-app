import { useState, useEffect } from "react";
import type { Units, UnitSystem } from "../utils";

const UNITS_STORAGE_KEY = "weather-app-units";

const defaultUnits: Units = {
  system: "metric",
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

export const useUnits = () => {
  const [units, setUnits] = useState<Units>(() => {
    const stored = localStorage.getItem(UNITS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Units;
      } catch {
        return defaultUnits;
      }
    }
    return defaultUnits;
  });

  useEffect(() => {
    localStorage.setItem(UNITS_STORAGE_KEY, JSON.stringify(units));
  }, [units]);

  const setUnitSystem = (system: UnitSystem) => {
    if (system === "metric") {
      setUnits({
        system: "metric",
        temperature: "celsius",
        wind: "kmh",
        precipitation: "mm",
      });
      return;
    }
    setUnits({
      system: "imperial",
      temperature: "fahrenheit",
      wind: "mph",
      precipitation: "in",
    });
  };

  const setTemperatureUnit = (unit: Units["temperature"]) => {
    setUnits((prev) => ({ ...prev, temperature: unit }));
  };

  const setWindUnit = (unit: Units["wind"]) => {
    setUnits((prev) => ({ ...prev, wind: unit }));
  };

  const setPrecipitationUnit = (unit: Units["precipitation"]) => {
    setUnits((prev) => ({ ...prev, precipitation: unit }));
  };

  return {
    units,
    setUnitSystem,
    setTemperatureUnit,
    setWindUnit,
    setPrecipitationUnit,
  };
};
