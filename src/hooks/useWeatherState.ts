import { useCallback, useEffect, useMemo, useRef } from "react";
import { useWeatherStore, useUnitsStore } from "../stores";
import { useWeather } from "./index";
import {
  getHourlyStartIndex,
  getWeatherError,
  createCurrentWeatherInfo,
  formatTime12Hour,
  formatDayNames,
  type CurrentWeatherInfo,
  type TemperatureUnit,
} from "../utils";

export interface DailyForecastItem {
  date: string;
  dayName: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
}

export interface HourlyForecastItem {
  time: string;
  formattedTime: string;
  temperature: number;
  weatherCode: number;
}

export interface HourlyForecastInfo {
  hourlyData: HourlyForecastItem[];
  dayNames: string[];
  selectedDayIndex: number;
  temperatureUnit: TemperatureUnit;
}

export interface UseWeatherStateReturn {
  isLoading: boolean;
  error: string | null;
  setSelectedDayIndex: (index: number) => void;
  retry: () => void;
  currentWeatherInfo?: CurrentWeatherInfo;
  dailyForecast: DailyForecastItem[];
  hourlyForecastInfo?: HourlyForecastInfo;
}

export const useWeatherState = (): UseWeatherStateReturn => {
  const { selectedLocation, selectedDayIndex, setSelectedDayIndex } =
    useWeatherStore();

  const latitude = selectedLocation?.latitude ?? null;
  const longitude = selectedLocation?.longitude ?? null;

  const prevCoords = useRef<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    if (
      latitude !== prevCoords.current.lat ||
      longitude !== prevCoords.current.lon
    ) {
      setSelectedDayIndex(0);
      prevCoords.current = { lat: latitude, lon: longitude };
    }
  }, [latitude, longitude, setSelectedDayIndex]);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather(latitude, longitude);

  const hourlyStartIndex = useMemo(
    () => getHourlyStartIndex(weatherData, selectedDayIndex),
    [weatherData, selectedDayIndex],
  );

  const { units } = useUnitsStore();

  const isLoading =
    latitude != null && longitude != null && weatherLoading;

  const error = getWeatherError(weatherError);

  const currentWeatherInfo = useMemo(() => {
    if (!weatherData || !selectedLocation) return undefined;

    return createCurrentWeatherInfo({
      weatherData,
      locationName: selectedLocation.name,
      country: selectedLocation.country,
      hourlyStartIndex,
      temperatureUnit: units.temperature,
      windUnit: units.wind,
      precipitationUnit: units.precipitation,
    });
  }, [weatherData, selectedLocation, hourlyStartIndex, units]);

  const dayNames = useMemo(
    () => (weatherData ? formatDayNames(weatherData.daily.time) : []),
    [weatherData],
  );

  const dailyForecast = useMemo((): DailyForecastItem[] => {
    if (!weatherData) return [];

    return weatherData.daily.time.map((date, index) => ({
      date,
      dayName: dayNames[index],
      weatherCode: weatherData.daily.weathercode[index],
      temperatureMax: weatherData.daily.temperature_2m_max[index],
      temperatureMin: weatherData.daily.temperature_2m_min[index],
    }));
  }, [weatherData, dayNames]);

  const hourlyForecast = useMemo((): HourlyForecastItem[] => {
    if (!weatherData) return [];

    return weatherData.hourly.time
      .slice(hourlyStartIndex, hourlyStartIndex + 24)
      .map((time, idx) => ({
        time,
        formattedTime: formatTime12Hour(time),
        temperature: weatherData.hourly.temperature_2m[hourlyStartIndex + idx],
        weatherCode: weatherData.hourly.weathercode[hourlyStartIndex + idx],
      }));
  }, [weatherData, hourlyStartIndex]);

  const hourlyForecastInfo: HourlyForecastInfo | undefined =
    hourlyForecast.length > 0
      ? {
          hourlyData: hourlyForecast,
          dayNames,
          selectedDayIndex,
          temperatureUnit: units.temperature,
        }
      : undefined;

  const retry = useCallback((): void => {
    void refetchWeather();
  }, [refetchWeather]);

  return {
    isLoading,
    error,
    setSelectedDayIndex,
    retry,
    currentWeatherInfo,
    dailyForecast,
    hourlyForecastInfo,
  };
};
