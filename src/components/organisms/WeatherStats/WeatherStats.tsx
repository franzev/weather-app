import { StatItem } from "../../molecules";
import {
  formatTemperature,
  formatWindSpeed,
  formatPrecipitation,
  type WeatherStatsData,
} from "../../../utils";
import styles from "./WeatherStats.module.css";

export interface WeatherStatsProps {
  stats?: WeatherStatsData;
}

export const WeatherStats = ({ stats }: WeatherStatsProps) => {
  return (
    <div className={styles.weatherStats}>
      <StatItem
        label="Feels Like"
        value={
          stats
            ? formatTemperature(stats.feelsLike, stats.temperatureUnit)
            : "-"
        }
      />
      <StatItem
        label="Humidity"
        value={stats ? `${stats.humidity.toString()}%` : "-"}
      />
      <StatItem
        label="Wind"
        value={stats ? formatWindSpeed(stats.windSpeed, stats.windUnit) : "-"}
      />
      <StatItem
        label="Precipitation"
        value={
          stats
            ? formatPrecipitation(stats.precipitation, stats.precipitationUnit)
            : "-"
        }
      />
    </div>
  );
};
