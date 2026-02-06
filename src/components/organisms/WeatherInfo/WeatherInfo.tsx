import clsx from "clsx";
import { useWeatherState } from "../../../hooks";
import { formatTemperature, type CurrentWeatherInfo } from "../../../utils";
import { WeatherIcon, LoadingDots } from "../../atoms";
import { WeatherStats } from "../WeatherStats";
import styles from "./WeatherInfo.module.css";

export interface WeatherInfoViewProps {
  weatherInfo?: CurrentWeatherInfo;
}

export const WeatherInfoView = ({ weatherInfo }: WeatherInfoViewProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.heroCard, !weatherInfo && styles.loading)}>
        {weatherInfo ? (
          <>
            <div className={styles.locationInfo}>
              <h2 className={styles.locationName}>
                {weatherInfo.locationName}
              </h2>
              <p className={styles.date}>{weatherInfo.date}</p>
            </div>

            <div className={styles.tempDisplay}>
              <WeatherIcon
                weatherCode={weatherInfo.weatherCode}
                className={styles.icon}
              />
              <span className={styles.temp}>
                {formatTemperature(
                  weatherInfo.temperature,
                  weatherInfo.temperatureUnit,
                )}
              </span>
            </div>
          </>
        ) : (
          <LoadingDots />
        )}
      </div>

      <WeatherStats stats={weatherInfo} />
    </div>
  );
};

export const WeatherInfo = () => {
  const { currentWeatherInfo } = useWeatherState();

  return <WeatherInfoView weatherInfo={currentWeatherInfo} />;
};
