import { forwardRef } from "react";
import clsx from "clsx";
import { Icon } from "../../atoms";
import styles from "./UnitsDropdownButton.module.css";

interface UnitsDropdownButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const UnitsDropdownButton = forwardRef<
  HTMLButtonElement,
  UnitsDropdownButtonProps
>(({ isOpen, onClick }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.unitsButton}
      onClick={onClick}
      aria-label="Units settings"
      aria-expanded={isOpen}
      aria-controls="units-menu"
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
});

UnitsDropdownButton.displayName = "UnitsDropdownButton";
