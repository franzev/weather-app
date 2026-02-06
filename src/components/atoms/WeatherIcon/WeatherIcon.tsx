import { getWeatherIcon, getWeatherAltText } from "../../../utils";

interface WeatherIconProps {
  weatherCode: number;
  className?: string;
  alt?: string;
}

export const WeatherIcon = ({ weatherCode, className }: WeatherIconProps) => {
  const iconSrc = getWeatherIcon(weatherCode);

  return (
    <img
      src={iconSrc}
      alt={getWeatherAltText(weatherCode)}
      className={className}
    />
  );
};
