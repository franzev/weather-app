import clsx from "clsx";
import { Icon } from "../../atoms";
import styles from "./UnitsDropdownButton.module.css";

interface UnitsDropdownButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const UnitsDropdownButton = ({
  isOpen,
  onClick,
}: UnitsDropdownButtonProps) => {
  return (
    <button
      className={styles.unitsButton}
      onClick={onClick}
      aria-label="Units settings"
      aria-expanded={isOpen}
    >
      <Icon src="/images/icon-units.svg" alt="" width={14} height={14} />
      <span>Units</span>
      <Icon
        src="/images/icon-dropdown.svg"
        alt=""
        className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
      />
    </button>
  );
};
