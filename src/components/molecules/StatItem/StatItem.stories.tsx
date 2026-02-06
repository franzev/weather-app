import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatItem } from "./StatItem";

const meta: Meta<typeof StatItem> = {
  title: "Molecules/StatItem",
  component: StatItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    value: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
  args: {
    label: "Feels Like",
    value: "22°C",
  },
};

export const Humidity: Story = {
  args: {
    label: "Humidity",
    value: "65%",
  },
};

export const WindSpeed: Story = {
  args: {
    label: "Wind",
    value: "15 km/h",
  },
};

export const Precipitation: Story = {
  args: {
    label: "Precipitation",
    value: "2.5 mm",
  },
};

export const NumericValue: Story = {
  args: {
    label: "Temperature",
    value: 25,
  },
};
