import styles from "./App.module.css";
import {
  ErrorState,
  SearchBar,
  UnitsDropdown,
  WeatherContent,
} from "./components";
import { useWeatherState } from "./hooks";

const WeatherApp = () => {
  const { error, retry } = useWeatherState();

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <img src="/images/logo.svg" alt="Weather Now" className={styles.logo} />
        <UnitsDropdown />
      </header>

      {error && <ErrorState onRetry={retry} />}

      {!error && (
        <>
          <h1 className={styles.mainTitle}>How's the sky looking today?</h1>

          <div className={styles.inner}>
            <SearchBar />

            <WeatherContent />
          </div>
        </>
      )}
    </main>
  );
};

export default WeatherApp;
