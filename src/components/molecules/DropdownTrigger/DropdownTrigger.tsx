import clsx from "clsx";
import { Icon } from "../../atoms";
import styles from "./DropdownTrigger.module.css";

interface DropdownTriggerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export const DropdownTrigger = ({
  children,
  isOpen,
  onClick,
  ariaLabel,
}: DropdownTriggerProps) => {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      <Icon
        src="/images/icon-dropdown.svg"
        alt=""
        className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
      />
    </button>
  );
};
