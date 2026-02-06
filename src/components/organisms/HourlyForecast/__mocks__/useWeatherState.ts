import type {
  UseWeatherStateReturn,
  DailyForecastItem,
  HourlyForecastItem,
  HourlyForecastInfo,
} from "../../../../hooks";
import { createCurrentWeatherInfo, formatTime12Hour } from "../../../../utils";

// Create sample weather data
export const createMockWeatherData = (baseDate: Date = new Date()) => {
  const dailyTimes: string[] = [];
  const dailyMax: number[] = [];
  const dailyMin: number[] = [];
  const dailyWeathercode: number[] = [];

  // Generate 7 days of data
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    dailyTimes.push(date.toISOString());
    dailyMax.push(20 + i * 2);
    dailyMin.push(10 + i);
    dailyWeathercode.push([0, 1, 3, 45, 61][i % 5]); // Mix of weather codes
  }

  // Generate hourly data (24 hours * 7 days = 168 hours)
  const hourlyTimes: string[] = [];
  const hourlyTemp: number[] = [];
  const hourlyApparentTemp: number[] = [];
  const hourlyHumidity: number[] = [];
  const hourlyPrecipitation: number[] = [];
  const hourlyWeathercode: number[] = [];

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + day);
      date.setHours(hour, 0, 0, 0);
      hourlyTimes.push(date.toISOString());

      // Temperature varies throughout the day
      const baseTemp =
        dailyMin[day] +
        (dailyMax[day] - dailyMin[day]) * Math.sin(((hour - 6) * Math.PI) / 12);
      hourlyTemp.push(Math.round(baseTemp * 10) / 10);
      hourlyApparentTemp.push(Math.round((baseTemp - 2) * 10) / 10);
      hourlyHumidity.push(60 + Math.floor(Math.random() * 30));
      hourlyPrecipitation.push(Math.random() > 0.8 ? Math.random() * 5 : 0);
      hourlyWeathercode.push([0, 1, 3, 45, 61][day % 5]);
    }
  }

  return {
    latitude: 40.7128,
    longitude: -74.006,
    current_weather: {
      temperature: 22,
      windspeed: 15,
      winddirection: 180,
      weathercode: 0,
      time: baseDate.toISOString(),
    },
    daily: {
      time: dailyTimes,
      temperature_2m_max: dailyMax,
      temperature_2m_min: dailyMin,
      weathercode: dailyWeathercode,
      precipitation_sum: [0, 2.5, 0, 0, 5.0, 0, 0],
    },
    hourly: {
      time: hourlyTimes,
      temperature_2m: hourlyTemp,
      apparent_temperature: hourlyApparentTemp,
      relativehumidity_2m: hourlyHumidity,
      precipitation: hourlyPrecipitation,
      weathercode: hourlyWeathercode,
    },
  };
};

export const createMockState = (
  selectedDayIndex = 0,
  weatherData = createMockWeatherData()
): UseWeatherStateReturn => {
  // Calculate hourlyStartIndex based on selected day
  const selectedDate = new Date(weatherData.daily.time[selectedDayIndex]);
  selectedDate.setHours(0, 0, 0, 0);

  const startIdx = weatherData.hourly.time.findIndex((time) => {
    const hourDate = new Date(time);
    hourDate.setHours(0, 0, 0, 0);
    return hourDate.getTime() === selectedDate.getTime();
  });

  const hourlyStartIndex = startIdx >= 0 ? startIdx : 0;
  const selectedLocation = {
    latitude: 40.7128,
    longitude: -74.006,
    name: "New York",
    country: "United States",
    admin1: "New York",
  };

  const dayNames = weatherData.daily.time.map((time) =>
    new Date(time).toLocaleDateString("en-US", { weekday: "long" })
  );

  const dailyForecast: DailyForecastItem[] = weatherData.daily.time.map(
    (date, index) => ({
      date,
      dayName: dayNames[index],
      weatherCode: weatherData.daily.weathercode[index],
      temperatureMax: weatherData.daily.temperature_2m_max[index],
      temperatureMin: weatherData.daily.temperature_2m_min[index],
    })
  );

  const hourlyForecast: HourlyForecastItem[] = weatherData.hourly.time
    .slice(hourlyStartIndex, hourlyStartIndex + 24)
    .map((time, idx) => ({
      time,
      formattedTime: formatTime12Hour(time),
      temperature: weatherData.hourly.temperature_2m[hourlyStartIndex + idx],
      weatherCode: weatherData.hourly.weathercode[hourlyStartIndex + idx],
    }));

  const hourlyForecastInfo: HourlyForecastInfo = {
    hourlyData: hourlyForecast,
    dayNames,
    selectedDayIndex,
    temperatureUnit: "celsius",
  };

  return {
    isLoading: false,
    error: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedDayIndex: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    retry: () => {},
    currentWeatherInfo: createCurrentWeatherInfo({
      weatherData,
      locationName: selectedLocation.name,
      country: selectedLocation.country,
      hourlyStartIndex,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    }),
    dailyForecast,
    hourlyForecastInfo,
  };
};
