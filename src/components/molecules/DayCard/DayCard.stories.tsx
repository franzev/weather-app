import type { Meta, StoryObj } from "@storybook/react-vite";
import { DayCard } from "./DayCard";

const meta: Meta<typeof DayCard> = {
  title: "Molecules/DayCard",
  component: DayCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dayName: {
      control: "text",
    },
    weatherCode: {
      control: { type: "number", min: 0, max: 99 },
    },
    maxTemp: {
      control: "text",
    },
    minTemp: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sunny: Story = {
  args: {
    dayName: "Mon",
    weatherCode: 0,
    maxTemp: "25°",
    minTemp: "18°",
  },
};

export const Cloudy: Story = {
  args: {
    dayName: "Tue",
    weatherCode: 3,
    maxTemp: "22°",
    minTemp: "15°",
  },
};

export const Rainy: Story = {
  args: {
    dayName: "Wed",
    weatherCode: 61,
    maxTemp: "18°",
    minTemp: "12°",
  },
};

export const Snowy: Story = {
  args: {
    dayName: "Thu",
    weatherCode: 71,
    maxTemp: "-2°",
    minTemp: "-8°",
  },
};

export const Fahrenheit: Story = {
  args: {
    dayName: "Fri",
    weatherCode: 2,
    maxTemp: "77°",
    minTemp: "64°",
  },
};
