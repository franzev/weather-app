import { Button } from "../Button";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  onRetry?: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className={styles.errorState}>
      <img src="/images/icon-error.svg" alt="" aria-hidden="true" />

      <h1>Something went wrong</h1>

      <p>
        We couldn&apos;t connect to the server (API error). Please try again in
        a few moments.
      </p>

      <Button
        className={styles.retryButton}
        onClick={() => {
          onRetry?.();
        }}
      >
        <img src="/images/icon-retry.svg" alt="" aria-hidden="true" />
        Retry
      </Button>
    </div>
  );
};
