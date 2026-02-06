import styles from "./SearchingState.module.css";

export const SearchingState = () => {
  return (
    <div className={styles.searchingState}>
      <div className={styles.inner}>
        <img src="/images/icon-loading.svg" alt="Loading" aria-hidden="true" />
        Search in progress
      </div>
    </div>
  );
};
