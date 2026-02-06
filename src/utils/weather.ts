import type { TemperatureUnit, WindUnit, PrecipitationUnit } from "./units";

export interface WeatherData {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    precipitation_sum?: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    relativehumidity_2m: number[];
    precipitation: number[];
    weathercode: number[];
  };
}

export interface WeatherStatsData {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  temperatureUnit: TemperatureUnit;
  windUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
}

export interface CurrentWeatherInfo extends WeatherStatsData {
  locationName: string;
  date: string;
  temperature: number;
  weatherCode: number;
}

export interface CreateCurrentWeatherInfoParams {
  weatherData: WeatherData;
  locationName: string;
  country: string;
  hourlyStartIndex: number;
  temperatureUnit: TemperatureUnit;
  windUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
}

export const createCurrentWeatherInfo = ({
  weatherData,
  locationName,
  country,
  hourlyStartIndex,
  temperatureUnit,
  windUnit,
  precipitationUnit,
}: CreateCurrentWeatherInfoParams): CurrentWeatherInfo => {
  const { current_weather, hourly } = weatherData;

  const date = new Date(current_weather.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    locationName: `${locationName}, ${country}`,
    date,
    temperature: current_weather.temperature,
    weatherCode: current_weather.weathercode,
    feelsLike: hourly.apparent_temperature[hourlyStartIndex],
    humidity: hourly.relativehumidity_2m[hourlyStartIndex],
    windSpeed: current_weather.windspeed,
    precipitation: hourly.precipitation[hourlyStartIndex] || 0,
    temperatureUnit,
    windUnit,
    precipitationUnit,
  };
};

export const getHourlyStartIndex = (
  weatherData: WeatherData | undefined,
  selectedDayIndex: number
): number => {
  if (!weatherData) return 0;

  const selectedDate = new Date(weatherData.daily.time[selectedDayIndex]);
  selectedDate.setHours(0, 0, 0, 0);

  const startIdx = weatherData.hourly.time.findIndex((time) => {
    const hourDate = new Date(time);
    hourDate.setHours(0, 0, 0, 0);
    return hourDate.getTime() === selectedDate.getTime();
  });

  if (startIdx === -1) {
    const currentTime = new Date(weatherData.current_weather.time);
    const currentHourIndex = weatherData.hourly.time.findIndex((time) => {
      const hourTime = new Date(time);
      return (
        hourTime.getHours() === currentTime.getHours() &&
        hourTime.getDate() === currentTime.getDate()
      );
    });
    return currentHourIndex >= 0 ? currentHourIndex : 0;
  }

  return startIdx;
};

export const getWeatherError = (
  weatherError: Error | null,
): string | null => {
  if (weatherError) {
    return weatherError instanceof Error
      ? weatherError.message
      : "Failed to load weather data. Please try again.";
  }
  return null;
};

export const formatTime12Hour = (timeString: string): string => {
  const date = new Date(timeString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const hours = date.getHours();

  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const hour12Str = hour12.toString();
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hour12Str} ${ampm}`;
};

export const formatDayNames = (timeStrings: readonly string[]): string[] => {
  return timeStrings.map((time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });
};
