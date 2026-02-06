import clsx from "clsx";
import styles from "./DropdownMenu.module.css";

interface DropdownMenuProps {
  children: React.ReactNode;
  align?: "left" | "right";
}

export const DropdownMenu = ({ children, align = "right" }: DropdownMenuProps) => {
  return <ul className={clsx(styles.menu, styles[align])}>{children}</ul>;
};
