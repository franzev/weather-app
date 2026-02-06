import type { Meta, StoryObj } from "@storybook/react-vite";
import { UnitOption } from "./UnitOption";

const meta: Meta<typeof UnitOption> = {
  title: "Molecules/UnitOption",
  component: UnitOption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isSelected: {
      control: "boolean",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: {
    label: "Celsius (°C)",
    isSelected: false,
    onClick: () => {
      // No-op for story
    },
  },
};

export const Selected: Story = {
  args: {
    label: "Celsius (°C)",
    isSelected: true,
    onClick: () => {
      // No-op for story
    },
  },
};

export const Fahrenheit: Story = {
  args: {
    label: "Fahrenheit (°F)",
    isSelected: false,
    onClick: () => {
      // No-op for story
    },
  },
};

export const WindSpeed: Story = {
  args: {
    label: "km/h",
    isSelected: true,
    onClick: () => {
      // No-op for story
    },
  },
};
