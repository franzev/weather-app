import { useWeatherState } from "../../../hooks";
import { DailyForecastView } from "../DailyForecast";
import { HourlyForecastView } from "../HourlyForecast";
import { DailyForecast, HourlyForecast, WeatherInfo } from "../index";
import { WeatherInfoView } from "../WeatherInfo";
import styles from "./WeatherContent.module.css";

export const WeatherContentView = () => {
  return (
    <div className={styles.weatherContainer}>
      <div className={styles.mainContent}>
        <WeatherInfo />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </div>
  );
};

export const Loading = () => {
  return (
    <div className={styles.weatherContainer}>
      <div className={styles.mainContent}>
        <WeatherInfoView />
        <DailyForecastView />
      </div>
      <HourlyForecastView />
    </div>
  );
};

export const WeatherContent = () => {
  const { currentWeatherInfo, isLoading } = useWeatherState();

  if (isLoading) return <Loading />;

  if (!currentWeatherInfo) return null;

  return <WeatherContentView />;
};
