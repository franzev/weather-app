import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button type="button" className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
