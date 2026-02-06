import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ToggleGroup } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "Molecules/ToggleGroup",
  component: ToggleGroup,
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
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ minWidth: "300px" }}>
        <ToggleGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MetricImperial: Story = {
  args: {
    label: "Units",
    options: [
      { value: "metric", label: "Metric" },
      { value: "imperial", label: "Imperial" },
    ],
    value: "metric",
  },
};

export const CelsiusFahrenheit: Story = {
  args: {
    label: "Temperature",
    options: [
      { value: "celsius", label: "°C" },
      { value: "fahrenheit", label: "°F" },
    ],
    value: "celsius",
  },
};

export const SelectedSecond: Story = {
  args: {
    label: "Units",
    options: [
      { value: "metric", label: "Metric" },
      { value: "imperial", label: "Imperial" },
    ],
    value: "imperial",
  },
};
