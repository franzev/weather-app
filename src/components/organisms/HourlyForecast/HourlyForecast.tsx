import { DaySelector } from "../DaySelector";
import { formatTemperature } from "../../../utils";
import { useWeatherState, type HourlyForecastInfo } from "../../../hooks";
import { HourlyItem } from "../../molecules";
import styles from "./HourlyForecast.module.css";
import hourlyItemSkeletonStyles from "../../molecules/HourlyItem/HourlyItem.module.css";

export interface HourlyForecastProps {
  info?: HourlyForecastInfo;
  onDaySelect?: (index: number) => void;
}

export const HourlyForecastView = ({ info, onDaySelect }: HourlyForecastProps) => {
  return (
    <div className={styles.hourlyForecast}>
      <div className={styles.header}>
        <h2 className={styles.title}>Hourly forecast</h2>
        <DaySelector
          days={info?.dayNames ?? []}
          selectedIndex={info?.selectedDayIndex ?? 0}
          onSelect={onDaySelect}
        />
      </div>

      {!info &&
        Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`skeleton-hourly-item-${i.toString()}`}
            className={hourlyItemSkeletonStyles.item}
          >
            &nbsp;
          </div>
        ))}

      {info?.hourlyData.slice(0, 8).map((hour) => (
        <HourlyItem
          key={hour.time}
          time={hour.formattedTime}
          weatherCode={hour.weatherCode}
          temperature={formatTemperature(
            hour.temperature,
            info.temperatureUnit,
          )}
        />
      ))}
    </div>
  );
};

export const HourlyForecast = () => {
  const { hourlyForecastInfo, setSelectedDayIndex } = useWeatherState();

  return (
    <HourlyForecastView
      info={hourlyForecastInfo}
      onDaySelect={setSelectedDayIndex}
    />
  );
};
