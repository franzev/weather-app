import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { HourlyForecastView } from "./HourlyForecast";
import { type HourlyForecastInfo } from "../../../hooks/useWeatherState";
import { formatTime12Hour } from "../../../utils";

const meta: Meta<typeof HourlyForecastView> = {
  title: "Organisms/HourlyForecast",
  component: HourlyForecastView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const generateHourlyData = (startHour = 0) => {
  const data = [];
  for (let i = 0; i < 8; i++) {
    const hour = (startHour + i) % 24;
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    const timeString = date.toISOString();
    data.push({
      time: timeString,
      formattedTime: formatTime12Hour(timeString),
      temperature:
        15 + Math.sin(((hour - 6) * Math.PI) / 12) * 8 + Math.random() * 3,
      weatherCode: [0, 1, 3, 45, 61][i % 5],
    });
  }
  return data;
};

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const InteractiveWrapper = (args: Story["args"]) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    args?.info?.selectedDayIndex ?? 0,
  );

  const info: HourlyForecastInfo = {
    hourlyData: args?.info?.hourlyData ?? generateHourlyData(0),
    dayNames: args?.info?.dayNames ?? dayNames,
    selectedDayIndex,
    temperatureUnit: args?.info?.temperatureUnit ?? "celsius",
  };

  return <HourlyForecastView info={info} onDaySelect={setSelectedDayIndex} />;
};

export const Default: Story = {
  args: {
    info: {
      dayNames,
      selectedDayIndex: 0,
      hourlyData: generateHourlyData(0),
      temperatureUnit: "celsius",
    },
  },
  render: InteractiveWrapper,
};

export const Day2: Story = {
  args: {
    info: {
      dayNames,
      selectedDayIndex: 1,
      hourlyData: generateHourlyData(24),
      temperatureUnit: "celsius",
    },
  },
  render: InteractiveWrapper,
};

export const Imperial: Story = {
  args: {
    info: {
      dayNames,
      selectedDayIndex: 0,
      hourlyData: generateHourlyData(0),
      temperatureUnit: "fahrenheit",
    },
  },
  render: InteractiveWrapper,
};

export const Weekend: Story = {
  args: {
    info: {
      dayNames: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      selectedDayIndex: 0,
      hourlyData: generateHourlyData(12),
      temperatureUnit: "celsius",
    },
  },
  render: InteractiveWrapper,
};

export const Loading: Story = {
  args: {
    info: undefined,
  },
};
