// Weather utilities
export {
  getHourlyStartIndex,
  getWeatherError,
  formatTime12Hour,
  formatDayNames,
  createCurrentWeatherInfo,
} from "./weather";

export type { WeatherData, CurrentWeatherInfo, WeatherStatsData } from "./weather";

// Unit conversion and formatting utilities
export {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  kmhToMph,
  mphToKmh,
  mmToInches,
  inchesToMm,
  formatTemperature,
  formatWindSpeed,
  formatPrecipitation,
} from "./units";

export type {
  UnitSystem,
  TemperatureUnit,
  WindUnit,
  PrecipitationUnit,
  Units,
} from "./units";

// Search results utilities
export {
  isActivelySearching,
  shouldShowResults,
  shouldShowNoResults,
  formatLocationDetails,
} from "./searchResults";

// Weather icon utilities
export { getWeatherIcon, getWeatherAltText } from "./weatherIcons";
