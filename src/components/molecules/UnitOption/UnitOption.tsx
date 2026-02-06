import clsx from "clsx";
import { Icon } from "../../atoms";
import styles from "./UnitOption.module.css";

interface UnitOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const UnitOption = ({ label, isSelected, onClick }: UnitOptionProps) => {
  return (
    <button
      type="button"
      role="menuitem"
      className={clsx(styles.option, isSelected && styles.selected)}
      onClick={onClick}
    >
      <span>{label}</span>

      {isSelected && (
        <Icon
          src="/images/icon-checkmark.svg"
          alt=""
          className={styles.checkIcon}
        />
      )}
    </button>
  );
};
