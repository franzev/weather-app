import { useCallback, useEffect, useMemo } from "react";
import { useWeatherStore, useUnitsStore } from "../stores";
import { useGeolocation, useWeather } from "./index";
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

  const {
    latitude: geoLatitude,
    longitude: geoLongitude,
    error: geoError,
    isLoading: geoLoading,
  } = useGeolocation();

  const latitude = selectedLocation?.latitude ?? geoLatitude;
  const longitude = selectedLocation?.longitude ?? geoLongitude;

  useEffect(() => {
    setSelectedDayIndex(0);
  }, [latitude, longitude]);

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
    (!selectedLocation && geoLoading) ||
    (latitude && longitude && weatherLoading);

  const error = getWeatherError(geoError, weatherError, selectedLocation);

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
    isLoading: Boolean(isLoading),
    error: error satisfies string | null,
    setSelectedDayIndex,
    retry,
    currentWeatherInfo,
    dailyForecast,
    hourlyForecastInfo,
  };
};
