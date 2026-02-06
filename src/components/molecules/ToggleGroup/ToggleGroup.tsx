import clsx from "clsx";
import styles from "./ToggleGroup.module.css";

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleGroupProps<T extends string> {
  label: string;
  options: [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange: (value: T) => void;
}

export const ToggleGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: ToggleGroupProps<T>) => {
  return (
    <div className={styles.toggleSection}>
      <label className={styles.toggleLabel}>{label}</label>
      <div className={styles.toggleOptions}>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={clsx(
              styles.toggleButton,
              value === option.value && styles.active,
            )}
            onClick={() => {
              onChange(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
