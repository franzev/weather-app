import type { Meta, StoryObj } from "@storybook/react-vite";
import { DailyForecastView } from "./DailyForecast";

const meta: Meta<typeof DailyForecastView> = {
  title: "Organisms/DailyForecast",
  component: DailyForecastView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const generateDays = (startDate: Date = new Date()) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
    days.push({
      date: d.toISOString(),
      dayName,
      weatherCode: [0, 1, 3, 45, 61, 71, 95][i % 7],
      temperatureMax: 20 + i * 2,
      temperatureMin: 10 + i,
    });
  }
  return days;
};

export const Default: Story = {
  args: {
    days: generateDays(),
    temperatureUnit: "celsius",
  },
};

export const Imperial: Story = {
  args: {
    days: generateDays(),
    temperatureUnit: "fahrenheit",
  },
};

export const Weekend: Story = {
  args: {
    days: generateDays(new Date("2026-02-07")), // Saturday
    temperatureUnit: "celsius",
  },
};

export const Loading: Story = {
  args: {
    days: undefined,
  },
};
