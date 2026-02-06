/**
 * Maps WMO weather codes to icon filenames
 * WMO Weather Interpretation Codes (WW):
 * 0: Clear sky
 * 1: Mainly clear
 * 2: Partly cloudy
 * 3: Overcast
 * 45: Fog
 * 48: Depositing rime fog
 * 51: Light drizzle
 * 53: Moderate drizzle
 * 55: Dense drizzle
 * 61: Slight rain
 * 63: Moderate rain
 * 65: Heavy rain
 * 71: Slight snow
 * 73: Moderate snow
 * 75: Heavy snow
 * 77: Snow grains
 * 80: Slight rain showers
 * 81: Moderate rain showers
 * 82: Violent rain showers
 * 85: Slight snow showers
 * 86: Heavy snow showers
 * 95: Thunderstorm
 * 96: Thunderstorm with slight hail
 * 99: Thunderstorm with heavy hail
 */
export const getWeatherIcon = (weatherCode: number): string => {
  if (weatherCode === 0) {
    return "/images/icon-sunny.webp";
  }
  if (weatherCode === 1) {
    return "/images/icon-partly-cloudy.webp";
  }
  if (weatherCode === 2) {
    return "/images/icon-partly-cloudy.webp";
  }
  if (weatherCode === 3) {
    return "/images/icon-overcast.webp";
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return "/images/icon-fog.webp";
  }
  if (weatherCode >= 51 && weatherCode <= 55) {
    return "/images/icon-drizzle.webp";
  }
  if (weatherCode >= 61 && weatherCode <= 65) {
    return "/images/icon-rain.webp";
  }
  if (weatherCode >= 71 && weatherCode <= 77) {
    return "/images/icon-snow.webp";
  }
  if (weatherCode >= 80 && weatherCode <= 82) {
    return "/images/icon-rain.webp";
  }
  if (weatherCode >= 85 && weatherCode <= 86) {
    return "/images/icon-snow.webp";
  }
  if (weatherCode >= 95 && weatherCode <= 99) {
    return "/images/icon-storm.webp";
  }
  // Default to partly cloudy for unknown codes
  return "/images/icon-partly-cloudy.webp";
};

/**
 * Maps WMO weather codes to descriptive alt text for accessibility
 */
export const getWeatherAltText = (weatherCode: number): string => {
  if (weatherCode === 0) {
    return "Clear sky";
  }
  if (weatherCode === 1) {
    return "Mainly clear";
  }
  if (weatherCode === 2) {
    return "Partly cloudy";
  }
  if (weatherCode === 3) {
    return "Overcast";
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return "Fog";
  }
  if (weatherCode >= 51 && weatherCode <= 55) {
    return "Drizzle";
  }
  if (weatherCode >= 61 && weatherCode <= 65) {
    return "Rain";
  }
  if (weatherCode >= 71 && weatherCode <= 77) {
    return "Snow";
  }
  if (weatherCode >= 80 && weatherCode <= 82) {
    return "Rain showers";
  }
  if (weatherCode >= 85 && weatherCode <= 86) {
    return "Snow showers";
  }
  if (weatherCode >= 95 && weatherCode <= 99) {
    return "Thunderstorm";
  }
  // Default to partly cloudy for unknown codes
  return "Partly cloudy";
};
