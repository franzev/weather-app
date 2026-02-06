import type { ButtonHTMLAttributes } from "react";
import styles from "./SystemSwitchButton.module.css";

export const SystemSwitchButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={styles.switchButton} {...props}>
      {children}
    </button>
  );
};
