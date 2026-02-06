import styles from "./LoadingDots.module.css";

export interface LoadingDotsProps {
  text?: string;
}

export const LoadingDots = ({ text = "Loading..." }: LoadingDotsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export default LoadingDots;
