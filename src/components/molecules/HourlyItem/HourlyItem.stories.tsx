import type { Meta, StoryObj } from "@storybook/react-vite";
import { HourlyItem } from "./HourlyItem";

const meta: Meta<typeof HourlyItem> = {
  title: "Molecules/HourlyItem",
  component: HourlyItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    time: {
      control: "text",
    },
    weatherCode: {
      control: { type: "number", min: 0, max: 99 },
    },
    temperature: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Morning: Story = {
  args: {
    time: "9 AM",
    weatherCode: 0,
    temperature: "22°C",
  },
};

export const Afternoon: Story = {
  args: {
    time: "2 PM",
    weatherCode: 2,
    temperature: "28°C",
  },
};

export const Evening: Story = {
  args: {
    time: "8 PM",
    weatherCode: 3,
    temperature: "20°C",
  },
};

export const Night: Story = {
  args: {
    time: "11 PM",
    weatherCode: 0,
    temperature: "15°C",
  },
};

export const Rainy: Story = {
  args: {
    time: "3 PM",
    weatherCode: 61,
    temperature: "18°C",
  },
};

export const Fahrenheit: Story = {
  args: {
    time: "12 PM",
    weatherCode: 0,
    temperature: "75°F",
  },
};
