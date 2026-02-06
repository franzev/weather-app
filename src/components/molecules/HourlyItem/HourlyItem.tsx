import { WeatherIcon } from "../../atoms";
import styles from "./HourlyItem.module.css";

interface HourlyItemProps {
  time: string;
  weatherCode: number;
  temperature: string;
}

export const HourlyItem = ({
  time,
  weatherCode,
  temperature,
}: HourlyItemProps) => {
  return (
    <div className={styles.item}>
      <WeatherIcon weatherCode={weatherCode} className={styles.weatherIcon} />
      <span className={styles.time}>{time}</span>
      <span className={styles.temp}>{temperature}</span>
    </div>
  );
};
