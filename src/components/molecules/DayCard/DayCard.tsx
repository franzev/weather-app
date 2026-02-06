import clsx from "clsx";
import { Card, WeatherIcon } from "../../atoms";
import styles from "./DayCard.module.css";

interface DayCardProps {
  className?: string;
  dayName: string;
  weatherCode: number;
  maxTemp: string;
  minTemp: string;
}

export const DayCard = ({
  className,
  dayName,
  weatherCode,
  maxTemp,
  minTemp,
}: DayCardProps) => {
  return (
    <Card className={clsx(styles.card, className)}>
      <div className={styles.dayName}>{dayName}</div>

      <WeatherIcon weatherCode={weatherCode} className={styles.weatherIcon} />

      <div className={styles.temps}>
        <span className={styles.tempMax}>{maxTemp}</span>
        <span className={styles.tempMin}>{minTemp}</span>
      </div>
    </Card>
  );
};
