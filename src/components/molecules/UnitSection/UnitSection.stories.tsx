import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { UnitSection } from "./UnitSection";

const meta: Meta<typeof UnitSection> = {
  title: "Molecules/UnitSection",
  component: UnitSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedValue);
    return (
      <div style={{ minWidth: "220px" }}>
        <UnitSection
          {...args}
          selectedValue={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
  args: {
    label: "Temperature",
    options: [
      { value: "celsius", label: "Celsius (°C)" },
      { value: "fahrenheit", label: "Fahrenheit (°F)" },
    ],
    selectedValue: "celsius",
  },
};

export const WindSpeed: Story = {
  args: {
    label: "Wind Speed",
    options: [
      { value: "kmh", label: "km/h" },
      { value: "mph", label: "mph" },
    ],
    selectedValue: "kmh",
  },
};

export const Precipitation: Story = {
  args: {
    label: "Precipitation",
    options: [
      { value: "mm", label: "Millimeters (mm)" },
      { value: "in", label: "Inches (in)" },
    ],
    selectedValue: "mm",
  },
};
