import { useCallback, useEffect, useRef, useState } from "react";
import { useUnitsStore } from "../../../stores";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  type TemperatureUnit,
  type WindUnit,
  type PrecipitationUnit,
} from "../../../utils";
import { UnitsDropdownButton } from "../../molecules";
import { SystemSwitchButton } from "../../molecules";
import { UnitSection } from "../../molecules";
import styles from "./UnitsDropdown.module.css";

const TEMPERATURE_OPTIONS: { value: TemperatureUnit; label: string }[] = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
];

const WIND_OPTIONS: { value: WindUnit; label: string }[] = [
  { value: "kmh", label: "km/h" },
  { value: "mph", label: "mph" },
];

const PRECIPITATION_OPTIONS: {
  value: PrecipitationUnit;
  label: string;
}[] = [
  { value: "mm", label: "Millimeters (mm)" },
  { value: "in", label: "Inches (in)" },
];

const Divider = () => {
  return <div className={styles.divider} />;
};

export const UnitsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    units,
    setUnitSystem,
    setTemperatureUnit,
    setWindUnit,
    setPrecipitationUnit,
  } = useUnitsStore();

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  useClickOutside(
    dropdownRef,
    () => {
      setIsOpen(false);
    },
    isOpen,
  );

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable =
        menuRef.current.querySelector<HTMLElement>("button");
      firstFocusable?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const menu = menuRef.current;
        if (!menu) return;

        const items = Array.from(menu.querySelectorAll<HTMLElement>("button"));
        const currentIndex = items.indexOf(
          document.activeElement as HTMLElement,
        );

        let nextIndex: number;
        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        items[nextIndex]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  const switchLabel =
    units.system === "metric" ? "Switch to Imperial" : "Switch to Metric";

  const handleSystemSwitch = () => {
    if (units.system === "metric") {
      setUnitSystem("imperial");
      setTemperatureUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipitationUnit("in");
      return;
    }
    setUnitSystem("metric");
    setTemperatureUnit("celsius");
    setWindUnit("kmh");
    setPrecipitationUnit("mm");
  };

  return (
    <div className={styles.unitsContainer} ref={dropdownRef}>
      <UnitsDropdownButton
        ref={buttonRef}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <div
          ref={menuRef}
          id="units-menu"
          role="menu"
          className={styles.unitsDropdown}
        >
          <SystemSwitchButton role="menuitem" onClick={handleSystemSwitch}>
            {switchLabel}
          </SystemSwitchButton>

          <UnitSection
            label="Temperature"
            options={TEMPERATURE_OPTIONS}
            selectedValue={units.temperature}
            onSelect={setTemperatureUnit}
          />

          <Divider />

          <UnitSection
            label="Wind Speed"
            options={WIND_OPTIONS}
            selectedValue={units.wind}
            onSelect={setWindUnit}
          />

          <Divider />

          <UnitSection
            label="Precipitation"
            options={PRECIPITATION_OPTIONS}
            selectedValue={units.precipitation}
            onSelect={setPrecipitationUnit}
          />
        </div>
      )}
    </div>
  );
};
