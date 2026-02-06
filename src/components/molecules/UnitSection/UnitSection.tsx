import { UnitOption } from "../UnitOption";
import styles from "./UnitSection.module.css";

interface UnitOptionData<T extends string> {
  value: T;
  label: string;
}

interface UnitSectionProps<T extends string> {
  label: string;
  options: UnitOptionData<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

export const UnitSection = <T extends string>({
  label,
  options,
  selectedValue,
  onSelect,
}: UnitSectionProps<T>) => {
  return (
    <div className={styles.section}>
      <div className={styles.label}>{label}</div>
      {options.map((option) => (
        <UnitOption
          key={option.value}
          label={option.label}
          isSelected={selectedValue === option.value}
          onClick={() => {
            onSelect(option.value);
          }}
        />
      ))}
    </div>
  );
};
