export type UnitSystem = "metric" | "imperial";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

export interface Units {
  system: UnitSystem;
  temperature: TemperatureUnit;
  wind: WindUnit;
  precipitation: PrecipitationUnit;
}

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const kmhToMph = (kmh: number): number => {
  return kmh * 0.621371;
};

export const mphToKmh = (mph: number): number => {
  return mph * 1.60934;
};

export const mmToInches = (mm: number): number => {
  return mm * 0.0393701;
};

export const inchesToMm = (inches: number): number => {
  return inches * 25.4;
};

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const value = unit === "fahrenheit" ? celsiusToFahrenheit(temp) : temp;
  const roundedValue = Math.round(value);
  return `${roundedValue.toString()}°`; // ${unit === "fahrenheit" ? "F" : "C"}
};

export const formatWindSpeed = (speed: number, unit: WindUnit): string => {
  const value = unit === "mph" ? kmhToMph(speed) : speed;
  const roundedValue = Math.round(value);
  return `${roundedValue.toString()} ${unit === "mph" ? "mph" : "km/h"}`;
};

export const formatPrecipitation = (
  amount: number,
  unit: PrecipitationUnit
): string => {
  const value = unit === "in" ? mmToInches(amount) : amount;
  return `${value.toFixed(1)} ${unit === "in" ? "in" : "mm"}`;
};
