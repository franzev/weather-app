import { Card } from "../../atoms";
import styles from "./StatItem.module.css";

interface StatItemProps {
  label: string;
  value: string | number;
}

export const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <Card className={styles.statItem}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </Card>
  );
};
