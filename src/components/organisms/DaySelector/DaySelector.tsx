import { useRef, useState } from "react";

import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownTrigger,
} from "../../molecules";
import styles from "./DaySelector.module.css";

interface DaySelectorProps {
  days: string[];
  selectedIndex: number;
  onSelect?: (index: number) => void;
}

export const DaySelector = ({
  days,
  selectedIndex,
  onSelect,
}: DaySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    dropdownRef,
    () => {
      setIsOpen(false);
    },
    isOpen,
  );

  const selectedDay = days[selectedIndex] ?? "-";

  return (
    <div className={styles.daySelector} ref={dropdownRef}>
      <DropdownTrigger
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedDay}
      </DropdownTrigger>
      {days.length > 0 && isOpen && (
        <DropdownMenu align="right">
          {days.map((day, index) => {
            return (
              <DropdownMenuItem
                key={day}
                isActive={selectedIndex === index}
                onClick={() => {
                  onSelect?.(index);
                  setIsOpen(false);
                }}
              >
                {day}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenu>
      )}
    </div>
  );
};
