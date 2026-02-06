import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeatherIcon } from "./WeatherIcon";

const meta: Meta<typeof WeatherIcon> = {
  title: "Atoms/WeatherIcon",
  component: WeatherIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    weatherCode: {
      control: { type: "number", min: 0, max: 99 },
      description: "WMO weather code (0-99)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClearSky: Story = {
  args: {
    weatherCode: 0,
  },
};

export const PartlyCloudy: Story = {
  args: {
    weatherCode: 2,
  },
};

export const Overcast: Story = {
  args: {
    weatherCode: 3,
  },
};

export const Fog: Story = {
  args: {
    weatherCode: 45,
  },
};

export const Rain: Story = {
  args: {
    weatherCode: 61,
  },
};

export const Snow: Story = {
  args: {
    weatherCode: 71,
  },
};

export const Thunderstorm: Story = {
  args: {
    weatherCode: 95,
  },
};

export const Large: Story = {
  args: {
    weatherCode: 0,
    className: "w-20 h-20",
  },
};
