import { formatTemperature, type TemperatureUnit } from "../../../utils";
import { useWeatherState } from "../../../hooks";
import { type DailyForecastItem } from "../../../hooks/useWeatherState";
import { useUnitsStore } from "../../../stores";
import { DayCard } from "../../molecules";
import styles from "./DailyForecast.module.css";

export interface DailyForecastProps {
  days?: DailyForecastItem[];
  temperatureUnit?: TemperatureUnit;
}

export const DailyForecastView = ({
  days,
  temperatureUnit = "celsius",
}: DailyForecastProps) => {
  return (
    <div className={styles.dailyForecast}>
      <h2 className={styles.sectionTitle}>Daily forecast</h2>

      <div className={styles.daysList}>
        {!days && (
          <>
            {Array.from({ length: 7 }).map((_, i) => (
              <DayCard
                key={`skeleton-day-card-${i.toString()}`}
                className={styles.skeleton}
                dayName="D"
                weatherCode={0}
                maxTemp="0°"
                minTemp="0°"
              />
            ))}
          </>
        )}

        {days?.map((day) => {
          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <DayCard
              key={day.date}
              dayName={dayName}
              weatherCode={day.weatherCode}
              maxTemp={formatTemperature(day.temperatureMax, temperatureUnit)}
              minTemp={formatTemperature(day.temperatureMin, temperatureUnit)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const DailyForecast = () => {
  const { dailyForecast } = useWeatherState();
  const { units } = useUnitsStore();

  if (dailyForecast.length === 0) return null;

  return (
    <DailyForecastView
      days={dailyForecast}
      temperatureUnit={units.temperature}
    />
  );
};
