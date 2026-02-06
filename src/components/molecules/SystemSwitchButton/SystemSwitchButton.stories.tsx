import type { Meta, StoryObj } from "@storybook/react-vite";
import { SystemSwitchButton } from "./SystemSwitchButton";

const meta: Meta<typeof SystemSwitchButton> = {
  title: "Molecules/SystemSwitchButton",
  component: SystemSwitchButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchToImperial: Story = {
  args: {
    children: "Switch to Imperial",
  },
};

export const SwitchToMetric: Story = {
  args: {
    children: "Switch to Metric",
  },
};
