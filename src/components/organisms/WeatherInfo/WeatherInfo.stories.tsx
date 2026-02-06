import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeatherInfoView } from "./WeatherInfo";

const meta: Meta<typeof WeatherInfoView> = {
  title: "Organisms/WeatherInfo",
  component: WeatherInfoView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weatherInfo: {
      locationName: "New York",
      date: "Monday, Feb 4, 2026",
      temperature: 22,
      weatherCode: 0,
      feelsLike: 20,
      humidity: 65,
      windSpeed: 15,
      precipitation: 2.5,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Imperial: Story = {
  args: {
    weatherInfo: {
      locationName: "Los Angeles",
      date: "Monday, Feb 4, 2026",
      temperature: 22,
      weatherCode: 1,
      feelsLike: 20,
      humidity: 45,
      windSpeed: 15,
      precipitation: 0,
      temperatureUnit: "fahrenheit",
      windUnit: "mph",
      precipitationUnit: "in",
    },
  },
};

export const Rainy: Story = {
  args: {
    weatherInfo: {
      locationName: "Seattle",
      date: "Monday, Feb 4, 2026",
      temperature: 15,
      weatherCode: 61,
      feelsLike: 13,
      humidity: 90,
      windSpeed: 20,
      precipitation: 15.5,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Cold: Story = {
  args: {
    weatherInfo: {
      locationName: "Chicago",
      date: "Monday, Feb 4, 2026",
      temperature: -5,
      weatherCode: 3,
      feelsLike: -8,
      humidity: 80,
      windSpeed: 25,
      precipitation: 0,
      temperatureUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    },
  },
};

export const Loading: Story = {
  args: {
    weatherInfo: undefined,
  },
};
