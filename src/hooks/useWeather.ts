import { useQuery } from "@tanstack/react-query";

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

const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const latStr = latitude.toString();
  const lonStr = longitude.toString();
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latStr}&longitude=${lonStr}&current_weather=true&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&forecast_days=7&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = (await response.json()) as WeatherData;
  return data;
};

export const useWeather = (latitude: number | null, longitude: number | null) => {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error("Coordinates are required");
      }
      return fetchWeather(latitude, longitude);
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};
