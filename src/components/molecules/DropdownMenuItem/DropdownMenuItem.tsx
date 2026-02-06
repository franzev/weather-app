import clsx from "clsx";
import styles from "./DropdownMenuItem.module.css";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const DropdownMenuItem = ({
  children,
  isActive,
  onClick,
}: DropdownMenuItemProps) => {
  return (
    <li>
      <button
        type="button"
        className={clsx(styles.item, isActive && styles.active)}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
