import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DaySelector } from "./DaySelector";

const meta: Meta<typeof DaySelector> = {
  title: "Organisms/DaySelector",
  component: DaySelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedIndex: {
      control: { type: "number", min: 0, max: 6 },
    },
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(args.selectedIndex || 0);
    return (
      <DaySelector
        {...args}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    selectedIndex: 0,
  },
};

export const SecondDaySelected: Story = {
  args: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    selectedIndex: 1,
  },
};

export const WeekendSelected: Story = {
  args: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    selectedIndex: 6,
  },
};
