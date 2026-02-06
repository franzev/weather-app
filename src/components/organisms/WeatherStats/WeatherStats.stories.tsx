import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeatherStats } from "./WeatherStats";

const meta: Meta<typeof WeatherStats> = {
  title: "Organisms/WeatherStats",
  component: WeatherStats,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: {
      feelsLike: 22,
      humidity: 65,
      windSpeed: 15,
      precipitation: 2.5,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Cold: Story = {
  args: {
    stats: {
      feelsLike: -5,
      humidity: 80,
      windSpeed: 25,
      precipitation: 0,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Hot: Story = {
  args: {
    stats: {
      feelsLike: 35,
      humidity: 45,
      windSpeed: 8,
      precipitation: 0,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Rainy: Story = {
  args: {
    stats: {
      feelsLike: 18,
      humidity: 90,
      windSpeed: 20,
      precipitation: 15.5,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Imperial: Story = {
  args: {
    stats: {
      feelsLike: 22,
      humidity: 65,
      windSpeed: 15,
      precipitation: 2.5,
      temperatureUnit: "fahrenheit",
      windUnit: "mph",
      precipitationUnit: "in",
    },
  },
};

export const Loading: Story = {
  args: {
    stats: undefined,
  },
};
